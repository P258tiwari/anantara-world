import { NextRequest, NextResponse } from "next/server";
import { saveLeadToSheet } from "../../lib/lead-storage";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const MAX_BODY_BYTES = 32_000;
const EMAIL_TIMEOUT_MS = 10_000;
const MAX_RATE_LIMIT_RECORDS = 5_000;
const rateLimits = new Map<string, { count: number; reset: number }>();

function json(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

function clean(value: unknown, max = 300) {
  return String(value ?? "").replace(/[<>]/g, "").split("").filter((char) => char.charCodeAt(0) > 31).join("").trim().slice(0, max);
}

function cleanUtm(value: unknown) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return Object.fromEntries(Object.entries(value).slice(0, 20).map(([key, entry]) => [clean(key, 50), clean(entry, 200)]));
}

function hasValidOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (!origin) return true;
  const host = request.headers.get("x-forwarded-host")?.split(",")[0]?.trim() || request.headers.get("host");
  if (!host) return false;
  try { return new URL(origin).host === host; } catch { return false; }
}

function isRateLimited(key: string) {
  const now = Date.now();
  const record = rateLimits.get(key);
  if (!record || record.reset < now) {
    if (rateLimits.size >= MAX_RATE_LIMIT_RECORDS) {
      const oldestKey = rateLimits.keys().next().value;
      if (oldestKey) rateLimits.delete(oldestKey);
    }
    rateLimits.set(key, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  record.count += 1;
  return record.count > MAX_REQUESTS;
}

export async function POST(request: NextRequest) {
  if (!hasValidOrigin(request)) return json({ message: "Invalid request origin." }, 403);

  const declaredLength = Number(request.headers.get("content-length") || 0);
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) return json({ message: "Request is too large." }, 413);

  const ip = clean(request.headers.get("cf-connecting-ip") || request.headers.get("x-forwarded-for")?.split(",")[0] || "local", 100);
  if (isRateLimited(ip)) return json({ message: "Too many requests. Please try again later." }, 429);

  let raw: Record<string, unknown>;
  try {
    const body = await request.text();
    if (new TextEncoder().encode(body).byteLength > MAX_BODY_BYTES) return json({ message: "Request is too large." }, 413);
    raw = JSON.parse(body) as Record<string, unknown>;
    if (!raw || typeof raw !== "object" || Array.isArray(raw)) throw new Error("Invalid payload");
  } catch { return json({ message: "Invalid form data." }, 400); }

  if (clean(raw.website)) return json({ message: "Thank you." });
  const startedAt = Number(raw.startedAt);
  if (!startedAt || !Number.isFinite(startedAt) || Date.now() - startedAt < 1500) return json({ message: "Please review the form and try again." }, 400);

  const data = {
    submissionId: clean(raw.submissionId, 36) || crypto.randomUUID(),
    fullName: clean(raw.fullName, 100), phone: clean(raw.phone, 30), email: clean(raw.email, 160), city: clean(raw.city, 100),
    interest: clean(raw.interest, 100), purpose: clean(raw.purpose, 30), contactTime: clean(raw.contactTime, 50), message: clean(raw.message, 1000),
    formType: clean(raw.formType, 30), pageUrl: clean(raw.pageUrl, 500), consent: clean(raw.consent, 10), utm: cleanUtm(raw.utm),
  };
  if (!["enquiry", "visit", "campaign"].includes(data.formType) || !/^[a-f0-9-]{36}$/i.test(data.submissionId)) {
    return json({ message: "Invalid enquiry form." }, 422);
  }
  if (data.fullName.length < 2 || !/^[+0-9 ()-]{8,18}$/.test(data.phone) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) || data.consent !== "yes") {
    return json({ message: "Please complete all required fields correctly." }, 422);
  }

  const sheetUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  let savedToSheet = false;
  if (sheetUrl) {
    try {
      await saveLeadToSheet(data, sheetUrl, process.env.GOOGLE_SHEETS_WEBHOOK_SECRET || "");
      savedToSheet = true;
    } catch {
      return json({ message: "We could not save your enquiry. Please try again or call us directly." }, 502);
    }
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    if (savedToSheet) return json({ ok: true });
    return json({ message: "Enquiry delivery is temporarily unavailable. Please call or email us directly." }, 503);
  }

  let emailResponse: Response;
  try {
    emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json", "Idempotency-Key": data.submissionId },
      body: JSON.stringify({ from, to: [to], reply_to: data.email, subject: `ANANTARA WORLD ${data.formType || "enquiry"}: ${data.fullName}`, text: Object.entries(data).map(([key,value])=>`${key}: ${typeof value === "object" ? JSON.stringify(value) : value}`).join("\n") }),
      signal: AbortSignal.timeout(EMAIL_TIMEOUT_MS),
    });
  } catch {
    if (savedToSheet) return json({ ok: true });
    return json({ message: "We could not send your enquiry. Please call or email us directly." }, 502);
  }
  if (!emailResponse.ok && !savedToSheet) return json({ message: "We could not send your enquiry. Please call or email us directly." }, 502);
  return json({ ok: true });
}

import { NextRequest, NextResponse } from "next/server";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const rateLimits = new Map<string, { count: number; reset: number }>();

function clean(value: unknown, max = 300) {
  return String(value ?? "").replace(/[<>]/g, "").split("").filter((char) => char.charCodeAt(0) > 31).join("").trim().slice(0, max);
}

function isRateLimited(key: string) {
  const now = Date.now();
  const record = rateLimits.get(key);
  if (!record || record.reset < now) {
    rateLimits.set(key, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  record.count += 1;
  return record.count > MAX_REQUESTS;
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin && host && new URL(origin).host !== host) return NextResponse.json({ message: "Invalid request origin." }, { status: 403 });

  const ip = request.headers.get("cf-connecting-ip") || request.headers.get("x-forwarded-for")?.split(",")[0] || "local";
  if (isRateLimited(ip)) return NextResponse.json({ message: "Too many requests. Please try again later." }, { status: 429 });

  let raw: Record<string, unknown>;
  try { raw = await request.json() as Record<string, unknown>; } catch { return NextResponse.json({ message: "Invalid form data." }, { status: 400 }); }
  if (clean(raw.website)) return NextResponse.json({ message: "Thank you." });
  const startedAt = Number(raw.startedAt);
  if (!startedAt || Date.now() - startedAt < 1500) return NextResponse.json({ message: "Please review the form and try again." }, { status: 400 });

  const data = {
    fullName: clean(raw.fullName, 100), phone: clean(raw.phone, 30), email: clean(raw.email, 160), city: clean(raw.city, 100),
    interest: clean(raw.interest, 100), purpose: clean(raw.purpose, 30), contactTime: clean(raw.contactTime, 50), message: clean(raw.message, 1000),
    formType: clean(raw.formType, 30), pageUrl: clean(raw.pageUrl, 500), consent: clean(raw.consent, 10), utm: raw.utm && typeof raw.utm === "object" ? raw.utm : {},
  };
  if (data.fullName.length < 2 || !/^[+0-9 ()-]{8,18}$/.test(data.phone) || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email) || data.consent !== "yes") {
    return NextResponse.json({ message: "Please complete all required fields correctly." }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    if (process.env.NODE_ENV !== "production") console.info("ANANTARA enquiry (email not configured):", data);
    return NextResponse.json({ ok: true });
  }
  const emailResponse = await fetch("https://api.resend.com/emails", { method: "POST", headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" }, body: JSON.stringify({ from, to: [to], reply_to: data.email, subject: `ANANTARA WORLD ${data.formType || "enquiry"}: ${data.fullName}`, text: Object.entries(data).map(([key,value])=>`${key}: ${typeof value === "object" ? JSON.stringify(value) : value}`).join("\n") }) });
  if (!emailResponse.ok) return NextResponse.json({ message: "We could not send your enquiry. Please call or email us directly." }, { status: 502 });
  return NextResponse.json({ ok: true });
}

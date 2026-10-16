export async function saveLeadToSheet(lead: Record<string, unknown>, url: string, secret: string) {
  if (!secret || !/^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]+\/exec$/.test(url)) {
    throw new Error("Invalid Google Sheets receiver configuration");
  }
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ secret, lead }),
    redirect: "follow",
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) throw new Error("Lead storage unavailable");
  const result = await response.json() as { ok?: boolean; submissionId?: string };
  if (result.ok !== true || result.submissionId !== lead.submissionId) throw new Error("Lead storage did not confirm receipt");
}

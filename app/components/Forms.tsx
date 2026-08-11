"use client";

import { useState } from "react";

type FormStatus = "idle" | "loading" | "success" | "error";

export function EnquiryForm({ compact = false, formType = "enquiry" }: { compact?: boolean; formType?: "enquiry" | "visit" | "campaign" }) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");
  const [startedAt] = useState(() => Date.now());

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));
    try {
      const response = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, formType, startedAt, pageUrl: window.location.href, utm: Object.fromEntries(new URLSearchParams(window.location.search)) }),
      });
      const result = await response.json() as { message?: string };
      if (!response.ok) throw new Error(result.message || "Unable to submit your enquiry.");
      form.reset();
      setStatus("success");
      setMessage("Thank you. Our team will contact you shortly.");
    } catch (error) {
      setStatus("error");
      setMessage(error instanceof Error ? error.message : "Something went wrong. Please try again.");
    }
  }

  return (
    <form className={`enquiry-form ${compact ? "enquiry-form--compact" : ""}`} onSubmit={handleSubmit} noValidate>
      <div className="honeypot" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      <div className="field"><label htmlFor={`${formType}-name`}>Full name *</label><input id={`${formType}-name`} name="fullName" required minLength={2} autoComplete="name" /></div>
      <div className="field"><label htmlFor={`${formType}-phone`}>Phone *</label><input id={`${formType}-phone`} name="phone" required inputMode="tel" autoComplete="tel" pattern="[0-9+ ()-]{8,18}" /></div>
      <div className="field"><label htmlFor={`${formType}-email`}>Email *</label><input id={`${formType}-email`} type="email" name="email" required autoComplete="email" /></div>
      {!compact && <div className="field"><label htmlFor={`${formType}-city`}>City *</label><input id={`${formType}-city`} name="city" required autoComplete="address-level2" /></div>}
      <div className="field"><label htmlFor={`${formType}-interest`}>Residence interest</label><select id={`${formType}-interest`} name="interest" defaultValue=""><option value="" disabled>Select an option</option><option>3-bedroom residence</option><option>4-bedroom residence</option><option>Project presentation</option></select></div>
      {!compact && <><fieldset className="field field--full"><legend>Purpose</legend><div className="radio-row"><label><input type="radio" name="purpose" value="Personal" defaultChecked /> Personal</label><label><input type="radio" name="purpose" value="Investment" /> Investment</label></div></fieldset><div className="field"><label htmlFor={`${formType}-time`}>Preferred contact time</label><select id={`${formType}-time`} name="contactTime"><option>Morning</option><option>Afternoon</option><option>Evening</option></select></div><div className="field field--full"><label htmlFor={`${formType}-message`}>Message</label><textarea id={`${formType}-message`} name="message" rows={4} maxLength={1000} /></div></>}
      <label className="consent field--full"><input type="checkbox" name="consent" value="yes" required /><span>I consent to Mahadev Developers contacting me about ANANTARA WORLD and accept the <a href="/privacy-policy">privacy policy</a>. *</span></label>
      <div className="form-submit field--full"><button className="button" type="submit" disabled={status === "loading"}>{status === "loading" ? "Sending…" : formType === "visit" ? "Request a visit" : "Submit enquiry"}</button><p className={`form-status ${status}`} role="status" aria-live="polite">{message}</p></div>
    </form>
  );
}


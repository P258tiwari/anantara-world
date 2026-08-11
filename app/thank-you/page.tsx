import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "../components/SiteShell";

export const metadata: Metadata = { title: "Thank You | ANANTARA WORLD", robots: { index: false, follow: false } };
export default function ThankYouPage(){return <SiteShell><section className="thank-you"><p className="eyebrow">Enquiry received</p><span className="thank-you__mark" aria-hidden="true">A</span><h1>Thank you for beginning the conversation.</h1><p>Our team will review your enquiry and contact you shortly.</p><div className="button-row"><Link className="button" href="/">Return home</Link><Link className="text-link" href="/anantara-world">Explore the project</Link></div></section></SiteShell>}


"use client";

import Link from "next/link";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="not-found" role="main">
      <p className="eyebrow">Something went wrong</p>
      <h1>We could not open this part of ANANTARA WORLD.</h1>
      <p>Please try again. If the issue continues, return to the homepage or contact our team.</p>
      <div className="button-row">
        <button className="button" type="button" onClick={reset}>Try again</button>
        <Link className="text-link" href="/">Return to the homepage</Link>
      </div>
    </main>
  );
}
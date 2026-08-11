"use client";

import { useState, useSyncExternalStore } from "react";

const subscribe = () => () => undefined;

export function ConsentBanner() {
  const hasChoice = useSyncExternalStore(subscribe, () => Boolean(localStorage.getItem("anantara-cookie-choice")), () => true);
  const [dismissed, setDismissed] = useState(false);
  const visible = !hasChoice && !dismissed;
  if (!visible) return null;
  function choose(value: "essential" | "accepted") { localStorage.setItem("anantara-cookie-choice", value); setDismissed(true); }
  return <aside className="cookie-banner" aria-label="Cookie preferences"><div><p className="eyebrow">Your privacy</p><p>We use essential storage for this website. Optional analytics remain inactive until configured and accepted.</p></div><div><button className="text-link" onClick={() => choose("essential")}>Essential only</button><button className="button button--small" onClick={() => choose("accepted")}>Accept optional</button></div></aside>;
}

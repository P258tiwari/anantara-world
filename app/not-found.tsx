import Link from "next/link";
import { SiteShell } from "./components/SiteShell";
export default function NotFound(){return <SiteShell><section className="not-found"><span>404</span><p className="eyebrow">A path not found</p><h1>This horizon leads elsewhere.</h1><p>The page you are looking for may have moved or is not yet part of ANANTARA WORLD.</p><Link className="button" href="/">Return to the homepage</Link></section></SiteShell>}


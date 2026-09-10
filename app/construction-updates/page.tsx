import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "../components/SiteShell";
import { Breadcrumbs, Intro, PageHero } from "../components/Common";
import { demoUpdates, images } from "../data";

export const metadata: Metadata = { title: "Construction Updates | ANANTARA WORLD", description: "Follow verified construction updates and public project reports for ANANTARA WORLD in Kanpur.", alternates: { canonical: "/construction-updates" } };
export default function UpdatesPage(){return <SiteShell overlay><PageHero eyebrow="Project progress" title="A clear record of what is taking shape." copy="Verified construction notes, site images, video and downloadable reports will be shared here." image="facade" /><Breadcrumbs items={[{label:"Home",href:"/"},{label:"Construction updates"}]} /><section className="section-pad"><Intro number="01" eyebrow="Public timeline" title="Progress, documented responsibly." copy="Browse the same project updates, news, events and announcements featured on the homepage." /><div className="timeline">{demoUpdates.map((u,index)=><article key={u.slug}><div className="timeline__date"><span>{String(index+1).padStart(2,"0")}</span><p>{u.date}</p></div><img src={images[u.image].src} alt={images[u.image].alt} loading="lazy" decoding="async" /><div><p className="eyebrow">{u.type}</p><h2>{u.title}</h2><p>{u.summary}</p><Link className="text-link" href={`/news-and-events/${u.slug}`}>Read entry</Link></div></article>)}</div></section></SiteShell>}


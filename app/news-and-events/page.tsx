import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "../components/SiteShell";
import { Breadcrumbs, Intro, PageHero } from "../components/Common";
import { demoUpdates, images } from "../data";

export const metadata: Metadata = { title: "News & Events | ANANTARA WORLD", description: "Read approved news, events and press releases from ANANTARA WORLD and Mahadev Developers.", alternates: { canonical: "/news-and-events" } };
export default function NewsPage(){return <SiteShell overlay><PageHero eyebrow="News & events" title="Notes from the world in progress." copy="Project news, events and press releases — clearly labelled while final content is prepared." image="lounge" /><Breadcrumbs items={[{label:"Home",href:"/"},{label:"News & events"}]} /><section className="section-pad"><Intro number="01" eyebrow="Latest stories" title="Updates with context." copy="All entries currently shown are demonstration content and not public project announcements." /><div className="listing-grid">{demoUpdates.map((u)=><article key={u.slug}><img src={images[u.image].src} alt={images[u.image].alt} loading="lazy" /><p className="eyebrow">{u.type} · Demo</p><h2>{u.title}</h2><p>{u.summary}</p><Link className="text-link" href={`/news-and-events/${u.slug}`}>Read sample story</Link></article>)}</div></section></SiteShell>}


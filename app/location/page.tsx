import type { Metadata } from "next";
import { SiteShell } from "../components/SiteShell";
import { Breadcrumbs, CTA, Intro, PageHero } from "../components/Common";
import { contact } from "../data";

export const metadata: Metadata = { title: "Location | ANANTARA WORLD Kanpur", description: "Explore ANANTARA WORLD at Ambedkar Puram Yojna, Awas Vikas, Kanpur, with access from the Panki–Kalyanpur Road area.", alternates: { canonical: "/location" } };

const categories = [["Road connections","Panki–Kalyanpur Road area access. Additional verified routes awaiting confirmation."],["Education","Verified schools and travel distances will be published after review."],["Healthcare","Verified hospitals and travel distances will be published after review."],["Metro & transport","Verified metro, railway and public transport details awaiting confirmation."],["Shopping","Verified retail destinations and travel distances will be added after review."],["Lifestyle & business","Verified leisure and business destinations will be added after review."]];

export default function LocationPage() {
  return <SiteShell overlay><PageHero eyebrow="Ambedkar Puram Yojna · Kanpur" title="Connected to the city. Composed as a world apart." copy="A residential location in Awas Vikas, approached from the Panki–Kalyanpur Road area." image="kanpur" /><Breadcrumbs items={[{label:"Home",href:"/"},{label:"Location"}]} />
    <section className="location-intro section-pad"><Intro number="01" eyebrow="The location" title="A Kanpur address with a quieter sense of arrival." copy={`ANANTARA WORLD is located at ${contact.site}. All destination distances will be published only after verification.`} /><div className="location-address"><p className="eyebrow">Project location</p><h3>{contact.site}</h3><p>Access from the Panki–Kalyanpur Road area.</p><a className="text-link" href="https://www.openstreetmap.org/search?query=Ambedkar%20Puram%20Yojna%20Kanpur" target="_blank" rel="noreferrer">Open in maps</a></div></section>
    <section className="map-section" aria-label="Interactive location map"><iframe title="Map showing Ambedkar Puram Yojna, Kanpur" src="https://www.openstreetmap.org/export/embed.html?bbox=80.20%2C26.42%2C80.34%2C26.56&layer=mapnik" loading="lazy" /></section>
    <section className="connections section-pad"><Intro number="02" eyebrow="Around ANANTARA" title="Verified connectivity, presented with care." copy="The categories below are ready for final names and distances. No unverified travel claims are displayed." /><div className="connection-grid">{categories.map(([title,copy],index)=><article key={title}><span>{String(index+1).padStart(2,"0")}</span><h3>{title}</h3><p>{copy}</p><small>Awaiting verification</small></article>)}</div></section><CTA title="Experience the location in person." />
  </SiteShell>;
}


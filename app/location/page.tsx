import type { Metadata } from "next";
import { SiteShell } from "../components/SiteShell";
import { Breadcrumbs, CTA, Intro, PageHero } from "../components/Common";
import { LocationMap } from "../components/LocationMap";
import { contact } from "../data";
import { projectLocation } from "../location-data";

export const metadata: Metadata = { title: "Location | ANANTARA WORLD Kanpur", description: "Explore Anantara World in Kanpur and nearby schools, hospitals, shopping, metro and railway connections on an interactive map.", alternates: { canonical: "/location" } };

export default function LocationPage() {
  return <SiteShell overlay><PageHero eyebrow="Ambedkar Puram Yojna · Kanpur" title="Connected to the city. Composed as a world apart." copy="A residential location in Awas Vikas, approached from the Panki–Kalyanpur Road area." image="locationPool" /><Breadcrumbs items={[{label:"Home",href:"/"},{label:"Location"}]} />
    <section className="location-intro section-pad"><Intro number="01" eyebrow="The location" title="A Kanpur address with a quieter sense of arrival." copy={"ANANTARA WORLD is located at " + contact.site + ". Explore the nearby destinations featured in our brochure, from everyday shopping to education and healthcare."} /><div className="location-address"><p className="eyebrow">Project location</p><h3>{contact.site}</h3><p>Access from the Panki–Kalyanpur Road area.</p><a className="text-link location-address__link" href={projectLocation.mapsUrl} target="_blank" rel="noreferrer"><span>Open in Google Maps</span><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false"><path d="M7 17 17 7M7 7h10v10" /></svg></a></div></section>
    <LocationMap /><CTA title="Experience the location in person." />
  </SiteShell>;
}


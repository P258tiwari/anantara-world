import type { Metadata } from "next";
import { SiteShell } from "../components/SiteShell";
import { Breadcrumbs, CTA, Intro, PageHero } from "../components/Common";
import { EditorialImage } from "../components/Image";
import { amenityGroups } from "../data";

export const metadata: Metadata = { title: "Amenities & Lifestyle | ANANTARA WORLD", description: "Explore family, wellness, sport, community and outdoor amenities envisioned for ANANTARA WORLD in Kanpur.", alternates: { canonical: "/amenities" } };

export default function AmenitiesPage() {
  return <SiteShell overlay><PageHero eyebrow="Life at Anantara World" title="Not a checklist. A richer daily rhythm." copy="Amenities imagined as meaningful parts of everyday family life." image="pool" /><Breadcrumbs items={[{label:"Home",href:"/"},{label:"Amenities"}]} /><section className="section-pad"><Intro number="01" eyebrow="The approach" title="Places that add something to your day." copy="Each amenity category begins with a human benefit — better movement, deeper rest, easier connection or more time together. Final provisions remain subject to approval." /></section>
    <div className="amenity-stories">{amenityGroups.map((group,index)=><section className={`amenity-story ${index%2 ? "amenity-story--reverse" : ""}`} key={group.title}><EditorialImage image={group.image} /><div><span className="section-number">{String(index+1).padStart(2,"0")}</span><p className="eyebrow">{group.benefit}</p><h2>{group.title}</h2><p>{group.copy}</p><ul>{group.items.map(item=><li key={item}>{item}</li>)}</ul></div></section>)}</div><CTA />
  </SiteShell>;
}


import { planningDisclosure } from "../floor-plan-data";
import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "../components/SiteShell";
import { Breadcrumbs, CTA, Intro, PageHero, SplitStory } from "../components/Common";
import { FloorPlanViewer } from "../components/FloorPlanViewer";
import { GalleryGrid } from "../components/Gallery";

export const metadata: Metadata = { title: "3 & 4 Bedroom Residences | ANANTARA WORLD", description: "Explore premium 3-bedroom and 4-bedroom residences planned around light, privacy and family living in Kanpur.", alternates: { canonical: "/residences" } };
export default function ResidencesPage() {
  return <SiteShell overlay><PageHero eyebrow="The residences" title="Homes shaped around light, privacy and ease." copy="Premium 3-bedroom and 4-bedroom residences designed to make everyday family life feel more composed." image="living" /><Breadcrumbs items={[{label:"Home",href:"/"},{label:"Residences"}]} />
    <section className="section-pad"><Intro number="01" eyebrow="The experience" title="Generous in feeling. Considered in use." copy="Each residence type is intended to balance social spaces, private rooms, useful storage, natural light and balconies that extend the experience of home." /></section>
    <SplitStory image="facade" eyebrow="Tower A residences" title="A refined setting for connected family life." copy="A versatile home concept planned for shared routines and individual retreat. Final areas, layouts and specifications remain subject to approved sales and statutory documents."><Link className="text-link" href="/contact#enquire">Register interest</Link></SplitStory>
    <SplitStory image="balcony" eyebrow="Tower B & C residences" title="More room for the many dimensions of home." copy="Considered residence concepts imagined for extended family life, hospitality and greater flexibility. Final areas, layouts and specifications remain subject to approval." reverse><Link className="text-link" href="/contact#enquire">Request a presentation</Link></SplitStory>
    <section className="section-pad section-soft residence-interiors" id="residence-interiors"><Intro number="02" eyebrow="The residence interiors" title="A calm material world." copy="Living spaces, kitchens and private retreats are envisioned as warm, light-filled and quietly detailed. Final materials and specifications remain subject to approval." /><GalleryGrid residence /></section>
    <section className="section-pad" id="floor-plans"><Intro number="03" eyebrow="Floor plans" title="Ground, even and odd plans for every tower." copy="Explore the supplied detailed layouts for Towers A, B and C. Compare carpet and built-up areas for each flat on the typical even and odd floors, or explore the ground floor layouts." /><FloorPlanViewer /><p className="fine-print">{planningDisclosure}</p></section><CTA title="Find the residence that feels right for you." />
  </SiteShell>;
}

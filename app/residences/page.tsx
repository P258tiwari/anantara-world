import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "../components/SiteShell";
import { Breadcrumbs, CTA, Intro, PageHero, Placeholder, SplitStory } from "../components/Common";

export const metadata: Metadata = { title: "3 & 4 Bedroom Residences | ANANTARA WORLD", description: "Explore premium 3-bedroom and 4-bedroom residences planned around light, privacy and family living in Kanpur.", alternates: { canonical: "/residences" } };

export default function ResidencesPage() {
  return <SiteShell overlay><PageHero eyebrow="The residences" title="Homes shaped around light, privacy and ease." copy="Premium 3-bedroom and 4-bedroom residences designed to make everyday family life feel more composed." image="living" /><Breadcrumbs items={[{label:"Home",href:"/"},{label:"Residences"}]} />
    <section className="section-pad"><Intro number="01" eyebrow="The experience" title="Generous in feeling. Considered in use." copy="Each residence type is intended to balance social spaces, private rooms, useful storage, natural light and balconies that extend the experience of home." /></section>
    <SplitStory image="living" eyebrow="3-bedroom residences" title="A refined setting for connected family life." copy="A versatile home concept planned for shared routines and individual retreat. Approved areas, layouts and specifications will be added after formal release."><Link className="text-link" href="/contact#enquire">Register interest</Link></SplitStory>
    <SplitStory image="bedroom" eyebrow="4-bedroom residences" title="More room for the many dimensions of home." copy="A larger residence concept imagined for extended family life, hospitality and greater flexibility. Approved areas, layouts and specifications will be added after formal release." reverse><Link className="text-link" href="/contact#enquire">Request a presentation</Link></SplitStory>
    <section className="section-pad section-soft"><Intro number="02" eyebrow="Interior experience" title="A calm material world." copy="Reference interiors express the intended atmosphere: warm, light-filled, contemporary and quietly detailed. Final materials and specifications remain subject to approval." /><div className="interior-grid">{[["kitchen","Kitchen","An organised setting for everyday preparation and gathering."],["bathroom","Bathrooms","Private spaces shaped around clarity, comfort and ease."],["balcony","Balconies","An outward extension for light, air and pause."]].map(([image,title,copy])=><SplitStory key={title} image={image as "kitchen"} eyebrow="Reference interior" title={title} copy={copy} />)}</div></section>
    <section className="section-pad"><Intro number="03" eyebrow="Floor plans" title="Designed for approved details to follow." copy="The floor-plan viewer will support high-resolution zoom, annotations and approved area schedules when final plans are supplied." /><div className="placeholder-grid"><Placeholder title="3-bedroom floor plan" copy="High-resolution approved plan and area schedule to be inserted." /><Placeholder title="4-bedroom floor plan" copy="High-resolution approved plan and area schedule to be inserted." /></div></section><CTA title="Find the residence that feels right for you." />
  </SiteShell>;
}


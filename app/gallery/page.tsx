import type { Metadata } from "next";
import { SiteShell } from "../components/SiteShell";
import { Breadcrumbs, CTA, Intro, PageHero } from "../components/Common";
import { GalleryGrid } from "../components/Gallery";

export const metadata: Metadata = { title: "Gallery | ANANTARA WORLD", description: "Explore reference imagery for the architecture, landscape, amenities, residences and family lifestyle envisioned at ANANTARA WORLD.", alternates: { canonical: "/gallery" } };
export default function GalleryPage(){return <SiteShell overlay><PageHero eyebrow="Gallery" title="A visual language for the world ahead." copy="Temporary references express the intended atmosphere while official project imagery is prepared." image="lobby" /><Breadcrumbs items={[{label:"Home",href:"/"},{label:"Gallery"}]} /><section className="section-pad gallery-page"><Intro number="01" eyebrow="Reference gallery" title="Architecture, landscape and life." copy="Every image is clearly identified as an artistic impression or reference and must not be interpreted as the actual project." /><GalleryGrid /></section><CTA /></SiteShell>}


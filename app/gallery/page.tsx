import type { Metadata } from "next";
import { SiteShell } from "../components/SiteShell";
import { Breadcrumbs, CTA, Intro, PageHero } from "../components/Common";
import { GalleryGrid } from "../components/Gallery";

export const metadata: Metadata = { title: "Gallery | ANANTARA WORLD", description: "Explore ANANTARA WORLD project renders, architecture, landscape, amenities, interiors and floor plans.", alternates: { canonical: "/gallery" } };
export default function GalleryPage(){return <SiteShell overlay><PageHero eyebrow="Gallery" title="A visual language for the world ahead." copy="Explore the architecture, landscape, amenities and interior spaces envisioned for ANANTARA WORLD." image="lobby" /><Breadcrumbs items={[{label:"Home",href:"/"},{label:"Gallery"}]} /><section className="section-pad gallery-page"><Intro number="01" eyebrow="Project gallery" title="Architecture, landscape and life." copy="Project renders are artistic impressions and remain subject to approvals, design development and final execution." /><GalleryGrid /></section><CTA /></SiteShell>}

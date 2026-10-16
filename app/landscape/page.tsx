import type { Metadata } from "next";
import { SiteShell } from "../components/SiteShell";
import { Breadcrumbs, CTA, Intro, PageHero, SplitStory } from "../components/Common";
import { EditorialImage } from "../components/Image";

export const metadata: Metadata = { title: "Landscape | ANANTARA WORLD Kanpur", description: "Discover the pedestrian-oriented landscape vision, green spaces and multi-generational outdoor life at ANANTARA WORLD.", alternates: { canonical: "/landscape" } };

export default function LandscapePage() {
  return <SiteShell overlay><PageHero eyebrow="The landscape" title="A landscape designed to be lived in." copy="Green space considered as a setting for movement, restoration, play and belonging." image="gardens" /><Breadcrumbs items={[{label:"Home",href:"/"},{label:"Landscape"}]} /><section className="section-pad"><Intro number="01" eyebrow="Landscape philosophy" title="Not an edge around architecture, but the life between it." copy="The landscape is planned to help create a calmer ground-level experience, supporting morning walks, children’s outdoor time, senior-friendly movement and spontaneous social moments." /><div className="facts-grid"><div className="fact"><strong>78%</strong><span>green and open area*</span></div><div className="fact"><strong>Pedestrian-oriented</strong><span>shared landscape planning</span></div><div className="fact"><strong>Every generation</strong><span>considered in movement and rest</span></div></div><p className="fine-print">*Brochure planning figure, subject to final statutory and consultant confirmation.</p></section>
    <SplitStory image="gardens" eyebrow="A composed garden language" title="Form, shade and seasonal character." copy="A topiary-inspired planting concept can bring structure and identity to key spaces, balanced by softer planting, shade and outdoor seating. Final species and design are subject to landscape approval." reverse />
    <section className="landscape-sequence section-pad">{[["01","Walking spaces","Connected paths for everyday movement."],["02","Outdoor seating","Places to pause alone or in company."],["03","Children’s areas","Outdoor settings for exploration and play."],["04","Senior-friendly movement","Clear routes, resting points and comfortable access."],["05","Community landscape","Lawns and gathering spaces that invite shared time."],["06","Sustainability","Thoughtful water, shade and planting strategies, subject to final design."]].map(([n,t,c])=><div key={t}><span>{n}</span><h3>{t}</h3><p>{c}</p></div>)}</section><section className="landscape-gallery"><EditorialImage image="gardens" /><EditorialImage image="children" /><EditorialImage image="sustainability" /></section><CTA />
  </SiteShell>;
}


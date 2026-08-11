import type { Metadata } from "next";
import { SiteShell } from "../components/SiteShell";
import { Breadcrumbs, CTA, Intro, PageHero, Placeholder, SplitStory } from "../components/Common";
import { Reveal } from "../components/Reveal";
import { projectFacts } from "../data";

export const metadata: Metadata = { title: "The Project | ANANTARA WORLD Kanpur", description: "Explore the vision, architecture, landscape and planning philosophy of ANANTARA WORLD by Mahadev Developers.", alternates: { canonical: "/anantara-world" } };

export default function ProjectPage() {
  return <SiteShell overlay><PageHero eyebrow="ANANTARA WORLD" title="A horizon without end." copy="A premium residential community created around meaningful beginnings, everyday wellbeing and timeless value." image="heroNight" /><Breadcrumbs items={[{label:"Home",href:"/"},{label:"The project"}]} />
    <section className="section-pad"><Intro number="01" eyebrow="The meaning" title="ANANTARA means without end." copy="It is an idea of continuity — of families growing, relationships deepening and each day opening into a new beginning. ANANTARA WORLD translates that thought into a residential setting designed to support life over time." /><div className="facts-grid">{projectFacts.map(([v,l])=><Reveal className="fact" key={l}><strong>{v}</strong><span>{l}</span></Reveal>)}</div><p className="fine-print">*Subject to final approvals. Information is indicative and may be updated.</p></section>
    <SplitStory image="facade" eyebrow="Architecture" title="Contemporary in expression. Human in purpose." copy="The architectural intent balances composed tower forms with natural light, privacy, balconies and a close visual relationship to the landscape." reverse />
    <section className="planning section-pad"><Intro number="02" eyebrow="Planning philosophy" title="A clearer ground plane. A calmer experience." copy="A basement-led parking concept is intended to reduce surface-level vehicular disturbance and allow more of the shared realm to focus on landscape and pedestrian movement." /><div className="placeholder-grid"><Placeholder title="Master plan" copy="Approved master-plan artwork, legend and orientation will appear here." /><Placeholder title="Site map" copy="Approved access, tower and amenity labels will appear here." /></div></section>
    <SplitStory image="gardens" eyebrow="Landscape" title="Green space with a role in everyday life." copy="Planned landscaped areas connect movement, play, rest and community. The current planned green-area figure of 27.21% remains subject to final approval." />
    <section className="section-pad section-plum"><Intro number="03" eyebrow="One complete world" title="Architecture. Landscape. Family life." copy="The project is conceived as a connected experience, from arrival and residence planning to wellness, sport, community space, security and long-term organisation." align="center" /><div className="project-pillars">{["Light & privacy","Pedestrian-oriented landscape","Multi-generational amenities","Basement-led parking","Fire & life safety planning","Water & power infrastructure","Planned solar integration","Future-ready mobility"].map((x,i)=><div key={x}><span>{String(i+1).padStart(2,"0")}</span>{x}</div>)}</div></section><CTA title="See ANANTARA WORLD in greater detail." />
  </SiteShell>;
}


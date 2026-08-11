import type { Metadata } from "next";
import { SiteShell } from "../components/SiteShell";
import { Breadcrumbs, CTA, Intro, PageHero, Placeholder, SplitStory } from "../components/Common";
import { Reveal } from "../components/Reveal";
import { contact } from "../data";

export const metadata: Metadata = { title: "About Mahadev Developers | ANANTARA WORLD", description: "Meet Mahadev Developers and the vision, values and responsibilities behind ANANTARA WORLD in Kanpur.", alternates: { canonical: "/about-us" } };

export default function AboutPage() {
  return <SiteShell overlay><PageHero eyebrow="Mahadev Developers" title="Built on thought. Guided by responsibility." copy="The developer behind ANANTARA WORLD, with a vision for considered residential communities in Kanpur." image="arrival" /><Breadcrumbs items={[{label:"Home",href:"/"},{label:"About us"}]} />
    <section className="section-pad"><Intro number="01" eyebrow="About us" title="Creating places that hold long-term meaning." copy="Mahadev Developers approaches ANANTARA WORLD with a clear purpose: to shape an enduring address where planning, design and everyday wellbeing are given equal importance." /><div className="value-grid">{[["Clarity", "Communicate carefully, without overstatement."],["Consideration", "Plan for real family routines and multiple generations."],["Quality", "Pursue thoughtful execution in visible and invisible details."],["Responsibility", "Respect approvals, commitments and the wider community."]].map(([title,copy],i)=><Reveal key={title} className="value-item"><span>0{i+1}</span><h3>{title}</h3><p>{copy}</p></Reveal>)}</div></section>
    <SplitStory image="facade" eyebrow="Our vision" title="A more considered way to build for families." copy="The company’s vision is to create residential environments in which architecture, landscape, infrastructure and responsible organisation work as one coherent experience." reverse />
    <section className="section-pad section-soft"><Intro number="02" eyebrow="Leadership" title="Leadership information will be published after approval." copy="We will not invent biographies or credentials. Approved founder and leadership profiles can be added to this flexible editorial module without redesign." /><div className="placeholder-grid"><Placeholder title="Founder profile" copy="Name, role, portrait and approved biography to be provided." /><Placeholder title="Leadership profile" copy="Name, role, portrait and approved biography to be provided." /></div></section>
    <section className="legal-identity section-pad"><div><p className="eyebrow">Legal identity</p><h2>Transparent by design.</h2><p>Registered company and project identity, statutory numbers and approved disclosures will be published once reviewed by the legal team.</p></div><dl><div><dt>Developer</dt><dd>Mahadev Developers</dd></div><div><dt>Registered address</dt><dd>{contact.address}</dd></div><div><dt>Email</dt><dd>{contact.email}</dd></div><div><dt>RERA & compliance</dt><dd><a href="/legal-rera">Awaiting legal approval — view disclosures</a></dd></div></dl></section><CTA />
  </SiteShell>;
}


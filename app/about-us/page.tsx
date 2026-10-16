import { ProjectTeam } from "../components/ProjectTeam";
import { rera } from "../rera-data";
import type { Metadata } from "next";
import { SiteShell } from "../components/SiteShell";
import { Breadcrumbs, CTA, Intro, PageHero, SplitStory } from "../components/Common";
import { Reveal } from "../components/Reveal";
import { contact } from "../data";

export const metadata: Metadata = { title: "About Mahadev Developers | ANANTARA WORLD", description: "Meet Mahadev Developers and the vision, values and responsibilities behind ANANTARA WORLD in Kanpur.", alternates: { canonical: "/about-us" } };

export default function AboutPage() {
  return <SiteShell overlay><PageHero eyebrow="Mahadev Developers" title="Built on thought. Guided by responsibility." copy="The developer behind ANANTARA WORLD, with a vision for considered residential communities in Kanpur." image="arrival" /><Breadcrumbs items={[{label:"Home",href:"/"},{label:"About us"}]} />
    <section className="section-pad"><Intro number="01" eyebrow="About us" title="Creating places that hold long-term meaning." copy="Mahadev Developers approaches ANANTARA WORLD with a clear purpose: to shape an enduring address where planning, design and everyday wellbeing are given equal importance." /><div className="value-grid">{[["Clarity", "Communicate carefully, without overstatement."],["Consideration", "Plan for real family routines and multiple generations."],["Quality", "Pursue thoughtful execution in visible and invisible details."],["Responsibility", "Respect approvals, commitments and the wider community."]].map(([title,copy],i)=><Reveal key={title} className="value-item"><span>0{i+1}</span><h3>{title}</h3><p>{copy}</p></Reveal>)}</div></section>
    <SplitStory image="facade" eyebrow="Our vision" title="A more considered way to build for families." copy="The company’s vision is to create residential environments in which architecture, landscape, infrastructure and responsible organisation work as one coherent experience." reverse />
    <ProjectTeam number="02" />
    <section className="section-pad about-rera" id="rera">
      <Intro number="03" eyebrow="RERA & compliance" title="Transparent by design." copy="Explore the project registration and scan the QR code to view the complete official record on UP RERA." />
      <div className="about-rera-panel">
        <div className="about-rera-details">
          <p className="eyebrow">UP RERA registration number</p>
          <h3 className="about-rera-number">{rera.registrationNumber}</h3>
          <dl className="about-rera-facts">
            <div><dt>Registered project</dt><dd>{rera.projectName}</dd></div>
            <div><dt>Promoter</dt><dd>{rera.promoter}</dd></div>
            <div><dt>Registration date</dt><dd>{rera.registrationDate}</dd></div>
            <div><dt>Declared completion</dt><dd>{rera.declaredCompletion}</dd></div>
            <div><dt>Project type</dt><dd>{rera.projectType}</dd></div>
            <div><dt>Promoter entity</dt><dd>{rera.applicantType}</dd></div>
            <div><dt>Proposed start date</dt><dd>{rera.proposedStart}</dd></div>
            <div><dt>Project address</dt><dd>{rera.projectAddress}</dd></div>
          </dl>
          <a className="text-link" href="/legal-rera">View registration disclosures</a>
        </div>
        <div className="about-rera-qr">
          <p className="eyebrow">Official project record</p>
          <a href={rera.officialUrl} target="_blank" rel="noreferrer" aria-label="Open Anantara World's official UP RERA record">
            <img src="/brand/anantara-rera-qr.png" width={198} height={198} alt="Scan to view Anantara World's registration on UP RERA" loading="lazy" />
          </a>
          <h3>Scan for RERA details</h3>
          <p>Scan the code with your phone, or tap it to open the official project record.</p>
          <a className="text-link" href={rera.officialUrl} target="_blank" rel="noreferrer">www.up-rera.in</a>
        </div>
      </div>
      <div className="about-collection">
        <div><p className="eyebrow">Project collection account</p><h3>{rera.collectionAccountName}</h3></div>
        <dl><div><dt>Account number</dt><dd>{rera.collectionAccountNumber}</dd></div><div><dt>IFSC</dt><dd>{rera.collectionAccountIfsc}</dd></div></dl>
      </div>
      <p className="fine-print">Registration details are from the official UP RERA record. Collection account details are reproduced from the project brochure. Refer to the official record for the latest filings.</p>
    </section>
    <section className="legal-identity section-pad"><div><p className="eyebrow">Contact Mahadev Developers</p><h2>Begin a conversation.</h2></div><dl><div><dt>Office address</dt><dd>{contact.address}</dd></div><div><dt>Email</dt><dd><a href={`mailto:${contact.email}`}>{contact.email}</a></dd></div></dl></section><CTA />
  </SiteShell>;
}


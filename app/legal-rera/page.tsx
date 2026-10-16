import { Icon } from "../components/Icon";
import type { Metadata } from "next";
import { SiteShell } from "../components/SiteShell";
import { Breadcrumbs, Intro, PageHero } from "../components/Common";
import { rera } from "../rera-data";

export const metadata: Metadata = { title: "Legal & RERA | ANANTARA WORLD", description: "Anantara World by Mahadev Developers. UP RERA registration UPRERAPRJ440086/10/2026. View registration details and the official project record.", alternates: { canonical: "/legal-rera" } };

const registrationItems = [
  ["Registered project name", rera.projectName],
  ["Promoter", rera.promoter],
  ["UP RERA registration number", rera.registrationNumber],
  ["Registration date", rera.registrationDate],
  ["Declared date of completion", rera.declaredCompletion],
  ["Project address", rera.projectAddress],
];

export default function LegalPage() {
  return <SiteShell overlay>
    <PageHero eyebrow="Legal & RERA" title="Clarity before claims." copy="Project registration details and statutory information for Anantara World." image="facade" />
    <Breadcrumbs items={[{label:"Home",href:"/"},{label:"Legal & RERA"}]} />
    <section className="section-pad">
      <Intro number="01" eyebrow="UP RERA registration" title="Registered. Open to review." copy="Anantara World is registered with the Uttar Pradesh Real Estate Regulatory Authority under Mahadev Developers." />
      <div className="rera-summary">
        <div><p className="eyebrow">Project registration number</p><h2>{rera.registrationNumber}</h2><p>Registered on {rera.registrationDate}</p></div>
        <a className="button button--light" href={rera.officialUrl} target="_blank" rel="noreferrer">View official UP RERA record <Icon name="external" /></a>
      </div>
      <div className="legal-list">{registrationItems.map(([label,value])=><div key={label}><h3>{label}</h3><span>{value}</span></div>)}</div>
      <p className="fine-print">Details checked against the official UP RERA project summary on 16 October 2026. The completion date above is the date declared in that record. Refer to the official portal for current filings and updates.</p>
    </section>
    <section className="section-pad section-soft">
      <Intro number="02" eyebrow="Registration documents" title="View the official documents." copy="Open the project record on UP RERA and select “View Registration Certificate” to view the authority-issued certificate." />
      <div className="button-row"><a className="button" href={rera.officialUrl} target="_blank" rel="noreferrer">Registration certificate on UP RERA <Icon name="external" /></a><a className="text-link" href="https://www.up-rera.in/" target="_blank" rel="noreferrer">UP RERA website</a></div>
    </section>
    <section className="legal-copy section-pad">
      <h2>Project disclaimer</h2><p>Information, plans, specifications and amenities on this website should be read alongside the applicable statutory approvals, official project filings and final agreements.</p>
      <h2>Area disclaimer</h2><p>Refer to the registered project documents and the applicable agreement for apartment areas, area definitions and schedules.</p>
      <h2>Image disclaimer</h2><p>Project visuals are artistic impressions of the proposed design. They should not be understood as a representation, warranty or offer.</p>
      <h2>Terms of use</h2><p>This public website is for general information and enquiry. It does not constitute an offer, contract, promise of return or commitment to a specific delivery schedule.</p>
    </section>
  </SiteShell>;
}

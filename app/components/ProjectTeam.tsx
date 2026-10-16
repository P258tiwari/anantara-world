import { Intro } from "./Common";

const consultants = [
  ["Principal architect", "Ar. Rajiv Bajpai", "Pragti Architects Consultants Pvt. Ltd.", "pragti.png"],
  ["MEP consultant", "Techdesign & Development Pvt. Ltd.", "", "techdesign.png"],
  ["Structural consultant", "YG Consulting & Engineers", "", "yg.png"],
  ["Structural vetting institute", "IIT Kanpur", "", "iit-kanpur.png"],
  ["Landscape consultant", "Enviroscape", "", "enviroscape.png"],
  ["Interior designer", "Spaces by Neha Chawla", "", "spaces.png"],
  ["Civil contractor", "Sivanssh Infrastructure Development Pvt. Ltd.", "SIDPL", "sidpl.svg"],
] as const;

export function ProjectTeam({ number = "04" }: { number?: string }) {
  return <section className="section-pad section-soft project-team" id="project-team">
    <Intro number={number} eyebrow="The project team" title="Expertise behind every detail." copy="The architects, consultants and construction team listed in the Anantara World brochure." />
    <div className="consultant-list">{consultants.map(([role, name, detail, logo]) => <article className="consultant-row" key={role}>
      <div className="consultant-logo"><img src={`/brand/consultants/${logo}`} alt={`${detail || name} logo`} loading="lazy" decoding="async" /></div>
      <p className="consultant-role">{role}</p>
      <div className="consultant-name"><h3>{name}</h3>{detail && <p>{detail}</p>}</div>
    </article>)}</div>
  </section>;
}

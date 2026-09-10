import type { Metadata } from "next";
import Link from "next/link";
import { SiteShell } from "./components/SiteShell";
import { EditorialImage } from "./components/Image";
import { Intro, SplitStory } from "./components/Common";
import { Reveal } from "./components/Reveal";
import { GalleryGrid } from "./components/Gallery";
import { amenityGroups, demoUpdates, images, imageSrcSet, projectFacts } from "./data";

export const metadata: Metadata = {
  title: "ANANTARA WORLD | Premium 3 & 4 Bedroom Residences in Kanpur",
  description: "Discover ANANTARA WORLD by Mahadev Developers — a considered residential community shaped around architecture, landscape and family life in Kanpur.",
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <SiteShell overlay>
      <section className="home-hero">
        <img src={images.heroOverview.src} srcSet={imageSrcSet(images.heroOverview.src)} sizes="100vw" alt={images.heroOverview.alt} fetchPriority="high" />
        <div className="home-hero__veil" />
        <div className="home-hero__brand"><span>ANANTARA WORLD</span><span>by Mahadev Developers</span></div>
        <div className="home-hero__content">
          <p className="eyebrow">Ambedkar Puram Yojna · Kanpur</p>
          <h1>Premium living.<br /><em>Timeless value.</em></h1>
          <p>A considered world of architecture, landscape and family life in Kanpur.</p>
          <div className="button-row"><Link className="button button--light" href="/anantara-world">Explore ANANTARA WORLD</Link><Link className="button button--ghost-light" href="/contact#visit">Schedule a private presentation</Link></div>
        </div>
        <a className="scroll-cue" href="#story"><span />Discover</a>
        <p className="image-disclaimer">Project render</p>
      </section>

      <section id="story" className="brand-story section-pad">
        <div className="brand-story__side"><p className="eyebrow">The thought behind ANANTARA</p><span className="vertical-rule" /></div>
        <Reveal className="brand-story__main"><h2>An endless horizon of new and exciting beginnings.</h2><div className="two-col-copy"><p>A home should do more than shelter a family. It should deepen comfort, nurture wellbeing, strengthen relationships and create the confidence to look forward.</p><p>ANANTARA WORLD is imagined as a thoughtful residential community where architecture, landscape, security and organisation come together to support every generation.</p></div></Reveal>
      </section>

      <section className="facts-section section-pad">
        <Intro number="01" eyebrow="The project" title="A world considered in every dimension." copy="An elegant residential setting planned around lasting comfort, generous green space and a calmer way of moving through everyday life." />
        <div className="facts-grid">{projectFacts.map(([value, label]) => <Reveal className="fact" key={label}><strong>{value}</strong><span>{label}</span></Reveal>)}</div>
        <p className="fine-print">*Planned landscaped green area is subject to final approval. All project information is indicative and subject to statutory approvals.</p>
      </section>

      <SplitStory image="facade" eyebrow="Architecture" title="Architecture that makes room for life." copy="Contemporary forms are envisioned around the realities of family living: natural light, a sense of privacy, useful balconies and a meaningful relationship with the landscape." reverse>
        <Link className="text-link" href="/anantara-world">Discover the project</Link>
      </SplitStory>

      <section className="generations section-pad">
        <Intro number="02" eyebrow="Family living" title="Designed for every generation under one sky." copy="A community becomes richer when every age finds its own sense of belonging." />
        <div className="generation-grid">
          {[
            ["children", "Children", "Room to play, explore and grow with confidence."],
            ["family", "Parents", "Everyday convenience shaped around family routines."],
            ["seniors", "Senior citizens", "Calm movement, comfortable seating and social connection."],
          ].map(([image, title, copy], index) => <Reveal className={`generation-card generation-card--${index + 1}`} key={title}><EditorialImage image={image as "children"} /><span className="section-number">0{index + 1}</span><h3>{title}</h3><p>{copy}</p></Reveal>)}
        </div>
        <div className="quiet-values">{[["Wellness", "Daily opportunities to move, rest and restore."], ["Community", "Spaces that make meeting feel natural."], ["Security & organisation", "A thoughtful layer of support behind daily life."]].map(([title, copy]) => <div key={title}><h3>{title}</h3><p>{copy}</p></div>)}</div>
      </section>

      <SplitStory image="gardens" eyebrow="Landscape" title="A landscape designed to be lived in." copy="From morning walks and children’s outdoor time to senior-friendly movement and unhurried conversation, the landscape is planned as a living part of the community." >
        <Link className="text-link" href="/landscape">Walk through the landscape</Link>
      </SplitStory>

      <section className="amenities-preview section-pad">
        <Intro number="03" eyebrow="The daily rhythm" title="Not a checklist. A richer daily rhythm." copy="Amenities are grouped around the way families actually live — wellness, movement, connection, celebration and ease." />
        <div className="amenity-strips">{amenityGroups.map((group, index) => <Reveal className="amenity-strip" key={group.title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{group.title}</h3><p>{group.benefit}</p></Reveal>)}</div>
        <Link className="button" href="/amenities">Explore the amenities</Link>
      </section>

      <section className="residence-preview">
        <EditorialImage image="balcony" />
        <div className="residence-preview__content"><p className="eyebrow">The residences</p><h2>Generous homes.<br />Thoughtfully planned.</h2><p>Premium 3-bedroom and 4-bedroom residences, with interior experiences imagined for gracious living and adaptable family routines.</p><div className="residence-types"><span>3-bedroom residences</span><span>4-bedroom residences</span></div><Link className="button button--light" href="/residences">Explore residences</Link></div>
      </section>

      <section className="infrastructure section-pad">
        <Intro number="04" eyebrow="Infrastructure" title="Beauty, backed by performance." copy="The experience above ground is supported by a considered layer of planning below and behind it." />
        <div className="infrastructure-list">{["Basement-led parking", "Reduced surface disturbance", "Fire & life safety planning", "Water management", "Power infrastructure", "Security planning", "Planned solar integration", "Future-ready mobility"].map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, "0")}</span>{item}</div>)}</div>
        <p className="fine-print">Technical provisions are indicative and will be updated after final approvals.</p>
      </section>

      <section className="location-preview">
        <EditorialImage image="kanpur" />
        <div className="location-preview__card"><p className="eyebrow">Ambedkar Puram Yojna · Kanpur</p><h2>Connected to the city. Composed as a world apart.</h2><p>Located in Awas Vikas, with access from the Panki–Kalyanpur Road area. Verified connectivity details will be published following final review.</p><Link className="text-link" href="/location">Explore the location</Link></div>
      </section>

      <section className="home-gallery section-pad"><Intro number="05" eyebrow="A visual introduction" title="A glimpse of the life envisioned." copy="Project renders present the architecture, landscape and amenities envisioned for ANANTARA WORLD." /><GalleryGrid limit={6} /><Link className="text-link" href="/gallery">View the complete gallery</Link></section>

      <section className="updates-preview section-pad"><Intro number="06" eyebrow="The latest" title="From ANANTARA WORLD." copy="Verified project news, construction notes and events will be published here." /><div className="updates-grid">{demoUpdates.map((item) => <article key={item.slug}><img src={images[item.image].src} srcSet={imageSrcSet(images[item.image].src)} sizes="(max-width: 768px) 100vw, 33vw" alt={images[item.image].alt} loading="lazy" decoding="async" /><p className="eyebrow">{item.type}</p><h3>{item.title}</h3><p>{item.summary}</p><Link className="text-link" href={`/news-and-events/${item.slug}`}>Read sample entry</Link></article>)}</div></section>
    </SiteShell>
  );
}

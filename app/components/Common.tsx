import Link from "next/link";
import { EditorialImage } from "./Image";
import { Reveal } from "./Reveal";
import type { ImageKey } from "../data";

export function PageHero({ eyebrow, title, copy, image = "facade", dark = true }: { eyebrow: string; title: string; copy: string; image?: ImageKey; dark?: boolean }) {
  return (
    <section className={`page-hero ${dark ? "page-hero--dark" : ""}`}>
      <EditorialImage image={image} priority caption="Project render" />
      <div className="page-hero__veil" />
      <div className="page-hero__content"><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{copy}</p></div>
    </section>
  );
}

export function Intro({ number, eyebrow, title, copy, align = "left" }: { number?: string; eyebrow?: string; title: string; copy: string; align?: "left" | "center" }) {
  return <Reveal className={`intro intro--${align}`}>{number && <span className="section-number">{number}</span>}{eyebrow && <p className="eyebrow">{eyebrow}</p>}<h2>{title}</h2><p>{copy}</p></Reveal>;
}

export function SplitStory({ image, eyebrow, title, copy, reverse = false, children }: { image: ImageKey; eyebrow: string; title: string; copy: string; reverse?: boolean; children?: React.ReactNode }) {
  return <section className={`split-story ${reverse ? "split-story--reverse" : ""}`}><Reveal className="split-story__image"><EditorialImage image={image} /></Reveal><Reveal className="split-story__copy"><p className="eyebrow">{eyebrow}</p><h2>{title}</h2><p>{copy}</p>{children}</Reveal></section>;
}

export function Placeholder({ title, label = "Awaiting final approval", copy }: { title: string; label?: string; copy: string }) {
  return <div className="placeholder"><p className="eyebrow">{label}</p><div className="placeholder__mark" aria-hidden="true">A</div><h3>{title}</h3><p>{copy}</p></div>;
}

export function Breadcrumbs({ items }: { items: { label: string; href?: string }[] }) {
  return <nav className="breadcrumbs" aria-label="Breadcrumb">{items.map((item, index) => <span key={item.label}>{index > 0 && <i aria-hidden="true">/</i>}{item.href ? <Link href={item.href}>{item.label}</Link> : <span aria-current="page">{item.label}</span>}</span>)}</nav>;
}

export function CTA({ title = "Begin a private conversation.", copy = "Our team would be pleased to share the ANANTARA WORLD vision with you." }: { title?: string; copy?: string }) {
  return <section className="inline-cta"><p className="eyebrow">Private presentation</p><h2>{title}</h2><p>{copy}</p><div className="button-row"><Link className="button button--light" href="/contact#visit">Schedule a visit</Link><Link className="text-link text-link--light" href="/contact#enquire">Contact the team</Link></div></section>;
}


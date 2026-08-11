import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "../../components/SiteShell";
import { Breadcrumbs, PageHero } from "../../components/Common";

const entries = [{ slug: "sample-coverage", title: "Sample media coverage", publication: "Publication awaiting approval" }];
export function generateStaticParams(){return entries.map(({slug})=>({slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const item=entries.find(x=>x.slug===slug);return {title:item?`${item.title} | ANANTARA WORLD`:"Media coverage | ANANTARA WORLD",robots:{index:false,follow:true}}}
export default async function MediaDetail({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const item=entries.find(x=>x.slug===slug);if(!item)notFound();return <SiteShell overlay><PageHero eyebrow="Media coverage · Demo" title={item.title} copy="A demonstration of the verified media proof format." image="facade" /><Breadcrumbs items={[{label:"Home",href:"/"},{label:"Media coverage",href:"/media-coverage"},{label:item.title}]} /><article className="story-body section-pad"><p className="eyebrow">{item.publication}</p><p className="story-lead">No real publication, claim or quotation is represented by this sample.</p><h2>Coverage details awaiting approval</h2><p>The approved page may include the original headline, publication date, a short permitted excerpt, a link to the source and accessible coverage proof.</p></article></SiteShell>}

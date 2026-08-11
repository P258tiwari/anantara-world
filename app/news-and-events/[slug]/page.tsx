import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteShell } from "../../components/SiteShell";
import { Breadcrumbs, CTA, PageHero } from "../../components/Common";
import { demoUpdates } from "../../data";

export function generateStaticParams(){return demoUpdates.map(({slug})=>({slug}))}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}):Promise<Metadata>{const {slug}=await params;const item=demoUpdates.find(x=>x.slug===slug);return {title:item?`${item.title} | ANANTARA WORLD`:"Story | ANANTARA WORLD",description:item?.summary,robots:{index:false,follow:true}}}
export default async function StoryPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const item=demoUpdates.find(x=>x.slug===slug);if(!item)notFound();return <SiteShell overlay><PageHero eyebrow={`${item.type} · Demo content`} title={item.title} copy={item.summary} image={item.image} /><Breadcrumbs items={[{label:"Home",href:"/"},{label:"News & events",href:"/news-and-events"},{label:item.title}]} /><article className="story-body section-pad"><p className="eyebrow">Placeholder editorial entry</p><p className="story-lead">This page demonstrates how approved long-form news, event or progress content will be presented.</p><h2>Content awaiting approval</h2><p>No factual project announcement is being made here. Final copy may include verified dates, quoted representatives, approved images, event details, downloadable materials and relevant compliance notes.</p><div className="story-note"><strong>Publishing control</strong><p>Replace this demo content only with reviewed and approved public information.</p></div></article><CTA /></SiteShell>}


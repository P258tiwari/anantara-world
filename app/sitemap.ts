import type { MetadataRoute } from "next";
const routes=["","/about-us","/anantara-world","/residences","/amenities","/landscape","/location","/gallery","/construction-updates","/news-and-events","/media-coverage","/downloads","/contact","/campaign","/legal-rera","/privacy-policy"];
export default function sitemap():MetadataRoute.Sitemap {return routes.map((route)=>({url:`https://new.anantara.world${route}`,lastModified:new Date(),changeFrequency:route===""?"weekly":"monthly",priority:route===""?1:0.7}))}


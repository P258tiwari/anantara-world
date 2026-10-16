import type { MetadataRoute } from "next";
const routes=["","/about-us","/anantara-world","/residences","/amenities","/landscape","/location","/gallery","/downloads","/contact","/campaign","/legal-rera","/privacy-policy"];
export default function sitemap():MetadataRoute.Sitemap {return routes.map((route)=>({url:`https://www.anantara.world${route}`,lastModified:new Date(),changeFrequency:route===""?"weekly":"monthly",priority:route===""?1:0.7}))}


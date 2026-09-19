import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";
import { tools } from "@/lib/tool-data";
export default function sitemap(): MetadataRoute.Sitemap { const base=siteConfig.url; const paths=["","/ai-tools","/prompts","/resources","/about","/contact","/pricing","/privacy","/terms",...tools.map(t=>`/tools/${t.slug}`)]; return paths.map(path=>({url:`${base}${path}`,lastModified:new Date()})); }

import type { Metadata } from "next";
import { PromptLibrary } from "@/components/prompt-library";
import { PageShell } from "@/components/ui";
export const metadata: Metadata={title:"Prompt Library",description:"Free reusable AI prompts for creators, marketers, businesses and product photographers."};
export default function Prompts(){return <PageShell><div className="container"><div className="page-header"><span className="eyebrow">PROMPT LIBRARY</span><h1>Useful prompts, ready to copy</h1><p>Browse practical starting points for video, image, Instagram, YouTube, business, marketing and product photography workflows.</p></div><PromptLibrary/></div></PageShell>}

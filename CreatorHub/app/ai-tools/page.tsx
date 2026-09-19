import type { Metadata } from "next";
import { AiDirectory } from "@/components/ai-directory";
import { PageShell } from "@/components/ui";
export const metadata: Metadata={title:"AI Tools Directory",description:"Browse a curated sample directory of AI tools by category."};
export default function AITools(){return <PageShell><div className="container"><div className="page-header"><span className="eyebrow">AI DIRECTORY</span><h1>Find AI tools by workflow</h1><p>Explore sample listings across video, image, writing, voice, marketing, coding and productivity. Verify current pricing and free-tier details before publishing them as current.</p></div><AiDirectory/></div></PageShell>}

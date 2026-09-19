import type { Metadata } from "next";
import { PageShell, SectionTitle } from "@/components/ui";
const guides=[
["How to write better AI prompts","Use a clear subject, context, constraints, desired output and quality notes. Then iterate from the weakest part of the first result rather than rewriting everything."],
["How to create Instagram Reels","Start with a single audience problem, build a fast opening, keep the visual language consistent and finish with one clear action."],
["How to use AI for content creation","Use AI to accelerate research, idea expansion, outlines, variations and repurposing while keeping factual review and final creative direction human-led."],
["AI content workflow","Idea → brief → generation → editing → review → publish. Keep reusable prompt templates for recurring formats so every piece starts from a proven structure."],
["AI tools for small businesses","Map tools to actual workflow bottlenecks: marketing copy, design drafts, customer FAQ preparation, sales enablement and repetitive content operations."]
];
export const metadata: Metadata={title:"Resources",description:"Original CreatorHub guides for prompting, content creation and AI workflows."};
export default function Resources(){return <PageShell><div className="container"><div className="page-header"><span className="eyebrow">RESOURCES</span><h1>Practical guides for creators</h1><p>Original, plain-language resources for turning AI into a useful part of your content workflow.</p></div><div className="content-prose">{guides.map(([title,body])=><section key={title}><SectionTitle title={title}/><p>{body}</p></section>)}</div></div></PageShell>}

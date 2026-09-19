import type { Metadata } from "next";
import { Video, Image as ImageIcon, Camera, Hash, Zap, Play, UserRound, Lightbulb, ArrowRight, Sparkles, Clock3, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { PageShell, SectionTitle, ToolCard } from "@/components/ui";
import { tools } from "@/lib/tool-data";

export const metadata: Metadata = {
  title: "Free AI Creator Tools | CreatorHub",
  description: "Use CreatorHub's free browser-based creator tools for video prompts, image prompts, captions, hashtags, hooks, YouTube titles, bios and content ideas."
};

const icons = { "video-prompt": Video, "image-prompt": ImageIcon, caption: Camera, hashtags: Hash, hooks: Zap, "youtube-title": Play, "instagram-bio": UserRound, "content-ideas": Lightbulb };
const popular = new Set(["video-prompt", "image-prompt", "caption", "hooks"]);

export default function ToolsPage() {
  return <PageShell>
    <div className="container">
      <div className="tools-hero">
        <div>
          <div className="breadcrumb"><Link href="/">Home</Link><span>/</span>Tools</div>
          <span className="eyebrow">CREATOR TOOLKIT</span>
          <h1>Everything you need to turn an idea into content.</h1>
          <p>Eight focused tools for creators, freelancers and small businesses. Start with a blank idea, generate a structured draft, then make it yours.</p>
          <div className="tool-trust"><span><Sparkles size={15}/> Free to use</span><span><Clock3 size={15}/> No login required</span><span><ShieldCheck size={15}/> Browser-side generation</span></div>
        </div>
        <div className="tools-hero-panel">
          <span className="eyebrow">HOW IT WORKS</span>
          <div className="mini-flow"><span>01</span><strong>Choose a tool</strong><ArrowRight size={16}/></div>
          <div className="mini-flow"><span>02</span><strong>Describe your idea</strong><ArrowRight size={16}/></div>
          <div className="mini-flow"><span>03</span><strong>Generate & refine</strong><ArrowRight size={16}/></div>
        </div>
      </div>

      <section className="tools-section">
        <SectionTitle eyebrow="ALL TOOLS" title="Pick the tool that matches your next task" description="Every tool is designed to give you a useful starting point without requiring an account or paid AI API." />
        <div className="grid-4 tools-grid">
          {tools.map(tool => <div className="tool-card-wrap" key={tool.slug}>
            {popular.has(tool.slug) && <span className="popular-pill">Popular</span>}
            <ToolCard tool={tool} icon={icons[tool.slug]} />
          </div>)}
        </div>
      </section>

      <section className="tools-bottom-grid">
        <div className="card tool-tip-card">
          <span className="eyebrow">CREATOR TIP</span>
          <h2>Start specific, then add personality.</h2>
          <p>The better your input describes the audience, format and desired outcome, the more useful the generated starting point will be.</p>
        </div>
        <div className="card tool-tip-card">
          <span className="eyebrow">NO MAGIC PROMISES</span>
          <h2>Use the output as a draft, not a guarantee.</h2>
          <p>CreatorHub gives you structured ideas and templates. Review, personalize and adapt every result before publishing.</p>
        </div>
      </section>
    </div>
  </PageShell>;
}

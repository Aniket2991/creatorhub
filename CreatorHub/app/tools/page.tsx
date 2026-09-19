import type { Metadata } from "next";
import { Video, Image as ImageIcon, InstagramIcon, Hash, Zap, YoutubeIcon, UserRound, Lightbulb } from "lucide-react";
import { PageShell, SectionTitle, ToolCard } from "@/components/ui";
import { tools } from "@/lib/tool-data";

export const metadata: Metadata = {
  title: "Free AI Creator Tools",
  description: "Use CreatorHub's free browser-based tools for video prompts, image prompts, captions, hashtags, hooks, titles, bios and content ideas."
};

const icons = { "video-prompt": Video, "image-prompt": ImageIcon, caption: InstagramIcon, hashtags: Hash, hooks: Zap, "youtube-title": YoutubeIcon, "instagram-bio": UserRound, "content-ideas": Lightbulb };

export default function ToolsPage() {
  return <PageShell><div className="container"><div className="page-header"><span className="eyebrow">FREE TOOLS</span><h1>Eight tools for your creator workflow</h1><p>Generate useful starting points in your browser. No login, no paid AI API and no promise of guaranteed performance.</p></div><div className="grid-4" style={{ paddingBottom: 70 }}>{tools.map(tool => <ToolCard key={tool.slug} tool={tool} icon={icons[tool.slug]} />)}</div></div></PageShell>;
}

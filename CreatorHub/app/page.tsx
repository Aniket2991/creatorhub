import Link from "next/link";
import { Video, Image as ImageIcon, InstagramIcon, Zap, ImagePlus, Captions, Hash, YoutubeIcon, UserRound, Lightbulb } from "lucide-react";
import { SectionTitle, ToolCard } from "@/components/ui";
import { tools } from "@/lib/tool-data";

export default function Home() {
  const popular = [tools[0],tools[1],tools[2],tools[4]];
  const icons = { "video-prompt":Video, "image-prompt":ImageIcon, caption:InstagramIcon, hashtags:Hash, hooks:Zap, "youtube-title":YoutubeIcon, "instagram-bio":UserRound, "content-ideas":Lightbulb };
  return <main className="page-shell">
    <section className="hero"><div className="container hero-grid"><div><span className="eyebrow">CREATOR TOOLS, WITHOUT THE FRICTION</span><h1>Create Better Content <span className="gradient-text">With AI</span></h1><p>Free AI tools, prompts and resources for creators, businesses and social media marketers.</p><div className="hero-actions"><Link href="/tools/video-prompt" className="button button-primary">Explore Free Tools</Link><Link href="/ai-tools" className="button button-secondary">Browse AI Tools</Link></div><p className="hero-note">Free to use • No credit card • Built for creators</p></div><div className="flow-card"><div className="flow-head"><span className="eyebrow">CREATOR WORKFLOW</span><span>Simple by design</span></div><div className="flow"><div className="flow-step"><span>01</span><strong>IDEA</strong><span>→</span></div><div className="flow-step"><span>02</span><strong>TOOL</strong><span>→</span></div><div className="flow-step"><span>03</span><strong>CONTENT</strong><span>→</span></div><div className="flow-step"><span>04</span><strong>PUBLISH</strong><span>✓</span></div></div></div></div></section>
    <section className="section"><div className="container"><SectionTitle eyebrow="POPULAR TOOLS" title="Useful tools you can run right now" description="Every MVP tool works with structured templates and browser-side logic. No paid AI API is required."/><div className="grid-4">{popular.map(t=><ToolCard key={t.slug} tool={t} icon={icons[t.slug]}/>)}</div><div style={{marginTop:20}}><Link href="/tools/video-prompt" className="text-link">View All Tools →</Link></div></div></section>
    <section className="section"><div className="container"><SectionTitle eyebrow="CREATE" title="What do you want to create?"/><div className="grid-3"><article className="card category-card"><div className="tool-icon"><Video size={20}/></div><h3>VIDEO</h3><ul className="check-list"><li>Video prompts</li><li>Reel ideas</li><li>Video scripts</li><li>Hooks</li></ul></article><article className="card category-card"><div className="tool-icon"><ImagePlus size={20}/></div><h3>IMAGE</h3><ul className="check-list"><li>Image prompts</li><li>Product photography</li><li>Thumbnail prompts</li><li>Social posts</li></ul></article><article className="card category-card"><div className="tool-icon"><Captions size={20}/><span style={{display:"none"}}/></div><h3>GROW</h3><ul className="check-list"><li>Captions</li><li>Hashtags</li><li>YouTube titles</li><li>Content calendars</li></ul></article></div></div></section>
    <section className="cta"><div className="container"><div className="cta-box"><div><span className="eyebrow">START FREE</span><h2>Turn your next idea into something publishable.</h2><p>No login. No credit card. No paid API required for the MVP.</p></div><Link href="/tools/content-ideas" className="button button-primary">Create Content Ideas</Link></div></div></section>
  <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
    "@context":"https://schema.org",
    "@type":"FAQPage",
    "mainEntity":[
      {"@type":"Question","name":"Are CreatorHub's tools free?","acceptedAnswer":{"@type":"Answer","text":"The MVP tools are free to use in the browser and do not require a paid AI API or login."}},
      {"@type":"Question","name":"Does CreatorHub guarantee virality?","acceptedAnswer":{"@type":"Answer","text":"No. CreatorHub provides structured content starting points and does not guarantee viral performance."}},
      {"@type":"Question","name":"Does CreatorHub require an account?","acceptedAnswer":{"@type":"Answer","text":"The MVP does not require authentication to use the core tools."}}
    ]
  }) }} />
  </main>;
}

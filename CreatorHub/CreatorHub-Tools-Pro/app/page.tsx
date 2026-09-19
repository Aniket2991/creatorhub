import Link from "next/link";
import { ArrowRight, Camera, Captions, Check, Hash, Image as ImageIcon, Lightbulb, Play, Sparkles, Video, Zap } from "lucide-react";
import { SectionTitle, ToolCard } from "@/components/ui";
import { tools } from "@/lib/tool-data";

export default function Home() {
  const popular = [tools[0], tools[1], tools[2], tools[4]];
  const icons = {
    "video-prompt": Video,
    "image-prompt": ImageIcon,
    caption: Camera,
    hashtags: Hash,
    hooks: Zap,
    "youtube-title": Play,
    "instagram-bio": Captions,
    "content-ideas": Lightbulb,
  };

  return (
    <main className="page-shell">
      <section className="hero hero-premium">
        <div className="hero-orb hero-orb-one" />
        <div className="hero-orb hero-orb-two" />
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="hero-badge"><Sparkles size={14} /> Free creator toolkit</div>
            <span className="eyebrow">CREATE • PUBLISH • GROW</span>
            <h1>Turn ideas into <span className="gradient-text">content people notice.</span></h1>
            <p>CreatorHub gives creators, marketers and small businesses practical AI-assisted tools, prompts and resources — without a complicated setup.</p>
            <div className="hero-actions">
              <Link href="/tools" className="button button-primary">Explore Free Tools <ArrowRight size={17} /></Link>
              <Link href="/prompts" className="button button-secondary">Browse Prompts</Link>
            </div>
            <div className="trust-row">
              <span><Check size={15} /> No login</span>
              <span><Check size={15} /> No credit card</span>
              <span><Check size={15} /> Browser-based MVP</span>
            </div>
          </div>
          <div className="hero-dashboard" aria-label="CreatorHub workflow preview">
            <div className="dashboard-top"><span className="dashboard-dot" /><span className="dashboard-dot" /><span className="dashboard-dot" /><span className="dashboard-label">CREATOR WORKSPACE</span></div>
            <div className="dashboard-title"><div><span className="eyebrow">TODAY'S WORKFLOW</span><h2>From blank page to publish-ready.</h2></div><Sparkles size={20} /></div>
            <div className="workflow-grid">
              <div className="workflow-card active"><span>01</span><div><strong>Idea</strong><small>Pick a topic</small></div><Lightbulb size={18} /></div>
              <div className="workflow-card"><span>02</span><div><strong>Generate</strong><small>Use a free tool</small></div><Zap size={18} /></div>
              <div className="workflow-card"><span>03</span><div><strong>Polish</strong><small>Copy & refine</small></div><Captions size={18} /></div>
              <div className="workflow-card"><span>04</span><div><strong>Publish</strong><small>Ship your content</small></div><ArrowRight size={18} /></div>
            </div>
            <div className="dashboard-footer"><span>Built for creators</span><span>8 free tools</span><span>↗ Start creating</span></div>
          </div>
        </div>
      </section>

      <section className="section section-tight">
        <div className="container">
          <div className="section-intro-row"><SectionTitle eyebrow="POPULAR TOOLS" title="Start creating in seconds" description="Practical generators for the content tasks you repeat every week."/><Link href="/tools" className="button button-secondary desktop-only">View all tools <ArrowRight size={16}/></Link></div>
          <div className="grid-4">{popular.map(t => <ToolCard key={t.slug} tool={t} icon={icons[t.slug as keyof typeof icons]} />)}</div>
        </div>
      </section>

      <section className="section feature-section">
        <div className="container">
          <SectionTitle eyebrow="BUILT AROUND YOUR WORKFLOW" title="One hub for the whole content loop" description="Move from idea to finished post without jumping between a dozen disconnected tools." />
          <div className="workflow-columns">
            <article className="feature-panel"><div className="feature-number">01</div><div className="feature-icon"><Video size={19}/></div><h3>Make content</h3><p>Generate video and image prompts, captions, hooks, titles and ideas from structured inputs.</p><Link href="/tools" className="text-link">Explore tools →</Link></article>
            <article className="feature-panel"><div className="feature-number">02</div><div className="feature-icon"><Hash size={19}/></div><h3>Make it discoverable</h3><p>Use hashtags, titles and social-ready copy to give each piece of content a clearer purpose.</p><Link href="/prompts" className="text-link">Browse prompts →</Link></article>
            <article className="feature-panel"><div className="feature-number">03</div><div className="feature-icon"><Sparkles size={19}/></div><h3>Keep learning</h3><p>Explore original guides and a curated AI tools directory for your next workflow upgrade.</p><Link href="/resources" className="text-link">Read resources →</Link></article>
          </div>
        </div>
      </section>

      <section className="section creator-section">
        <div className="container creator-grid">
          <div><span className="eyebrow">MADE FOR MORE THAN INFLUENCERS</span><h2>Useful whether you post once a day or once a month.</h2><p>CreatorHub is designed for Instagram creators, YouTubers, freelancers, online sellers and small businesses that want a simpler content workflow.</p></div>
          <div className="audience-list"><span>Instagram & Reels</span><span>YouTube & Shorts</span><span>Freelancers</span><span>Online sellers</span><span>Small businesses</span><span>Marketing teams</span></div>
        </div>
      </section>

      <section className="cta"><div className="container"><div className="cta-box cta-premium"><div><div className="hero-badge"><Sparkles size={14}/> Start free</div><h2>Your next post can start here.</h2><p>Choose a tool, enter your idea and get a structured starting point in seconds.</p></div><Link href="/tools/content-ideas" className="button button-primary">Create Content Ideas <ArrowRight size={17}/></Link></div></div></section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context":"https://schema.org", "@type":"FAQPage", "mainEntity":[
          {"@type":"Question","name":"Are CreatorHub's tools free?","acceptedAnswer":{"@type":"Answer","text":"The MVP tools are free to use in the browser and do not require a paid AI API or login."}},
          {"@type":"Question","name":"Does CreatorHub guarantee virality?","acceptedAnswer":{"@type":"Answer","text":"No. CreatorHub provides structured content starting points and does not guarantee viral performance."}},
          {"@type":"Question","name":"Does CreatorHub require an account?","acceptedAnswer":{"@type":"Answer","text":"The MVP does not require authentication to use the core tools."}}
        ]
      }) }} />
    </main>
  );
}

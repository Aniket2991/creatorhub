"use client";
import { Search, ExternalLink } from "lucide-react";
import { useMemo, useState } from "react";

type Entry = { name: string; category: string; description: string; pricing: string; freeTier: string; url: string; demo?: boolean };
const entries: Entry[] = [
  { name: "OpenAI", category: "Writing", description: "General-purpose AI models and creative tooling.", pricing: "Varies", freeTier: "Demo/sample listing — verify current terms.", url: "https://openai.com", demo: true },
  { name: "Canva", category: "Marketing", description: "Design and visual content creation platform.", pricing: "Free + paid plans", freeTier: "Free plan exists; verify current limits.", url: "https://www.canva.com", demo: true },
  { name: "Adobe Firefly", category: "Image", description: "Generative AI features for creative workflows.", pricing: "Varies", freeTier: "Sample listing — verify current access.", url: "https://firefly.adobe.com", demo: true },
  { name: "Descript", category: "Video", description: "AI-assisted editing and content production workflow.", pricing: "Varies", freeTier: "Sample listing — verify current access.", url: "https://www.descript.com", demo: true },
  { name: "ElevenLabs", category: "Voice", description: "AI voice and audio generation tools.", pricing: "Varies", freeTier: "Sample listing — verify current access.", url: "https://elevenlabs.io", demo: true },
  { name: "GitHub Copilot", category: "Coding", description: "AI assistance for software development.", pricing: "Varies", freeTier: "Sample listing — verify current terms.", url: "https://github.com/features/copilot", demo: true },
  { name: "Notion AI", category: "Productivity", description: "AI features inside workspace and knowledge workflows.", pricing: "Varies", freeTier: "Sample listing — verify current access.", url: "https://www.notion.com/product/ai", demo: true },
  { name: "Runway", category: "Video", description: "Generative video and creative AI tools.", pricing: "Varies", freeTier: "Sample listing — verify current access.", url: "https://runwayml.com", demo: true }
];
const cats = ["All", "Video", "Image", "Writing", "Voice", "Marketing", "Coding", "Productivity"];
export function AiDirectory() {
  const [query, setQuery] = useState(""); const [cat, setCat] = useState("All"); const [sort, setSort] = useState("name");
  const filtered = useMemo(() => entries.filter(e => (cat === "All" || e.category === cat) && `${e.name} ${e.description}`.toLowerCase().includes(query.toLowerCase())).sort((a,b) => sort === "category" ? a.category.localeCompare(b.category) || a.name.localeCompare(b.name) : a.name.localeCompare(b.name)), [query, cat, sort]);
  return <div><div className="directory-controls"><div className="search-wrap"><Search size={18} /><input placeholder="Search AI tools..." value={query} onChange={e => setQuery(e.target.value)} /></div><select value={cat} onChange={e => setCat(e.target.value)}>{cats.map(c => <option key={c}>{c}</option>)}</select><select value={sort} onChange={e => setSort(e.target.value)}><option value="name">Sort: Name</option><option value="category">Sort: Category</option></select></div><p className="notice">Directory entries are sample/demo data for the MVP. Pricing and free-tier details should be verified before publishing them as current.</p><div className="directory-grid">{filtered.map(e => <article className="card ai-card" key={e.name}><div className="tag">{e.category}</div><h3>{e.name}</h3><p>{e.description}</p><div className="ai-meta"><span><strong>Pricing:</strong> {e.pricing}</span><span><strong>Free tier:</strong> {e.freeTier}</span></div><a href={e.url} target="_blank" rel="noreferrer" className="button button-secondary button-small">Official website <ExternalLink size={15} /></a></article>)}</div></div>;
}

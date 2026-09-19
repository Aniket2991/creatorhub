import Link from "next/link";
import type { ReactNode } from "react";

export function SectionTitle({ eyebrow, title, description }: { eyebrow?: string; title: string; description?: string }) {
  return <div className="section-title">{eyebrow && <span className="eyebrow">{eyebrow}</span>}<h2>{title}</h2>{description && <p>{description}</p>}</div>;
}

export function ToolCard({ tool, icon: Icon }: { tool: { name: string; description: string; slug: string }; icon: React.ComponentType<{ size?: number }> }) {
  return <article className="card tool-card"><div className="tool-icon"><Icon size={21} /></div><div className="tool-card-body"><h3>{tool.name}</h3><p>{tool.description}</p><Link href={`/tools/${tool.slug}`} className="text-link">Use Tool →</Link></div></article>;
}

export function PageShell({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <main className={`page-shell ${className}`}>{children}</main>;
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ToolClient } from "@/components/tool-client";
import { getTool, tools } from "@/lib/tool-data";
import { PageShell } from "@/components/ui";

export function generateStaticParams(){ return tools.map(t=>({slug:t.slug})); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params; const tool = getTool(slug); if(!tool) return {};
  return { title: tool.name, description: tool.description, openGraph: { title: tool.name, description: tool.description, type: "website" } };
}
export default async function ToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const tool = getTool(slug); if(!tool) notFound();
  return <PageShell><div className="container"><div className="page-header"><div className="breadcrumb"><a href="/">Home</a> / <a href={`/tools/${slug}`}>Tools</a> / {tool.name}</div><span className="eyebrow">{tool.eyebrow}</span><h1>{tool.name}</h1><p>{tool.description}</p></div><ToolClient tool={tool}/></div></PageShell>;
}

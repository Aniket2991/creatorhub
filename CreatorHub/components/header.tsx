"use client";
import Link from "next/link";
import { Menu, X, Sparkles } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "./theme-toggle";
import { siteConfig } from "@/lib/config";

const nav = [
  ["Home", "/"],
  ["Tools", "/tools"],
  ["AI Directory", "/ai-tools"],
  ["Prompts", "/prompts"],
  ["Resources", "/resources"]
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Link href="/" className="brand" onClick={() => setOpen(false)} aria-label={siteConfig.name}>
          <span className="brand-mark"><Sparkles size={16} fill="currentColor" /></span>
          {siteConfig.name}
        </Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {nav.map(([label, href]) => <Link key={href} href={href} className="nav-link">{label}</Link>)}
        </nav>
        <div className="nav-actions">
          <ThemeToggle />
          <Link href="/tools/video-prompt" className="button button-primary button-small">Get Started</Link>
          <button className="mobile-menu-button icon-button" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {open && <div className="mobile-nav container">
        {nav.map(([label, href]) => <Link key={href} href={href} className="mobile-nav-link" onClick={() => setOpen(false)}>{label}</Link>)}
        <Link href="/pricing" className="mobile-nav-link" onClick={() => setOpen(false)}>Pricing</Link>
      </div>}
    </header>
  );
}

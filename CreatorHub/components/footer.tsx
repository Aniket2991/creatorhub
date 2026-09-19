import Link from "next/link";
import { siteConfig } from "@/lib/config";

export function Footer() {
  return <footer className="site-footer">
    <div className="container footer-grid">
      <div>
        <Link href="/" className="brand"><span className="brand-mark">✦</span>{siteConfig.name}</Link>
        <p className="muted footer-copy">{siteConfig.tagline}</p>
      </div>
      <div className="footer-col"><h3>Explore</h3><Link href="/tools/video-prompt">Tools</Link><Link href="/ai-tools">AI Directory</Link><Link href="/prompts">Prompts</Link><Link href="/resources">Resources</Link></div>
      <div className="footer-col"><h3>Company</h3><Link href="/about">About</Link><Link href="/contact">Contact</Link><Link href="/pricing">Pricing</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div>
      <div className="footer-col"><h3>Social</h3><span className="muted">Instagram</span><span className="muted">YouTube</span><span className="muted">X</span></div>
    </div>
    <div className="container footer-bottom"><span>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</span><span>Free MVP • No paid APIs</span></div>
  </footer>;
}

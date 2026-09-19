import type { Metadata } from "next";
import { ContactForm } from "@/components/contact-form";
import { PageShell } from "@/components/ui";
export const metadata: Metadata={title:"Contact",description:"Contact CreatorHub using the local MVP demo form."};
export default function Contact(){return <PageShell><div className="container"><div className="page-header"><span className="eyebrow">CONTACT</span><h1>Tell us what would make CreatorHub more useful.</h1><p>This MVP includes a local demo submission state. No message is actually delivered until an email provider is connected.</p></div><div className="contact-grid"><div className="card contact-copy"><h2>Feedback, ideas, partnerships</h2><p>Use the form for product feedback, tool suggestions or future partnership ideas. The current demo intentionally does not claim to send email.</p></div><ContactForm/></div></div></PageShell>}

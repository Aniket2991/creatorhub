"use client";
import { FormEvent, useState } from "react";
export function ContactForm() {
  const [sent, setSent] = useState(false);
  function submit(e: FormEvent<HTMLFormElement>) { e.preventDefault(); setSent(true); }
  return sent ? <div className="success-panel"><h2>Demo submission received</h2><p>Your message was stored only in this page state. No email was sent because no email service is connected.</p><button className="button button-secondary" onClick={() => setSent(false)}>Send another</button></div> : <form className="card contact-form" onSubmit={submit}>
    <label className="field"><span>Name</span><input name="name" required /></label>
    <label className="field"><span>Email</span><input name="email" type="email" required /></label>
    <label className="field field-full"><span>Message</span><textarea name="message" rows={7} required /></label>
    <button className="button button-primary" type="submit">Submit demo message</button>
  </form>;
}

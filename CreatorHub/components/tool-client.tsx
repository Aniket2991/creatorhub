"use client";

import { useMemo, useState } from "react";
import { Check, Clipboard, RotateCcw } from "lucide-react";
import { generateToolOutput } from "@/lib/generators";
import { track } from "@/lib/analytics";
import type { ToolDefinition } from "@/lib/tool-data";

export function ToolClient({ tool }: { tool: ToolDefinition }) {
  const initial = useMemo(() => Object.fromEntries(tool.fields.map((f) => [f.name, f.defaultValue || ""])), [tool.fields]);
  const [form, setForm] = useState<Record<string, string>>(initial);
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  function generate() {
    const missing = tool.fields.find((field) => field.required && !form[field.name]?.trim());
    if (missing) { setError(`Please enter ${missing.label.toLowerCase()}.`); return; }
    setError("");
    setResult(generateToolOutput(tool.slug, form) || "");
    track("tool_generate", { tool: tool.slug });
    setCopied(false);
  }
  async function copy() {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    track("tool_copy", { tool: tool.slug });
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  }
  function clear() { setForm(initial); setResult(""); setError(""); setCopied(false); }

  return <div className="tool-layout">
    <section className="card tool-form-card">
      <div className="form-head"><div><span className="eyebrow">INPUTS</span><h2>Tell us what you want to create</h2></div><button className="icon-button" onClick={clear} aria-label="Clear all"><RotateCcw size={18} /></button></div>
      <div className="form-grid">
        {tool.fields.map((field) => <label key={field.name} className={field.type === "textarea" ? "field field-full" : "field"}>
          <span>{field.label}{field.required ? " *" : ""}</span>
          {field.type === "textarea" ? <textarea rows={5} value={form[field.name] || ""} placeholder={field.placeholder} onChange={(e) => setForm({ ...form, [field.name]: e.target.value })} /> : field.type === "select" ? <select value={form[field.name] || ""} onChange={(e) => setForm({ ...form, [field.name]: e.target.value })}>{field.options?.map((option) => <option key={option}>{option}</option>)}</select> : <input type={field.type === "number" ? "number" : "text"} value={form[field.name] || ""} placeholder={field.placeholder} onChange={(e) => setForm({ ...form, [field.name]: e.target.value })} />}
        </label>)}
      </div>
      {error && <div className="form-error" role="alert">{error}</div>}
      <div className="button-row"><button className="button button-primary" onClick={generate}>Generate</button><button className="button button-secondary" onClick={clear}>Clear</button></div>
      <p className="form-note">Runs locally in your browser. No paid AI API or account required.</p>
    </section>
    <section className="card result-card" aria-live="polite">
      <div className="result-head"><div><span className="eyebrow">RESULT</span><h2>{result ? "Your generated content" : "Your result will appear here"}</h2></div>{result && <button className="button button-secondary button-small" onClick={copy}>{copied ? <Check size={16} /> : <Clipboard size={16} />}{copied ? "Copied" : "Copy"}</button>}</div>
      {result ? <pre className="result-box">{result}</pre> : <div className="empty-state"><div className="empty-icon">✦</div><h3>Ready when you are</h3><p>Fill out the form and generate a polished starting point you can edit in your workflow.</p></div>}
    </section>
  </div>;
}

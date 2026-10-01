"use client";

import { useState } from "react";
import { ArrowRight, Copy, Sparkles } from "lucide-react";

const goals = ["Grow audience", "Launch a product", "Get leads", "Build authority"];
const platforms = ["Instagram", "YouTube", "TikTok", "LinkedIn"];

export function CampaignStudio() {
  const [brief, setBrief] = useState("");
  const [platform, setPlatform] = useState("Instagram");
  const [goal, setGoal] = useState("Grow audience");
  const [audience, setAudience] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  async function generate() {
    if (!brief.trim()) {
      setError("Tell CreatorHub what you want to create.");
      return;
    }

    setLoading(true);
    setError("");
    setCopied(false);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: "campaign", brief, platform, goal, audience }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Campaign generation failed.");
      setResult(data.prompt || "");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Campaign generation failed.");
    } finally {
      setLoading(false);
    }
  }

  async function copyResult() {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <section className="studio-section" id="studio">
      <div className="container">
        <div className="studio-heading">
          <div>
            <span className="eyebrow">CREATORHUB STUDIO</span>
            <h2>Stop generating one thing at a time.</h2>
            <p>Give CreatorHub one brief and get a complete campaign starting point — hooks, copy, visuals, video, hashtags and a 7-day plan.</p>
          </div>
          <div className="studio-badge"><Sparkles size={15} /> AI WORKSPACE</div>
        </div>

        <div className="studio-shell">
          <div className="studio-input">
            <div className="studio-label">YOUR CREATIVE BRIEF</div>
            <textarea
              value={brief}
              onChange={(e) => setBrief(e.target.value)}
              placeholder="Example: I am launching a budget-friendly AI content service for Indian small businesses. I want a simple Instagram campaign that gets people to DM me."
              rows={7}
            />

            <div className="studio-options">
              <label>
                <span>Platform</span>
                <select value={platform} onChange={(e) => setPlatform(e.target.value)}>
                  {platforms.map((item) => <option key={item}>{item}</option>)}
                </select>
              </label>
              <label>
                <span>Goal</span>
                <select value={goal} onChange={(e) => setGoal(e.target.value)}>
                  {goals.map((item) => <option key={item}>{item}</option>)}
                </select>
              </label>
              <label className="studio-audience">
                <span>Audience</span>
                <input value={audience} onChange={(e) => setAudience(e.target.value)} placeholder="e.g. Indian small business owners" />
              </label>
            </div>

            {error && <div className="form-error">{error}</div>}

            <button className="button button-primary studio-generate" onClick={generate} disabled={loading}>
              <Sparkles size={17} />
              {loading ? "Building your campaign..." : "Build Campaign"}
              {!loading && <ArrowRight size={17} />}
            </button>
            <p className="form-note">Powered by CreatorHub AI. Your API key remains server-side.</p>
          </div>

          <div className="studio-output">
            <div className="studio-output-head">
              <div>
                <span className="eyebrow">CAMPAIGN PACK</span>
                <h3>{result ? "Your strategy is ready" : "Your campaign appears here"}</h3>
              </div>
              <button className="icon-button" onClick={copyResult} disabled={!result} aria-label="Copy campaign">
                <Copy size={17} />
              </button>
            </div>
            {result ? (
              <pre className="studio-result">{result}</pre>
            ) : (
              <div className="studio-empty">
                <div className="studio-orb"><Sparkles size={24} /></div>
                <strong>One brief → a complete content system</strong>
                <p>Start with your product, idea, offer or creator goal.</p>
              </div>
            )}
            {copied && <span className="studio-copied">Copied</span>}
          </div>
        </div>
      </div>
    </section>
  );
}

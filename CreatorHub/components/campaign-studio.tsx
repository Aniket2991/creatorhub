"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Copy, Sparkles } from "lucide-react";

const goals = ["Grow audience", "Launch a product", "Get leads", "Build authority"];
const platforms = ["Instagram", "YouTube", "TikTok", "LinkedIn"];

type Brand = {
  name: string;
  niche: string;
  audience: string;
  tone: string;
  offer: string;
  cta: string;
  colors: string;
};

const blankBrand: Brand = { name: "", niche: "", audience: "", tone: "", offer: "", cta: "", colors: "" };

export function CampaignStudio() {
  const [brief, setBrief] = useState("");
  const [platform, setPlatform] = useState("Instagram");
  const [goal, setGoal] = useState("Grow audience");
  const [audience, setAudience] = useState("");
  const [brand, setBrand] = useState<Brand>(blankBrand);
  const [useBrand, setUseBrand] = useState(true);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [projectId, setProjectId] = useState<string | null>(null);
  const [projectName, setProjectName] = useState("");

  useEffect(() => {
    try {
      const raw = localStorage.getItem("creatorhub-brand");
      if (raw) setBrand({ ...blankBrand, ...JSON.parse(raw) });
    } catch {}

    const loadProject = (id: string | null) => {
      if (!id) {
        setProjectId(null);
        setProjectName("");
        setBrief("");
        setResult("");
        setPlatform("Instagram");
        setGoal("Grow audience");
        return;
      }
      try {
        const projects = JSON.parse(localStorage.getItem("creatorhub-projects") || "[]");
        const project = projects.find((item: { id: string }) => item.id === id);
        if (project) {
          setProjectId(project.id);
          setProjectName(project.name || "");
          setBrief(project.brief || "");
          setPlatform(project.platform || "Instagram");
          setGoal(project.goal || "Grow audience");
          setResult(project.campaign || "");
        }
      } catch {}
    };

    const initial = localStorage.getItem("creatorhub-active-project");
    if (initial) loadProject(initial);

    const onProjectChange = (event: Event) => {
      const custom = event as CustomEvent<string | null>;
      loadProject(custom.detail || null);
    };
    window.addEventListener("creatorhub-project-change", onProjectChange);
    return () => window.removeEventListener("creatorhub-project-change", onProjectChange);
  }, []);

  const hasBrand = Object.values(brand).some(Boolean);

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
        body: JSON.stringify({
          mode: "campaign",
          brief,
          platform,
          goal,
          audience,
          brand: useBrand ? brand : null,
        }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.error || "Campaign generation failed.");
      const generated = data.prompt || "";
      setResult(generated);

      if (projectId && generated) {
        try {
          const projects = JSON.parse(localStorage.getItem("creatorhub-projects") || "[]");
          const updated = projects.map((project: { id: string; platform?: string; goal?: string; campaign?: string; brief?: string }) =>
            project.id === projectId
              ? { ...project, brief, platform, goal, campaign: generated }
              : project
          );
          localStorage.setItem("creatorhub-projects", JSON.stringify(updated));
          window.dispatchEvent(new CustomEvent("creatorhub-project-saved", { detail: projectId }));
        } catch {}
      }
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
            {projectId && <div className="studio-project-chip">Project: <strong>{projectName}</strong> · generated campaigns save here automatically</div>}
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

            <div className="studio-brand-toggle">
              <label className="studio-check">
                <input type="checkbox" checked={useBrand} onChange={(e) => setUseBrand(e.target.checked)} />
                <span>Use my Brand Profile</span>
              </label>
              <span className={hasBrand ? "studio-brand-status studio-brand-ready" : "studio-brand-status"}>
                {hasBrand ? "Brand context ready" : "No brand profile saved"}
              </span>
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

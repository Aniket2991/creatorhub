"use client";

import { useMemo, useState } from "react";
import { Check, Clipboard, Loader2, RotateCcw } from "lucide-react";
import { generateToolOutput } from "@/lib/generators";
import { track } from "@/lib/analytics";
import type { ToolDefinition } from "@/lib/tool-data";

export function ToolClient({ tool }: { tool: ToolDefinition }) {
  const initial = useMemo(
    () =>
      Object.fromEntries(
        tool.fields.map((f) => [f.name, f.defaultValue || ""])
      ),
    [tool.fields]
  );

  const [form, setForm] =
    useState<Record<string, string>>(initial);
  const [result, setResult] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const isVideoTool =
    tool.slug === "video-prompt-generator";

  async function generate() {
    const missing = tool.fields.find(
      (field) =>
        field.required &&
        !form[field.name]?.trim()
    );

    if (missing) {
      setError(
        `Please enter ${missing.label.toLowerCase()}.`
      );
      return;
    }

    setError("");
    setCopied(false);

    /*
     * Video Prompt Generator:
     * Use real AI through our server API.
     */
    if (isVideoTool) {
      setLoading(true);

      try {
        const response = await fetch("/api/generate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data?.error ||
              "AI generation failed. Please try again."
          );
        }

        if (!data?.prompt) {
          throw new Error(
            "AI returned an empty prompt."
          );
        }

        setResult(data.prompt);

        track("tool_generate", {
          tool: tool.slug,
          mode: "ai",
        });
      } catch (err) {
        console.error(err);

        setError(
          err instanceof Error
            ? err.message
            : "AI generation failed. Please try again."
        );
      } finally {
        setLoading(false);
      }

      return;
    }

    /*
     * All other CreatorHub tools continue
     * using the existing free local generator.
     */
    setResult(
      generateToolOutput(tool.slug, form) || ""
    );

    track("tool_generate", {
      tool: tool.slug,
      mode: "free",
    });
  }

  async function copy() {
    if (!result) return;

    await navigator.clipboard.writeText(result);

    track("tool_copy", {
      tool: tool.slug,
    });

    setCopied(true);

    setTimeout(
      () => setCopied(false),
      1800
    );
  }

  function clear() {
    setForm(initial);
    setResult("");
    setError("");
    setCopied(false);
  }

  return (
    <div className="tool-layout">
      <section className="card tool-form-card">
        <div className="form-head">
          <div>
            <span className="eyebrow">
              INPUTS
            </span>

            <h2>
              Tell us what you want to create
            </h2>
          </div>
        </div>

        <div className="form-grid">
          {tool.fields.map((field) => (
            <label
              key={field.name}
              className={
                field.type === "textarea"
                  ? "field field-full"
                  : "field"
              }
            >
              <span>
                {field.label}
                {field.required ? " *" : ""}
              </span>

              {field.type === "textarea" ? (
                <textarea
                  rows={5}
                  value={
                    form[field.name] || ""
                  }
                  placeholder={
                    field.placeholder
                  }
                  onChange={(event) =>
                    setForm({
                      ...form,
                      [field.name]:
                        event.target.value,
                    })
                  }
                />
              ) : (
                <input
                  value={
                    form[field.name] || ""
                  }
                  placeholder={
                    field.placeholder
                  }
                  onChange={(event) =>
                    setForm({
                      ...form,
                      [field.name]:
                        event.target.value,
                    })
                  }
                />
              )}
            </label>
          ))}
        </div>

        {error && (
          <div
            className="form-error"
            role="alert"
          >
            {error}
          </div>
        )}

        <div className="button-row">
          <button
            className="button button-primary"
            onClick={generate}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2
                  size={17}
                  className="spin"
                />
                Generating with AI...
              </>
            ) : (
              <>
                {isVideoTool
                  ? "✨ Generate with AI"
                  : "Generate"}
              </>
            )}
          </button>

          <button
            className="button button-secondary"
            onClick={copy}
            disabled={!result}
          >
            {copied ? (
              <>
                <Check size={17} />
                Copied
              </>
            ) : (
              <>
                <Clipboard size={17} />
                Copy
              </>
            )}
          </button>

          <button
            className="button button-secondary"
            onClick={clear}
          >
            <RotateCcw size={17} />
            Clear
          </button>
        </div>

        <p className="form-note">
          {isVideoTool
            ? "Powered by AI through NaraRouter. Your API key stays securely on the server."
            : "Runs locally in your browser. No paid AI API or account required."}
        </p>
      </section>

      <section
        className="card result-card"
        aria-live="polite"
      >
        <div className="result-head">
          <div>
            <span className="eyebrow">
              RESULT
            </span>

            <h2>
              {result
                ? "Your generated content"
                : "Your generated content will appear here"}
            </h2>
          </div>
        </div>

        {result ? (
          <pre className="result-box">
            {result}
          </pre>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">
              ✦
            </div>

            <p>
              Fill in the inputs and generate
              your content.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

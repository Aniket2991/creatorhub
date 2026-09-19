export type AnalyticsEvent =
  | "tool_view"
  | "tool_generate"
  | "tool_copy"
  | "directory_search"
  | "prompt_copy";

export function track(event: AnalyticsEvent, properties: Record<string, string> = {}) {
  // No analytics provider is connected in the MVP.
  // Keeping the abstraction lets a future provider be added without changing every component.
  if (process.env.NODE_ENV !== "production") {
    console.debug(`[analytics:${event}]`, properties);
  }
}

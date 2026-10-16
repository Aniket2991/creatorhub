# Agent Instructions — CreatorHub

CreatorHub is a Next.js platform for creators, with AI tools, a prompt library, an AI tools directory, and creator resources. It deploys through GitHub to Vercel.

## Required skills
- For React/Next.js implementation and performance work, read `.agents/skills/vercel-react-best-practices/SKILL.md`.
- For UI, accessibility, and UX reviews, read `.agents/skills/web-design-guidelines/SKILL.md`.
- For deployment, API, authentication, environment-variable, and security changes, read `.agents/skills/vercel-deployment-security/SKILL.md`.

## Product and engineering rules
- Inspect existing routes, components, package scripts, and architecture before editing; preserve currently working tools.
- Keep the interface responsive, accessible, fast, and consistent across mobile and desktop.
- AI tools must handle loading, empty, success, timeout, quota, and provider-error states clearly. Never expose private AI provider keys in browser code; make provider calls server-side.
- Treat prompts and user input as untrusted. Validate inputs and handle failures without leaking secrets or stack traces.
- Do not fabricate AI tool capabilities, provider availability, user testimonials, pricing, affiliate relationships, or monetization results.
- Mark affiliate links transparently where applicable; do not add undisclosed tracking or deceptive UI.
- Use relevant, licensed assets and accessible image alternatives; provide fallbacks when images fail.
- Keep secrets in Vercel environment variables and ignored local environment files; never commit credentials.
- Prefer small, focused changes. Run available lint, type-check, tests, and production build and report what actually ran.
- Do not claim a deployment or feature is working without verification.

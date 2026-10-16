---
name: vercel-deployment-security
description: Project-specific deployment and security checklist for this Next.js application on Vercel. Use before changing authentication, API routes, database access, environment variables, dependencies, CI, or production deployment.
---

# Deployment and Security Checklist

## Secrets and environment
- Never commit API keys, tokens, database URLs, passwords, or private credentials.
- Keep secrets in Vercel Environment Variables and local ignored environment files; expose only intentionally public values prefixed with `NEXT_PUBLIC_`.
- Never print secret values in logs, test output, or responses. If a secret is exposed, recommend rotation.

## Application security
- Validate and normalize all untrusted input on the server.
- Authenticate protected operations and authorize each resource access; do not rely on client-side checks.
- Use Prisma queries safely and avoid raw SQL unless parameterized.
- Return generic client-facing errors; log useful diagnostics without sensitive data.
- Add rate limits or abuse controls to public endpoints where appropriate.
- Avoid rendering untrusted HTML. Sanitize any intentionally supported rich content.
- Use secure, HttpOnly, SameSite cookies for session material when applicable.
- Review dependency advisories and update vulnerable packages with compatible versions.

## Deployment discipline
- Inspect changed files and current project conventions before editing.
- Run available lint, type-check, tests, and production build; report any checks that could not run.
- Confirm required environment variables are configured for the target environment without revealing values.
- Prefer a preview deployment and smoke-test key routes before production promotion.
- Do not run destructive database commands, reset production data, or change production environment variables without explicit approval.
- Check Vercel build and runtime logs for regressions after deployment.
- Do not claim deployment or tests succeeded unless tool output confirms it.

## Reporting
- Summarize changed files, checks run, unresolved risks, and deployment status.

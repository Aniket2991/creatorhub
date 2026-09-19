# CreatorHub

CreatorHub is a production-quality Next.js MVP for creators, freelancers, online sellers and small businesses. The first version uses **no paid AI APIs**: its eight generators run entirely in the browser with structured templates and deterministic generation logic.

## Included

- Next.js App Router + TypeScript + React
- Tailwind CSS 4 via the current PostCSS setup
- Lucide React icons
- Dark/light mode
- Eight working tools
- AI tools directory with searchable/filterable sample data
- Prompt library with copy functionality
- Resources, About, Contact, Pricing, Privacy and Terms pages
- SEO metadata, Open Graph metadata, sitemap and robots
- Brand config in `lib/config.ts`
- `.env.example` for future integrations
- No authentication required
- No fake testimonials, reviews, user counts, ad placements or affiliate relationships


## File structure

```text
CreatorHub/
├─ app/
│  ├─ page.tsx
│  ├─ layout.tsx
│  ├─ globals.css
│  ├─ tools/
│  │  ├─ page.tsx
│  │  └─ [slug]/page.tsx
│  ├─ ai-tools/page.tsx
│  ├─ prompts/page.tsx
│  ├─ resources/page.tsx
│  ├─ about/page.tsx
│  ├─ contact/page.tsx
│  ├─ pricing/page.tsx
│  ├─ privacy/page.tsx
│  ├─ terms/page.tsx
│  ├─ robots.ts
│  ├─ sitemap.ts
│  └─ not-found.tsx
├─ components/
│  ├─ header.tsx
│  ├─ footer.tsx
│  ├─ ui.tsx
│  ├─ theme-provider.tsx
│  ├─ theme-toggle.tsx
│  ├─ tool-client.tsx
│  ├─ ai-directory.tsx
│  ├─ prompt-library.tsx
│  └─ contact-form.tsx
├─ lib/
│  ├─ config.ts
│  ├─ tool-data.ts
│  └─ generators.ts
├─ .env.example
├─ .gitignore
├─ eslint.config.mjs
├─ next.config.mjs
├─ postcss.config.mjs
├─ package.json
├─ tsconfig.json
├─ next-env.d.ts
└─ README.md
```

## Tool URLs

- `/tools/video-prompt`
- `/tools/image-prompt`
- `/tools/caption`
- `/tools/hashtags`
- `/tools/hooks`
- `/tools/youtube-title`
- `/tools/instagram-bio`
- `/tools/content-ideas`

## Requirements

Use a currently supported Node.js LTS release. Modern Next.js should be developed/deployed on a supported operating system; Windows 7 is not a supported environment for current Node/Next.js tooling.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production build

```bash
npm run build
npm start
```

## GitHub

```bash
git init
git add .
git commit -m "Initial CreatorHub MVP"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/creatorhub.git
git push -u origin main
```

## Vercel

1. Push the project to GitHub.
2. Import the repository into Vercel.
3. Keep the default Next.js build settings.
4. Add `NEXT_PUBLIC_SITE_URL` with your production domain.
5. Deploy.

For a custom domain, open the Vercel project → Settings → Domains and add the domain you own. Then update DNS at your domain registrar using Vercel's displayed records.

## Future AI APIs

Keep provider secrets server-side. Add API keys to environment variables and introduce server-side route handlers or server actions. Do not put secret keys in client components or `NEXT_PUBLIC_*` variables.

A practical future split is:

- browser tool → collect inputs
- server action/API route → call provider
- return structured output
- optional saved history → database/auth later

## Analytics

`lib/analytics.ts` provides a no-op event abstraction so a real provider can be connected later without scattering vendor calls throughout components.

## Advertising

Add a real ad network only after traffic and policy requirements are reviewed. Put ad placements behind a reusable component so the layout can remain clean.

## Affiliate links

Create a small data field for an official affiliate URL only after a real affiliate relationship exists. Keep normal official links separate from affiliate links and disclose commercial relationships where required.

## Razorpay later

A future paid flow should use a server-side Razorpay order creation step and a server-side signature/payment verification step. Never trust a client-only payment success state.

## Rename CreatorHub

Edit `lib/config.ts`:

```ts
export const siteConfig = {
  name: "CreatorHub",
  tagline: "Create. Publish. Grow. With AI.",
  description: "...",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  social: { instagram: "", youtube: "", x: "" }
};
```

Update any product-specific copy you want in `README.md` and page content. Navigation and footer branding already read from the central config.

## Monetization roadmap

The project is structured for:

- advertising
- affiliate links
- sponsored listings
- digital prompt packs
- CreatorHub PRO subscriptions

Current digital-product cards are intentionally marked **Coming Soon** and do not accept payment.

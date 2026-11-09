# yourlimitedcompany

Coming soon landing page for **yourlimitedcompany** - company formation, digital presence and business support for international entrepreneurs.

Static Vite + TypeScript site, ready for **GitHub Pages**.

## Quick start

```bash
npm install
cp .env.example .env
npm run dev
```

## Analytics & Search Console

Set these in `.env` (local) and as GitHub Actions secrets (deploy):

| Variable / Secret | Example | Purpose |
| --- | --- | --- |
| `VITE_GA_MEASUREMENT_ID` / `GA_MEASUREMENT_ID` | `G-XXXXXXXXXX` | Google Analytics 4 |
| `VITE_GSC_VERIFICATION` / `GSC_VERIFICATION` | verification string only | Search Console HTML tag |

Tracked click events in GA4:
- `whatsapp_click`
- `email_click`
- `cta_click`
- `enquire_click`
- `link_click` / `outbound_click`

In GA4: **Reports → Engagement → Events** (or DebugView while testing).

Search Console setup:
1. Add URL prefix property `https://yourlimitedcompany.co.uk`
2. Choose **HTML tag** verification
3. Copy only the `content` value into `VITE_GSC_VERIFICATION`
4. Deploy, then click Verify
5. Submit sitemap: `https://yourlimitedcompany.co.uk/sitemap.xml`

## SEO included

- `robots.txt` + `sitemap.xml`
- Canonical URLs + Open Graph / Twitter meta
- JSON-LD schema: Organization, WebSite, WebPage, ProfessionalService, Breadcrumbs
- `site.webmanifest` + apple-touch-icon
- Semantic sections on the landing page

## Deploy to GitHub Pages

### Option A - GitHub Actions (recommended)

1. Push to `main`.
2. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. The workflow in `.github/workflows/deploy.yml` builds and publishes `dist`.

### Option B - Manual

```bash
npm run deploy
```

### Custom domain

Point your domain (for example `yourlimitedcompany.co.uk`) to GitHub Pages, then add a `CNAME` file in `public/` if needed:

```text
yourlimitedcompany.co.uk
```

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Local development server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build |
| `npm run deploy` | Build and publish with `gh-pages` |

## Stack

- Vite
- TypeScript
- Outfit + IBM Plex Sans

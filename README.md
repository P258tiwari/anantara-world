# ANANTARA WORLD public website

Production-ready, mobile-first marketing website for **ANANTARA WORLD** by **Mahadev Developers**, built with Next.js App Router, React, TypeScript, Tailwind CSS and vinext for Cloudflare-compatible deployment.

## Requirements

- Node.js 22.13 or newer
- npm

## Local setup

```bash
npm install
copy .env.example .env.local
npm run dev
```

Open the local URL printed by the development server.

## Environment variables

The enquiry endpoint supports Resend without storing leads in a database:

- `RESEND_API_KEY`: server-side Resend API key
- `CONTACT_TO_EMAIL`: approved enquiry recipient
- `CONTACT_FROM_EMAIL`: sender on a verified domain

Optional analytics placeholders are documented in `.env.example`. Keep them inactive until identifiers and consent behaviour receive approval.

## Temporary imagery

Every temporary reference image is centralized in `app/data.ts`. Replace its URLs with official approved renders before public launch. The generated `public/og.png` is an artistic social-preview image, not an official project render.

## Quality checks

```bash
npm run build
npm run typecheck
npm run lint
npm test
```

## Deployment

The repository includes `.openai/hosting.json` and the Sites-compatible Vite configuration. It can be published through OpenAI Sites after a successful build. For another Cloudflare workflow, deploy the generated worker output with the required environment variables configured as secrets.

Before launch, replace all content labelled “Awaiting approval”, add approved legal/RERA information and public documents, verify location distances, connect the enquiry sender domain, and complete final legal and accessibility review.


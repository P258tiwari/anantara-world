# Production Readiness Audit

Audit date: 10 September 2026

## Overall Status

READY WITH CONFIGURATION

## Executive Summary

ANANTARA WORLD is a React 19 and TypeScript marketing website built with the vinext App Router and Vite for Cloudflare-compatible deployment. The public application has 17 static routes, five current dynamic editorial routes, one enquiry API, local WebP/SVG/PNG media, and optional Resend email delivery. It has no active authentication, admin panel, payment flow, application database, file upload, CMS, queue, cron job, or persistent writable storage.

All repository-level P0/P1 defects found during this audit were fixed. The production build, lint, TypeScript, full route rendering, internal-link, local-image, 404, API rejection, security-header, robots/sitemap, and metadata checks pass.

The code is ready for a release candidate, but commercial launch still requires external configuration and approved business/legal content. In particular, production Resend values must be configured and tested, and the pages visibly labelled as sample, demo, placeholder, awaiting confirmation, or awaiting legal approval must be replaced, approved, or intentionally withheld before launch.

## Architecture

- Framework: vinext App Router (`vinext` 1.0.0-beta.9), compatible with Next.js App Router APIs
- UI: React 19.2.8, React DOM 19.2.8, TypeScript 5.9
- Build: Vite 8.3 with the Cloudflare Vite plugin
- Runtime: Node.js 22.13+ for build/local start; Cloudflare Worker for managed hosting
- Package manager: npm with `package-lock.json`
- Styling: global CSS with Tailwind CSS/PostCSS available; no runtime CSS-in-JS
- Backend: one App Router endpoint at `POST /api/enquiry`
- Email: Resend REST API, server-side only
- Data: local static TypeScript data; no active D1 binding (`.openai/hosting.json` has `d1: null`)
- Media: repository-local files under `public/`
- Analytics: not implemented; optional identifiers are placeholders only

## Critical Issues Fixed

### Enquiry delivery could fail silently in production

- File: `app/api/enquiry/route.ts`
- Problem: missing Resend configuration returned success, which could make a visitor believe an enquiry was delivered when it was discarded.
- Fix: production now returns HTTP 503 with a safe contact fallback. Development retains a non-sensitive diagnostic message without logging submitted personal data.

### Enquiry endpoint hardening gaps

- File: `app/api/enquiry/route.ts`
- Problem: malformed Origin values could throw, request bodies had no explicit size ceiling, UTM objects were not normalized, the upstream email call had no timeout, and the in-memory rate-limit map could grow without a bound.
- Fix: safe same-origin parsing, 32 KB request limit, bounded/sanitized attribution fields, 10-second Resend timeout, bounded rate-limit records, no-store API responses, and consistent safe error responses were added.

### Client form validation and request lifecycle

- File: `app/components/Forms.tsx`
- Problem: `noValidate` bypassed browser validation feedback, duplicate submissions relied only on render timing, and requests had no client timeout.
- Fix: native constraint reporting is invoked explicitly, loading submissions are ignored, a 12-second abort timeout is used, buttons remain disabled while sending, and the form exposes `aria-busy`.

### Vulnerable framework/tooling versions

- Files: `package.json`, `package-lock.json`
- Problem: the audit identified advisories affecting React Server Components, vinext image tooling, Vite, Wrangler/Miniflare dependencies, and build transitive packages.
- Fix: React/React DOM/React Server DOM were moved to 19.2.8; vinext to beta.9; Vite to 8.3; the RSC plugin, Cloudflare Vite plugin, Wrangler, Worker types, and non-breaking transitive dependencies were updated. `npm audit --omit=dev` now reports zero vulnerabilities.

### TypeScript release check was broken

- Files: `package.json`, `tsconfig.json`, `worker-configuration.d.ts`
- Problem: no script exposed the typecheck and Cloudflare Worker/D1 types were unresolved.
- Fix: added `npm run typecheck`, official Worker typings, the optional (currently unbound) D1 interface, and Vite-compatible TypeScript import configuration.

### Missing baseline response security headers

- File: `worker/index.ts`
- Problem: production responses did not set an application-level baseline.
- Fix: added `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, and `Permissions-Policy` to Worker responses. Production hosts also receive HSTS and a CSP covering current self-hosted assets and the OpenStreetMap iframe.

### Overlay keyboard accessibility

- Files: `app/components/Header.tsx`, `app/components/Gallery.tsx`
- Problem: the mobile menu and image lightbox lacked complete focus management.
- Fix: added initial focus, focus containment, Escape handling, focus restoration, background scroll locking, dialog semantics, and `inert` handling for the closed mobile menu.

### Runtime error handling

- File: `app/error.tsx`
- Problem: no route-segment error boundary existed.
- Fix: added a branded, user-safe recovery screen with retry and homepage actions. The existing custom 404 remains active.

### Test coverage and repository hygiene

- Files: `tests/rendered-html.test.mjs`, `.gitignore`, `vite.config.ts`
- Problem: only two pages were tested; runtime links/assets/API/security/SEO were not covered; local logs and TypeScript build info were not ignored; Vite emitted future native-loader warnings.
- Fix: expanded to eight production tests, added generated-file ignore rules, and updated Vite config imports for native-loader compatibility.

## Security Review

Checked for embedded credentials, unsafe browser-exposed secrets, injection paths, XSS, CSRF/origin handling, open redirects, file uploads, authentication/authorization, CORS, sensitive logging, error leakage, dependency advisories, cookies/storage, and security headers.

No hardcoded private secrets were found in tracked source. `.env.local` is ignored, and only its variable names—not values—were inspected. Form content is normalized before use and sent as plain-text email. There is no SQL/NoSQL query surface, authentication, session, JWT, upload, payment, or admin surface in the active site.

Remaining considerations:

- The application-level rate limiter is best-effort per Worker isolate. Configure Cloudflare WAF/rate limiting for `/api/enquiry` before paid traffic or a public campaign.
- The CSP permits inline scripts/styles because the current vinext render output contains inline bootstrap/metadata content. A nonce-based policy is a later hardening opportunity.
- The full development-tool audit still reports eight advisories in Miniflare/Sharp and the unused Drizzle CLI chain. The production dependency audit reports zero. No safe non-breaking audit resolution is currently offered; forced npm downgrades were intentionally not applied.

## Performance Review

The homepage LCP image is a local 1672×941 WebP of approximately 584 KB and is eagerly loaded with high fetch priority. Below-fold editorial and gallery images are lazy-loaded and decoded asynchronously. Fonts are locally emitted by the build. Images use stable CSS containers/aspect ratios to limit layout shift.

Large source assets remain: the campaign hero is about 1.2 MB, some below-fold renders are 650 KB–1.35 MB, and the social preview PNG is about 1.9 MB. These are not launch blockers on their own, but responsive derivatives or an approved image CDN pipeline should be added after visual QA. The current `imageSrcSet` helper does not generate smaller variants, so it should not be described as full responsive image delivery.

## SEO Review

- Unique titles, non-empty descriptions, and canonical URLs are verified automatically for all current indexable static routes.
- Canonicals, sitemap, robots, Open Graph, Twitter metadata, favicons, site name, language, and organization/site/place structured data use `https://anantara.world`.
- Robots excludes `/thank-you` and `/api/`; dynamic demo story metadata is `noindex`.
- Local image paths and alt text are present and case-correct.
- Sitemap and robots endpoints render successfully and contain no development origin.

SEO content risk remains: sample/demo/placeholder listing pages are still publicly reachable and some are indexable. Replace or intentionally noindex/withhold those pages before launch based on the approved publishing decision.

## Responsive / UI Review

The source implements responsive states at 1120 px, 768 px, and 430 px, plus fluid `clamp()` sizing and global horizontal-overflow protection. Mobile navigation, grids, forms, gallery, floor plans, fixed enquiry control, cookie banner, and footer have dedicated responsive rules. Touch controls meet or approach the 44 px target in the audited components.

Automated in-app browser viewport inspection could not run because the Windows browser sandbox failed to start. Do not treat the source-level responsive review as a substitute for final device QA. The deployment checklist therefore requires explicit checks at 320, 360, 375, 390, 430, 768, 1024, 1280, 1440, and 1920 px in modern Chrome/Edge plus Safari/iOS and Android Chrome.

## Forms / APIs

Active forms: standard enquiry, visit request, and campaign enquiry. All submit to `POST /api/enquiry` and share the same validated component. Required name, phone, email, and consent checks exist client- and server-side. The endpoint includes same-origin enforcement, honeypot and timing checks, bounded best-effort rate limiting, request-size limits, sanitization, upstream timeout/error handling, and safe HTTP status codes.

No real email was sent during the audit. Production delivery must be tested after configuring a verified Resend sender and recipient. The `/thank-you` route is currently not used by the form, which displays an inline success state instead.

## Production Build

- Command: `npm run build`
- Result: PASS using vinext/Vite 8.3

## Tests

- `npm run typecheck`: PASS
- `npm run lint`: PASS with zero errors and zero warnings
- `npm test`: PASS; includes a fresh production build and eight tests
- All static routes and current dynamic story routes: PASS
- Internal rendered links: PASS
- Local image existence/case check: PASS
- Custom static and dynamic 404s: PASS
- Hostile, malformed, invalid, and oversized enquiry requests: PASS
- Production security headers: PASS
- Robots/sitemap canonical origin: PASS
- Unique titles, descriptions, and canonicals: PASS
- `npm audit --omit=dev`: zero vulnerabilities
- External UP RERA and OpenStreetMap URLs: HTTP 200 on audit date

## Environment Variables Required

| Variable | Purpose | Required |
| -------- | ------- | -------- |
| `RESEND_API_KEY` | Server-side Resend API authentication | Yes |
| `CONTACT_TO_EMAIL` | Approved recipient for website enquiries | Yes |
| `CONTACT_FROM_EMAIL` | Sender on a Resend-verified domain | Yes |
| `NEXT_PUBLIC_GA4_ID` | Future Google Analytics identifier; no script is currently implemented | No |
| `NEXT_PUBLIC_GOOGLE_ADS_ID` | Future Google Ads identifier; no script is currently implemented | No |
| `NEXT_PUBLIC_META_PIXEL_ID` | Future Meta Pixel identifier; no script is currently implemented | No |

## Deployment Requirements

- Runtime/build host: Node.js 22.13 or newer
- Package manager/install: `npm ci`
- Validation: `npm run typecheck`, `npm run lint`, `npm test`
- Build: `npm run build`
- Local/self-hosted start: `npm run start`
- Default application port: 3000 unless the hosting runtime overrides it
- Preferred hosting: the configured Cloudflare/Sites Worker workflow
- Database: none active; no migrations required
- Persistent storage/uploads: none
- Queue/cron/webhooks: none
- Environment: the three Resend/contact variables above
- Reverse proxy/process manager: not required for managed Cloudflare deployment; required only for a self-hosted Node deployment
- SSL: required; keep HTTP redirected to HTTPS
- Canonical domain: `anantara.world`; choose and enforce one www/non-www host

## Manual Actions Before Going Live

1. In Resend, verify the exact sender domain and complete its DNS records. Configure `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL` as production secrets in the hosting dashboard.
2. Deploy to a non-public preview and submit one controlled enquiry. Confirm one recipient email, correct Reply-To, no duplicate delivery, and a useful error state when delivery is unavailable.
3. Obtain final legal approval for the privacy policy, RERA/project identity, QR/certificate, sanction details, fire NOC, statutory disclaimers, residence terminology, and any public downloadable documents.
4. Replace, approve, hide, or noindex all visible sample/demo/placeholder/awaiting content: news, construction updates, media coverage, downloads, leadership, office timings, social channels, location distances, and related detail routes.
5. Confirm `anantara.world` DNS, SSL, apex/www preference, redirect behavior, and Cloudflare production route. Verify `/robots.txt`, `/sitemap.xml`, `/favicon.svg`, `/og.png`, and a deliberately invalid URL after deployment.
6. Configure a Cloudflare WAF/rate-limit rule for `POST /api/enquiry` (for example, a conservative per-IP burst limit) and monitor 403/413/429/502/503 responses.
7. Perform the viewport/browser matrix listed in the Responsive section, including menu, gallery keyboard flow, floor-plan controls, forms, cookie banner, and sticky mobile enquiry control.
8. If analytics/advertising is approved, implement it behind consent, update the CSP allowlist, populate only the required public IDs, and verify that development traffic and duplicate pageviews are excluded.
9. Submit the production sitemap in the relevant search engine consoles after placeholder content decisions are complete.
10. Review production logs immediately after launch without logging submitted personal data.

## Remaining Non-Blocking Improvements

- Generate approved responsive image variants or configure a production image transformation pipeline.
- Replace the inline-compatible CSP with a nonce/hash-based policy when the framework deployment supports it cleanly.
- Replace isolate-local rate limiting with Cloudflare-managed durable enforcement.
- Remove or archive the unused ChatGPT auth, D1/Drizzle example, and duplicated legacy image assets after the product owner confirms they will not be used.
- Decide whether to route successful enquiries to `/thank-you` or remove that currently orphaned route.
- Add browser-driven visual regression tests once the browser automation environment is available.

## Final Verdict

⚠️ READY AFTER REQUIRED CONFIGURATION

The repository is stable and passes the expanded automated release suite with no known P0/P1 code defect. Do not launch commercially until production email delivery and the explicitly listed legal/content approvals are completed and a final real-device/browser pass is signed off.
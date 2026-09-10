# ANANTARA WORLD Deployment Checklist

## Release candidate

- [ ] Review `PRODUCTION_AUDIT.md` and accept the remaining manual actions.
- [ ] Confirm all approved UI/content changes are present in the release branch.
- [ ] Confirm no real `.env` file, log, private key, or credential is staged.
- [ ] Run `npm ci` with Node.js 22.13 or newer.
- [ ] Run `npm run typecheck` and confirm it passes.
- [ ] Run `npm run lint` and confirm zero errors/warnings.
- [ ] Run `npm test` and confirm the production build and all tests pass.
- [ ] Run `npm audit --omit=dev` and review any new production advisory.

## Required content and legal approval

- [ ] Replace or intentionally withhold every sample/demo/placeholder news and update entry.
- [ ] Add only approved RERA identity, registration number, QR/certificate, sanctions, and fire NOC information.
- [ ] Publish only approved brochure and public documents; verify each download opens correctly.
- [ ] Complete legal sign-off for privacy, consent, project, image, area, and terms copy.
- [ ] Confirm leadership names/biographies or hide the placeholder module.
- [ ] Confirm office timings and official social channels or remove those placeholders.
- [ ] Confirm location routes/distances before publishing them as facts.
- [ ] Confirm all project facts, residence labels, floor plans, renders, and captions are approved for public use.

## Production environment

- [ ] Verify the Resend sender domain and its DNS records.
- [ ] Add `RESEND_API_KEY` as a server-side production secret.
- [ ] Add the approved `CONTACT_TO_EMAIL` value.
- [ ] Add the verified `CONTACT_FROM_EMAIL` value.
- [ ] Leave optional analytics variables empty unless the integration and consent flow are approved and implemented.
- [ ] Confirm `.env.local` is not uploaded or committed.

## Cloudflare / hosting

- [ ] Upload or pull the exact reviewed release commit.
- [ ] Use the repository Cloudflare/Sites Worker configuration and keep D1/R2 disabled unless the application is intentionally extended.
- [ ] Run the production build: `npm run build`.
- [ ] Configure the production Worker route/domain.
- [ ] Point DNS for the approved apex/www host.
- [ ] Provision and verify SSL/TLS.
- [ ] Redirect HTTP to HTTPS.
- [ ] Choose apex or www as canonical and redirect the alternate consistently.
- [ ] Add a Cloudflare WAF/rate-limit rule for `POST /api/enquiry`.
- [ ] Confirm application security headers are present on the production host.
- [ ] If self-hosting instead, run `npm run start` behind a supervised Node process and HTTPS reverse proxy on port 3000.

## Production smoke test

- [ ] Open the homepage over HTTPS and confirm the final hero image/logo load.
- [ ] Check every primary header and footer navigation link.
- [ ] Check `/anantara-world`, `/residences`, `/amenities`, `/landscape`, `/location`, and `/gallery`.
- [ ] Check `/construction-updates`, `/news-and-events`, `/media-coverage`, and `/downloads` after placeholder decisions.
- [ ] Test all nine floor plans, tower/floor tabs, arrows, and full-image links.
- [ ] Test gallery filters, open/previous/next/close, Escape, Tab containment, and focus return.
- [ ] Test mobile menu open/close, Escape, keyboard loop, focus return, and body scroll lock.
- [ ] Submit one controlled enquiry and confirm exactly one email arrives.
- [ ] Confirm invalid phone/email, missing consent, duplicate clicks, slow delivery, and server failure show usable errors.
- [ ] Confirm telephone, email, map, UP RERA, privacy, and brochure/document links.
- [ ] Open an invalid URL and verify the custom 404 without a stack trace.
- [ ] Verify `/robots.txt` and `/sitemap.xml` use `https://anantara.world`.
- [ ] Verify favicon and social preview metadata on the deployed host.
- [ ] Confirm the cookie preference banner stores and respects each choice.

## Responsive and browser sign-off

- [ ] Check at 320 px.
- [ ] Check at 360 px.
- [ ] Check at 375 px.
- [ ] Check at 390 px.
- [ ] Check at 430 px.
- [ ] Check at 768 px.
- [ ] Check at 1024 px.
- [ ] Check at 1280 px.
- [ ] Check at 1440 px.
- [ ] Check at 1920 px.
- [ ] Check current Chrome and Edge.
- [ ] Check current Firefox.
- [ ] Check Safari and iOS Safari.
- [ ] Check Android Chrome.
- [ ] Confirm no horizontal scrolling, clipped headings, overlapping fixed controls, form zoom, keyboard obstruction, or broken image crops.

## Post-launch

- [ ] Review Worker/application logs for 4xx/5xx errors without exposing enquiry data.
- [ ] Verify Resend delivery and bounce status.
- [ ] Verify Cloudflare rate-limit behavior does not block normal users.
- [ ] Submit the final sitemap to search engines after placeholder pages are resolved.
- [ ] Run a production Lighthouse/Core Web Vitals check and review the campaign hero, large renders, and social preview asset.
- [ ] Record the deployed commit, deployment time, owner, and rollback point.
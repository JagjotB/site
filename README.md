# The Art of Us

Private Edition 01/01 is a mobile-first Next.js experience paired with a handcrafted six-object keepsake collection. Seven ordinary HTTPS NFC records open the invitation, five public artifact chapters, and one unguessable private-link finale.

The experience is intentionally self-contained: no database, user accounts, analytics, Web NFC, paid APIs, or remote inference services. The final handwritten letter is never stored in the application.

## Experience map

| Tag | Destination | Purpose |
| --- | --- | --- |
| 01 | `/invite` | Key-box invitation |
| 02 | `/collection/tomorrow` | Future-memory reveal |
| 03 | `/collection/in-focus` | Mechanical iris |
| 04 | `/collection/the-promise` | Sealed correspondence |
| 05 | `/collection/the-details` | Editorial observation cards |
| 06 | `/collection/my-voice` | Private voice message to keep for later |
| 07 | `/access/[token]` | Private-link tray reveal |

The first six destinations work independently and in any order. The collection hub links to the five ordinary artifacts. It never exposes Tag 07.

## Local development

Requirements: Node.js 22.13 or newer and npm.

```bash
npm install
copy .env.example .env.local
npm run dev
```

Generate a long private token before testing the finale:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"
```

Set that value as `PRIVATE_ACCESS_TOKEN` in `.env.local`, then open `/access/YOUR_TOKEN`.

## Commands

```bash
npm run typecheck
npm run lint
npm run build
npm run test:e2e
npm run nfc:links
npm run nfc:links -- --include-private
```

`nfc:links` requires `NEXT_PUBLIC_SITE_URL` to be a deployed HTTPS origin. Tag 07 is withheld unless `--include-private` is supplied.

## Editing and deployment

- [CONTENT_GUIDE.md](./CONTENT_GUIDE.md) — copy, future artwork, real audio, waveform, and transcript.
- [NFC_SETUP.md](./NFC_SETUP.md) — programming and installing all seven tags.
- [DEPLOYMENT.md](./DEPLOYMENT.md) — Vercel and environment configuration.
- [PHYSICAL_FINALE_GUIDE.md](./PHYSICAL_FINALE_GUIDE.md) — creator-only continuity notes for the physical ending.

## Privacy boundary

The private token is checked only on the server with a timing-safe comparison and the private route is `noindex`/`nofollow`. This is an unguessable possession link, not identity authentication: anyone who obtains the URL can open it. Do not commit `.env.local`, printed Tag 07 URLs, private audio drafts, or the handwritten letter.

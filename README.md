# The Art of Us

Private Edition · 01/01 is a mobile-first Next.js experience paired with a handcrafted six-object keepsake chest. Seven standard HTTPS NFC records open one invitation, five public artifact chapters, and one unguessable private-link finale.

The experience is self-contained: no database, accounts, analytics, Web NFC, paid APIs, or remote inference. The handwritten finale is never stored in the application.

## Experience map

| Tag | Destination | Physical object |
| --- | --- | --- |
| 01 | `/invite` | Small wooden key box |
| 02 | `/collection/the-archive` | Miniature vintage-style camera |
| 03 | `/collection/the-way-out` | Mechanical iris and architectural fragment |
| 04 | `/collection/the-promise` | Black-and-gold shell with handwritten note |
| 05 | `/collection/the-details` | Ivory accordion booklet |
| 06 | `/collection/my-voice` | Sound-wave plaque |
| 07 | `/access/[token]` | Only You credential |

The first six destinations work independently and in any order. The collection links to the five public chapters and never exposes Tag 07. Legacy URLs for `/collection/tomorrow` and `/collection/in-focus` permanently redirect to the new canonical chapters.

## Local development

Use Node.js 22.13 or newer.

```bash
npm install
copy .env.example .env.local
npm run dev
```

Generate a private token:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"
```

Set it as `PRIVATE_ACCESS_TOKEN` in `.env.local`, then open `/access/YOUR_TOKEN`.

## Validation

```bash
npm run typecheck
npm run lint
npm run build
npm run test:e2e
npm run nfc:links
npm run nfc:links -- --include-private
```

`nfc:links` requires an HTTPS `NEXT_PUBLIC_SITE_URL`. Tag 07 is withheld unless `--include-private` is explicitly provided.

## Guides

- [CONTENT_GUIDE.md](./CONTENT_GUIDE.md) — shared album, details, voice recording, waveform, and copy.
- [NFC_SETUP.md](./NFC_SETUP.md) — programming and installing all seven tags.
- [DEPLOYMENT.md](./DEPLOYMENT.md) — Vercel and environment configuration.
- [PHYSICAL_FINALE_GUIDE.md](./PHYSICAL_FINALE_GUIDE.md) — creator-only continuity notes.

## Privacy boundary

The private token is validated only on the server with a timing-safe comparison. The route and the whole experience are `noindex`/`nofollow`. This is an unguessable possession link, not identity authentication: anyone who obtains it can open it. Never commit `.env.local`, generated Tag 07 output, private audio drafts, or the handwritten letter.

# Vercel Deployment

## 1. Prepare the environment

Create a cryptographically random private-link token locally:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"
```

Configure these Vercel environment variables for Production (and Preview only if you need private-route previewing):

| Variable | Example | Exposure |
| --- | --- | --- |
| `PRIVATE_ACCESS_TOKEN` | a generated 43+ character token | Server only |
| `NEXT_PUBLIC_SITE_URL` | `https://your-domain.example` | Public origin |

`NEXT_PUBLIC_SITE_URL` must be an HTTPS origin with no path, query, or fragment. Never prefix the private token with `NEXT_PUBLIC_`.

## 2. Deploy

Import the repository into Vercel. The project uses the standard Next.js commands and requires Node.js 22.13 or newer. Set the production domain before programming any NFC tags.

Run locally before release:

```bash
npm ci
npm run typecheck
npm run lint
npm run build
npm run test:e2e
```

## 3. Verify production

Check direct navigation and refresh for:

- `/invite`
- `/collection`
- all five ordinary artifact routes
- `/access/YOUR_PRIVATE_TOKEN`
- an invalid `/access/not-the-token` URL, which must return the designed not-found state

Confirm `robots.txt` and page metadata remain `noindex`/`nofollow`, no analytics have been added, and no public link points to `/access/`.

## 4. Generate NFC destinations

With production environment variables available locally:

```bash
npm run nfc:links
```

This prints Tags 01–06. Print the seventh destination only in a private terminal session:

```bash
npm run nfc:links -- --include-private
```

Do not paste the Tag 07 output into documentation, issues, screenshots, analytics, or source control. The URL is unguessable, not authenticated; possession of the URL is sufficient to open it.

## 5. Long-term voice access

The waveform plaque points to a normal web route. Keep the Vercel project, domain, and configured audio file online for the link to continue working. A browser page is not an offline archive. If the domain changes, rewrite and retest all seven tags.

Deployment is complete only after the production build and direct links are verified on real mobile devices. Physical NFC behavior must be tested with the final assembled objects; automated browser tests cannot validate radio performance.

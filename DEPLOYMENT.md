# Vercel Deployment

The production project currently uses `https://site-pink-ten-14.vercel.app` and is connected to `JagjotB/site`.

## Environment

Generate a private-link token locally:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"
```

Configure these variables in Vercel Production (and Preview only when needed):

| Variable | Value | Exposure |
| --- | --- | --- |
| `PRIVATE_ACCESS_TOKEN` | A generated 43+ character token | Server only |
| `NEXT_PUBLIC_SITE_URL` | `https://site-pink-ten-14.vercel.app` or the final custom domain | Public origin |

The site URL must be an HTTPS origin without a path, query, or fragment. Never prefix the private token with `NEXT_PUBLIC_`.

## Validate and deploy

```bash
npm ci
npm run typecheck
npm run lint
npm run build
npm run test:e2e
git push origin main
```

The connected Vercel project should build the push automatically. Confirm the deployment succeeded before programming tags.

## Verify production

Open and refresh:

- `/invite`
- `/collection`
- `/collection/the-archive`
- `/collection/the-way-out`
- `/collection/the-promise`
- `/collection/the-details`
- `/collection/my-voice`
- `/access/YOUR_PRIVATE_TOKEN`
- `/access/not-the-token` (must show the designed not-found state)

Also confirm the two legacy public URLs redirect, `robots.txt` and metadata remain `noindex`/`nofollow`, no analytics have been added, and no public page links to `/access/`.

## Generate NFC destinations

```bash
npm run nfc:links
npm run nfc:links -- --include-private
```

The first command prints Tags 01–06. Run the private form only in a private terminal session. The seventh URL is unguessable, not authenticated; anyone with it can open the page.

## Long-term access

Keep the Vercel project, domain, shared album, and configured audio file online for these keepsakes to work over time. A normal webpage does not guarantee offline audio. If the domain changes, rewrite and retest all seven tags.

Automated browser checks cannot validate radio behaviour. Deployment is complete only after the production build, direct routes, and final assembled NFC objects have been checked on real phones.

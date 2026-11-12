# Seven-Tag NFC Installation Guide

Each tag contains one standard NDEF HTTPS URL record. The phone’s operating system reads it and opens the route; the website does not use Web NFC and cannot distinguish a scan from a normal visit.

## Destinations and placement

| Tag | Physical placement | URL path |
| --- | --- | --- |
| 01 | Inside lid of the small wooden key box | `/invite` |
| 02 | Inside or behind the miniature camera body | `/collection/the-archive` |
| 03 | Beneath the iris housing, clear of moving parts | `/collection/the-way-out` |
| 04 | On or inside a non-metallic area of the shell container | `/collection/the-promise` |
| 05 | Behind the miniature accordion booklet | `/collection/the-details` |
| 06 | Beneath the sound-wave plaque | `/collection/my-voice` |
| 07 | Concealed inside the Only You credential | `/access/YOUR_PRIVATE_TOKEN` |

The public artifacts can be scanned in any order. Tag 07 does not depend on visiting another chapter or playing the recording.

## Choose suitable tags

Use genuine NTAG213, NTAG215, or NTAG216 stickers from a reputable supplier. These URLs fit on NTAG213; the larger models add capacity. Antenna size matters more than memory here, so use the largest tag the object can hide cleanly.

Ordinary tags perform poorly against metal, conductive foil, carbon-filled material, metal-pigmented paint, and some metallic filaments. Use ferrite-backed/on-metal tags when separation is impossible. PLA, PETG, paper, and dry wood are normally radio-transparent, but thickness and pigment vary—test the finished materials.

## Generate the exact URLs

Set the production origin and private token in `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=https://site-pink-ten-14.vercel.app
PRIVATE_ACCESS_TOKEN=your-long-random-token
```

Then run:

```bash
npm run nfc:links
npm run nfc:links -- --include-private
```

The normal command prints Tags 01–06. The explicit flag is required for Tag 07. Never save, screenshot, or commit the private output.

## Write each tag

1. Install a reputable NFC-writing app on iPhone or Android.
2. Choose **Write**, then add one **URL/URI** record.
3. Paste the complete generated HTTPS URL. Do not add a contact card, plain-text record, app deep link, or Web NFC payload.
4. Hold the phone at the tag’s antenna until writing completes.
5. Read the tag in the app and verify exactly one NDEF URL record with the intended path.
6. Lock it read-only only after the production domain and assembled object have been tested. Locking is permanent.

## Test on iPhone

1. Wake and unlock a current iPhone; a separate app should not be necessary for background URL reading.
2. Move the top edge/back of the phone slowly over the object and pause for one to two seconds.
3. Tap the system notification and confirm Safari opens the exact canonical route.
4. Refresh, navigate back, and scan again.
5. Repeat through the final object with the normal phone case installed.

## Test on Android

1. Confirm NFC is enabled in system settings.
2. Wake and unlock the phone.
3. Move the rear antenna area—often near the upper or middle back—slowly over the tag.
4. Open the system prompt and confirm the correct route in Chrome or the chosen browser.
5. Test a second Android model if possible because antenna positions differ.

## Install and retest

- Tag 01: test through the actual wooden lid before permanent adhesive.
- Tag 02: keep it away from metal camera details and test through the complete PETG thickness.
- Tag 03: keep it outside the rotating mechanism and away from fasteners.
- Tag 04: use a non-metallic section or ferrite-backed tag; metallic gold pigment may reduce range.
- Tag 05: avoid telegraphing the sticker through the paper and test through every folded layer.
- Tag 06: place it under a thin, repeatable scan area of the plaque.
- Tag 07: test through the complete credential, including laminate and gold finish.

Mark scan areas only when needed; a tiny reverse-side dot or engraved line is enough. After final assembly, retest every tag on iPhone and Android, with cases on and off and from several approach angles.

## If scanning fails

1. Read the bare tag outside the object.
2. Verify the NDEF record and full HTTPS URL.
3. Reduce material thickness or move the tag closer to the surface.
4. Increase separation from metal, magnets, conductive finishes, and fasteners.
5. Try a larger antenna or ferrite-backed tag.
6. Find the phone’s antenna location and remove magnetic/metal cases.
7. Retest before sealing the object.

If the production domain changes, regenerate and rewrite every unlocked tag. Do not rely on legacy redirects as a permanent keepsake strategy.

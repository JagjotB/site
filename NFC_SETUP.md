# Seven-Tag NFC Installation Guide

The tags contain standard NDEF HTTPS URL records. The phone’s operating system reads a tag and opens the URL; the website does not use Web NFC and cannot tell whether a visit came from a scan or a normal link.

## Destinations and placement

| Tag | Physical placement | URL path |
| --- | --- | --- |
| 01 | Inside lid of the small wooden key box | `/invite` |
| 02 | Behind the Tomorrow art print | `/collection/tomorrow` |
| 03 | Beneath the iris housing, clear of moving parts | `/collection/in-focus` |
| 04 | On or inside a non-metallic area of the shell-inspired container | `/collection/the-promise` |
| 05 | Behind the miniature accordion booklet | `/collection/the-details` |
| 06 | Beneath the waveform plaque | `/collection/my-voice` |
| 07 | Concealed inside the Only You credential | `/access/YOUR_PRIVATE_TOKEN` |

The ordinary artifacts can be scanned in any order. Tag 07 does not depend on chapter completion or audio playback.

## Choose suitable tags

Use genuine NTAG213, NTAG215, or NTAG216 stickers from a reputable supplier. These URLs fit comfortably on NTAG213, while NTAG215/216 provide additional capacity. Small round stickers are convenient, but antenna size affects scan range: use the largest tag the object can hide cleanly.

Standard tags perform poorly against metal, conductive foil, carbon-filled material, or metal-pigmented paint. Use an on-metal/ferrite-backed tag if placement near conductive material cannot be avoided. PLA, PETG, paper, and dry wood are usually radio-transparent, but thickness and pigment vary—test the actual assembly.

## Generate exact URLs

Set the final production origin and private token in `.env.local`, then run:

```bash
npm run nfc:links
npm run nfc:links -- --include-private
```

The normal command prints Tags 01–06. The explicit private flag is required for Tag 07. Do not save or commit the private output.

## Program each tag

1. Install a reputable NFC writing application on iPhone or Android.
2. Choose **Write**, add a **URL/URI** record, and paste one complete generated HTTPS URL.
3. Do not add a contact card, plain-text record, app deep link, or Web NFC payload.
4. Hold the phone at the tag’s antenna location until the app reports that writing completed.
5. Re-scan in the app’s read mode and verify the NDEF record contains exactly one intended HTTPS URL.
6. Lock a tag read-only only after the production domain and route have been tested. A locked tag cannot be corrected later.

## Test on iPhone

1. Wake and unlock a recent iPhone; no NFC app should be required for background URL reading.
2. Bring the top edge/back of the phone slowly toward the tag and pause for one to two seconds.
3. Tap the system notification.
4. Confirm Safari opens the correct direct route, refresh succeeds, and browser Back works.
5. Repeat through the final object material and note the most reliable scan position.

## Test on Android

1. Confirm NFC is enabled in system settings.
2. Wake and unlock the phone.
3. Move the rear antenna area—often near the upper or central back—slowly over the tag.
4. Open the system prompt and confirm Chrome or the chosen browser reaches the exact route.
5. Test at least one additional Android device if available because antenna positions differ.

## Install and retest

- Tag 01: test through the actual wooden lid before adhesive is permanent.
- Tag 02: protect the print surface; avoid metallic photo backing or foil mounts.
- Tag 03: keep the tag outside the rotating mechanism and away from metal fasteners.
- Tag 04: use a non-metallic section or ferrite-backed tag. Metallic pigment can reduce range even in printed plastic.
- Tag 05: keep adhesive from telegraphing through thin paper; test through all folded layers.
- Tag 06: center the tag beneath a thin, clearly understood scan area.
- Tag 07: test through the fully assembled credential, including gold finish and laminate.

Mark scan locations discreetly only where needed—a tiny engraved line, dot, or reverse-side cue is enough. After final assembly, test every tag on both platforms, with the phone case on and off, and from several approach angles.

## If a scan fails

1. Test the bare tag outside the object.
2. Confirm the tag still reads and the NDEF URL is correct.
3. Reduce material thickness or move the tag closer to the surface.
4. Increase distance from metal, magnets, wiring, or conductive finishes.
5. Try a larger antenna or ferrite-backed/on-metal tag.
6. Check the phone’s antenna position and remove a metal or magnetic case.
7. Re-test before gluing the object closed.

If the production domain changes, regenerate all destinations, rewrite every unlocked tag, and repeat direct-link and assembled-object testing. Do not assume a redirect will be permanent enough for a keepsake.

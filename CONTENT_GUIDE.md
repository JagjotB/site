# Content and Media Guide

Recipient-facing wording lives in `src/content/experience.ts`. Optional media and feature availability live in `src/content/assets.ts`. Undefined media paths activate complete, recipient-safe experiences; there are no broken images, dead play buttons, or developer placeholders.

## Before the presentation

Personalize these fields in `experience.ts`:

1. `identity.recipientName` if the name should be used later.
2. `details.observations` with six real, concise observations.
3. `promise.body`, `promise.signature`, and `promise.physicalNote` in your own voice.
4. Invitation and final-reveal wording only if the physical choreography changes.

Keep details specific without inventing facts. The established shared context is Weldon Library, Western University, and approximately two years of dating. Avoid premature declarations, possessive language, or the final girlfriend question.

## Tomorrow artwork

Recommended file:

- Path: `public/media/future/future-memory.webp`
- Format: WebP or AVIF, with a high-quality JPEG fallback if preferred.
- Composition: portrait, ideally 4:5 or 3:4.
- Recommended dimensions: 1600 × 2000 px or similar.
- Target size: under 1.2 MB after export.

The intended scene is an illustrative future memory: a couple viewed from behind on an understated Italian lakeside terrace at golden hour, with a book on a nearby table as a quiet reference to Weldon. Do not use a stock image of unrelated people.

After adding the file, set:

```ts
futureStill: "/media/future/future-memory.webp",
```

The built-in SVG remains the sketch layer. To replace it, add a portrait WebP/AVIF at `public/media/future/future-sketch.webp` and set `futureSketch`. Keep similar framing between both layers for a convincing wipe.

Optional future animation and AR fields are already typed. Leave `featureAvailability.futureAR` false until a real target and animation exist. AR is never required for the chapter.

## Voice recording: for later

The voice artifact first invites the recipient to keep the page. Sharing or copying preserves the URL only; it does not promise an offline copy. Listening is deliberately secondary and appears only after a recording path is configured.

Recommended recording:

- Path: `public/media/voice/private-recording.mp3`
- Format: MP3 for broad compatibility; AAC in M4A is also suitable for modern iPhone and Android browsers.
- Duration: roughly 20–40 seconds.
- Audio: mono or stereo, 44.1/48 kHz, 128–192 kbps.
- Target size: under 2 MB.
- Delivery: natural, close, and conversational; no background music is necessary.

Set:

```ts
voiceRecording: "/media/voice/private-recording.mp3",
```

The page then exposes “Or listen when you’re ready,” followed by a real native-audio player. Playback never autostarts.

### Matching the physical waveform

If the plaque is generated from the final audio, export a simplified set of 30–80 normalized amplitudes (8–100) and add them to `voiceWaveform`:

```ts
voiceWaveform: [18, 24, 36, 62, 45, 78, 54, 31],
```

This gives the idle player a waveform derived from the recording. While audio plays, the canvas responds to the real audio signal through Web Audio when supported. Without the array, the keepsake invitation uses a clearly decorative motif rather than claiming to show real audio.

### Transcript

Only set `voiceTranscript` after the recording is final and the words match it. Do not publish the provisional script as a transcript. Keep captions concise and verbatim:

```ts
voiceTranscript: "Exact words from the final recording…",
```

Do not say “I love you,” assume a response to the proposal, reference a listening date, or include the final question. The recording should still make sense months later.

## Details cards

Each item supports:

```ts
{
  number: "II",
  category: "A TINY HABIT",
  label: "Short editorial title",
  body: "One or two honest sentences.",
  emphasis: "A brief closing line."
}
```

The website observations should complement, rather than duplicate, the accordion booklet word for word.

## Safe media behavior

- Missing paths are valid and do not fail the build.
- Use root-relative public paths beginning with `/`.
- Test the exact production URL on iPhone Safari and Android Chrome after adding media.
- Keep audio hosted at the same stable route for the NFC keepsake to remain useful.
- Normal webpage access does not guarantee offline playback.

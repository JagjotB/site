# Content and Media Guide

Recipient-facing wording lives in `src/content/experience.ts`. Optional media and external destinations live in `src/content/assets.ts`. Undefined fields activate composed, recipient-safe states—never broken controls or development notices.

## Before the presentation

Review these fields in `experience.ts`:

1. `details.observations`: replace the provisional, fact-based entries with six true observations when ready.
2. `promise.paragraphs`, `promise.signature`, and `promise.physicalNote`: make sure the wording sounds natural when spoken by you.
3. `voice`: keep the invitation quiet and free of any pressure to listen during the presentation.
4. Invitation and final-reveal wording only if the physical choreography changes.

Do not add invented habits, inside jokes, travel memories, or feelings attributed to the recipient. Avoid premature declarations, possessive language, and the final girlfriend question.

## The Archive shared album

Create a real shared Google Photos album and paste its public share URL into `src/content/assets.ts`:

```ts
sharedAlbumUrl: "https://photos.app.goo.gl/your-real-share-code",
```

Until this is configured, The Archive intentionally shows that its first frame is waiting. The application neither creates nor synchronizes an album. Confirm the link opens in a private/incognito browser before presentation so it does not depend on your signed-in Google session.

## Details booklet

Each entry uses one readable observation:

```ts
{
  number: "II",
  title: "A short title",
  body: "One or two true, concise sentences.",
  closing: "A brief final line."
}
```

The web entries should complement the handmade booklet rather than copy it word for word. Keep six entries so the digital accordion maintains its intended rhythm.

## Voice recording: for later

Recommended asset:

- Path: `public/media/voice/private-recording.mp3`
- Format: MP3 for broad compatibility; AAC in M4A is also suitable for current iPhone and Android browsers.
- Duration: approximately 20–40 seconds.
- Audio: natural, close, conversational; no music is required.
- Target size: under 2 MB.

Configure it in `src/content/assets.ts`:

```ts
voiceRecording: "/media/voice/private-recording.mp3",
```

The page then adds the secondary `Listen When You’re Ready` action and the genuine player. Playback never autostarts. Sharing or copying preserves the page URL; it does not download or guarantee offline access.

### Match the physical waveform

After the recording is final, export 30–80 normalized waveform amplitudes from 8–100 and set:

```ts
voiceWaveform: [18, 24, 36, 62, 45, 78, 54, 31],
```

Use the same audio-derived profile for the printed plaque where practical. Without this data, the invitation displays a decorative waveform and never claims it represents the recording.

### Transcript

Only publish a transcript after it matches the final recording exactly:

```ts
voiceTranscript: "Exact words from the final recording…",
```

Do not assume the recipient’s answer, mention a specific listening date, say “I love you,” or include the final question. The recording should remain natural months later.

## Safe media behaviour

- Missing optional fields are valid and do not fail the build.
- Public media paths begin with `/` and resolve from `public/`.
- Keep the deployment, domain, and audio path online for the plaque link to remain useful.
- Test the exact production URLs on iPhone Safari and Android Chrome after adding content.
- Do not store the physical letter in this repository.

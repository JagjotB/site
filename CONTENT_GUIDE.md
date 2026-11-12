# Content and Media Guide

Recipient-facing wording lives in `src/content/experience.ts`. Optional media and external destinations live in `src/content/assets.ts`. Undefined fields activate composed, recipient-safe states—never broken controls or development notices.

## Before the presentation

Review these fields in `experience.ts`:

1. `details.panels[*].message`: replace the six neutral placeholders with the final approved wording when ready.
2. `promise.paragraphs`, `promise.signature`, and `promise.physicalNote`: make sure the wording sounds natural when spoken by you.
3. `voice`: keep the invitation quiet and free of any pressure to listen during the presentation.
4. Invitation and final-reveal wording only if the physical choreography changes.

Do not add invented habits, inside jokes, travel memories, or feelings attributed to the recipient. Avoid premature declarations, possessive language, and the final girlfriend question.

## The Archive shared album

The camera artifact currently opens the shared Google Drive folder configured in `src/content/assets.ts`:

```ts
sharedAlbumUrl: "https://drive.google.com/drive/folders/your-folder-id?usp=drive_link",
```

The application links to the folder; it does not upload, copy, or synchronize photographs. In Google Drive, set the folder’s General access to **Anyone with the link · Viewer**, then confirm the link opens in a private/incognito browser so it does not depend on your signed-in Google session. If the URL is removed from `assets.ts`, The Archive returns to its intentional first-frame waiting state.

## Details booklet

Chapter 04 always contains exactly six accordion panels. Their approved headings and purposes live in `experience.details.panels`; normally you only need to replace each `message` value:

```ts
{
  id: "little-things",
  number: "II",
  heading: "THE LITTLE THINGS",
  purpose: "Something small I notice about her",
  message: "Replace this placeholder with the final message."
}
```

Edit these six fields later without changing the component or layout:

1. `experience.details.panels[0].message` — cover
2. `experience.details.panels[1].message` — the little things
3. `experience.details.panels[2].message` — what I admire
4. `experience.details.panels[3].message` — a memory
5. `experience.details.panels[4].message` — your humour
6. `experience.details.panels[5].message` — the future

Keep all six panel objects so the physical and digital accordion remain aligned. The website wording should complement the handmade booklet rather than duplicate it automatically.

## Voice recording: for later

Current asset:

- Path: `public/media/voice/private-recording.m4a`
- Format: AAC in M4A for current iPhone and Android browsers.
- Duration: 1 minute 47 seconds.
- Source: mono, 48 kHz, approximately 65 kbps.
- Audio: natural, close, conversational; no music is required.
- Target size: under 2 MB.

Configure it in `src/content/assets.ts`:

```ts
voiceRecording: "/media/voice/private-recording.m4a",
```

The page then adds the secondary `Listen When You’re Ready` action and the genuine player. Playback never autostarts. Sharing or copying preserves the page URL; it does not download or guarantee offline access.

### Match the physical waveform

The configured 64-value waveform was derived from the real M4A using RMS amplitude sampling. If the recording changes, derive a new 30–80 value profile normalized from 8–100 and set:

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

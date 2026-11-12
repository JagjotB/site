export type ArtifactSlug =
  | "the-archive"
  | "the-way-out"
  | "the-promise"
  | "the-details"
  | "my-voice"
  | "only-you";

export type Observation = {
  number: string;
  title: string;
  body: string;
  closing: string;
};

export const experience = {
  identity: {
    title: "The Art of Us",
    archiveTitle: "The Art of Us",
    edition: "Private Edition · 01/01",
    collectionCode: "Six pieces, made by hand",
    recipientName: undefined as string | undefined,
    dedication: "I made this for you.",
  },
  invitation: {
    supporting: "Six pieces. Each with something of its own to tell you.",
    action: "View the Collection",
  },
  collection: {
    heading: "Six things I made.",
    introduction: "Pick up whichever one you want first. Each piece has another layer waiting for you.",
    scanInstruction: "The hidden tag on each object opens its own chapter.",
    reservedLabel: "This one opens from the credential.",
  },
  artifacts: [
    { number: "01", slug: "the-archive" as const, medium: "Miniature camera", cue: "Begin the album", title: "The Archive", subtitle: "For the moments worth keeping." },
    { number: "02", slug: "the-way-out" as const, medium: "Architectural iris", cue: "See the full plan", title: "The Way Out", subtitle: "Our first date had an exit to find." },
    { number: "03", slug: "the-promise" as const, medium: "Shell and note", cue: "Read what I mean", title: "The Promise", subtitle: "The part I intend to show through actions." },
    { number: "04", slug: "the-details" as const, medium: "Accordion booklet", cue: "Open the folds", title: "The Details", subtitle: "The things I notice, even when I don’t say them." },
    { number: "05", slug: "my-voice" as const, medium: "Sound-wave plaque", cue: "Keep this one", title: "My Voice", subtitle: "For a quieter moment." },
    { number: "06", slug: "only-you" as const, medium: "Private credential", cue: "Not in the index", title: "Only You", subtitle: "This one opens differently." },
  ],
  archive: {
    title: "The Archive",
    lead: "For the moments worth keeping.",
    body: "We don’t have much of a photo collection yet. I thought we should start one.",
    action: "Open Our Album",
    emptyTitle: "The first frame is still waiting.",
    emptyBody: "When we have one worth adding, this is where our album begins.",
  },
  wayOut: {
    title: "The Way Out",
    lead: "Our first date was an escape room.",
    body: "We spent it trying to find our way out.",
    closing: "Now some of my favourite time with you is when we get to shut everything else out for a while. No rush, no distractions. Just us.",
    revealAction: "See the whole plan",
    resetAction: "Return to the fragment",
  },
  promise: {
    title: "The Promise",
    lead: "What I mean when I say I’ll be there.",
    paragraphs: [
      "I’ll make time for you, even when life gets busy. I’ll plan the dates, pay attention to the little things, and be there when you need me.",
      "I won’t pretend I’ll always get everything right. But I’ll listen, put in the effort, and make sure you know you’re appreciated.",
    ],
    signature: "You can count on me.",
    physicalNote: "I’ll look after you, make time for you, and be there when you need me. I’ll plan the dates, take care of the little things, and make sure you know you’re appreciated. You can count on me.",
  },
  details: {
    title: "The Details",
    heading: "I notice more than I say.",
    subtitle: "A few things that belong here without pretending to tell the whole story.",
    observations: [
      { number: "I", title: "The first date", body: "An escape room was a good place to start: something to work out together, and no ordinary first-date script.", closing: "I’m glad that was ours." },
      { number: "II", title: "The time since", body: "About two years can hold a lot without needing to turn every moment into a milestone.", closing: "The ordinary time counts too." },
      { number: "III", title: "What I notice", body: "I don’t always say every thought out loud. That doesn’t mean the details pass me by.", closing: "The specific list is in the book you’re holding." },
      { number: "IV", title: "Why I made this", body: "I wanted to make something with my own hands instead of finding something ready-made.", closing: "The effort is part of the point." },
      { number: "V", title: "Still learning", body: "There are still things I get to learn about you. I think that is a good thing.", closing: "I’m paying attention." },
      { number: "VI", title: "What stays ours", body: "Not every good detail belongs on a website. Some things are better kept between the two people who were there.", closing: "You know the ones." },
    ] satisfies Observation[],
    closing: "There’s more. These are simply the ones that belong here.",
  },
  voice: {
    title: "My Voice",
    heading: "For a quieter moment.",
    lead: "This one’s for later.",
    body: "Keep it for a quieter moment.",
    saveAction: "Keep This Message",
    copyAction: "Copy Link",
    listenAction: "Listen When You’re Ready",
    returnAction: "Keep Exploring",
    savedFeedback: "Shared. Yours whenever you’re ready.",
    copiedFeedback: "Link copied. Yours whenever you’re ready.",
    copyFailure: "The link couldn’t be copied automatically. You can bookmark this page instead.",
    unavailable: "Keep the plaque close. The recording will be here when it is ready.",
    transcriptLabel: "Read transcript",
  },
  final: {
    label: "Private Edition · 01/01",
    title: "Only You.",
    prelude: "There is one part of this collection that was never meant to stay on a screen.",
    collectionLine: "It is in the box, where it should be.",
    action: "Show me where",
    instruction: "Back to the box.",
    command: "Lift the tray.",
    detail: "There’s something underneath.",
    closing: "The rest is yours to discover.",
  },
} as const;

export type ArtifactSlug =
  | "the-archive"
  | "the-way-out"
  | "the-promise"
  | "the-details"
  | "my-voice"
  | "only-you";

export type DetailPanel = {
  id: "cover" | "little-things" | "admire" | "memory" | "humour" | "future";
  number: string;
  heading: string;
  purpose: string;
  message: string;
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
    label: "The accordion booklet",
    footer: "Private edition · six panels",
    panels: [
      { id: "cover", number: "I", heading: "THE DETAILS", purpose: "Cover", message: "Your opening message will appear here." },
      { id: "little-things", number: "II", heading: "THE LITTLE THINGS", purpose: "Something small I notice about her", message: "Your final wording will appear here." },
      { id: "admire", number: "III", heading: "WHAT I ADMIRE", purpose: "A quality I respect", message: "Your final wording will appear here." },
      { id: "memory", number: "IV", heading: "A MEMORY", purpose: "A meaningful experience together", message: "Your final wording will appear here." },
      { id: "humour", number: "V", heading: "YOUR HUMOUR", purpose: "Something I appreciate about how funny she is", message: "Your final wording will appear here." },
      { id: "future", number: "VI", heading: "THE FUTURE", purpose: "My thoughts about a possible long-term future together", message: "Your final wording will appear here." },
    ] satisfies DetailPanel[],
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
    prelude: "There’s one last thing I wanted you to have.",
    action: "Show me where",
    instruction: "THE FINAL PIECE",
    command: "Lift the tray.",
    detail: "There’s something underneath.",
  },
} as const;

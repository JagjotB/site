export type ArtifactSlug =
  | "tomorrow"
  | "in-focus"
  | "the-promise"
  | "the-details"
  | "my-voice"
  | "only-you";

export type Observation = {
  number: string;
  category: string;
  label: string;
  body: string;
  emphasis: string;
};

export const experience = {
  identity: {
    title: "The Art of Us",
    archiveTitle: "The Art of Us",
    edition: "Private edition · one of one",
    collectionCode: "Six things, made by hand",
    recipientName: undefined as string | undefined,
    dedication: "I made this for you.",
  },
  invitation: {
    prompt: "You have the key.",
    prelude: "Start with the key.",
    unlockedTitle: "I thought I’d do this properly.",
    unlockedBody: "There’s something I made for you.",
    physicalCue: "The key in your hands opens the rest.",
  },
  collection: {
    heading: "Six things I made.",
    introduction: "Pick up whichever one you want first. Each has something else inside it.",
    scanInstruction: "Hold your phone near the hidden tag on each piece.",
    reservedLabel: "This one opens differently.",
  },
  artifacts: [
    { number: "01", slug: "tomorrow" as const, medium: "Photographic print", cue: "Turn it over", title: "Tomorrow", subtitle: "Somewhere I hope we get to go." },
    { number: "02", slug: "in-focus" as const, medium: "Mechanical iris", cue: "Rotate the ring", title: "In Focus", subtitle: "Where this started." },
    { number: "03", slug: "the-promise" as const, medium: "Shell container", cue: "Unscrew the base", title: "The Promise", subtitle: "What I mean when I say I’ll be there." },
    { number: "04", slug: "the-details" as const, medium: "Accordion booklet", cue: "Open the folds", title: "The Details", subtitle: "The small stuff I keep noticing." },
    { number: "05", slug: "my-voice" as const, medium: "Waveform plaque", cue: "Keep this one", title: "My Voice", subtitle: "Not for right now." },
    { number: "06", slug: "only-you" as const, medium: "Black credential", cue: "Not in the index", title: "Only You", subtitle: "This one opens differently." },
  ],
  tomorrow: {
    title: "Tomorrow.",
    heading: "Lake Como is on the list.",
    introduction: "No itinerary yet. Just a view, the two of us, and a book nearby for where this all started.",
    reveal: "We should make this one real someday.",
    closing: "No rush. It’s just a good thought.",
    imageAlt: "An imagined future lakeside terrace, presented as a memory still waiting to happen",
  },
  inFocus: {
    title: "In Focus.",
    prelude: "Weldon, of all places.",
    heading: "I’m glad it was Weldon.",
    admiration: "Not exactly where I expected this to start. Still glad it did.",
  },
  promise: {
    label: "The shell",
    title: "The Promise.",
    subtitle: "What I mean by showing up.",
    body: "I want to be someone you can count on. Someone who makes time for you, pays attention, looks after the details, and shows up when it matters. Not just when it’s easy, but when you need me.",
    signature: "You can count on me.",
    physicalNote: "I’ll look after you, make time for you, and be there when you need me. I’ll plan the dates, take care of the little things, and make sure you know you’re appreciated. You can count on me.",
  },
  details: {
    title: "The small stuff.",
    heading: "I notice more than I say.",
    subtitle: "The things that are easy to miss if you aren’t paying attention.",
    observations: [
      { number: "I", category: "Weldon", label: "Where it started", body: "We met at Weldon. Of all the places on campus, I still like that it was there.", emphasis: "Ordinary, right up until it wasn’t." },
      { number: "II", category: "The small stuff", label: "I notice", body: "I don’t always say every thought out loud. That doesn’t mean the details pass me by.", emphasis: "The good list is in the book you’re holding." },
      { number: "III", category: "No occasion", label: "The regular days", body: "The ordinary time counts too. It doesn’t always need a reservation or a reason.", emphasis: "Sometimes it’s better that way." },
      { number: "IV", category: "Still learning", label: "Two years in", body: "There are still things I get to learn about you. I think that’s a good thing.", emphasis: "I’m paying attention." },
      { number: "V", category: "Just ours", label: "The jokes that don’t travel", body: "I’m not putting the good ones on a website. Some things can stay between us.", emphasis: "You know the ones." },
      { number: "VI", category: "Next time", label: "An easy thought", body: "I’m already looking forward to whatever we decide to do next.", emphasis: "No grand plan required." },
    ] satisfies Observation[],
    closing: "There’s more. These are just six I could fit here.",
  },
  voice: {
    title: "My Voice.",
    heading: "Not for right now.",
    lead: "This one’s for later.",
    body: "Keep it. Listen when you have a quiet minute to yourself.",
    saveAction: "Keep This Message",
    copyAction: "Copy Link",
    listenAction: "Or listen when you’re ready",
    returnAction: "Return to the Collection",
    savedFeedback: "Shared. Yours whenever you’re ready.",
    copiedFeedback: "Link copied. Yours whenever you’re ready.",
    copyFailure: "The link couldn’t be copied automatically. You can bookmark this page instead.",
    unavailable: "I’m recording this in my own voice. It belongs here when it’s ready.",
    transcriptLabel: "Read transcript",
  },
  final: {
    label: "The last piece",
    title: "Only You.",
    prelude: "I left the important part out of the website.",
    collectionLine: "It’s in the box, where it should be.",
    action: "Show me where",
    instruction: "Back to the box.",
    command: "Lift the tray.",
    detail: "There’s something underneath.",
    closing: "I’ll let the letter take it from here.",
  },
} as const;

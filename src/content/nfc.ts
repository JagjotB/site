export type NfcClassification = "public" | "private-link";

export type NfcEntry = {
  artifactId: "invitation" | "tomorrow" | "in-focus" | "the-promise" | "the-details" | "my-voice" | "only-you";
  tagNumber: `0${1 | 2 | 3 | 4 | 5 | 6 | 7}`;
  objectTitle: string;
  physicalPlacement: string;
  route: string;
  classification: NfcClassification;
  scanLocationLabel?: string;
};

export const nfcEntries = [
  { artifactId: "invitation", tagNumber: "01", objectTitle: "Small wooden key box", physicalPlacement: "Inside the lid of the small wooden key box", route: "/invite", classification: "public", scanLocationLabel: "Inside lid" },
  { artifactId: "tomorrow", tagNumber: "02", objectTitle: "Tomorrow art print", physicalPlacement: "Behind the Tomorrow art print", route: "/collection/tomorrow", classification: "public", scanLocationLabel: "Behind print" },
  { artifactId: "in-focus", tagNumber: "03", objectTitle: "Mechanical iris", physicalPlacement: "Beneath the iris housing, clear of moving parts", route: "/collection/in-focus", classification: "public", scanLocationLabel: "Under housing" },
  { artifactId: "the-promise", tagNumber: "04", objectTitle: "The Promise capsule", physicalPlacement: "On or inside a non-metallic area of the shell-inspired container", route: "/collection/the-promise", classification: "public", scanLocationLabel: "Non-metallic area" },
  { artifactId: "the-details", tagNumber: "05", objectTitle: "Accordion booklet", physicalPlacement: "Behind the miniature accordion booklet", route: "/collection/the-details", classification: "public", scanLocationLabel: "Behind booklet" },
  { artifactId: "my-voice", tagNumber: "06", objectTitle: "Waveform plaque", physicalPlacement: "Beneath the physical waveform plaque", route: "/collection/my-voice", classification: "public", scanLocationLabel: "Under plaque" },
  { artifactId: "only-you", tagNumber: "07", objectTitle: "Only You credential", physicalPlacement: "Concealed inside the black-and-gold credential", route: "/access/[token]", classification: "private-link", scanLocationLabel: "Inside credential" },
] as const satisfies readonly NfcEntry[];

export const publicNfcEntries = nfcEntries.filter((entry) => entry.classification === "public");
export const privateNfcEntry = nfcEntries.find((entry) => entry.classification === "private-link")!;

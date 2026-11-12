export type NfcClassification = "public" | "private-link";

export type NfcEntry = {
  artifactId: "invitation" | "the-archive" | "the-way-out" | "the-promise" | "the-details" | "my-voice" | "only-you";
  tagNumber: `0${1 | 2 | 3 | 4 | 5 | 6 | 7}`;
  objectTitle: string;
  physicalPlacement: string;
  route: string;
  classification: NfcClassification;
  scanLocationLabel?: string;
};

export const nfcEntries = [
  { artifactId: "invitation", tagNumber: "01", objectTitle: "Small wooden key box", physicalPlacement: "Inside the lid of the small wooden key box", route: "/invite", classification: "public", scanLocationLabel: "Inside lid" },
  { artifactId: "the-archive", tagNumber: "02", objectTitle: "Miniature camera", physicalPlacement: "Inside or behind the miniature vintage-style camera", route: "/collection/the-archive", classification: "public", scanLocationLabel: "Camera body" },
  { artifactId: "the-way-out", tagNumber: "03", objectTitle: "Mechanical iris and blueprint", physicalPlacement: "Beneath the iris housing, clear of moving parts", route: "/collection/the-way-out", classification: "public", scanLocationLabel: "Under housing" },
  { artifactId: "the-promise", tagNumber: "04", objectTitle: "The Promise shell", physicalPlacement: "On or inside a non-metallic area of the shell container", route: "/collection/the-promise", classification: "public", scanLocationLabel: "Non-metallic area" },
  { artifactId: "the-details", tagNumber: "05", objectTitle: "Accordion booklet", physicalPlacement: "Behind the miniature accordion booklet", route: "/collection/the-details", classification: "public", scanLocationLabel: "Behind booklet" },
  { artifactId: "my-voice", tagNumber: "06", objectTitle: "Sound-wave plaque", physicalPlacement: "Beneath the physical sound-wave plaque", route: "/collection/my-voice", classification: "public", scanLocationLabel: "Under plaque" },
  { artifactId: "only-you", tagNumber: "07", objectTitle: "Only You credential", physicalPlacement: "Concealed inside the black-and-gold credential", route: "/access/[token]", classification: "private-link", scanLocationLabel: "Inside credential" },
] as const satisfies readonly NfcEntry[];

export const publicNfcEntries = nfcEntries.filter((entry) => entry.classification === "public");
export const privateNfcEntry = nfcEntries.find((entry) => entry.classification === "private-link")!;

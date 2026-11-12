import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { nfcEntries, privateNfcEntry } from "../src/content/nfc.ts";

function loadLocalEnvironment() {
  const localPath = resolve(process.cwd(), ".env.local");
  if (!existsSync(localPath)) return;

  for (const rawLine of readFileSync(localPath, "utf8").split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;
    const separator = line.indexOf("=");
    if (separator < 1) continue;
    const key = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim().replace(/^['"]|['"]$/g, "");
    process.env[key] ??= value;
  }
}

function productionOrigin() {
  const rawOrigin = process.env.NEXT_PUBLIC_SITE_URL;
  if (!rawOrigin) throw new Error("NEXT_PUBLIC_SITE_URL is required. Set it to the deployed HTTPS origin.");

  const origin = new URL(rawOrigin);
  if (origin.protocol !== "https:" || origin.pathname !== "/" || origin.search || origin.hash) {
    throw new Error("NEXT_PUBLIC_SITE_URL must be an HTTPS origin such as https://example.com (no path, query, or hash).");
  }
  return origin.origin;
}

loadLocalEnvironment();
const origin = productionOrigin();
const includePrivate = process.argv.includes("--include-private");

console.log("THE ART OF US — NFC DESTINATIONS\n");
for (const entry of nfcEntries.filter((item) => item.classification === "public")) {
  console.log(`Tag ${entry.tagNumber} · ${entry.objectTitle}`);
  console.log(`${origin}${entry.route}\n`);
}

if (includePrivate) {
  const token = process.env.PRIVATE_ACCESS_TOKEN;
  if (!token || token.length < 32) throw new Error("PRIVATE_ACCESS_TOKEN must contain at least 32 characters before printing Tag 07.");
  console.log(`Tag ${privateNfcEntry.tagNumber} · ${privateNfcEntry.objectTitle}`);
  console.log(`${origin}/access/${encodeURIComponent(token)}\n`);
  console.warn("Tag 07 is an unguessable private link, not identity authentication. Anyone with the URL can open it.");
} else {
  console.log("Tag 07 withheld. Re-run with --include-private only when you are ready to program the credential.");
}

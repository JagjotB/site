import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { expect, test } from "@playwright/test";

function readPrivateToken(): string | undefined {
  const envPath = path.join(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) return undefined;
  const match = fs.readFileSync(envPath, "utf8").match(/^PRIVATE_ACCESS_TOKEN=(.+)$/m);
  return match?.[1]?.trim();
}

test("invitation opens the collection", async ({ page }) => {
  await page.goto("/invite");
  await expect(page.getByRole("heading", { name: "The Art of Us" })).toBeVisible();
  await expect(page.getByText("I made this for you.")).toBeVisible();
  await page.getByRole("button", { name: "Turn the Key", exact: true }).click();
  await expect(page.getByRole("heading", { name: "I thought I’d do this properly." })).toBeVisible();
  await page.getByRole("link", { name: "Discover the Collection" }).click();
  await expect(page).toHaveURL(/\/collection$/);
  await expect(page.getByRole("heading", { name: "Six things I made." })).toBeVisible();
});

test("collection exposes five artifacts and reserves the sixth", async ({ page }) => {
  await page.goto("/collection");
  await expect(page.locator('a[href^="/collection/"]')).toHaveCount(5);
  await expect(page.getByLabel("Only You. This one opens differently.")).toBeVisible();
  await expect(page.locator('a[href*="only-you"], a[href^="/access/"]')).toHaveCount(0);
  await expect(page.getByText("Hold your phone near the hidden tag on each piece.")).toBeVisible();
});

test("all six public NFC destinations support direct entry and interaction", async ({ page }) => {
  await page.goto("/invite");
  await expect(page.getByRole("button", { name: "Turn the Key", exact: true })).toBeVisible();

  await page.goto("/collection/tomorrow");
  await expect(page.getByText("The print")).toBeVisible();
  await page.getByRole("button", { name: "Finish developing it" }).click();
  await expect(page.getByText("No rush. It’s just a good thought.")).toBeVisible();

  await page.goto("/collection/in-focus");
  await expect(page.getByText("The mechanical iris")).toBeVisible();
  await page.getByRole("button", { name: "Open the Aperture" }).click();
  await expect(page.getByText("I’m glad it was Weldon.")).toBeVisible();

  await page.goto("/collection/the-promise");
  await expect(page.getByText("The shell", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Unscrew the base" }).click();
  await expect(page.getByText(/I want to be someone you can count on/)).toBeVisible();

  await page.goto("/collection/the-details");
  await expect(page.getByText("The accordion book")).toBeVisible();
  await page.getByRole("button", { name: "Next observation" }).click();
  await expect(page.getByRole("heading", { name: "Where it started" })).toBeVisible();

  await page.goto("/collection/my-voice");
  await expect(page.getByText("The waveform plaque")).toBeVisible();
  await expect(page.getByRole("button", { name: "Keep This Message" })).toBeVisible();
  await expect(page.getByRole("button", { name: /listen/i })).toHaveCount(0);
});

test("voice message reports real copy and share outcomes", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "share", { configurable: true, value: undefined });
    Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText: async (value: string) => { (window as typeof window & { copiedLink?: string }).copiedLink = value; } } });
  });
  await page.goto("/collection/my-voice");
  await page.getByRole("button", { name: "Copy Link" }).click();
  await expect(page.getByText("Link copied. Yours whenever you’re ready.")).toBeVisible();
  await expect.poll(() => page.evaluate(() => (window as typeof window & { copiedLink?: string }).copiedLink)).toContain("/collection/my-voice");

  await page.addInitScript(() => {
    Object.defineProperty(navigator, "share", { configurable: true, value: async () => undefined });
  });
  await page.reload();
  await page.getByRole("button", { name: "Keep This Message" }).click();
  await expect(page.getByText("Shared. Yours whenever you’re ready.")).toBeVisible();
});

test("cancelled share is not reported as saved", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "share", { configurable: true, value: async () => { throw new DOMException("cancelled", "AbortError"); } });
  });
  await page.goto("/collection/my-voice");
  await page.getByRole("button", { name: "Keep This Message" }).click();
  await expect(page.getByText("Save it to Notes, Messages, or your bookmarks.")).toBeVisible();
  await expect(page.getByText(/Yours whenever you’re ready/)).toHaveCount(0);
});

test("development audio fixture exposes the real player without autoplay", async ({ page }) => {
  await page.goto("/collection/my-voice?audioFixture=1");
  await page.getByRole("button", { name: "Or listen when you’re ready" }).click();
  await expect(page.getByRole("region", { name: "Private recording player" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Play recording" })).toBeVisible();
  expect(await page.locator("audio").evaluate((audio) => !(audio as HTMLAudioElement).autoplay)).toBe(true);
});

test("private access rejects invalid links and accepts the configured token", async ({ page }, testInfo) => {
  await page.goto("/access/not-a-valid-token");
  await expect(page.getByRole("heading", { name: "There’s nothing at this address." })).toBeVisible();

  const token = readPrivateToken();
  if (!token) {
    test.skip(true, "PRIVATE_ACCESS_TOKEN is not configured locally");
    return;
  }
  await page.goto(`/access/${token}`);
  await expect(page.getByRole("heading", { name: "Only You." })).toBeVisible();
  await page.screenshot({ path: testInfo.outputPath(`private-intro-${testInfo.project.name}.png`), fullPage: true });
  await page.getByRole("button", { name: "Show me where" }).click();
  await expect(page.getByRole("heading", { name: "Lift the tray." })).toBeVisible();
  await expect(page.locator(".final-settled")).toHaveCSS("opacity", "1", { timeout: 6_000 });
  await page.screenshot({ path: testInfo.outputPath(`final-reveal-${testInfo.project.name}.png`), fullPage: true });
});

test("public pages do not expose the private route or token", async ({ page }) => {
  const token = readPrivateToken();
  for (const route of ["/invite", "/collection", "/collection/my-voice"]) {
    await page.goto(route);
    const source = await page.content();
    expect(source).not.toContain('href="/access/');
    if (token) expect(source).not.toContain(token);
  }
});

test("recipient routes stay free of browser errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));
  for (const route of ["/invite", "/collection", "/collection/tomorrow", "/collection/in-focus", "/collection/the-promise", "/collection/the-details", "/collection/my-voice"]) {
    await page.goto(route);
    await page.getByRole("main").waitFor({ state: "visible" });
  }
  expect(errors).toEqual([]);
});

test("production client bundles do not contain the configured private token", async () => {
  const token = readPrivateToken();
  const staticDirectory = path.join(process.cwd(), ".next", "static");
  if (!token || !fs.existsSync(staticDirectory)) {
    test.skip(true, "A configured token and production build are required for bundle inspection");
    return;
  }
  const files = fs.readdirSync(staticDirectory, { recursive: true, encoding: "utf8" }).filter((file) => file.endsWith(".js"));
  for (const relativeFile of files) {
    expect(fs.readFileSync(path.join(staticDirectory, relativeFile), "utf8")).not.toContain(token);
  }
});

test("reduced motion preserves core interactions", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/collection/tomorrow");
  await page.getByRole("button", { name: "Finish developing it" }).click();
  await expect(page.getByText("No rush. It’s just a good thought.")).toBeVisible();
  await page.goto("/collection/the-promise");
  await page.getByRole("button", { name: "Unscrew the base" }).click();
  await expect(page.getByText("You can count on me.")).toBeVisible();
});

test("direct links refresh and browser back remains reliable", async ({ page }) => {
  await page.goto("/collection");
  await page.getByRole("link", { name: /Open Tomorrow/ }).click();
  await expect(page).toHaveURL(/\/collection\/tomorrow$/);
  await page.reload();
  await expect(page.getByText("The print")).toBeVisible();
  await page.goBack();
  await expect(page).toHaveURL(/\/collection$/);
});

test("representative viewports do not overflow", async ({ page }, testInfo) => {
  for (const width of [375, 390, 430, 768, 1440]) {
    const height = width >= 1000 ? 900 : width >= 700 ? 1024 : 844;
    await page.setViewportSize({ width, height });
    await page.goto(width % 2 ? "/collection" : "/collection/my-voice");
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    await page.screenshot({ path: testInfo.outputPath(`${width}-${testInfo.project.name}.png`), fullPage: true });
  }
});

test("NFC generator withholds the private link unless explicitly requested", async () => {
  const baseEnvironment = {
    ...process.env,
    NEXT_PUBLIC_SITE_URL: "https://art-of-us.example",
    PRIVATE_ACCESS_TOKEN: "test-private-token-with-at-least-32-characters",
  };
  const publicRun = spawnSync(process.execPath, ["--experimental-strip-types", "scripts/generate-nfc-links.ts"], { cwd: process.cwd(), env: baseEnvironment, encoding: "utf8" });
  expect(publicRun.status).toBe(0);
  expect(publicRun.stdout).toContain("Tag 01");
  expect(publicRun.stdout).toContain("Tag 06");
  expect(publicRun.stdout).not.toContain("/access/");

  const privateRun = spawnSync(process.execPath, ["--experimental-strip-types", "scripts/generate-nfc-links.ts", "--include-private"], { cwd: process.cwd(), env: baseEnvironment, encoding: "utf8" });
  expect(privateRun.status).toBe(0);
  expect(privateRun.stdout).toContain("Tag 07");
  expect(privateRun.stdout).toContain("/access/test-private-token-with-at-least-32-characters");
});

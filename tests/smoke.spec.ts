import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { expect, test } from "@playwright/test";

const publicChapterRoutes = [
  "/collection/the-archive",
  "/collection/the-way-out",
  "/collection/the-promise",
  "/collection/the-details",
  "/collection/my-voice",
] as const;

function readPrivateToken(): string | undefined {
  const envPath = path.join(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) return undefined;
  const match = fs.readFileSync(envPath, "utf8").match(/^PRIVATE_ACCESS_TOKEN=(.+)$/m);
  return match?.[1]?.trim();
}

test("invitation opens the collection without a digital key gate", async ({ page }) => {
  await page.goto("/invite");
  await expect(page.getByText("Private Edition · 01/01")).toBeVisible();
  await expect(page.getByRole("img", { name: "A tall man and a woman in an elegant formal twirl" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "The Art of Us" })).toBeVisible();
  await expect(page.getByText("I made this for you.")).toBeVisible();
  await expect(page.locator('link[rel="icon"]')).toHaveAttribute("href", /icon\.svg/);
  await expect(page.getByRole("button", { name: /turn the key/i })).toHaveCount(0);
  await page.getByRole("link", { name: "View the Collection" }).click();
  await expect(page).toHaveURL(/\/collection$/);
  await expect(page.getByRole("heading", { name: "Six things I made." })).toBeVisible();
});

test("collection exposes five canonical artifacts and reserves Only You", async ({ page }) => {
  await page.goto("/collection");
  const chapterLinks = page.locator('a[href^="/collection/"]');
  await expect(chapterLinks).toHaveCount(5);
  for (const route of publicChapterRoutes) await expect(page.locator(`a[href="${route}"]`)).toHaveCount(1);
  await expect(page.getByLabel("Only You. This one opens differently.")).toBeVisible();
  await expect(page.locator('a[href*="only-you"], a[href^="/access/"]')).toHaveCount(0);
  await expect(page.getByText("The hidden tag on each object opens its own chapter.")).toBeVisible();
});

test("all six public NFC destinations support meaningful direct entry", async ({ page }) => {
  await page.goto("/invite");
  await expect(page.getByRole("link", { name: "View the Collection" })).toBeVisible();

  await page.goto("/collection/the-archive");
  await expect(page.getByRole("heading", { name: "The Archive", level: 1 })).toBeVisible();
  await expect(page.getByRole("link", { name: /Open Our Album/ })).toHaveAttribute(
    "href",
    "https://drive.google.com/drive/folders/1kcw2uINgindiSE0dr1f_kh4-2vthldg3?usp=drive_link",
  );

  await page.goto("/collection/the-way-out");
  await expect(page.getByRole("heading", { name: "The Way Out" })).toBeVisible();
  await expect(page.getByText("Our first date was an escape room.")).toBeVisible();
  await expect(page.getByRole("img", { name: /architectural floor plan/i })).toBeVisible();

  await page.goto("/collection/the-promise");
  await expect(page.getByText("03 · The note inside")).toBeVisible();
  await expect(page.getByText("You can count on me.")).toBeVisible();
  await expect(page.getByRole("button", { name: /unscrew/i })).toHaveCount(0);

  await page.goto("/collection/the-details");
  await expect(page.getByText("The accordion booklet")).toBeVisible();
  await page.getByRole("button", { name: "Next observation" }).click();
  await expect(page.getByRole("heading", { name: "The first date" })).toBeVisible();

  await page.goto("/collection/my-voice");
  await expect(page.getByText("The sound-wave plaque")).toBeVisible();
  await expect(page.getByRole("button", { name: "Keep This Message" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Listen When You’re Ready" })).toBeVisible();
});

test("The Archive enables only a configured album link", async ({ page }) => {
  await page.goto("/collection/the-archive");
  const album = page.getByRole("link", { name: /Open Our Album/ });
  await expect(album).toBeVisible();
  await expect(album).toHaveAttribute(
    "href",
    "https://drive.google.com/drive/folders/1kcw2uINgindiSE0dr1f_kh4-2vthldg3?usp=drive_link",
  );
  await expect(album).toHaveAttribute("target", "_blank");
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

test("configured recording exposes the real player without autoplay", async ({ page }) => {
  await page.goto("/collection/my-voice");
  await page.getByRole("button", { name: "Listen When You’re Ready" }).click();
  await expect(page.getByRole("region", { name: "Private recording player" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Play recording" })).toBeVisible();
  await expect(page.locator("audio")).toHaveAttribute("src", "/media/voice/private-recording.m4a");
  await expect.poll(() => page.locator("audio").evaluate((audio) => (audio as HTMLAudioElement).duration)).toBeGreaterThan(100);
  expect(await page.locator("audio").evaluate((audio) => !(audio as HTMLAudioElement).autoplay)).toBe(true);
});

test("legacy chapter URLs permanently redirect to canonical chapters", async ({ page }) => {
  await page.goto("/collection/tomorrow");
  await expect(page).toHaveURL(/\/collection\/the-archive$/);
  await expect(page.getByRole("heading", { name: "The Archive" })).toBeVisible();
  await page.goto("/collection/in-focus");
  await expect(page).toHaveURL(/\/collection\/the-way-out$/);
  await expect(page.getByRole("heading", { name: "The Way Out" })).toBeVisible();
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
  await expect(page.getByText("There’s one last thing I wanted you to have.")).toBeVisible();
  await expect(page.locator(".final-intro")).toHaveCSS("opacity", "1");
  await page.screenshot({ path: testInfo.outputPath(`private-intro-${testInfo.project.name}.png`), fullPage: true });
  await page.getByRole("button", { name: "Show me where" }).click();
  await expect(page.getByText("THE FINAL PIECE", { exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Lift the tray." })).toBeVisible();
  await expect(page.getByText("There’s something underneath.")).toBeVisible();
  await expect(page.locator(".tray-copy")).toHaveCSS("opacity", "1", { timeout: 4_000 });
  await page.screenshot({ path: testInfo.outputPath(`private-reveal-${testInfo.project.name}.png`), fullPage: true });
});

test("public pages and production bundles do not expose the private token", async ({ page }) => {
  const token = readPrivateToken();
  for (const route of ["/invite", "/collection", ...publicChapterRoutes]) {
    await page.goto(route);
    const source = await page.content();
    expect(source).not.toContain('href="/access/');
    if (token) expect(source).not.toContain(token);
  }

  const staticDirectory = path.join(process.cwd(), ".next", "static");
  if (!token || !fs.existsSync(staticDirectory)) return;
  const files = fs.readdirSync(staticDirectory, { recursive: true, encoding: "utf8" }).filter((file) => file.endsWith(".js"));
  for (const relativeFile of files) expect(fs.readFileSync(path.join(staticDirectory, relativeFile), "utf8")).not.toContain(token);
});

test("recipient routes stay free of browser errors", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
  page.on("pageerror", (error) => errors.push(error.message));
  for (const route of ["/invite", "/collection", ...publicChapterRoutes]) {
    await page.goto(route);
    await page.getByRole("main").waitFor({ state: "visible" });
  }
  expect(errors).toEqual([]);
});

test("reduced motion preserves core interactions", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/collection/the-way-out");
  await expect(page.getByText("Our first date was an escape room.")).toBeVisible();
  await page.goto("/collection/the-details");
  await page.getByRole("button", { name: "Next observation" }).click();
  await expect(page.getByRole("heading", { name: "The first date" })).toBeVisible();
});

test("direct links refresh and browser back remain reliable", async ({ page }) => {
  await page.goto("/collection");
  await page.getByRole("link", { name: /Open The Archive/ }).click();
  await expect(page).toHaveURL(/\/collection\/the-archive$/);
  await page.reload();
  await expect(page.getByRole("heading", { name: "The Archive" })).toBeVisible();
  await page.goBack();
  await expect(page).toHaveURL(/\/collection$/);
});

test("mobile and desktop viewports do not overflow and use the intended fonts", async ({ page }, testInfo) => {
  for (const width of [320, 360, 375, 390, 430, 768, 1440]) {
    const height = width >= 1000 ? 900 : width >= 700 ? 1024 : 844;
    await page.setViewportSize({ width, height });
    const route = width === 320 ? "/invite" : width % 2 ? "/collection" : "/collection/the-way-out";
    await page.goto(route);
    await page.waitForTimeout(900);
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    await page.screenshot({ path: testInfo.outputPath(`${width}-${testInfo.project.name}.png`), fullPage: true });
  }
  await page.goto("/invite");
  await expect(page.getByRole("heading", { name: "The Art of Us" })).toHaveCSS("font-family", /Cormorant Garamond/);
  await expect(page.getByRole("link", { name: "View the Collection" })).toHaveCSS("font-family", /Manrope/);
});

test("NFC generator prints canonical URLs and withholds the private link", async () => {
  const baseEnvironment = {
    ...process.env,
    NEXT_PUBLIC_SITE_URL: "https://art-of-us.example",
    PRIVATE_ACCESS_TOKEN: "test-private-token-with-at-least-32-characters",
  };
  const command = ["--experimental-strip-types", "scripts/generate-nfc-links.ts"];
  const publicRun = spawnSync(process.execPath, command, { cwd: process.cwd(), env: baseEnvironment, encoding: "utf8" });
  expect(publicRun.status).toBe(0);
  expect(publicRun.stdout).toContain("/collection/the-archive");
  expect(publicRun.stdout).toContain("/collection/the-way-out");
  expect(publicRun.stdout).not.toContain("/access/");

  const privateRun = spawnSync(process.execPath, [...command, "--include-private"], { cwd: process.cwd(), env: baseEnvironment, encoding: "utf8" });
  expect(privateRun.status).toBe(0);
  expect(privateRun.stdout).toContain("Tag 07");
  expect(privateRun.stdout).toContain("/access/test-private-token-with-at-least-32-characters");
});

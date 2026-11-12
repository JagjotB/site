"use client";

import type { ArtifactSlug } from "@/content/experience";

const KEY = "the-art-of-us:visited";

export function markVisited(slug: ArtifactSlug): void {
  try {
    const current = new Set<string>(JSON.parse(localStorage.getItem(KEY) ?? "[]"));
    current.add(slug);
    localStorage.setItem(KEY, JSON.stringify([...current]));
  } catch {
    // The experience remains fully functional when storage is unavailable.
  }
}

export function getVisited(): Set<string> {
  try {
    return new Set<string>(JSON.parse(localStorage.getItem(KEY) ?? "[]"));
  } catch {
    return new Set();
  }
}

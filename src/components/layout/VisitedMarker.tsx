"use client";

import { useEffect } from "react";
import type { ArtifactSlug } from "@/content/experience";
import { markVisited } from "@/lib/visited";

export function VisitedMarker({ slug }: { slug: ArtifactSlug }) {
  useEffect(() => markVisited(slug), [slug]);
  return null;
}

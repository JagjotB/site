"use client";

import { useEffect } from "react";
import { ExperienceShell } from "@/components/layout/ExperienceShell";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
import { GoldButton } from "@/components/ui/GoldButton";

export default function ErrorBoundary({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ExperienceShell className="not-found-page">
      <div className="not-found-state">
        <p className="archive-label">ONE MORE TRY</p>
        <EditorialHeading>That didn’t open properly.</EditorialHeading>
        <p>Try this piece again. Nothing else has moved.</p>
        <GoldButton type="button" onClick={reset}>Try Again</GoldButton>
      </div>
    </ExperienceShell>
  );
}

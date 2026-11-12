import type { Metadata } from "next";
import { ExperienceShell } from "@/components/layout/ExperienceShell";
import { CollectionNavigation } from "@/components/layout/CollectionNavigation";
import { PageTransition } from "@/components/layout/PageTransition";
import { VisitedMarker } from "@/components/layout/VisitedMarker";
import { PromiseLetter } from "@/components/experiences/PromiseLetter";

export const metadata: Metadata = { title: "03 — The Promise" };

export default function PromisePage() {
  return (
    <ExperienceShell className="artifact-page promise-page" ambient="warm">
      <VisitedMarker slug="the-promise" />
      <CollectionNavigation />
      <PageTransition>
        <div className="promise-layout">
          <PromiseLetter />
        </div>
      </PageTransition>
    </ExperienceShell>
  );
}

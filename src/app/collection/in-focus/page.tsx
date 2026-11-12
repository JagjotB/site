import type { Metadata } from "next";
import { ExperienceShell } from "@/components/layout/ExperienceShell";
import { CollectionNavigation } from "@/components/layout/CollectionNavigation";
import { PageTransition } from "@/components/layout/PageTransition";
import { VisitedMarker } from "@/components/layout/VisitedMarker";
import { IrisExperience } from "@/components/experiences/IrisExperience";

export const metadata: Metadata = { title: "02 — In Focus" };

export default function InFocusPage() {
  return (
    <ExperienceShell className="artifact-page iris-page">
      <VisitedMarker slug="in-focus" />
      <CollectionNavigation />
      <PageTransition>
        <div className="iris-layout">
          <IrisExperience />
        </div>
      </PageTransition>
    </ExperienceShell>
  );
}

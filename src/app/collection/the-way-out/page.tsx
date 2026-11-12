import type { Metadata } from "next";
import { ExperienceShell } from "@/components/layout/ExperienceShell";
import { CollectionNavigation } from "@/components/layout/CollectionNavigation";
import { PageTransition } from "@/components/layout/PageTransition";
import { VisitedMarker } from "@/components/layout/VisitedMarker";
import { WayOutExperience } from "@/components/experiences/WayOutExperience";

export const metadata: Metadata = { title: "02 — The Way Out" };

export default function WayOutPage() {
  return (
    <ExperienceShell className="artifact-page way-out-page">
      <VisitedMarker slug="the-way-out" />
      <CollectionNavigation />
      <PageTransition>
        <WayOutExperience />
      </PageTransition>
    </ExperienceShell>
  );
}

import type { Metadata } from "next";
import { ExperienceShell } from "@/components/layout/ExperienceShell";
import { CollectionNavigation } from "@/components/layout/CollectionNavigation";
import { PageTransition } from "@/components/layout/PageTransition";
import { VisitedMarker } from "@/components/layout/VisitedMarker";
import { DetailsCollection } from "@/components/experiences/DetailsCollection";

export const metadata: Metadata = { title: "04 — The Details" };

export default function DetailsPage() {
  return (
    <ExperienceShell className="artifact-page details-page">
      <VisitedMarker slug="the-details" />
      <CollectionNavigation />
      <PageTransition>
        <div className="details-layout">
          <DetailsCollection />
        </div>
      </PageTransition>
    </ExperienceShell>
  );
}

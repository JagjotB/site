import type { Metadata } from "next";
import { ExperienceShell } from "@/components/layout/ExperienceShell";
import { CollectionNavigation } from "@/components/layout/CollectionNavigation";
import { PageTransition } from "@/components/layout/PageTransition";
import { VisitedMarker } from "@/components/layout/VisitedMarker";
import { FutureReveal } from "@/components/experiences/FutureReveal";
import { ArchiveLabel } from "@/components/ui/ArchiveLabel";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
import { experience } from "@/content/experience";

export const metadata: Metadata = { title: "01 — Tomorrow" };

export default function TomorrowPage() {
  return (
    <ExperienceShell className="artifact-page tomorrow-page" ambient="warm">
      <VisitedMarker slug="tomorrow" />
      <CollectionNavigation />
      <PageTransition>
        <div className="tomorrow-layout">
          <FutureReveal />
          <header className="artifact-intro tomorrow-intro">
            <ArchiveLabel>The print</ArchiveLabel>
            <EditorialHeading>{experience.tomorrow.heading}</EditorialHeading>
            <p>{experience.tomorrow.introduction}</p>
          </header>
        </div>
      </PageTransition>
    </ExperienceShell>
  );
}

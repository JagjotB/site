import type { Metadata } from "next";
import { ExperienceShell } from "@/components/layout/ExperienceShell";
import { CollectionNavigation } from "@/components/layout/CollectionNavigation";
import { PageTransition } from "@/components/layout/PageTransition";
import { VisitedMarker } from "@/components/layout/VisitedMarker";
import { ArchiveExperience } from "@/components/experiences/ArchiveExperience";
import { assets } from "@/content/assets";

export const metadata: Metadata = { title: "01 — The Archive" };

export default function ArchivePage() {
  return (
    <ExperienceShell className="artifact-page archive-page" ambient="warm">
      <VisitedMarker slug="the-archive" />
      <CollectionNavigation />
      <PageTransition>
        <ArchiveExperience
          sharedAlbumUrl={assets.sharedAlbumUrl}
          developmentAlbumFixture={process.env.NEXT_PUBLIC_E2E_ALBUM_FIXTURE}
        />
      </PageTransition>
    </ExperienceShell>
  );
}

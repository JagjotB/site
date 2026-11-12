import type { Metadata } from "next";
import { ExperienceShell } from "@/components/layout/ExperienceShell";
import { PageTransition } from "@/components/layout/PageTransition";
import { ArchiveLabel } from "@/components/ui/ArchiveLabel";
import { ArtifactCard } from "@/components/ui/ArtifactCard";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
import { Monogram } from "@/components/ui/Monogram";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { experience } from "@/content/experience";

export const metadata: Metadata = { title: "The Collection" };

export default function CollectionPage() {
  return (
    <ExperienceShell className="collection-page" ambient="warm">
      <PageTransition>
        <header className="collection-header">
          <div className="collection-brand">
            <Monogram />
            <div>
              <span>{experience.identity.archiveTitle}</span>
              <small>{experience.identity.collectionCode}</small>
            </div>
          </div>
          <div className="collection-header__copy">
            <ArchiveLabel>The box, opened.</ArchiveLabel>
            <EditorialHeading>{experience.collection.heading}</EditorialHeading>
            <span className="collection-handmade-rule" aria-hidden="true" />
            <p>{experience.collection.introduction}</p>
            <p className="collection-scan-note">{experience.collection.scanInstruction}</p>
          </div>
        </header>

        <section className="artifact-grid" aria-label="Collection artifacts">
          {experience.artifacts.map((artifact, index) => (
            <MotionReveal key={artifact.slug} delay={(index % 3) * 0.08} className={`artifact-grid__item artifact-grid__item--${index + 1}`}>
              <ArtifactCard artifact={artifact} reserved={index === 5} featured={index === 0 || index === 4} />
            </MotionReveal>
          ))}
        </section>

        <footer className="collection-footer">
          <span>It started at Weldon.</span>
          <span>Everything here was made for you.</span>
        </footer>
      </PageTransition>
    </ExperienceShell>
  );
}

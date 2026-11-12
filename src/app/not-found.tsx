import Link from "next/link";
import { ExperienceShell } from "@/components/layout/ExperienceShell";
import { ArchiveLabel } from "@/components/ui/ArchiveLabel";
import { EditorialHeading } from "@/components/ui/EditorialHeading";
import { Monogram } from "@/components/ui/Monogram";

export default function NotFound() {
  return (
    <ExperienceShell className="not-found-page">
      <div className="not-found-state">
        <Monogram />
        <ArchiveLabel>NOT ONE OF THE SIX</ArchiveLabel>
        <EditorialHeading>There’s nothing at this address.</EditorialHeading>
        <p>The link may be incomplete. The rest of the collection is still in the box.</p>
        <Link href="/collection">Return to the Collection</Link>
      </div>
    </ExperienceShell>
  );
}

import type { Metadata } from "next";
import { ExperienceShell } from "@/components/layout/ExperienceShell";
import { PageTransition } from "@/components/layout/PageTransition";
import { KeyTurnExperience } from "@/components/experiences/KeyTurnExperience";

export const metadata: Metadata = { title: "Invitation" };

export default function InvitePage() {
  return (
    <ExperienceShell className="invite-page">
      <PageTransition>
        <KeyTurnExperience />
      </PageTransition>
    </ExperienceShell>
  );
}

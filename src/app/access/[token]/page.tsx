import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ExperienceShell } from "@/components/layout/ExperienceShell";
import { PageTransition } from "@/components/layout/PageTransition";
import { FinalReveal } from "@/components/experiences/FinalReveal";
import { isValidPrivateAccessToken } from "@/lib/access";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Private Access",
  robots: { index: false, follow: false, nocache: true },
};

export default async function PrivateAccessPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  if (!isValidPrivateAccessToken(token)) notFound();

  return (
    <ExperienceShell className="private-page" ambient="oxblood">
      <PageTransition>
        <FinalReveal />
      </PageTransition>
    </ExperienceShell>
  );
}

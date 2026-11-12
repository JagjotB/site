import type { Metadata } from "next";
import { ExperienceShell } from "@/components/layout/ExperienceShell";
import { CollectionNavigation } from "@/components/layout/CollectionNavigation";
import { PageTransition } from "@/components/layout/PageTransition";
import { VisitedMarker } from "@/components/layout/VisitedMarker";
import { VoiceExperience } from "@/components/experiences/VoiceExperience";
import { assets } from "@/content/assets";

export const metadata: Metadata = { title: "05 — My Voice" };

export default function VoicePage() {
  return (
    <ExperienceShell className="artifact-page voice-page">
      <VisitedMarker slug="my-voice" />
      <CollectionNavigation />
      <PageTransition>
        <div className="voice-layout">
          <VoiceExperience
            recording={assets.voiceRecording}
            transcript={assets.voiceTranscript}
            waveform={assets.voiceWaveform}
            developmentFixture={process.env.NEXT_PUBLIC_E2E_AUDIO_FIXTURE}
          />
        </div>
      </PageTransition>
    </ExperienceShell>
  );
}

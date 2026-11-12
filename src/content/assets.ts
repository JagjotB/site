export type ExperienceAssets = {
  futureStill?: string;
  futureSketch?: string;
  futureAnimatedVideo?: string;
  futureArTarget?: string;
  voiceRecording?: string;
  voiceTranscript?: string;
  voiceWaveform?: readonly number[];
  customMonogram?: string;
};

/**
 * Add public asset paths here (for example `/media/voice/message.mp3`).
 * Undefined entries automatically activate recipient-safe fallback experiences.
 */
export const assets: ExperienceAssets = {
  futureStill: undefined,
  futureSketch: undefined,
  futureAnimatedVideo: undefined,
  futureArTarget: undefined,
  voiceRecording: undefined,
  voiceTranscript: undefined,
  voiceWaveform: undefined,
  customMonogram: undefined,
};

export const featureAvailability = {
  futureAR: false,
  optionalInteractionSound: false,
} as const;

export const arConfiguration = {
  targetIndex: 0,
  autoplay: false,
  muted: true,
} as const;

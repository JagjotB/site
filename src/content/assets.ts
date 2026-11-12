export type ExperienceAssets = {
  /** Public Google Photos shared-album URL. Leave undefined until the album exists. */
  sharedAlbumUrl?: string;
  voiceRecording?: string;
  voiceTranscript?: string;
  voiceWaveform?: readonly number[];
  customMonogram?: string;
};

/** Undefined entries activate recipient-safe, intentional fallback states. */
export const assets: ExperienceAssets = {
  sharedAlbumUrl: undefined,
  voiceRecording: "/media/voice/private-recording.m4a",
  voiceTranscript: undefined,
  voiceWaveform: [15, 77, 55, 65, 71, 55, 57, 56, 49, 72, 65, 64, 100, 56, 51, 45, 52, 57, 61, 76, 54, 61, 53, 71, 64, 55, 73, 54, 74, 68, 31, 65, 31, 53, 48, 69, 82, 58, 51, 72, 53, 81, 63, 52, 60, 50, 74, 62, 52, 48, 57, 66, 97, 64, 89, 76, 62, 53, 68, 57, 48, 36, 71, 31],
  customMonogram: undefined,
};

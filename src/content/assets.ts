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
  voiceRecording: undefined,
  voiceTranscript: undefined,
  voiceWaveform: undefined,
  customMonogram: undefined,
};

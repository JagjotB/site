"use client";

import { Camera } from "lucide-react";
import { arConfiguration, assets, featureAvailability } from "@/content/assets";

/**
 * Intentional AR integration boundary. When enabled, this control can dynamically
 * load a client-only MindAR/Three.js adapter without making AR part of the core route.
 */
export function FutureAREntry() {
  const available = Boolean(
    featureAvailability.futureAR &&
      assets.futureArTarget &&
      assets.futureAnimatedVideo,
  );

  if (!available) return null;

  return (
    <button
      type="button"
      className="ar-entry"
      data-target-index={arConfiguration.targetIndex}
      onClick={() => {
        window.dispatchEvent(new CustomEvent("future-ar:open"));
      }}
    >
      <Camera size={17} aria-hidden="true" />
      Bring This Memory to Life
    </button>
  );
}

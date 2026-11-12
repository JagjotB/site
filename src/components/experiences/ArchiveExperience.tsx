"use client";

import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { experience } from "@/content/experience";
import { easeEditorial } from "@/lib/motion";

type ArchiveExperienceProps = {
  sharedAlbumUrl?: string;
  developmentAlbumFixture?: string;
};

function CameraIllustration() {
  return (
    <svg className="archive-camera" viewBox="0 0 640 520" role="img" aria-label="A miniature vintage-style black camera">
      <defs>
        <linearGradient id="camera-body" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#2a2d2f" />
          <stop offset=".55" stopColor="#111315" />
          <stop offset="1" stopColor="#08090a" />
        </linearGradient>
        <radialGradient id="camera-lens">
          <stop stopColor="#8c7454" />
          <stop offset=".22" stopColor="#25292b" />
          <stop offset=".72" stopColor="#08090a" />
          <stop offset="1" stopColor="#c8ab7a" stopOpacity=".34" />
        </radialGradient>
      </defs>
      <path d="M112 154h110l32-54h134l34 54h105c27 0 49 22 49 49v218H64V203c0-27 21-49 48-49Z" fill="url(#camera-body)" stroke="#c8ab7a" strokeOpacity=".32" strokeWidth="2" />
      <path d="M64 232h512M91 388h458" stroke="#c8ab7a" strokeOpacity=".12" />
      <circle cx="320" cy="285" r="126" fill="#0b0d0e" stroke="#9e855f" strokeOpacity=".62" strokeWidth="7" />
      <circle cx="320" cy="285" r="92" fill="url(#camera-lens)" stroke="#c8ab7a" strokeOpacity=".28" />
      <circle cx="292" cy="255" r="23" fill="#f1e8da" fillOpacity=".08" />
      <rect x="102" y="118" width="83" height="35" rx="5" fill="#17191b" stroke="#c8ab7a" strokeOpacity=".28" />
      <rect x="450" y="108" width="62" height="46" rx="7" fill="#17191b" stroke="#c8ab7a" strokeOpacity=".28" />
      <text x="94" y="412" fill="#9e855f" fontFamily="var(--sans)" fontSize="12" letterSpacing="2">THE ARCHIVE</text>
      <text x="487" y="412" fill="#b8afa2" fontFamily="var(--sans)" fontSize="10">01</text>
    </svg>
  );
}

export function ArchiveExperience({ sharedAlbumUrl, developmentAlbumFixture }: ArchiveExperienceProps) {
  const [effectiveUrl, setEffectiveUrl] = useState(sharedAlbumUrl);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (sharedAlbumUrl || !developmentAlbumFixture) return;
    if (new URLSearchParams(window.location.search).get("albumFixture") !== "1") return;
    const timer = window.setTimeout(() => setEffectiveUrl(developmentAlbumFixture), 0);
    return () => window.clearTimeout(timer);
  }, [developmentAlbumFixture, sharedAlbumUrl]);

  return (
    <section className="archive-experience">
      <motion.div
        className="archive-experience__camera"
        initial={{ opacity: 0, scale: reduceMotion ? 1 : 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: reduceMotion ? 0 : 0.9, ease: easeEditorial }}
      >
        <CameraIllustration />
        <div className="archive-contact-sheet" aria-hidden="true">
          <span /><span /><span /><span />
        </div>
      </motion.div>

      <div className="archive-experience__copy">
        <span>01 · Miniature camera</span>
        <h1>{experience.archive.title}</h1>
        <h2>{experience.archive.lead}</h2>
        <p>{experience.archive.body}</p>
        {effectiveUrl ? (
          <a className="archive-album-link" href={effectiveUrl} target="_blank" rel="noopener noreferrer">
            {experience.archive.action}<ExternalLink aria-hidden="true" />
          </a>
        ) : (
          <div className="archive-empty-state" role="status">
            <strong>{experience.archive.emptyTitle}</strong>
            <span>{experience.archive.emptyBody}</span>
          </div>
        )}
      </div>
    </section>
  );
}

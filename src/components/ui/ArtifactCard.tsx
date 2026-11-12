"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { ArtifactSlug } from "@/content/experience";
import { ArtifactVisual } from "./ArtifactVisual";

type Artifact = {
  number: string;
  slug: ArtifactSlug;
  medium: string;
  cue: string;
  title: string;
  subtitle: string;
};

export function ArtifactCard({
  artifact,
  reserved = false,
  featured = false,
}: {
  artifact: Artifact;
  reserved?: boolean;
  featured?: boolean;
}) {
  const reduceMotion = useReducedMotion();

  const body = (
    <motion.article
      className={`artifact-card artifact-card--${artifact.slug} ${featured ? "artifact-card--featured" : ""} ${reserved ? "artifact-card--reserved" : ""}`}
      whileHover={reserved || reduceMotion ? undefined : { y: -4 }}
      transition={{ duration: 0.35 }}
    >
      <div className="artifact-card__topline">
        <span>{artifact.medium}</span>
        <span>{artifact.cue}</span>
      </div>
      <div className="artifact-card__visual">
        <ArtifactVisual slug={artifact.slug} />
        <span className="artifact-card__reflection" aria-hidden="true" />
      </div>
      <div className="artifact-card__copy">
        <span className="artifact-card__number">{artifact.number}</span>
        <div>
          <h2>{artifact.title}</h2>
          <p>{artifact.subtitle}</p>
        </div>
        {!reserved ? <ArrowUpRight size={18} strokeWidth={1.4} aria-hidden="true" /> : null}
      </div>
    </motion.article>
  );

  if (reserved) {
    return (
      <div aria-label={`${artifact.title}. ${artifact.subtitle}`} className="artifact-card-wrap">
        {body}
      </div>
    );
  }

  return (
    <Link href={`/collection/${artifact.slug}`} className="artifact-card-wrap" aria-label={`Open ${artifact.title}: ${artifact.subtitle}`}>
      {body}
    </Link>
  );
}

"use client";

import { motion, useReducedMotion } from "motion/react";
import { experience } from "@/content/experience";
import { easeEditorial } from "@/lib/motion";

export function PromiseLetter() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="promise-letter-experience">
      <header className="promise-letter-heading">
        <span>03 · The note inside</span>
        <h1>{experience.promise.title}</h1>
        <p>{experience.promise.lead}</p>
      </header>

      <motion.article
        className="promise-letter"
        initial={{ opacity: 0, y: reduceMotion ? 0 : 18, rotate: reduceMotion ? 0 : -0.5 }}
        animate={{ opacity: 1, y: 0, rotate: -0.35 }}
        transition={{ duration: reduceMotion ? 0 : 0.9, ease: easeEditorial }}
      >
        <div className="promise-letter__header">
          <span>For you</span>
          <span>Made to be kept</span>
        </div>
        {experience.promise.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        <strong>{experience.promise.signature}</strong>
        <div className="promise-letter__fold" aria-hidden="true" />
      </motion.article>

      <div className="promise-letter-object" aria-label="The black-and-gold shell container is the physical home of this promise">
        <span />
        <p>The original is inside the shell in your hands.</p>
      </div>
    </section>
  );
}

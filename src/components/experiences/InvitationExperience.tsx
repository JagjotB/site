"use client";

import { motion, useReducedMotion } from "motion/react";
import { experience } from "@/content/experience";
import { GoldLink } from "@/components/ui/GoldButton";
import { Monogram } from "@/components/ui/Monogram";
import { easeEditorial } from "@/lib/motion";

export function InvitationExperience() {
  const reduceMotion = useReducedMotion();
  const duration = reduceMotion ? 0 : 0.8;

  return (
    <section className="invitation-final">
      <motion.div
        className="invitation-final__edition"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration }}
      >
        {experience.identity.edition}
      </motion.div>

      <motion.div
        className="invitation-final__body"
        initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration, delay: reduceMotion ? 0 : 0.12, ease: easeEditorial }}
      >
        <Monogram className="invitation-final__mark" />
        <h1>{experience.identity.title}</h1>
        <p className="invitation-final__dedication">{experience.identity.dedication}</p>
        <p className="invitation-final__supporting">{experience.invitation.supporting}</p>
        <GoldLink href="/collection">{experience.invitation.action}</GoldLink>
      </motion.div>

      <span className="invitation-final__rule" aria-hidden="true" />
    </section>
  );
}

"use client";

import { motion, useReducedMotion } from "motion/react";
import { easeEditorial } from "@/lib/motion";

export function GoldAccent({ className = "" }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.span
      className={`gold-accent ${className}`}
      aria-hidden="true"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: reduceMotion ? 0 : 0.9, ease: easeEditorial }}
    />
  );
}

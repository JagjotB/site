"use client";

import { useRef, useState } from "react";
import { RotateCcw } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { experience } from "@/content/experience";
import { clamp } from "@/lib/media";
import { easeEditorial, easeMechanical } from "@/lib/motion";
import { GoldLink } from "@/components/ui/GoldButton";
import { Monogram } from "@/components/ui/Monogram";

export function KeyTurnExperience() {
  const [progress, setProgress] = useState(0);
  const [unlocked, setUnlocked] = useState(false);
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef<{ x: number; progress: number } | null>(null);
  const reduceMotion = useReducedMotion();

  function completeUnlock() {
    setProgress(1);
    window.setTimeout(() => setUnlocked(true), reduceMotion ? 0 : 700);
  }

  function reset() {
    setUnlocked(false);
    setProgress(0);
  }

  return (
    <section className={`key-experience ${unlocked ? "key-experience--open" : ""}`}>
      <div className="invite-edition">{experience.identity.edition}</div>

      <motion.div
        className="invite-title"
        animate={unlocked ? { opacity: 0, y: -16 } : { opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.5, ease: easeEditorial }}
        aria-hidden={unlocked}
      >
        <Monogram className="invite-monogram" />
        <h1>{experience.identity.title}</h1>
        <p>{experience.identity.dedication}</p>
      </motion.div>

      <motion.div
        className="key-stage"
        animate={unlocked ? { opacity: 0, scale: 1.06, pointerEvents: "none" } : { opacity: 1, scale: 1 }}
        transition={{ duration: reduceMotion ? 0 : 0.65, ease: easeEditorial }}
        aria-hidden={unlocked}
      >
        <div className="key-copy">
          <p className="key-copy__title">{experience.invitation.prompt}</p>
          <p>{experience.invitation.prelude}</p>
        </div>

        <div
          className="key-control"
          role="slider"
          aria-label="Turn the key"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(progress * 100)}
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              completeUnlock();
            }
            if (event.key === "ArrowRight") setProgress((value) => clamp(value + 0.1));
            if (event.key === "ArrowLeft") setProgress((value) => clamp(value - 0.1));
          }}
          onPointerDown={(event) => {
            setDragging(true);
            dragStart.current = { x: event.clientX, progress };
            event.currentTarget.setPointerCapture(event.pointerId);
          }}
          onPointerMove={(event) => {
            if (!dragStart.current) return;
            const next = clamp(dragStart.current.progress + (event.clientX - dragStart.current.x) / 150);
            setProgress(next);
          }}
          onPointerUp={(event) => {
            setDragging(false);
            dragStart.current = null;
            event.currentTarget.releasePointerCapture(event.pointerId);
            if (progress > 0.68) completeUnlock();
            else setProgress(0);
          }}
          onPointerCancel={() => {
            setDragging(false);
            dragStart.current = null;
            setProgress(0);
          }}
        >
          <svg viewBox="0 0 320 320" aria-hidden="true">
            <defs>
              <linearGradient id="key-metal" x1="0" y1="0" x2="1" y2="1">
                <stop stopColor="#806947" />
                <stop offset=".36" stopColor="#e4c892" />
                <stop offset=".62" stopColor="#9E855F" />
                <stop offset="1" stopColor="#5f4a2f" />
              </linearGradient>
            </defs>
            <motion.circle
              cx="160"
              cy="160"
              r="106"
              fill="none"
              stroke="#C8AB7A"
              strokeOpacity=".18"
              strokeDasharray="2 9"
              animate={{ rotate: progress * 90 }}
              style={{ transformOrigin: "160px 160px" }}
            />
            <circle cx="160" cy="160" r="78" fill="#0d0f10" stroke="#9E855F" strokeOpacity=".45" />
            <motion.g
              animate={{ rotate: progress * 90 }}
              transition={{ duration: dragging || reduceMotion ? 0 : 0.8, ease: easeMechanical }}
              style={{ transformOrigin: "160px 160px" }}
            >
              <circle cx="160" cy="122" r="24" fill="none" stroke="url(#key-metal)" strokeWidth="8" />
              <path d="M156 146h8v72h-8zM160 194h28v10h-16v14h-12z" fill="url(#key-metal)" />
              <path d="M142 112c8-14 30-17 42-2" fill="none" stroke="#f0d9aa" strokeOpacity={0.22 + progress * 0.65} strokeWidth="2" />
            </motion.g>
          </svg>
          <span className="key-control__hint">Drag the key</span>
        </div>

        <button type="button" className="key-fallback" onClick={completeUnlock}>
          Turn the Key
        </button>
        <div className="key-progress" aria-hidden="true">
          <motion.span animate={{ scaleX: progress }} />
        </div>
      </motion.div>

      <motion.div
        className="unlocked-message"
        initial={false}
        animate={unlocked ? { opacity: 1, y: 0, pointerEvents: "auto" } : { opacity: 0, y: 28, pointerEvents: "none" }}
        transition={{ delay: unlocked && !reduceMotion ? 0.35 : 0, duration: reduceMotion ? 0 : 0.8, ease: easeEditorial }}
        aria-hidden={!unlocked}
      >
        <span className="unlocked-message__line" aria-hidden="true" />
        <p className="archive-label">That’s the first part.</p>
        <h2>{experience.invitation.unlockedTitle}</h2>
        <p>{experience.invitation.unlockedBody}</p>
        <p className="unlocked-message__physical">{experience.invitation.physicalCue}</p>
        <GoldLink href="/collection">Discover the Collection</GoldLink>
        <button type="button" className="replay-control" onClick={reset}>
          <RotateCcw size={14} aria-hidden="true" /> Replay the opening
        </button>
      </motion.div>
    </section>
  );
}

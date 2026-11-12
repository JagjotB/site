"use client";

import { useState } from "react";
import { RotateCcw } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { experience } from "@/content/experience";
import { easeEditorial } from "@/lib/motion";

export function PromiseShell() {
  const [opened, setOpened] = useState(false);
  const reduceMotion = useReducedMotion();
  const duration = reduceMotion ? 0 : 1.15;

  return (
    <section className={`promise-shell-experience ${opened ? "promise-shell-experience--open" : ""}`}>
      <div className="promise-shell-heading">
        <span>{experience.promise.label}</span>
        <h1>{experience.promise.title}</h1>
        <p>{experience.promise.subtitle}</p>
      </div>

      <div className="promise-shell-stage">
        <motion.div
          className="promise-shell-object"
          animate={opened ? { x: reduceMotion ? 0 : -72, y: -12, rotate: -3 } : { x: 0, y: 0, rotate: 0 }}
          transition={{ duration, ease: easeEditorial }}
          aria-hidden="true"
        >
          <div className="promise-shell-body">
            <div className="promise-shell-crimp">
              <i /><i /><i /><i /><i /><i />
            </div>
            <span className="promise-shell-body__index">03</span>
            <span className="promise-shell-body__name">THE PROMISE</span>
            <span className="promise-shell-body__edition">Made once · for you</span>
          </div>

          <motion.div
            className="promise-shell-base"
            animate={opened ? { y: 94, rotate: 720, opacity: 0.88 } : { y: 0, rotate: 0, opacity: 1 }}
            transition={{ duration, ease: easeEditorial }}
          >
            <span>12</span>
            <small>GA</small>
          </motion.div>
        </motion.div>

        <motion.article
          className="promise-shell-note"
          initial={false}
          animate={opened ? { opacity: 1, x: 0, y: 0, scale: 1 } : { opacity: 0, x: -42, y: 34, scale: 0.82 }}
          transition={{ duration: reduceMotion ? 0 : 0.85, delay: opened && !reduceMotion ? 0.55 : 0, ease: easeEditorial }}
          aria-hidden={!opened}
        >
          <div className="promise-shell-note__rule">
            <span>For you</span>
            <span>Inside the shell</span>
          </div>
          <p>{experience.promise.body}</p>
          <strong>{experience.promise.signature}</strong>
        </motion.article>
      </div>

      <div className="promise-shell-controls">
        {!opened ? (
          <>
            <p>The message is inside.</p>
            <button type="button" className="promise-shell-action" onClick={() => setOpened(true)}>
              <span>Unscrew the base</span>
              <i aria-hidden="true" />
            </button>
          </>
        ) : (
          <button type="button" className="replay-control" onClick={() => setOpened(false)}>
            <RotateCcw size={14} aria-hidden="true" /> Close the shell
          </button>
        )}
      </div>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { experience } from "@/content/experience";
import { easeEditorial } from "@/lib/motion";

function Blueprint({ revealed }: { revealed: boolean }) {
  return (
    <svg className="way-out-blueprint" viewBox="0 0 760 760" role="img" aria-label="An architectural floor plan revealing a concealed passage and private room">
      <defs>
        <radialGradient id="blueprint-vignette">
          <stop stopColor="#202426" />
          <stop offset="1" stopColor="#0b0d0e" />
        </radialGradient>
        <filter id="blueprint-paper">
          <feTurbulence baseFrequency=".8" numOctaves="2" result="noise" />
          <feColorMatrix in="noise" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 .04 0" />
        </filter>
      </defs>
      <circle cx="380" cy="380" r="354" fill="url(#blueprint-vignette)" stroke="#c8ab7a" strokeOpacity=".42" strokeWidth="2" />
      <circle cx="380" cy="380" r="330" fill="none" stroke="#9e855f" strokeOpacity=".14" strokeDasharray="3 13" />
      <g className="blueprint-grid" stroke="#c8ab7a" strokeOpacity=".07">
        {Array.from({ length: 13 }).map((_, index) => <path key={`v-${index}`} d={`M${140 + index * 40} 120v520`} />)}
        {Array.from({ length: 13 }).map((_, index) => <path key={`h-${index}`} d={`M120 ${140 + index * 40}h520`} />)}
      </g>
      <motion.g
        initial={false}
        animate={{ opacity: revealed ? 1 : 0.2, scale: revealed ? 1 : 1.84, x: revealed ? 0 : -190, y: revealed ? 0 : -145 }}
        transition={{ duration: 1.35, ease: easeEditorial }}
        style={{ transformOrigin: "380px 380px" }}
        fill="none"
        stroke="#c8ab7a"
      >
        <path d="M175 188h410v386H175Z" strokeOpacity=".5" strokeWidth="4" />
        <path d="M175 308h154V188M329 308v266M329 427h256M462 188v239M462 308h123" strokeOpacity=".54" strokeWidth="5" />
        <path d="M329 376h62v51h-62M391 402h71" stroke="#f1e8da" strokeOpacity={revealed ? ".65" : ".2"} strokeDasharray="7 7" strokeWidth="3" />
        <path d="M385 383l15 19-15 19" stroke="#572a38" strokeOpacity={revealed ? "1" : "0"} strokeWidth="5" />
        <rect x="462" y="427" width="123" height="147" fill="#572a38" fillOpacity={revealed ? ".12" : "0"} strokeOpacity=".7" />
        <circle cx="523" cy="500" r="27" strokeOpacity=".38" />
        <path d="M491 542h64M523 473v54" strokeOpacity=".28" />
        <path d="M228 222h52v48h-52ZM210 360h76v108h-76ZM492 218h58v50h-58Z" strokeOpacity=".25" />
      </motion.g>
      <motion.g animate={{ opacity: revealed ? 1 : 0 }} transition={{ delay: .75, duration: .5 }}>
        <text x="468" y="604" fill="#c8ab7a" fontFamily="var(--sans)" fontSize="12" letterSpacing="2">THE QUIET ROOM</text>
        <text x="333" y="365" fill="#b8afa2" fontFamily="var(--sans)" fontSize="10">CONCEALED PASSAGE</text>
      </motion.g>
      <circle cx="380" cy="380" r="354" filter="url(#blueprint-paper)" opacity=".7" />
    </svg>
  );
}

export function WayOutExperience() {
  const [revealed, setRevealed] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const timer = window.setTimeout(() => setRevealed(true), reduceMotion ? 0 : 700);
    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

  return (
    <section className="way-out-experience">
      <header className="way-out-copy">
        <span>02 · Architectural fragment</span>
        <h1>{experience.wayOut.title}</h1>
        <h2>{experience.wayOut.lead}</h2>
        <p>{experience.wayOut.body}</p>
        <p>{experience.wayOut.closing}</p>
      </header>
      <div className="way-out-drawing">
        <Blueprint revealed={revealed} />
        <button type="button" onClick={() => setRevealed((value) => !value)}>
          {revealed ? experience.wayOut.resetAction : experience.wayOut.revealAction}
        </button>
      </div>
    </section>
  );
}

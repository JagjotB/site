"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { experience } from "@/content/experience";
import { GoldButton } from "@/components/ui/GoldButton";
import { Monogram } from "@/components/ui/Monogram";
import { easeEditorial } from "@/lib/motion";

function CredentialMark() {
  const reduceMotion = useReducedMotion();
  return (
    <motion.svg className="collection-seal" viewBox="0 0 320 210" aria-label="The black and brass Only You credential" role="img">
      <defs>
        <linearGradient id="credential-face" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#202326" />
          <stop offset=".54" stopColor="#101214" />
          <stop offset="1" stopColor="#181514" />
        </linearGradient>
        <linearGradient id="credential-edge" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#7f6b4d" />
          <stop offset=".5" stopColor="#c8ab7a" />
          <stop offset="1" stopColor="#66543d" />
        </linearGradient>
      </defs>
      <motion.g
        initial={{ opacity: 0, y: reduceMotion ? 0 : 10, rotate: reduceMotion ? 0 : -1.5 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.9, ease: easeEditorial }}
        style={{ transformOrigin: "160px 105px" }}
      >
        <rect x="32" y="34" width="256" height="142" rx="8" fill="#08090a" opacity=".52" transform="translate(0 8)" />
        <rect x="32" y="34" width="256" height="142" rx="8" fill="url(#credential-face)" stroke="url(#credential-edge)" strokeOpacity=".82" />
        <path d="M51 53h218M51 157h218" stroke="#c8ab7a" strokeOpacity=".16" />
        <g transform="translate(64 69)" fill="none" stroke="#c8ab7a">
          <path d="M0 0h58M0 42h58M8-4v50M23 6v36M40-4v50M51 13v29M23 6 40-4" strokeWidth="1.5" />
          <circle cx="51" cy="7" r="3" fill="#572a38" stroke="none" />
        </g>
        <text x="154" y="93" fill="#f1e8da" fontFamily="var(--serif)" fontSize="22">
          Only You.
        </text>
        <text x="155" y="113" fill="#9f978c" fontFamily="var(--sans)" fontSize="7" letterSpacing=".45">Made once · for you</text>
        {Array.from({ length: 6 }).map((_, index) => (
          <motion.rect
            key={index}
            x={154 + index * 17}
            y="139"
            width="10"
            height="2"
            fill={index === 5 ? "#572a38" : "#9e855f"}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ delay: reduceMotion ? 0 : 0.75 + index * 0.08, duration: reduceMotion ? 0 : 0.35 }}
            style={{ transformOrigin: `${154 + index * 17}px 140px` }}
          />
        ))}
      </motion.g>
    </motion.svg>
  );
}

function TrayIllustration({ lifted }: { lifted: boolean }) {
  const reduceMotion = useReducedMotion();
  return (
    <svg className="tray-illustration" viewBox="0 0 620 500" role="img" aria-label="A six-compartment wooden tray lifting to reveal a hidden space">
      <defs>
        <linearGradient id="wood-top" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#9b7350" />
          <stop offset=".55" stopColor="#68472f" />
          <stop offset="1" stopColor="#3e2b20" />
        </linearGradient>
        <radialGradient id="under-glow">
          <stop stopColor="#f1e8da" stopOpacity=".7" />
          <stop offset="1" stopColor="#572A38" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="310" cy="390" rx="190" ry="70" fill="url(#under-glow)" opacity={lifted ? 1 : 0} />
      <rect x="126" y="300" width="368" height="125" rx="8" fill="#231c19" stroke="#866243" />
      <motion.g animate={lifted ? { y: -118, rotate: -2 } : { y: 0, rotate: 0 }} transition={{ duration: reduceMotion ? 0 : 1.5, ease: easeEditorial }} style={{ transformOrigin: "310px 300px" }}>
        <rect x="110" y="105" width="400" height="240" rx="7" fill="url(#wood-top)" stroke="#C8AB7A" strokeOpacity=".42" strokeWidth="2" />
        <path d="M243 105v240M377 105v240M110 225h400" stroke="#2e2118" strokeWidth="7" />
        {[176, 310, 444].flatMap((x) => [165, 285].map((y) => <rect key={`${x}-${y}`} x={x - 40} y={y - 38} width="80" height="76" rx="2" fill="#171514" fillOpacity=".24" stroke="#c09965" strokeOpacity=".16" />))}
        <path d="M115 130c110-42 225 28 388-3M116 250c148-39 246 31 388-7" fill="none" stroke="#d0a573" strokeOpacity=".14" />
      </motion.g>
      <motion.g animate={{ opacity: lifted ? 1 : 0 }} transition={{ delay: reduceMotion ? 0 : 1, duration: 0.8 }}>
        <path d="M218 374c17-32 36-38 55-7-28 12-44 15-55 7ZM397 370c21-29 40-31 57 3-28 8-45 7-57-3Z" fill="#6f5444" />
        <rect x="267" y="336" width="112" height="74" rx="2" fill="#eee2d2" transform="rotate(-2 323 373)" />
        <path d="M267 337l55 40 57-41" fill="#d6c7b2" />
        <circle cx="323" cy="376" r="14" fill="#572A38" />
      </motion.g>
    </svg>
  );
}

export function FinalReveal() {
  const [stage, setStage] = useState<"intro" | "tray" | "settled">("intro");
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (stage !== "tray") return;
    const timer = window.setTimeout(() => setStage("settled"), reduceMotion ? 300 : 3600);
    return () => window.clearTimeout(timer);
  }, [stage, reduceMotion]);

  return (
    <section className="final-reveal">
      <AnimatePresence mode="wait">
        {stage === "intro" ? (
          <motion.div key="intro" className="final-intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <header className="final-intro__identity">
              <Monogram />
              <span>{experience.final.label}</span>
              <h1>{experience.final.title}</h1>
              <p>{experience.final.prelude}</p>
            </header>
            <div className="final-intro__object">
              <CredentialMark />
              <p className="final-intro__line">{experience.final.collectionLine}</p>
              <GoldButton type="button" onClick={() => setStage("tray")}>{experience.final.action}</GoldButton>
            </div>
          </motion.div>
        ) : (
          <motion.div key="tray" className="tray-scene" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <TrayIllustration lifted />
            <motion.div className="tray-copy" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: reduceMotion ? 0 : 1.45, duration: reduceMotion ? 0 : 0.8 }}>
              <p>{experience.final.instruction}</p>
              <h2>{experience.final.command}</h2>
              <span>{experience.final.detail}</span>
            </motion.div>
            <motion.p className="final-settled" animate={{ opacity: stage === "settled" ? 1 : 0 }} aria-hidden={stage !== "settled"}>
              {experience.final.closing}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

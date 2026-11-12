"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { assets } from "@/content/assets";
import { experience } from "@/content/experience";
import { announceableProgress } from "@/lib/accessibility";
import { clamp } from "@/lib/media";
import { GoldButton } from "@/components/ui/GoldButton";
import { FutureAREntry } from "./FutureAR";

function ConceptLandscape({ warm = false }: { warm?: boolean }) {
  return (
    <svg viewBox="0 0 900 1100" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id={warm ? "warm-sky" : "sketch-sky"} x1="0" y1="0" x2="0" y2="1">
          <stop stopColor={warm ? "#8d684c" : "#2b2d2e"} />
          <stop offset=".55" stopColor={warm ? "#4f4140" : "#202224"} />
          <stop offset="1" stopColor="#111315" />
        </linearGradient>
        <radialGradient id={warm ? "warm-sun" : "sketch-sun"}>
          <stop stopColor={warm ? "#f1d6a4" : "#a69b8c"} stopOpacity={warm ? ".8" : ".2"} />
          <stop offset="1" stopColor="#C8AB7A" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="900" height="1100" fill={`url(#${warm ? "warm-sky" : "sketch-sky"})`} />
      <circle cx="674" cy="296" r="190" fill={`url(#${warm ? "warm-sun" : "sketch-sun"})`} />
      <path d="M0 545c122-72 224-79 330-133 121-62 264-45 570 92v248H0z" fill={warm ? "#37302d" : "#1b1d1e"} />
      <path d="M0 589c166-81 296-65 430-124 129-57 267-31 470 70" fill="none" stroke={warm ? "#d0b17c" : "#8c8982"} strokeOpacity={warm ? ".44" : ".22"} strokeWidth="3" />
      <path d="M0 610c180 31 318 25 458 0 158-27 282-18 442 24v220H0z" fill={warm ? "#2a3030" : "#171a1b"} />
      <g fill="none" stroke={warm ? "#e1c38f" : "#777b7c"} strokeOpacity={warm ? ".23" : ".13"}>
        <path d="M0 660c195 18 355 14 510-7 151-21 271-15 390 10" />
        <path d="M0 704c210 17 375 8 531-12 150-18 271-10 369 9" />
      </g>
      <path d="M0 790h900v310H0z" fill={warm ? "#5b4637" : "#222526"} />
      <path d="M0 790h900M0 882h900M238 790v310M660 790v310" stroke={warm ? "#b18a61" : "#55595a"} strokeOpacity=".24" strokeWidth="2" />
      <path d="M70 734h760v25H70zM105 759h12v205h-12M783 759h12v205h-12" fill={warm ? "#171513" : "#111314"} stroke={warm ? "#a98a5e" : "#55585a"} strokeWidth="2" />
      <g fill={warm ? "#151414" : "#151718"} stroke={warm ? "#a98a5e" : "#56595a"} strokeWidth="2">
        <circle cx="404" cy="700" r="39" />
        <path d="M343 930c4-126 20-187 61-187 46 0 66 65 72 187Z" />
        <circle cx="504" cy="691" r="42" />
        <path d="M451 930c5-132 19-195 55-195 47 0 69 70 76 195Z" />
      </g>
      <path d="M447 760c18 11 30 12 47 1" fill="none" stroke={warm ? "#d7b77f" : "#747777"} strokeOpacity=".5" strokeWidth="3" />
      <g transform="translate(655 850)">
        <ellipse cx="0" cy="5" rx="72" ry="15" fill={warm ? "#171513" : "#17191a"} stroke={warm ? "#9e855f" : "#505354"} />
        <path d="M-6 20v105M-45 125h78" stroke={warm ? "#9e855f" : "#505354"} strokeWidth="5" />
        <path d="M-28 -2h56v11h-56z" fill={warm ? "#a77e51" : "#444748"} transform="rotate(-6)" />
        <path d="M0 -5v14" stroke={warm ? "#ead9bd" : "#888"} strokeOpacity=".6" />
      </g>
      {!warm ? (
        <g stroke="#aaa39a" strokeOpacity=".12">
          {Array.from({ length: 13 }).map((_, index) => <path key={index} d={`M${index * 83 - 40} 0l-170 1100`} />)}
        </g>
      ) : null}
    </svg>
  );
}

export function FutureReveal() {
  const [progress, setProgress] = useState(0.32);
  const [dragging, setDragging] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const frame = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  function setFromPointer(clientX: number) {
    const bounds = frame.current?.getBoundingClientRect();
    if (!bounds) return;
    setProgress(clamp((clientX - bounds.left) / bounds.width));
  }

  const revealed = progress > 0.96;

  return (
    <div className="future-reveal">
      <div
        ref={frame}
        className="future-frame"
        role="slider"
        aria-label="Develop the imagined memory"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(progress * 100)}
        aria-valuetext={announceableProgress(progress)}
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") setProgress((value) => clamp(value + 0.08));
          if (event.key === "ArrowLeft") setProgress((value) => clamp(value - 0.08));
          if (event.key === "Enter" || event.key === " ") setProgress(1);
        }}
        onPointerDown={(event) => {
          setDragging(true);
          event.currentTarget.setPointerCapture(event.pointerId);
          setFromPointer(event.clientX);
        }}
        onPointerMove={(event) => {
          if (dragging) setFromPointer(event.clientX);
        }}
        onPointerUp={(event) => {
          setDragging(false);
          event.currentTarget.releasePointerCapture(event.pointerId);
        }}
      >
        <div className="future-scene future-scene--sketch">
          {assets.futureSketch && !imageFailed ? (
            <Image src={assets.futureSketch} alt="" fill sizes="(max-width: 768px) 100vw, 52vw" onError={() => setImageFailed(true)} />
          ) : (
            <ConceptLandscape />
          )}
        </div>
        <motion.div
          className="future-scene future-scene--possible"
          animate={{ clipPath: `inset(0 ${100 - progress * 100}% 0 0)` }}
          transition={{ duration: dragging || reduceMotion ? 0 : 0.8 }}
        >
          {assets.futureStill && !imageFailed ? (
            <Image
              src={assets.futureStill}
              alt={experience.tomorrow.imageAlt}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 52vw"
              onError={() => setImageFailed(true)}
            />
          ) : (
            <ConceptLandscape warm />
          )}
        </motion.div>
        <motion.div className="future-marker" animate={{ left: `${progress * 100}%` }} transition={{ duration: dragging ? 0 : 0.8 }}>
          <span />
        </motion.div>
        <div className="future-caption">
          <span className={progress < 0.58 ? "is-active" : ""}>A sketch</span>
          <span className={progress >= 0.58 ? "is-active" : ""}>A possibility</span>
        </div>
      </div>

      <div className="future-controls">
        <p>{revealed ? "The picture is yours." : "Drag the gold line to develop the memory."}</p>
        <GoldButton type="button" quiet onClick={() => setProgress(revealed ? 0.32 : 1)}>
          {revealed ? "Reset the print" : "Finish developing it"}
        </GoldButton>
      </div>
      <motion.div
        className="future-ending"
        animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        aria-hidden={!revealed}
      >
        <p>{experience.tomorrow.reveal}</p>
        <span>{experience.tomorrow.closing}</span>
      </motion.div>
      <FutureAREntry />
    </div>
  );
}

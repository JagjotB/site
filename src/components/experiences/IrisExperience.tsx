"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { experience } from "@/content/experience";
import { GoldButton } from "@/components/ui/GoldButton";

export function IrisExperience() {
  const [open, setOpen] = useState(12);
  const reduceMotion = useReducedMotion();
  const revealed = open > 72;
  const innerRadius = 8 + open * 1.18;

  function polarPoint(radius: number, degrees: number) {
    const radians = (degrees * Math.PI) / 180;
    return `${(200 + Math.cos(radians) * radius).toFixed(3)} ${(200 + Math.sin(radians) * radius).toFixed(3)}`;
  }

  return (
    <div className="iris-experience">
      <header className="iris-engraving">
        <span>The mechanical iris</span>
        <h1>{experience.inFocus.title}</h1>
      </header>
      <div className="iris-assembly">
        <svg viewBox="0 0 400 400" role="img" aria-label={`Mechanical aperture ${Math.round(open)} percent open`}>
          <defs>
            <radialGradient id="iris-light">
              <stop stopColor="#f0d7a6" stopOpacity=".95" />
              <stop offset=".35" stopColor="#8d623f" stopOpacity=".5" />
              <stop offset="1" stopColor="#111315" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="iris-ring" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#5e4c32" />
              <stop offset=".45" stopColor="#d6b77e" />
              <stop offset=".7" stopColor="#7e6747" />
              <stop offset="1" stopColor="#c0a06c" />
            </linearGradient>
          </defs>
          <circle cx="200" cy="200" r="184" fill="#0a0c0d" stroke="url(#iris-ring)" strokeWidth="4" />
          <circle cx="200" cy="200" r="169" fill="#151719" stroke="#C8AB7A" strokeOpacity=".14" strokeWidth="18" />
          {Array.from({ length: 12 }).map((_, index) => {
            const angle = (index * Math.PI * 2) / 12;
            const x = Number((200 + Math.cos(angle) * 169).toFixed(3));
            const y = Number((200 + Math.sin(angle) * 169).toFixed(3));
            return <circle key={index} cx={x} cy={y} r="3.2" fill="#9E855F" opacity=".58" />;
          })}
          <circle cx="200" cy="200" r="150" fill="url(#iris-light)" opacity={open / 100} />
          <g>
            {Array.from({ length: 10 }).map((_, index) => {
              const bladePath = `M${polarPoint(151, index * 36 - 112)} A151 151 0 0 1 ${polarPoint(151, index * 36 - 64)} L${polarPoint(innerRadius, index * 36 - 73)} A${innerRadius.toFixed(3)} ${innerRadius.toFixed(3)} 0 0 0 ${polarPoint(innerRadius, index * 36 - 103)} Z`;
              return (
                <motion.path
                  key={index}
                  d={bladePath}
                  animate={{ d: bladePath }}
                  fill={index % 2 ? "#17191b" : "#222527"}
                  stroke="#C8AB7A"
                  strokeOpacity=".18"
                  transition={{ duration: reduceMotion ? 0 : 0.34 }}
                />
              );
            })}
          </g>
          <motion.circle cx="200" cy="200" r="180" fill="none" stroke="#C8AB7A" strokeOpacity=".2" strokeDasharray="2 10" animate={{ rotate: open * -0.18 }} style={{ transformOrigin: "200px 200px" }} />
        </svg>
        <div className="iris-message" aria-live="polite">
          <motion.p animate={{ opacity: revealed ? 1 : 0.28, filter: `blur(${revealed ? 0 : 7}px)` }}>
            {revealed ? experience.inFocus.heading : experience.inFocus.prelude}
          </motion.p>
        </div>
      </div>

      <div className="iris-dial">
        <div className="iris-dial__labels">
          <span>Closed</span>
          <span>Turn the ring</span>
          <span>Open</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={open}
          onChange={(event) => setOpen(Number(event.target.value))}
          aria-label="Open or close the aperture"
          style={{ "--iris-open": `${open}%` } as React.CSSProperties}
        />
      </div>

      <motion.div
        className="iris-admiration"
        animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
        aria-hidden={!revealed}
      >
        <p>{experience.inFocus.admiration}</p>
      </motion.div>

      <GoldButton type="button" quiet onClick={() => setOpen(revealed ? 8 : 100)}>
        {revealed ? "Close the Aperture" : "Open the Aperture"}
      </GoldButton>
    </div>
  );
}

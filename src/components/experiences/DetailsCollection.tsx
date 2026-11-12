"use client";

import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { experience } from "@/content/experience";
import { easeEditorial, motionDurations } from "@/lib/motion";

const paperTones = ["paper-warm", "paper-pale", "paper-aged", "paper-clean", "paper-warm", "paper-pale"];

export function DetailsCollection() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const panels = experience.details.panels;
  const lastIndex = panels.length - 1;

  function go(next: number) {
    const clamped = Math.max(0, Math.min(lastIndex, next));
    const viewport = viewportRef.current;
    const panel = viewport?.querySelector<HTMLElement>(`[data-booklet-page="${clamped}"]`);
    if (viewport && panel) {
      const centeredLeft = panel.offsetLeft - (viewport.clientWidth - panel.offsetWidth) / 2;
      viewport.scrollTo({ left: centeredLeft, behavior: reduceMotion ? "auto" : "smooth" });
    }
  }

  function handleScroll() {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const panels = Array.from(viewport.querySelectorAll<HTMLElement>("[data-booklet-page]"));
    const viewportCenter = viewport.scrollLeft + viewport.clientWidth / 2;
    const active = panels.reduce(
      (closest, panel, panelIndex) => {
        const panelCenter = panel.offsetLeft + panel.offsetWidth / 2;
        const distance = Math.abs(panelCenter - viewportCenter);
        return distance < closest.distance ? { index: panelIndex, distance } : closest;
      },
      { index, distance: Number.POSITIVE_INFINITY },
    );
    if (active.index !== index) setIndex(active.index);
  }

  return (
    <section className="details-experience" aria-label="The Details accordion booklet">
      <div className="details-accordion-viewport" ref={viewportRef} onScroll={handleScroll}>
        <div className="details-accordion-track">
          <motion.header
            className="details-booklet-cover"
            data-booklet-page="0"
            aria-current={index === 0 ? "step" : undefined}
            animate={{ opacity: index === 0 ? 1 : 0.78 }}
            transition={{ duration: reduceMotion ? 0 : motionDurations.card, ease: easeEditorial }}
          >
            <span>{experience.details.label}</span>
            <div>
              <span className="details-booklet-cover__purpose">{panels[0].purpose}</span>
              <h1>{panels[0].heading}</h1>
              <p>{panels[0].message}</p>
            </div>
            <small>{experience.details.footer}</small>
          </motion.header>

          {panels.slice(1).map((panel, panelIndex) => {
            const pageIndex = panelIndex + 1;
            return (
              <motion.article
                key={panel.id}
                data-booklet-page={pageIndex}
                aria-current={index === pageIndex ? "step" : undefined}
                className={`detail-note detail-note--accordion ${paperTones[panelIndex % paperTones.length]}`}
                animate={{ opacity: index === pageIndex ? 1 : 0.78 }}
                transition={{ duration: reduceMotion ? 0 : motionDurations.card, ease: easeEditorial }}
              >
                <div className="detail-note__number">{panel.number}</div>
                <div className="detail-note__rule" />
                <p className="detail-note__purpose">{panel.purpose}</p>
                <h2>{panel.heading}</h2>
                <p className="detail-note__body">{panel.message}</p>
                <span className="detail-note__edition">Panel {pageIndex + 1} of {panels.length}</span>
              </motion.article>
            );
          })}
        </div>
      </div>

      <div className="details-booklet-controls">
        <button type="button" onClick={() => go(index - 1)} disabled={index === 0} aria-label="Previous panel">
          <ArrowLeft aria-hidden="true" />
        </button>
        <span aria-live="polite">Panel {index + 1} of {panels.length}</span>
        <button type="button" onClick={() => go(index + 1)} disabled={index === lastIndex} aria-label="Next panel">
          <ArrowRight aria-hidden="true" />
        </button>
      </div>
      <p className="details-swipe-hint">Swipe the booklet</p>
    </section>
  );
}

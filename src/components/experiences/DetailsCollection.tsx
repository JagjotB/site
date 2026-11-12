"use client";

import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { experience } from "@/content/experience";
import { GoldLink } from "@/components/ui/GoldButton";

const paperTones = ["paper-warm", "paper-pale", "paper-aged", "paper-clean", "paper-warm", "paper-pale"];

export function DetailsCollection() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const entries = experience.details.observations;
  const lastIndex = entries.length + 1;

  function go(next: number) {
    const clamped = Math.max(0, Math.min(lastIndex, next));
    const viewport = viewportRef.current;
    const panel = viewport?.querySelector<HTMLElement>(`[data-booklet-page="${clamped}"]`);
    if (viewport && panel) {
      viewport.scrollTo({ left: panel.offsetLeft - 16, behavior: reduceMotion ? "auto" : "smooth" });
    }
  }

  function handleScroll() {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const panels = Array.from(viewport.querySelectorAll<HTMLElement>("[data-booklet-page]"));
    const active = panels.reduce(
      (closest, panel, panelIndex) => {
        const distance = Math.abs(panel.offsetLeft - viewport.scrollLeft - 16);
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
          <header className="details-booklet-cover" data-booklet-page="0">
            <span>The accordion book</span>
            <div>
              <h1>{experience.details.title}</h1>
              <p>{experience.details.heading}</p>
            </div>
            <small>{experience.details.subtitle}</small>
          </header>

          {entries.map((entry, entryIndex) => (
            <article
              key={entry.number}
              data-booklet-page={entryIndex + 1}
              className={`detail-note detail-note--accordion ${paperTones[entryIndex % paperTones.length]}`}
            >
              <div className="detail-note__number">{entry.number}</div>
              <div className="detail-note__rule" />
              <p className="archive-label">{entry.category}</p>
              <h2>{entry.label}</h2>
              <p className="detail-note__body">{entry.body}</p>
              <p className="detail-note__emphasis">{entry.emphasis}</p>
              <span className="detail-note__edition">Page {entryIndex + 1} of {entries.length}</span>
            </article>
          ))}

          <aside className="details-closing details-closing--accordion" data-booklet-page={lastIndex}>
            <span className="details-closing__mark">VI</span>
            <p>{experience.details.closing}</p>
            <GoldLink href="/collection">Back to the box</GoldLink>
          </aside>
        </div>
      </div>

      <div className="details-booklet-controls">
        <button type="button" onClick={() => go(index - 1)} disabled={index === 0} aria-label="Previous observation">
          <ArrowLeft aria-hidden="true" />
        </button>
        <span aria-live="polite">{index + 1} of {lastIndex + 1}</span>
        <button type="button" onClick={() => go(index + 1)} disabled={index === lastIndex} aria-label="Next observation">
          <ArrowRight aria-hidden="true" />
        </button>
      </div>
      <p className="details-swipe-hint">Swipe the booklet</p>
    </section>
  );
}

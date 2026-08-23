"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export type AccordionItem = {
  image: string;
  label: string;
  title: string;
  description: string;
  alt: string;
  link?: string;
};

export function AccordionGallery({ items, defaultIndex = 2 }: { items: AccordionItem[]; defaultIndex?: number }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const mediaRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const wasActiveOnPointerDownRef = useRef(true);
  const firstRunRef = useRef(true);
  const [active, setActive] = useState(Math.min(Math.max(defaultIndex, 0), items.length - 1));

  const applyLayout = useCallback((animate: boolean) => {
    const panels = panelRefs.current;
    if (!panels.length) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const duration = animate && !reduced ? 0.72 : 0;
    const grow = (0.48 * (items.length - 1)) / (1 - 0.48);
    timelineRef.current?.kill();
    const timeline = gsap.timeline();
    panels.forEach((panel, index) => {
      if (!panel) return;
      const isActive = index === active;
      timeline.to(panel, { flexGrow: isActive ? grow : 1, rotateY: isActive ? 0 : index < active ? 5 : -5, duration, ease: "power3.out" }, 0);
      const media = mediaRefs.current[index];
      if (media) timeline.to(media, { filter: isActive ? "grayscale(0)" : "grayscale(.84)", scale: isActive ? 1 : 1.06, duration, ease: "power3.out" }, 0);
    });
    timelineRef.current = timeline;
  }, [active, items.length]);

  useEffect(() => {
    applyLayout(!firstRunRef.current);
    firstRunRef.current = false;
    const observer = new ResizeObserver(() => applyLayout(false));
    if (rootRef.current) observer.observe(rootRef.current);
    return () => observer.disconnect();
  }, [applyLayout]);

  useEffect(() => () => timelineRef.current?.kill(), []);

  return (
    <div className="capability-accordion" ref={rootRef} aria-label="六项传播能力">
      {items.map((item, index) => {
        const isActive = index === active;
        return (
          <a
            href={item.link || "#selected-cases"}
            className={`capability-panel${isActive ? " is-active" : ""}`}
            key={item.title}
            ref={(element) => { panelRefs.current[index] = element; }}
            aria-current={isActive ? "true" : undefined}
            aria-label={`${item.title}：${item.description}`}
            onMouseEnter={() => setActive(index)}
            onFocus={() => setActive(index)}
            onPointerDown={() => { wasActiveOnPointerDownRef.current = isActive; }}
            onClick={(event) => {
              if (!wasActiveOnPointerDownRef.current) {
                event.preventDefault();
                setActive(index);
              }
              wasActiveOnPointerDownRef.current = true;
            }}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight" || event.key === "ArrowDown") { event.preventDefault(); setActive((index + 1) % items.length); panelRefs.current[(index + 1) % items.length]?.focus(); }
              if (event.key === "ArrowLeft" || event.key === "ArrowUp") { event.preventDefault(); setActive((index - 1 + items.length) % items.length); panelRefs.current[(index - 1 + items.length) % items.length]?.focus(); }
            }}
          >
            <span className="capability-panel-media" ref={(element) => { mediaRefs.current[index] = element; }}>
              <img src={item.image} alt={item.alt} draggable="false" />
            </span>
            <span className="capability-panel-overlay" aria-hidden="true" />
            <span className="capability-panel-index">0{index + 1}</span>
            <span className="capability-panel-copy">
              <small>{item.label}</small>
              <strong>{item.title}</strong>
              <em>{item.description}</em>
            </span>
          </a>
        );
      })}
    </div>
  );
}

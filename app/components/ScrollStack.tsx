"use client";

import type { CSSProperties } from "react";
import { useEffect, useRef } from "react";
import type { Project } from "../lib/portfolio";

export function ScrollStack({ projects }: { projects: Project[] }) {
  const stackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stack = stackRef.current;
    if (!stack) return;
    const cards = [...stack.querySelectorAll<HTMLElement>(".scroll-stack-card")];
    let frame = 0;
    const update = () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const trigger = window.innerHeight * .18 + index * 18;
        const progress = reduced ? 0 : Math.max(0, Math.min(1, (trigger - rect.top) / Math.max(rect.height * .85, 1)));
        card.style.setProperty("--stack-scale", String(1 - progress * (.055 - index * .006)));
        card.style.setProperty("--stack-shift", `${progress * index * 18}px`);
        card.style.setProperty("--stack-rotate", `${(index % 2 ? 1 : -1) * progress * .55}deg`);
      });
      frame = 0;
    };
    const requestUpdate = () => { if (!frame) frame = requestAnimationFrame(update); };
    update(); window.addEventListener("scroll", requestUpdate, { passive: true }); window.addEventListener("resize", requestUpdate);
    return () => { if (frame) cancelAnimationFrame(frame); window.removeEventListener("scroll", requestUpdate); window.removeEventListener("resize", requestUpdate); };
  }, []);

  return (
    <div className="scroll-stack" ref={stackRef}>
      {projects.map((project) => (
        <article className={`scroll-stack-card stack-card-${project.index}`} key={project.slug} style={{ "--stack-index": Number(project.index) - 1 } as CSSProperties}>
          <div className="scroll-stack-image"><img src={project.cover} alt={`${project.title}项目封面`} /></div>
          <div className="scroll-stack-copy">
            <div className="scroll-stack-meta"><span>{project.index}</span><p>{project.role.split("·")[0]}</p></div>
            <h3><a href={`/case-studies/${project.slug}`}>{project.title}</a></h3>
            <p className="scroll-stack-en">{project.english}</p>
            <p className="scroll-stack-summary">{project.summary}</p>
            <div className="tag-row">{project.tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}</div>
            <a className="scroll-stack-link" href={`/case-studies/${project.slug}`}>查看完整案例 <span>↗</span></a>
          </div>
        </article>
      ))}
      <div className="scroll-stack-end" aria-hidden="true" />
    </div>
  );
}

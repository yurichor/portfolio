"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export type BentoAbility = { index: string; english: string; chinese: string; description: string };

export function MagicBento({ items }: { items: BentoAbility[] }) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const cards = [...grid.querySelectorAll<HTMLElement>(".magic-bento-card")];
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const move = (event: PointerEvent) => {
      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        const distance = Math.max(0, Math.hypot(event.clientX - rect.left - rect.width / 2, event.clientY - rect.top - rect.height / 2) - Math.max(rect.width, rect.height) / 2);
        card.style.setProperty("--glow-x", `${x * 100}%`); card.style.setProperty("--glow-y", `${y * 100}%`); card.style.setProperty("--glow-intensity", String(Math.max(0, 1 - distance / 280)));
      });
    };
    const leave = () => cards.forEach((card) => { card.style.setProperty("--glow-intensity", "0"); gsap.to(card, { x: 0, y: 0, rotateX: 0, rotateY: 0, duration: .45, ease: "power3.out" }); });
    const cleanups = cards.map((card) => {
      const cardMove = (event: PointerEvent) => {
        if (!finePointer) return;
        const rect = card.getBoundingClientRect(); const x = event.clientX - rect.left - rect.width / 2; const y = event.clientY - rect.top - rect.height / 2;
        gsap.to(card, { x: x * .025, y: y * .025, rotateX: y / rect.height * -3.5, rotateY: x / rect.width * 3.5, duration: .3, ease: "power2.out", transformPerspective: 1000 });
      };
      const cardLeave = () => gsap.to(card, { x: 0, y: 0, rotateX: 0, rotateY: 0, duration: .45, ease: "power3.out" });
      card.addEventListener("pointermove", cardMove); card.addEventListener("pointerleave", cardLeave);
      return () => { card.removeEventListener("pointermove", cardMove); card.removeEventListener("pointerleave", cardLeave); };
    });
    if (finePointer) { document.addEventListener("pointermove", move, { passive: true }); document.addEventListener("pointerleave", leave); }
    return () => { if (finePointer) { document.removeEventListener("pointermove", move); document.removeEventListener("pointerleave", leave); } cleanups.forEach((cleanup) => cleanup()); };
  }, []);

  return (
    <div className="magic-bento-grid" ref={gridRef} aria-label="六项传播能力">
      {items.map((item) => (
        <article className="magic-bento-card" key={item.index}>
          <span className="magic-bento-number">{item.index}</span>
          <p>{item.english}</p>
          <div><h3>{item.chinese}</h3><span>{item.description}</span></div>
        </article>
      ))}
    </div>
  );
}

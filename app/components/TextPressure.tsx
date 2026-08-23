"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type TextPressureProps = {
  text: string;
  className?: string;
  textColor?: string;
  minFontSize?: number;
};

const distance = (a: { x: number; y: number }, b: { x: number; y: number }) =>
  Math.hypot(b.x - a.x, b.y - a.y);

const getAttribute = (value: number, maximum: number, minimum: number, peak: number) =>
  Math.max(minimum, peak - Math.abs((peak * value) / maximum) + minimum);

export function TextPressure({ text, className = "", textColor = "#17202a", minFontSize = 44 }: TextPressureProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const spansRef = useRef<Array<HTMLSpanElement | null>>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const cursorRef = useRef({ x: 0, y: 0 });
  const [fontSize, setFontSize] = useState(minFontSize);

  const setSize = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const { width } = container.getBoundingClientRect();
    const isCompact = width < 600;
    const size = isCompact
      ? Math.max(Math.min(minFontSize, 42), Math.min(width / (text.length * 0.78), 64))
      : Math.max(minFontSize, Math.min(width / (text.length * 0.49), 176));
    setFontSize(size);
  }, [minFontSize, text.length]);

  useEffect(() => {
    const updatePointer = (x: number, y: number) => {
      cursorRef.current = { x, y };
    };
    const onMouseMove = (event: MouseEvent) => updatePointer(event.clientX, event.clientY);
    const onTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (touch) updatePointer(touch.clientX, touch.clientY);
    };
    const container = containerRef.current;
    if (container) {
      const rect = container.getBoundingClientRect();
      mouseRef.current = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
      cursorRef.current = { ...mouseRef.current };
    }
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, []);

  useEffect(() => {
    setSize();
    const observer = new ResizeObserver(setSize);
    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [setSize]);

  useEffect(() => {
    let frame = 0;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const animate = () => {
      mouseRef.current.x += (cursorRef.current.x - mouseRef.current.x) / (reduceMotion ? 1 : 12);
      mouseRef.current.y += (cursorRef.current.y - mouseRef.current.y) / (reduceMotion ? 1 : 12);
      const title = titleRef.current;
      if (title) {
        const maximum = Math.max(title.getBoundingClientRect().width / 2, 1);
        spansRef.current.forEach((span) => {
          if (!span) return;
          const rect = span.getBoundingClientRect();
          const center = { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
          const currentDistance = distance(mouseRef.current, center);
          const width = Math.floor(getAttribute(currentDistance, maximum, 60, 151));
          const weight = Math.floor(getAttribute(currentDistance, maximum, 180, 900));
          span.style.fontVariationSettings = `'wght' ${weight}, 'wdth' ${width}, 'opsz' 144`;
          span.style.fontWeight = String(weight);
          span.style.transform = `scaleX(${Math.max(.72, width / 112)}) scaleY(${1 + (weight - 400) / 2400})`;
        });
      }
      frame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div className={`text-pressure ${className}`} ref={containerRef}>
      <h1 ref={titleRef} style={{ fontSize, color: textColor }} aria-label={text}>
        {text.split("").map((character, index) => (
          <span key={`${character}-${index}`} ref={(element) => { spansRef.current[index] = element; }} aria-hidden="true">
            {character === " " ? "\u00A0" : character}
          </span>
        ))}
      </h1>
    </div>
  );
}

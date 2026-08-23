"use client";

import type { CSSProperties } from "react";
import { useEffect, useMemo, useRef, useState } from "react";

type Direction = "right" | "left" | "up" | "down" | "diagonal";
type Mode = "entrance" | "pointer" | "both";
type Ease = "linear" | "ease-out" | "ease-in-out" | "snappy";

type EchoTextProps = {
  text: string;
  echoes?: number;
  lag?: number;
  offset?: number;
  direction?: Direction;
  fade?: number;
  blur?: number;
  tint?: string;
  mode?: Mode;
  cursorRadius?: number;
  duration?: number;
  ease?: Ease;
  fontSize?: string | number;
  fontWeight?: string | number;
  color?: string;
  className?: string;
  style?: CSSProperties;
};

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
const vectors: Record<Direction, { x: number; y: number }> = {
  right: { x: 1, y: 0 }, left: { x: -1, y: 0 }, up: { x: 0, y: -1 }, down: { x: 0, y: 1 }, diagonal: { x: .72, y: .72 },
};
const easing: Record<Ease, (value: number) => number> = {
  linear: (value) => value,
  "ease-out": (value) => 1 - Math.pow(1 - value, 3),
  "ease-in-out": (value) => value < .5 ? 4 * value ** 3 : 1 - Math.pow(-2 * value + 2, 3) / 2,
  snappy: (value) => 1 - Math.pow(1 - value, 5),
};

export function EchoText({
  text, echoes = 9, lag = .2, offset = 22, direction = "diagonal", fade = .68, blur = 2,
  tint = "#9ebbc7", mode = "both", cursorRadius = 480, duration = 1100, ease = "ease-out",
  fontSize = "clamp(4.2rem, 10.5vw, 10.5rem)", fontWeight = 500, color = "#18232d", className = "", style,
}: EchoTextProps) {
  const rootRef = useRef<HTMLSpanElement>(null);
  const copies = useRef<Array<HTMLSpanElement | null>>([]);
  const frame = useRef<number | null>(null);
  const [reduced, setReduced] = useState(false);
  const count = reduced ? 0 : clamp(Math.round(echoes), 0, 24);
  const indexes = useMemo(() => Array.from({ length: count + 1 }, (_, index) => index), [count]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update(); media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || reduced) return;
    const vector = vectors[direction];
    const safeOffset = clamp(offset, 0, 120);
    const start = performance.now();
    const positions = Array.from({ length: count + 1 }, (_, index) => ({ x: vector.x * safeOffset * (index + .35), y: vector.y * safeOffset * (index + .35) }));
    let target = { x: 0, y: 0 };
    let previous = { x: 0, y: 0 };

    const pointerMove = (event: PointerEvent) => {
      if (mode === "entrance") return;
      const rect = root.getBoundingClientRect();
      const dx = event.clientX - rect.left - rect.width / 2;
      const dy = event.clientY - rect.top - rect.height / 2;
      const distance = Math.hypot(dx, dy);
      const reach = distance ? clamp(distance / cursorRadius, 0, 1) : 0;
      target = { x: distance ? dx / distance * reach * safeOffset : 0, y: distance ? dy / distance * reach * safeOffset * .72 : 0 };
    };
    const pointerLeave = () => { target = { x: 0, y: 0 }; };
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches && mode !== "entrance";
    if (canHover) {
      window.addEventListener("pointermove", pointerMove, { passive: true });
      document.addEventListener("pointerleave", pointerLeave);
    }

    const render = (now: number) => {
      const entrance = mode === "pointer" ? 0 : 1 - easing[ease](clamp((now - start) / duration, 0, 1));
      const velocity = Math.hypot(target.x - previous.x, target.y - previous.y);
      previous = target;
      let separation = 0;
      positions.forEach((position, index) => {
        const node = copies.current[index];
        if (!node) return;
        const desiredX = target.x + vector.x * entrance * safeOffset * (index + .35);
        const desiredY = target.y + vector.y * entrance * safeOffset * (index + .35);
        const lerp = clamp(.34 / (1 + index * lag * 4.2), .018, .36);
        position.x += (desiredX - position.x) * lerp;
        position.y += (desiredY - position.y) * lerp;
        node.style.transform = `translate3d(${position.x.toFixed(2)}px,${position.y.toFixed(2)}px,0)`;
        if (index > 0) {
          separation = Math.max(separation, Math.hypot(position.x - positions[0].x, position.y - positions[0].y));
          node.style.filter = `blur(${(blur * index / count).toFixed(2)}px)`;
        }
      });
      const activity = Math.max(entrance, clamp(separation / Math.max(safeOffset * 2.25, 1), 0, 1), clamp(velocity / Math.max(safeOffset * .35, 1), 0, 1));
      copies.current.forEach((copy, index) => { if (copy && index > 0) copy.style.opacity = String(Math.pow(fade, index) * activity); });
      frame.current = requestAnimationFrame(render);
    };
    frame.current = requestAnimationFrame(render);
    return () => {
      if (canHover) { window.removeEventListener("pointermove", pointerMove); document.removeEventListener("pointerleave", pointerLeave); }
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [blur, count, cursorRadius, direction, duration, ease, fade, lag, mode, offset, reduced]);

  return (
    <span ref={rootRef} className={`echo-text ${className}`.trim()} style={{ fontSize, fontWeight, color, ...style }} aria-label={text}>
      {indexes.slice(1).reverse().map((index) => (
        <span aria-hidden="true" className="echo-text-copy" key={index} ref={(node) => { copies.current[index] = node; }} style={{ color: tint, opacity: 0 }}>{text}</span>
      ))}
      <span aria-hidden="true" className="echo-text-copy echo-text-front" ref={(node) => { copies.current[0] = node; }}>{text}</span>
    </span>
  );
}

"use client";

import {
  Children,
  cloneElement,
  forwardRef,
  isValidElement,
  useEffect,
  useMemo,
  useRef,
  type ButtonHTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react";
import gsap from "gsap";
import "./CardSwap.css";

type CardProps = ButtonHTMLAttributes<HTMLButtonElement> & { customClass?: string };

export const Card = forwardRef<HTMLButtonElement, CardProps>(({ customClass = "", className = "", ...rest }, ref) => (
  <button ref={ref} type="button" {...rest} className={`card-swap-card ${customClass} ${className}`.trim()} />
));
Card.displayName = "Card";

type CardSwapProps = {
  width?: number | string;
  height?: number | string;
  cardDistance?: number;
  verticalDistance?: number;
  delay?: number;
  pauseOnHover?: boolean;
  onCardClick?: (index: number) => void;
  onActiveIndexChange?: (index: number) => void;
  activeIndex?: number | null;
  skewAmount?: number;
  easing?: "linear" | "elastic";
  children: ReactNode;
};

const makeSlot = (index: number, distanceX: number, distanceY: number, total: number) => ({
  x: index * distanceX,
  y: -index * distanceY,
  z: -index * distanceX * 1.5,
  zIndex: total - index,
});

const placeNow = (element: HTMLElement, slot: ReturnType<typeof makeSlot>, skew: number) => gsap.set(element, {
  x: slot.x,
  y: slot.y,
  z: slot.z,
  xPercent: -50,
  yPercent: -50,
  skewY: skew,
  transformOrigin: "center center",
  zIndex: slot.zIndex,
  force3D: true,
});

export default function CardSwap({
  width = 660,
  height = 495,
  cardDistance = 48,
  verticalDistance = 54,
  delay = 5200,
  pauseOnHover = true,
  onCardClick,
  onActiveIndexChange,
  activeIndex = null,
  skewAmount = 4,
  easing = "elastic",
  children,
}: CardSwapProps) {
  const config = easing === "elastic"
    ? { ease: "elastic.out(0.6,0.9)", durDrop: 1.7, durMove: 1.5, durReturn: 1.7, promoteOverlap: .88, returnDelay: .06 }
    : { ease: "power1.inOut", durDrop: .75, durMove: .75, durReturn: .75, promoteOverlap: .45, returnDelay: .18 };
  const childArray = useMemo(() => Children.toArray(children).filter(isValidElement) as ReactElement<CardProps>[], [children]);
  const refs = useMemo(() => Array.from({ length: childArray.length }, () => ({ current: null as HTMLButtonElement | null })), [childArray.length]);
  const order = useRef(Array.from({ length: childArray.length }, (_, index) => index));
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const intervalRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cardRefs = refs;
    const total = childArray.length;
    if (order.current.length !== total) order.current = Array.from({ length: total }, (_, index) => index);
    cardRefs.forEach((ref, index) => { if (ref.current) placeNow(ref.current, makeSlot(index, cardDistance, verticalDistance, total), skewAmount); });
    const swap = () => {
      if (order.current.length < 2) return;
      const [front, ...rest] = order.current;
      const frontElement = cardRefs[front].current;
      if (!frontElement) return;
      const timeline = gsap.timeline();
      timelineRef.current = timeline;
      timeline.to(frontElement, { y: "+=520", duration: config.durDrop, ease: config.ease });
      timeline.addLabel("promote", `-=${config.durDrop * config.promoteOverlap}`);
      rest.forEach((index, position) => {
        const element = cardRefs[index].current;
        if (!element) return;
        const slot = makeSlot(position, cardDistance, verticalDistance, total);
        timeline.set(element, { zIndex: slot.zIndex }, "promote");
        timeline.to(element, { x: slot.x, y: slot.y, z: slot.z, duration: config.durMove, ease: config.ease }, `promote+=${position * .12}`);
      });
      const backSlot = makeSlot(total - 1, cardDistance, verticalDistance, total);
      timeline.addLabel("return", `promote+=${config.durMove * config.returnDelay}`);
      timeline.call(() => gsap.set(frontElement, { zIndex: backSlot.zIndex }), undefined, "return");
      timeline.to(frontElement, { x: backSlot.x, y: backSlot.y, z: backSlot.z, duration: config.durReturn, ease: config.ease }, "return");
      timeline.call(() => {
        order.current = [...rest, front];
        if (rest[0] !== undefined) onActiveIndexChange?.(rest[0]);
      });
    };
    const start = () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      intervalRef.current = window.setInterval(swap, delay);
    };
    start();
    const container = containerRef.current;
    const pause = () => { timelineRef.current?.pause(); if (intervalRef.current) window.clearInterval(intervalRef.current); };
    const resume = () => { timelineRef.current?.play(); start(); };
    if (pauseOnHover && container) {
      container.addEventListener("mouseenter", pause);
      container.addEventListener("mouseleave", resume);
      container.addEventListener("focusin", pause);
      container.addEventListener("focusout", resume);
    }
    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      timelineRef.current?.kill();
      if (pauseOnHover && container) {
        container.removeEventListener("mouseenter", pause);
        container.removeEventListener("mouseleave", resume);
        container.removeEventListener("focusin", pause);
        container.removeEventListener("focusout", resume);
      }
    };
  }, [cardDistance, childArray.length, config.durDrop, config.durMove, config.durReturn, config.ease, config.promoteOverlap, config.returnDelay, delay, onActiveIndexChange, pauseOnHover, refs, skewAmount, verticalDistance]);

  useEffect(() => {
    if (activeIndex === null || activeIndex < 0 || activeIndex >= childArray.length) return;
    timelineRef.current?.kill();
    const nextOrder = [activeIndex, ...order.current.filter((index) => index !== activeIndex)];
    order.current = nextOrder;
    nextOrder.forEach((cardIndex, position) => {
      const element = refs[cardIndex].current;
      if (!element) return;
      const slot = makeSlot(position, cardDistance, verticalDistance, childArray.length);
      gsap.to(element, {
        x: slot.x,
        y: slot.y,
        z: slot.z,
        skewY: skewAmount,
        zIndex: slot.zIndex,
        duration: .46,
        ease: "power3.out",
        overwrite: true,
      });
    });
  }, [activeIndex, cardDistance, childArray.length, refs, skewAmount, verticalDistance]);

  return (
    <div ref={containerRef} className="card-swap-container" style={{ width, height }}>
      {childArray.map((child, index) => cloneElement(child, {
        key: index,
        ref: (node: HTMLButtonElement | null) => { refs[index].current = node; },
        style: { width, height, ...child.props.style },
        onClick: (event) => { child.props.onClick?.(event); onCardClick?.(index); },
      }))}
    </div>
  );
}

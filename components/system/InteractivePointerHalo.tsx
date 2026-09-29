"use client";

import { useEffect, useState, useRef } from "react";

export function InteractivePointerHalo() {
  const [mounted, setMounted] = useState(false);
  const haloRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -100, y: -100 });
  const isHoveringRef = useRef(false);

  useEffect(() => {
    // Only enable for desktop mice & respect reduced motion
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isFinePointer || prefersReducedMotion) return;

    setMounted(true);

    const onMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      const target = e.target as HTMLElement | null;
      const isInteractive = target?.closest("button, a, [role='button'], input, textarea, select");
      isHoveringRef.current = !!isInteractive;
    };

    let animationFrameId: number;
    const render = () => {
      if (haloRef.current) {
        haloRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`;
        if (isHoveringRef.current) {
          haloRef.current.style.width = "28px";
          haloRef.current.style.height = "28px";
          haloRef.current.style.borderColor = "rgba(52, 211, 153, 0.4)";
          haloRef.current.style.backgroundColor = "rgba(52, 211, 153, 0.08)";
        } else {
          haloRef.current.style.width = "14px";
          haloRef.current.style.height = "14px";
          haloRef.current.style.borderColor = "rgba(255, 255, 255, 0.18)";
          haloRef.current.style.backgroundColor = "transparent";
        }
      }
      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      ref={haloRef}
      aria-hidden="true"
      className="fixed top-0 left-0 -ml-[7px] -mt-[7px] rounded-full border pointer-events-none z-50 transition-[width,height,background-color,border-color] duration-150 ease-out hidden md:block"
      style={{
        transform: "translate3d(-100px, -100px, 0)",
        willChange: "transform",
      }}
    />
  );
}

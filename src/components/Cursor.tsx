import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface InteractiveCursorProps {
  size?: number;
  trail?: number;
  expandScale?: number;
  clickScale?: number;
  zIndex?: number;
  selector?: string;
}

export function InteractiveCursor({
  size = 10,
  trail = 0.2,
  expandScale = 5,
  clickScale = 0.85,
  zIndex = 100000000,
  selector = "a, button, input, textarea, select, [role='button'], [data-cursor='interactive']",
}: InteractiveCursorProps) {
  const elRef = useRef<HTMLDivElement | null>(null);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  const [visible, setVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useGSAP(() => {
    if (!elRef.current) return;

    const half = size / 2;

    gsap.ticker.add(() => {
      gsap.to(pos.current, {
        x: target.current.x,
        y: target.current.y,
        duration: (1 - trail) * 0.1,
        overwrite: true,
        onUpdate: () => {
          gsap.set(elRef.current, {
            x: pos.current.x - half,
            y: pos.current.y - half,
          });
        },
      });
    });

    return () => gsap.ticker.remove(() => {});
  }, [trail, size]);

  // === Event handlers ===
  const handleMouseMove = useCallback((e: MouseEvent) => {
    target.current = { x: e.clientX, y: e.clientY };
    setVisible(true);
  }, []);

  const handleMouseDown = useCallback(() => {
    gsap.to(elRef.current, { scale: clickScale, duration: 0.1, ease: "power2.out" });
  }, [clickScale]);

  const handleMouseUp = useCallback(() => {
    const targetScale = elRef.current?.classList.contains("cursor-hover") ? expandScale : 1;
    gsap.to(elRef.current, { scale: targetScale, duration: 0.2, ease: "back.out(1.7)" });
  }, [expandScale]);

  const handleInteractiveEnter = useCallback(() => {
    elRef.current?.classList.add("cursor-hover");
    gsap.to(elRef.current, { scale: expandScale, duration: 0.3, ease: "back.out(1.7)" });
  }, [expandScale]);

  const handleInteractiveLeave = useCallback(() => {
    elRef.current?.classList.remove("cursor-hover");
    gsap.to(elRef.current, { scale: 1, duration: 0.3, ease: "back.out(1.7)" });
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchstart", () => setIsTouch(true), { passive: true });

    document.addEventListener("mouseover", (e) => {
      const el = (e.composedPath() as Element[]).find((p) => p instanceof Element && p.matches(selector));
      if (el) handleInteractiveEnter();
    }, true);

    document.addEventListener("mouseout", (e) => {
      if (!(e.relatedTarget as Element)?.matches?.(selector)) handleInteractiveLeave();
    }, true);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseMove, handleMouseDown, handleMouseUp, handleInteractiveEnter, handleInteractiveLeave, selector]);

  if (isTouch) return null;

  return (
    <div
      ref={elRef}
      aria-hidden
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: size,
        height: size,
        borderRadius: "50%",
        backgroundColor: "rgba(255,255,255,1)",
        pointerEvents: "none",
        opacity: visible ? 1 : 0,
        transition: "opacity 120ms ease",
        zIndex,
        boxSizing: "border-box",
        mixBlendMode: "difference",
        transformOrigin: "center center",
      }}
    />
  );
}

export default function Cursor() {
  return <InteractiveCursor />;
}

import { useEffect, useState, useCallback } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

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
  const [visible, setVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const damping = 20 + trail * 30;
  const stiffness = 400 - trail * 200;

  const x = useSpring(mouseX, { damping, stiffness, mass: 0.5 });
  const y = useSpring(mouseY, { damping, stiffness, mass: 0.5 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseX.set(e.clientX - size / 2);
    mouseY.set(e.clientY - size / 2);
    setVisible(true);
  }, [mouseX, mouseY, size]);

  const handleMouseDown = useCallback(() => {
    setIsClicking(true);
  }, []);

  const handleMouseUp = useCallback(() => {
    setIsClicking(false);
  }, []);

  const handleInteractiveEnter = useCallback(() => {
    setIsHovering(true);
  }, []);

  const handleInteractiveLeave = useCallback(() => {
    setIsHovering(false);
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

  const scale = isClicking ? clickScale : isHovering ? expandScale : 1;

  return (
    <motion.div
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
        x,
        y,
      }}
      animate={{ scale }}
      transition={{
        scale: {
          type: "spring",
          stiffness: isClicking ? 800 : 300,
          damping: isClicking ? 20 : 15,
        },
      }}
    />
  );
}

export default function Cursor() {
  return <InteractiveCursor />;
}

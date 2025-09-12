import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

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
  selector = "a, button, input, textarea, select, [role='button'], [data-cursor='interactive']"
}: InteractiveCursorProps) {
  const elRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const gsapRef = useRef<GSAP | null>(null);

  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  const prefersReduced = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;

  useEffect(() => {
    gsapRef.current = gsap;
    setMounted(true);
  }, []);

  useEffect(() => {
    const loop = () => {
      if (!elRef.current || !gsapRef.current) return;
      const half = size / 2;
      gsapRef.current.to(pos.current, {
        x: target.current.x,
        y: target.current.y,
        duration: prefersReduced ? 0 : (1 - trail) * 0.1,
        ease: "power2.out",
        overwrite: true,
        onUpdate: () => {
          if (elRef.current && gsapRef.current) {
            gsapRef.current.set(elRef.current, { x: pos.current.x - half, y: pos.current.y - half });
          }
        }
      });
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [trail, size, prefersReduced]);

  const handleMouseMove = useCallback((e: MouseEvent) => { target.current = { x: e.clientX, y: e.clientY }; setVisible(true); }, []);
  const handleMouseDown = useCallback(() => { if (elRef.current && gsapRef.current) gsapRef.current.to(elRef.current, { scale: clickScale, duration: 0.1, ease: "power2.out" }); }, [clickScale]);
  const handleMouseUp = useCallback(() => {
    if (!elRef.current || !gsapRef.current) return;
    const targetScale = elRef.current.classList.contains('cursor-hover') ? expandScale : 1;
    gsapRef.current.to(elRef.current, { scale: targetScale, duration: 0.2, ease: "back.out(1.7)" });
  }, [expandScale]);

  const handleInteractiveEnter = useCallback(() => {
    if (!elRef.current || !gsapRef.current) return;
    elRef.current.classList.add('cursor-hover');
    gsapRef.current.to(elRef.current, { scale: expandScale, duration: 0.3, ease: "back.out(1.7)" });
  }, [expandScale]);

  const handleInteractiveLeave = useCallback(() => {
    if (!elRef.current || !gsapRef.current) return;
    elRef.current.classList.remove('cursor-hover');
    gsapRef.current.to(elRef.current, { scale: 1, duration: 0.3, ease: "back.out(1.7)" });
  }, []);

  const handleMouseOver = useCallback((e: MouseEvent) => {
    const el = e.composedPath().find((p): p is Element => p instanceof Element && p.matches(selector));
    if (el) handleInteractiveEnter();
  }, [selector, handleInteractiveEnter]);

  const handleMouseOut = useCallback((e: MouseEvent) => {
    if (!(e.relatedTarget as Element)?.matches?.(selector)) handleInteractiveLeave();
  }, [selector, handleInteractiveLeave]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchstart', () => setIsTouch(true), { passive: true });
    document.addEventListener('mouseover', handleMouseOver, true);
    document.addEventListener('mouseout', handleMouseOut, true);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver, true);
      document.removeEventListener('mouseout', handleMouseOut, true);
    };
  }, [handleMouseMove, handleMouseDown, handleMouseUp, handleMouseOver, handleMouseOut]);

  if (!mounted || isTouch) return null;

  return <div ref={elRef} aria-hidden style={{ position: 'fixed', left: 0, top: 0, width: size, height: size, borderRadius: '50%', backgroundColor: 'rgba(255,255,255,1)', pointerEvents: 'none', opacity: visible ? 1 : 0, transition: 'opacity 120ms ease', zIndex, boxSizing: 'border-box', mixBlendMode: 'difference', transformOrigin: 'center center' }} />;
}

export default function Cursor() { return <InteractiveCursor />; }

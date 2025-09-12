import React, { useEffect, useRef, useState, useCallback } from "react";

declare global {
  interface Window {
    gsap: any;
  }
}

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
  const rafRef = useRef<number | null>(null);
  const elRef = useRef<HTMLDivElement | null>(null);
  const target = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });
  const gsapRef = useRef<any>(null);
  
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [gsapLoaded, setGsapLoaded] = useState(false);

  const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Load GSAP
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.gsap) {
        setGsapLoaded(true);
        gsapRef.current = window.gsap;
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
      script.async = true;
      script.onload = () => {
        if (window.gsap) {
          setGsapLoaded(true);
          gsapRef.current = window.gsap;
        }
      };
      document.head.appendChild(script);

      return () => {
        if (document.head.contains(script)) {
          document.head.removeChild(script);
        }
      };
    }
  }, []);

  useEffect(() => {
    if (!gsapLoaded) return;
    
    setMounted(true);
    
    const loop = () => {
      const el = elRef.current;
      if (el && gsapRef.current) {
        const half = size / 2;
        
        gsapRef.current.to(pos.current, {
          x: target.current.x,
          y: target.current.y,
          duration: prefersReduced ? 0 : (1 - trail) * 0.1,
          ease: "power2.out",
          overwrite: true,
          onUpdate: () => {
            if (el && gsapRef.current) {
              gsapRef.current.set(el, {
                x: pos.current.x - half,
                y: pos.current.y - half,
              });
            }
          }
        });
      }
      rafRef.current = requestAnimationFrame(loop);
    };
    
    rafRef.current = requestAnimationFrame(loop);
    
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };
  }, [trail, size, prefersReduced, gsapLoaded]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!mounted) return;
    target.current.x = e.clientX;
    target.current.y = e.clientY;
    setVisible(true);
  }, [mounted]);

  const handleMouseEnter = useCallback(() => setVisible(true), []);
  const handleMouseLeave = useCallback(() => setVisible(false), []);
  
  const handleMouseDown = useCallback(() => {
    if (!gsapRef.current || !elRef.current) return;
    
    gsapRef.current.to(elRef.current, {
      scale: clickScale,
      duration: 0.1,
      ease: "power2.out"
    });
  }, [clickScale]);

  const handleMouseUp = useCallback(() => {
    if (!gsapRef.current || !elRef.current) return;
    
    const targetScale = elRef.current.classList.contains('cursor-hover') ? expandScale : 1;
    
    gsapRef.current.to(elRef.current, {
      scale: targetScale,
      duration: 0.2,
      ease: "back.out(1.7)"
    });
  }, [expandScale]);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseEnter, handleMouseLeave, handleMouseDown, handleMouseUp]);

  const handleTouchStart = useCallback(() => setIsTouch(true), []);

  const handleInteractiveEnter = useCallback((el: Element) => {
    if (!gsapRef.current || !elRef.current) return;
    
    elRef.current.classList.add('cursor-hover');
    
    const tl = gsapRef.current.timeline();
    tl.to(elRef.current, {
      scale: expandScale,
      duration: 0.3,
      ease: "back.out(1.7)"
    }, 0)
    .to(elRef.current, {
      backgroundColor: "rgba(255, 255, 255, 0)",
      borderWidth: "1px",
      borderColor: "#ffffff",
      borderStyle: "solid",
      duration: 0.3,
      ease: "power2.out"
    }, 0);
  }, [expandScale]);

  const handleInteractiveLeave = useCallback(() => {
    if (!gsapRef.current || !elRef.current) return;
    
    elRef.current.classList.remove('cursor-hover');
    
    const tl = gsapRef.current.timeline();
    tl.to(elRef.current, {
      scale: 1,
      duration: 0.3,
      ease: "back.out(1.7)"
    }, 0)
    .to(elRef.current, {
      backgroundColor: "rgba(255, 255, 255, 1)",
      borderWidth: "0px",
      borderStyle: "none",
      duration: 0.3,
      ease: "power2.out"
    }, 0);
  }, []);

  const handleMouseOver = useCallback((e: MouseEvent) => {
    const path = e.composedPath();
    const el = path.find(p => p instanceof Element && p.matches?.(selector));
    if (el) handleInteractiveEnter(el);
  }, [selector, handleInteractiveEnter]);

  const handleMouseOut = useCallback((e: MouseEvent) => {
    const to = e.relatedTarget as Element;
    if (to && to.matches?.(selector)) return;
    handleInteractiveLeave();
  }, [selector, handleInteractiveLeave]);

  useEffect(() => {
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, true);
    document.addEventListener('mouseout', handleMouseOut, true);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver, true);
      document.removeEventListener('mouseout', handleMouseOut, true);
      window.removeEventListener('touchstart', handleTouchStart);
    };
  }, [handleTouchStart, handleMouseOver, handleMouseOut]);

  if (!mounted || !gsapLoaded || isTouch) return null;

  return (
    <div
      ref={elRef}
      aria-hidden
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: 'rgba(255, 255, 255, 1)',
        border: 'none',
        pointerEvents: 'none',
        opacity: visible ? 1 : 0,
        transition: 'opacity 120ms ease',
        zIndex,
        boxSizing: 'border-box',
        mixBlendMode: 'difference',
        transformOrigin: 'center center'
      }}
    />
  );
}

export default function Cursor() {
  return <InteractiveCursor />;
}

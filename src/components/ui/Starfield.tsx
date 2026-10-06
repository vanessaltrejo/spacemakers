"use client";

import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  twinkleSpeed: number;
  phase: number;
  drift: number;
}

interface StarfieldProps {
  className?: string;
  /** Stars per 10,000 px² of canvas area. */
  density?: number;
}

const createStars = (width: number, height: number, density: number): Star[] => {
  const count = Math.round(((width * height) / 10_000) * density);
  return Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 1.2 + 0.4,
    baseAlpha: Math.random() * 0.55 + 0.35,
    twinkleSpeed: Math.random() * 0.002 + 0.0005,
    phase: Math.random() * Math.PI * 2,
    drift: Math.random() * 0.04 + 0.01,
  }));
};

/** Lightweight twinkling star background drawn on a canvas. Pauses when off-screen. */
export function Starfield({ className, density = 2 }: StarfieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let stars: Star[] = [];
    let width = 0;
    let height = 0;
    let frameId = 0;
    let isVisible = true;

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height);
      for (const star of stars) {
        const alpha = prefersReducedMotion
          ? star.baseAlpha
          : star.baseAlpha * (0.6 + 0.4 * Math.sin(time * star.twinkleSpeed + star.phase));
        context.globalAlpha = alpha;
        context.beginPath();
        context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        context.fill();
        if (!prefersReducedMotion) {
          star.x = (star.x + star.drift) % width;
        }
      }
    };

    const loop = (time: number) => {
      draw(time);
      if (isVisible) frameId = requestAnimationFrame(loop);
    };

    const resize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = width * pixelRatio;
      canvas.height = height * pixelRatio;
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
      context.fillStyle = "#ffffff";
      stars = createStars(width, height, density);
      draw(0);
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      cancelAnimationFrame(frameId);
      if (isVisible && !prefersReducedMotion) frameId = requestAnimationFrame(loop);
    });
    visibilityObserver.observe(canvas);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
    };
  }, [density]);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}

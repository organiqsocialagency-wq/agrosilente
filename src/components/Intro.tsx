"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import { BrandLogo } from "./BrandLogo";

interface IntroProps {
  contentRef: RefObject<HTMLDivElement | null>;
  onComplete: () => void;
}

export function Intro({ contentRef, onComplete }: IntroProps) {
  const [phase, setPhase] = useState("building");
  const [progress, setProgress] = useState(0);
  const skipRef = useRef<HTMLButtonElement>(null);
  const exitRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const content = contentRef.current;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const oldOverflow = document.body.style.overflow;
    const oldInert = content?.inert ?? false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    let alive = true;
    let frame = 0;
    let hasFinished = false;
    const started = performance.now();
    function finish() {
      if (hasFinished || !alive) return;
      hasFinished = true;
      if (content) content.inert = oldInert;
      document.body.style.overflow = oldOverflow;
      // Only move focus when it is inside the disappearing intro.
      if (document.activeElement === skipRef.current) {
        document.getElementById("main-content")?.focus({ preventScroll: true });
      }
      onComplete();
    }
    exitRef.current = finish;
    if (media.matches) {
      timers.push(setTimeout(finish, 0));
      return () => {
        alive = false;
        timers.forEach(clearTimeout);
      };
    }
    if (content) content.inert = true;
    document.body.style.overflow = "hidden";
    function onPreferenceChange(event: MediaQueryListEvent) {
      if (event.matches) finish();
    }
    media.addEventListener("change", onPreferenceChange);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") finish();
    };
    document.addEventListener("keydown", onKey);
    function tick() {
      if (!alive || hasFinished) return;
      const elapsed = performance.now() - started;
      setProgress(Math.round(88 * Math.min(1, elapsed / 2400)));
      if (elapsed < 2400) frame = requestAnimationFrame(tick);
    }
    frame = requestAnimationFrame(tick);
    const minimum = new Promise<void>((resolve) =>
      timers.push(setTimeout(resolve, 2400)),
    );
    const assets = Promise.allSettled([
      document.fonts.ready,
      ...Array.from(
        document.querySelectorAll<HTMLImageElement>(".hero img"),
      ).map((img) => img.decode().catch(() => undefined)),
    ]);
    const assetLimit = new Promise<void>((resolve) =>
      timers.push(setTimeout(resolve, 4200)),
    );
    Promise.all([minimum, Promise.race([assets, assetLimit])]).then(() => {
      if (!alive || hasFinished) return;
      setProgress(100);
      setPhase("complete");
      timers.push(
        setTimeout(() => {
          if (alive && !hasFinished) setPhase("exiting");
        }, 400),
      );
      timers.push(setTimeout(finish, 1550));
    });
    timers.push(setTimeout(finish, 6500));
    return () => {
      alive = false;
      cancelAnimationFrame(frame);
      timers.forEach(clearTimeout);
      media.removeEventListener("change", onPreferenceChange);
      document.removeEventListener("keydown", onKey);
      if (content) content.inert = oldInert;
      document.body.style.overflow = oldOverflow;
      exitRef.current = null;
    };
  }, [contentRef, onComplete]);

  return (
    <div className="brand-intro" data-phase={phase}>
      <div className="intro-center">
        <BrandLogo animated />
        <p className="intro-welcome">Qui il tempo è più gentile.</p>
      </div>
      <div className="intro-foot">
        <span>Locorotondo · Valle d’Itria</span>
        <button ref={skipRef} type="button" onClick={() => exitRef.current?.()}>
          Entra nel sito
        </button>
        <span className="intro-percent" aria-hidden="true">
          {String(progress).padStart(2, "0")}%
        </span>
      </div>
      <span className="sr-only" role="status">
        Benvenuti a Trullo Natalino. Prepariamo la tua visita.
      </span>
      <div className="intro-track" aria-hidden="true">
        <span style={{ transform: `scaleX(${progress / 100})` }} />
      </div>
    </div>
  );
}

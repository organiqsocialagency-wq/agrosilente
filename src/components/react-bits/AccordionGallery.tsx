"use client";

// Adapted from the React Bits AccordionGallery source supplied by the user.
import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import "./AccordionGallery.css";

type GalleryItem = { image: string; label: string; alt: string };

export default function AccordionGallery({ items, defaultIndex = 2, expandRatio = 0.52 }: {
  items: GalleryItem[];
  defaultIndex?: number;
  expandRatio?: number;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const mediaRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const timeline = useRef<gsap.core.Timeline | null>(null);
  const firstRun = useRef(true);
  const [active, setActive] = useState(Math.min(defaultIndex, items.length - 1));
  const [paused, setPaused] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const reduced = useReducedMotion();
  const visible = useInView(rootRef, { amount: 0.2 });
  const count = items.length;

  const applyLayout = useCallback((animate: boolean) => {
    const root = rootRef.current;
    if (!root) return;
    const vertical = window.matchMedia("(max-width: 600px)").matches;
    const ratio = Math.min(Math.max(expandRatio, 0.2), 0.9);
    const grow = count > 1 ? ratio * (count - 1) / (1 - ratio) : 1;
    const available = (vertical ? root.clientHeight : root.clientWidth) - 10 * (count - 1);
    const mediaSize = Math.max(140, available * ratio * 1.22);
    root.style.setProperty("--ag-media-size", `${mediaSize}px`);
    timeline.current?.kill();
    const duration = animate && !reduced ? 0.65 : 0;
    const tl = gsap.timeline({ defaults: { duration, ease: "power3.out" } });
    panelRefs.current.forEach((panel, i) => {
      if (!panel) return;
      const selected = active === i;
      const rotation = selected ? 0 : i < active ? 5 : -5;
      tl.to(panel, { flexGrow: selected ? grow : 1, rotateY: vertical ? 0 : rotation }, 0);
      const media = mediaRefs.current[i];
      if (media) {
        const shift = Math.max(-1.5, Math.min(1.5, active - i)) * mediaSize * 0.03;
        tl.to(media, { xPercent: -50, yPercent: -50, x: vertical || selected ? 0 : shift, y: vertical && !selected ? shift : 0, "--ag-gray": selected ? 0 : 0.6 }, 0);
      }
      const label = labelRefs.current[i];
      if (label) tl.to(label, { opacity: selected ? 1 : 0, x: selected ? 0 : -14 }, 0);
    });
    timeline.current = tl;
  }, [active, count, expandRatio, reduced]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    applyLayout(!firstRun.current);
    firstRun.current = false;
    const observer = new ResizeObserver(() => applyLayout(true));
    observer.observe(root);
    return () => { observer.disconnect(); timeline.current?.kill(); };
  }, [applyLayout]);

  useEffect(() => {
    if (reduced || paused || hovered || focused || !visible || count < 2) return;
    const interval = window.setInterval(() => {
      if (!document.hidden) setActive((index) => (index + 1) % count);
    }, 5500);
    return () => window.clearInterval(interval);
  }, [count, reduced, paused, hovered, focused, visible]);

  function handleKeyDown(index: number, event: KeyboardEvent<HTMLButtonElement>) {
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % count;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index - 1 + count) % count;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = count - 1;
    else return;
    event.preventDefault();
    setActive(next);
    panelRefs.current[next]?.focus({ preventScroll: true });
  }

  return (
    <div className="places-gallery">
      <div ref={rootRef} className="accordion-gallery" role="group" aria-label="Fotografie di Locorotondo"
        onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
        onFocusCapture={() => setFocused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
        {items.map((item, index) => (
          <button key={item.image} ref={(element) => { panelRefs.current[index] = element; }} type="button" className="ag-panel" aria-label={item.label} aria-pressed={active === index}
            onMouseEnter={() => setActive(index)} onFocus={() => setActive(index)} onClick={() => setActive(index)} onKeyDown={(event) => handleKeyDown(index, event)}>
            <span className="ag-panel__frame">
              <span className="ag-panel__media" ref={(element) => { mediaRefs.current[index] = element; }}>
                <Image src={item.image} alt={item.alt} fill sizes="(max-width:600px) 92vw, 55vw" draggable={false} />
              </span>
              <span className="ag-panel__overlay" aria-hidden="true" />
            </span>
            <span className="ag-panel__label" aria-hidden="true" ref={(element) => { labelRefs.current[index] = element; }}><span className="ag-panel__bar" />{item.label}</span>
            <span className="ag-panel__number" aria-hidden="true">0{index + 1}</span>
          </button>
        ))}
      </div>
      <div className="places-gallery-controls">
        <span className="eyebrow">0{active + 1} <span aria-hidden="true">/</span> 0{count}</span>
        <div className="carousel-controls">
          <button type="button" aria-label="Foto precedente di Locorotondo" onClick={() => setActive((active - 1 + count) % count)}>←</button>
          {!reduced && <button className="carousel-pause" type="button" onClick={() => setPaused(!paused)} aria-label={paused ? "Avvia scorrimento foto di Locorotondo" : "Pausa scorrimento foto di Locorotondo"}>{paused ? "Riprendi" : "Pausa"}</button>}
          <button type="button" aria-label="Foto successiva di Locorotondo" onClick={() => setActive((active + 1) % count)}>→</button>
        </div>
      </div>
    </div>
  );
}

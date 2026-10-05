"use client";

import BlurText from "./react-bits/BlurText";

import Image from "next/image";
import SpecularButton from "./react-bits/SpecularButton";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { suites, type Suite } from "@/lib/suites";
import { ArrowIcon } from "./icons";
import { Reveal } from "./Motion";

function SuitePhoto({ suite, onOpen }: { suite: Suite; onOpen: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const mx = useMotionValue(0),
    my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 110, damping: 25 });
  const y = useSpring(my, { stiffness: 110, damping: 25 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-3%", "3%"]);
  function move(event: PointerEvent<HTMLButtonElement>) {
    if (reduce || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const nextX = Math.max(
      48,
      Math.min(bounds.width - 48, event.clientX - bounds.left),
    );
    const nextY = Math.max(
      48,
      Math.min(bounds.height - 48, event.clientY - bounds.top),
    );
    if (!hovered) {
      x.jump(nextX);
      y.jump(nextY);
    }
    mx.set(nextX);
    my.set(nextY);
    setHovered(true);
  }
  return (
    <button
      ref={ref}
      type="button"
      onClick={onOpen}
      onPointerMove={move}
      onPointerLeave={() => setHovered(false)}
      onPointerCancel={() => setHovered(false)}
      onBlur={() => setHovered(false)}
      className="suite-main-photo"
      aria-label={`Esplora ${suite.name}: apri la scheda della suite`}
      aria-haspopup="dialog"
    >
      <motion.div
        className="absolute -inset-y-[5%] inset-x-0"
        style={{ y: reduce ? 0 : imageY }}
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={suite.id}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, scale: hovered && !reduce ? 1 : 1.035 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.7, ease: [0.25, 1, 0.5, 1] }}
          >
            <Image
              src={suite.imageSrc}
              alt={suite.imageAlt}
              fill
              sizes="(max-width:767px) 92vw, 60vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute top-0 left-0 z-10"
        style={{ x, y }}
        animate={{ opacity: hovered && !reduce ? 1 : 0 }}
      >
        <span className="flex size-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-calce/95 text-xs text-ink">
          Esplora
        </span>
      </motion.span>
    </button>
  );
}

function SuiteDetails({
  suite,
  onClose,
}: {
  suite: Suite;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = "hidden";

    return () => {
      dialog?.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, []);

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="suite-details-title"
      aria-describedby="suite-details-description"
      className="photo-dialog fixed inset-0 m-auto max-h-[92dvh] w-[min(1040px,94vw)] max-w-none overflow-y-auto bg-calce p-5 text-ink sm:p-8"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (
          event.clientX < bounds.left ||
          event.clientX > bounds.right ||
          event.clientY < bounds.top ||
          event.clientY > bounds.bottom
        ) {
          onClose();
        }
      }}
    >
      <div className="mb-6 flex items-center justify-between gap-4">
        <BlurText scrollLinked={false} as="p" className="eyebrow text-muted">
          Agrosilente · Le nostre suite
        </BlurText>
        <button
          type="button"
          onClick={onClose}
          className="min-h-11 shrink-0 px-2 text-[10px] tracking-[.12em] uppercase"
        >
          Chiudi{" "}
          <span aria-hidden="true" className="ml-2 text-lg">
            ×
          </span>
        </button>
      </div>
      <div className="grid gap-7 md:grid-cols-2 md:gap-10">
        <div className="relative aspect-[5/4] overflow-hidden bg-stone md:aspect-[4/5]">
          <Image
            src={suite.imageSrc}
            alt={suite.imageAlt}
            fill
            sizes="(max-width: 767px) 90vw, 470px"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col justify-center pb-2">
          <BlurText
            scrollLinked={false}
            as="p"
            className="eyebrow mb-3 text-action"
          >
            {suite.type}
          </BlurText>
          <BlurText
            scrollLinked={false}
            as="h2"
            id="suite-details-title"
            className="font-display text-5xl leading-none tracking-[-.035em] sm:text-6xl"
          >
            {suite.name}
          </BlurText>
          <BlurText
            scrollLinked={false}
            as="p"
            id="suite-details-description"
            className="mt-5 text-[14px] leading-[1.9] text-muted"
          >
            {suite.description}
          </BlurText>
          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-3 border-y border-line py-5 text-[11px] leading-relaxed">
            {suite.features.map((feature) => (
              <li key={feature} className="flex items-center gap-2">
                <span
                  aria-hidden="true"
                  className="size-1 rounded-full bg-sage"
                />
                {feature}
              </li>
            ))}
          </ul>
          <SpecularButton
            href={suite.bookingUrl}
            className="primary-cta group mt-8"
          >
            Verifica disponibilità
            <span className="cta-icon">
              <ArrowIcon className="size-5 transition-transform duration-500 group-hover:translate-x-1" />
            </span>
          </SpecularButton>
        </div>
      </div>
    </dialog>
  );
}

export function Suites() {
  const [active, setActive] = useState(0);
  const [selectedSuite, setSelectedSuite] = useState<Suite | null>(null);
  const current = suites[active];
  const reduce = useReducedMotion();
  return (
    <>
      <section
        id="suite"
        aria-labelledby="suites-title"
        className="suites-section section-space"
      >
        <div className="page-shell">
          <Reveal className="section-heading-row">
            <div>
              <BlurText as="p" className="eyebrow section-kicker">
                02 / Le nostre suite
              </BlurText>
              <BlurText as="h2" id="suites-title" className="section-title">
                A ognuno,
                <br />
                <em>la sua quiete.</em>
              </BlurText>
            </div>
            <BlurText as="p" className="section-description">
              Sette nomi ispirati alla natura. Sette spazi da scoprire, tra
              volte in pietra e dettagli che fanno casa.
            </BlurText>
          </Reveal>
          <div
            className="suite-selectors"
            role="group"
            aria-label="Scegli la suite da esplorare"
          >
            {suites.map((suite, index) => (
              <button
                key={suite.id}
                type="button"
                aria-pressed={index === active}
                aria-controls="suite-preview"
                onClick={() => setActive(index)}
                className="suite-selector"
              >
                <span className="eyebrow">0{index + 1}</span>
                <span>{suite.name}</span>
              </button>
            ))}
          </div>
          <div id="suite-preview" className="suite-showcase">
            <SuitePhoto
              suite={current}
              onOpen={() => setSelectedSuite(current)}
            />
            <div className="suite-info" aria-live="polite" aria-atomic="true">
              <motion.div
                key={current.id}
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
              >
                <BlurText as="p" className="eyebrow text-action">
                  {current.type} / 0{active + 1}
                </BlurText>
                <BlurText as="h3" className="suite-name">
                  {current.name}
                </BlurText>
                <BlurText as="p" className="suite-description">
                  {current.description}
                </BlurText>
                <ul className="suite-features">
                  {current.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </motion.div>
              <div className="suite-actions">
                <button
                  type="button"
                  className="text-link"
                  aria-haspopup="dialog"
                  onClick={() => setSelectedSuite(current)}
                >
                  Scopri {current.name}
                </button>
                <SpecularButton
                  href={current.bookingUrl}
                  className="primary-cta"
                >
                  Verifica disponibilità{" "}
                  <span className="cta-icon">
                    <ArrowIcon className="size-5" />
                  </span>
                </SpecularButton>
              </div>
            </div>
          </div>
          <BlurText as="p" className="suite-note">
            <span>La prossima pausa potrebbe cominciare da qui.</span>
            <a href="#prenota" className="text-link">
              Ti aiutiamo a scegliere{" "}
            </a>
          </BlurText>
        </div>
      </section>
      {selectedSuite && (
        <SuiteDetails
          suite={selectedSuite}
          onClose={() => setSelectedSuite(null)}
        />
      )}
    </>
  );
}

"use client";

import BlurText from "./react-bits/BlurText";

import Image from "next/image";
import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { brand, photographs } from "@/lib/brand";
import { SunIcon } from "./icons";
import { Reveal } from "./Motion";
import Magnet from "./react-bits/Magnet";

const moments = [
  {
    title: "Fermarsi, finalmente.",
    text: "Una sosta in giardino. La luce tra gli alberi. Il piacere di non dover essere altrove.",
    image: 1,
    caption: "Il giardino, all’ora blu",
  },
  {
    title: "Abitare la bellezza.",
    text: "La pietra delle volte, la luce che entra, il silenzio della tua stanza. A volte basta restare.",
    image: 6,
    caption: "Dentro, il tempo si distende",
  },
  {
    title: "Seguire la curiosità.",
    text: "Locorotondo e la Valle d’Itria, poi le esperienze da scegliere insieme a In Puglia. Il viaggio prende il tuo ritmo.",
    image: 2,
    caption: "La Valle d’Itria, da qui",
  },
] as const;

export function Experiences() {
  const [active, setActive] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);
  return (
    <section
      id="esperienze"
      ref={ref}
      aria-labelledby="experiences-title"
      className="experiences-section section-space"
    >
      <div className="page-shell experience-layout">
        <div className="experience-copy">
          <Reveal>
            <BlurText as="p" className="eyebrow section-kicker">
              03 / Qui, il tempo cambia
            </BlurText>
            <BlurText as="h2" id="experiences-title" className="section-title">
              Niente fretta.
              <br />
              <em>Solo Puglia.</em>
            </BlurText>
            <BlurText as="p" className="section-description mt-6">
              Fuori, un mondo da scoprire.
              <br />
              Dentro, tutto il piacere di fermarsi.
            </BlurText>
          </Reveal>
          <div className="experience-accordion">
            {moments.map((moment, index) => (
              <div
                key={moment.title}
                className="experience-item"
                data-active={index === active}
              >
                <h3>
                  <button
                    type="button"
                    id={`moment-trigger-${index}`}
                    aria-expanded={index === active}
                    aria-controls={`moment-panel-${index}`}
                    onClick={() => setActive(active === index ? -1 : index)}
                  >
                    <span className="eyebrow">0{index + 1}</span>
                    <BlurText as="span">{moment.title}</BlurText>
                    <span className="experience-plus" aria-hidden="true">
                      +
                    </span>
                  </button>
                </h3>
                <motion.div
                  id={`moment-panel-${index}`}
                  role="region"
                  aria-labelledby={`moment-trigger-${index}`}
                  initial={false}
                  animate={{
                    height: index === active ? "auto" : 0,
                    opacity: index === active ? 1 : 0,
                  }}
                  transition={{
                    duration: reduce ? 0 : 0.55,
                    ease: [0.25, 1, 0.5, 1],
                  }}
                  inert={index !== active}
                  aria-hidden={index !== active}
                  className="overflow-hidden"
                >
                  <BlurText as="p">{moment.text}</BlurText>
                </motion.div>
              </div>
            ))}
          </div>
          <Magnet padding={12} magnetStrength={10}>
            <a
              href={brand.experiencesUrl}
              target="_blank"
              rel="noreferrer"
              className="text-link"
            >
              Scopri le esperienze di In Puglia{" "}
              <span className="sr-only">, nuova scheda</span>
            </a>
          </Magnet>
          <BlurText as="p" className="mt-4 text-[11px] text-muted">
            Attività su richiesta, da concordare con il gestore.
          </BlurText>
        </div>
        <div className="experience-visual">
          <motion.div
            style={{ y: reduce ? 0 : y }}
            className="absolute -inset-y-[6%] inset-x-0"
          >
            <AnimatePresence initial={false}>
              <motion.div
                key={Math.max(0, active)}
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduce ? 0 : 0.8 }}
              >
                <Image
                  src={photographs[moments[Math.max(0, active)].image].src}
                  alt={photographs[moments[Math.max(0, active)].image].alt}
                  fill
                  sizes="(max-width:767px) 90vw, 48vw"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
          <span className="tile-shade" />
          <SunIcon className="absolute top-7 right-7 size-14 text-calce" />
          <BlurText
            as="p"
            className="absolute bottom-8 left-8 font-display text-3xl text-calce italic"
          >
            {moments[Math.max(0, active)].caption}
          </BlurText>
        </div>
      </div>
    </section>
  );
}

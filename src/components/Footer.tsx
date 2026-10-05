"use client";

import BlurText from "./react-bits/BlurText";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { brand } from "@/lib/brand";
import Magnet from "./react-bits/Magnet";
import { ArrowIcon, SunIcon } from "./icons";

export function Footer() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const nameY = useTransform(scrollYProgress, [0.15, 0.95], ["75%", "0%"]);
  return (
    <footer
      id="contatti"
      ref={ref}
      className="site-footer overflow-hidden bg-ink pt-16 text-calce lg:pt-24"
    >
      <div className="page-shell">
        <div className="grid gap-12 border-b border-calce/20 pb-14 md:grid-cols-[1.5fr_1fr_1fr] lg:gap-16 lg:pb-20">
          <div>
            <SunIcon className="mb-7 size-12 text-stone" />
            <BlurText
              as="p"
              className="font-display text-4xl leading-[1.1] lg:text-5xl"
            >
              Le cose belle
              <br />
              <em>sanno aspettarti.</em>
            </BlurText>
            <BlurText
              as="p"
              className="mt-6 text-[10px] tracking-[.25em] text-calce/75 uppercase"
            >
              Agrosilente · Dimore in Puglia
            </BlurText>
          </div>
          <div>
            <BlurText as="h2" className="eyebrow mb-6 text-calce/70">
              Ci trovi qui
            </BlurText>
            <address className="text-sm leading-[1.9] not-italic">
              {brand.contact.address}
              <br />
              {brand.contact.city}
            </address>
            <a
              href={brand.locationHref}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex min-h-11 items-center gap-4 border-b border-calce/40 text-xs"
            >
              Indicazioni per raggiungerci{" "}
              <span className="sr-only">
                , apri Google Maps in una nuova scheda
              </span>
            </a>
          </div>
          <div>
            <BlurText as="h2" className="eyebrow mb-6 text-calce/70">
              Parliamo del tuo soggiorno
            </BlurText>
            <a
              href={brand.contact.phoneHref}
              className="block min-h-11 text-lg"
            >
              {brand.contact.phone}
            </a>
            <a
              href={`mailto:${brand.contact.email}`}
              className="inline-block min-h-11 text-sm underline-offset-4 hover:underline"
            >
              {brand.contact.email}
            </a>
            <BlurText
              as="p"
              className="mt-2 text-[11px] leading-relaxed text-calce/70"
            >
              Accoglienza e prenotazioni a cura di In Puglia.
            </BlurText>
          </div>
        </div>
        <div className="flex flex-col gap-8 pt-7 pb-9 sm:flex-row sm:items-center sm:justify-between">
          <nav
            aria-label="Navigazione footer"
            className="flex flex-wrap gap-x-7 gap-y-1 text-xs"
          >
            <a className="footer-link" href="#essenza">
              La dimora
            </a>
            <a className="footer-link" href="#suite">
              Le suite
            </a>
            <a className="footer-link" href="#esperienze">
              Esperienze
            </a>
            <a className="footer-link" href="#prenota">
              Il tuo soggiorno
            </a>
          </nav>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="text-[10px] text-calce/65">Segui In Puglia</span>
            <Magnet padding={12} magnetStrength={8}>
              <a
                href={brand.contact.instagram}
                target="_blank"
                rel="noreferrer"
                className="footer-link inline-flex items-center gap-2 text-xs"
                aria-label="Instagram di In Puglia, nuova scheda"
              >
                Instagram
              </a>
            </Magnet>
            <Magnet padding={12} magnetStrength={8}>
              <a
                href={brand.contact.facebook}
                target="_blank"
                rel="noreferrer"
                className="footer-link inline-flex items-center gap-2 text-xs"
                aria-label="Facebook di In Puglia, nuova scheda"
              >
                Facebook
              </a>
            </Magnet>
          </div>
        </div>
        <div className="overflow-hidden pb-3" aria-hidden="true">
          <motion.p
            style={{ y: reduceMotion ? 0 : nameY }}
            className="footer-wordmark font-display leading-[.88] tracking-[-.045em]"
          >
            <BlurText as="span" text="AGROSILENTE" animateBy="letters" />
          </motion.p>
        </div>
        <div className="mt-4 flex items-center justify-between gap-5 border-t border-calce/20 py-7 text-[9px] tracking-[.12em] text-calce/65">
          <BlurText as="p">AGROSILENTE — LOCOROTONDO, PUGLIA</BlurText>
          <a href="#dimora" className="flex min-h-11 items-center gap-3">
            Torna all’inizio <ArrowIcon className="size-4 -rotate-90" />
          </a>
        </div>
      </div>
    </footer>
  );
}

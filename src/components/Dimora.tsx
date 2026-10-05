"use client";

import BlurText from "./react-bits/BlurText";

import Image from "next/image";
import { photographs } from "@/lib/brand";
import { SunIcon, TrulliIcon } from "./icons";
import { Reveal, ScrollStatement } from "./Motion";

export function Dimora({ onExplore }: { onExplore: (index: number) => void }) {
  return (
    <section
      id="essenza"
      className="section-space"
      aria-label="L’essenza della dimora"
    >
      <div className="page-shell">
        <div className="story-intro">
          <BlurText as="p" className="eyebrow section-kicker">
            01 / Un altro ritmo
          </BlurText>
          <ScrollStatement text="Meno rumore. Più luce, più spazio. Più tempo per le cose che ami." />
          <BlurText as="p" className="section-description">
            La pietra dei trulli, la quiete del giardino, una porta da aprire
            sulla Valle d’Itria. Ad Agrosilente, sentirsi altrove è un modo per
            ritrovarsi.
          </BlurText>
        </div>
        <div className="dimora-grid">
          <Reveal className="dimora-garden">
            <button
              className="photo-tile group"
              type="button"
              onClick={() => onExplore(2)}
              aria-label="Apri la fotografia della dimora all’ora blu"
              aria-haspopup="dialog"
            >
              <Image
                src={photographs[2].src}
                alt={photographs[2].alt}
                fill
                sizes="(max-width:767px) 90vw, 50vw"
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <span className="tile-shade" />
              <span className="tile-copy">
                <span className="eyebrow">La dimora</span>
                <span className="block font-display text-[clamp(32px,3.5vw,52px)] leading-tight mt-3">
                  La storia, fuori.
                  <br />
                  <em>Il tuo tempo, dentro.</em>
                </span>
              </span>
            </button>
          </Reveal>
          <Reveal className="dimora-number" delay={0.1}>
            <TrulliIcon className="w-16 h-12" />
            <div>
              <span className="dimora-seven">7</span>
              <BlurText as="h3">Dimore. Un’unica anima.</BlurText>
            </div>
            <BlurText as="p">
              Pietra a vista, dettagli essenziali e sette modi diversi di
              sentirsi a casa.
            </BlurText>
            <a href="#suite" className="text-link">
              Trova la tua
            </a>
          </Reveal>
          <Reveal className="dimora-detail" delay={0.15}>
            <button
              type="button"
              onClick={() => onExplore(5)}
              className="photo-tile group"
              aria-label="Apri il dettaglio delle maioliche"
              aria-haspopup="dialog"
            >
              <Image
                src={photographs[5].src}
                alt={photographs[5].alt}
                fill
                sizes="(max-width:767px) 45vw, 24vw"
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <span className="tile-shade" />
              <span className="tile-copy">
                <span className="eyebrow">Fatto di dettagli</span>
                <span className="block font-display text-3xl mt-2">
                  Materia viva.
                </span>
              </span>
            </button>
          </Reveal>
          <Reveal className="dimora-comfort" delay={0.2}>
            <SunIcon className="size-10" />
            <div>
              <BlurText as="h3">
                Stare bene,
                <br />
                <em>con semplicità.</em>
              </BlurText>
              <BlurText as="p">
                Wi-Fi, aria condizionata e parcheggio. Le comodità che lasciano
                spazio alla vacanza.
              </BlurText>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

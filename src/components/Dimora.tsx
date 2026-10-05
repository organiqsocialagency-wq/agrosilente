"use client";

import BlurText from "./react-bits/BlurText";

import Image from "next/image";
import { photographs } from "@/lib/brand";
import { SunIcon } from "./icons";
import { BrandMark } from "./BrandLogo";
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
          <ScrollStatement text="Una casa lontano dalla città. Più vicina alle cose che ami." />
          <BlurText as="p" className="section-description">
            La pietra del trullo, la luce del tramonto, una porta da aprire
            sulla Valle d’Itria. A Trullo Natalino, tutta la casa è per te:
            per condividere la vacanza, per ritrovare il tuo ritmo.
          </BlurText>
        </div>
        <div className="dimora-grid">
          <Reveal className="dimora-garden">
            <button
              className="photo-tile group"
              type="button"
              onClick={() => onExplore(0)}
              aria-label="Apri la fotografia dell’esterno della dimora"
              aria-haspopup="dialog"
            >
              <Image
                src={photographs[0].src}
                alt={photographs[0].alt}
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
            <BrandMark className="dimora-brand-mark" />
            <div>
              <BlurText as="h3">Una casa.<br /><em>Tutta per te.</em></BlurText>
            </div>
            <BlurText as="p">
              La camera, il soggiorno, la cucina con il camino in pietra.
              Fuori, il patio per le giornate da vivere con calma.
            </BlurText>
            <button type="button" onClick={() => onExplore(3)} className="text-link" aria-haspopup="dialog">
              Entra in casa
            </button>
          </Reveal>
          <Reveal className="dimora-detail" delay={0.15}>
            <button
              type="button"
              onClick={() => onExplore(5)}
              className="photo-tile group"
              aria-label="Apri la fotografia della cucina e del camino in pietra"
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
                Cucina attrezzata, aria condizionata e spazi da condividere.
                Le piccole comodità di sentirsi a casa.
              </BlurText>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

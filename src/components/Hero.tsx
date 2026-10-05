"use client";

import BlurText from "./react-bits/BlurText";

import { brand, photographs } from "@/lib/brand";
import ScrollExpand from "./react-bits/ScrollExpand";
import SpecularButton from "./react-bits/SpecularButton";
import { ArrowIcon } from "./icons";

export function Hero({
  ready = true,
  bookingHref = "#prenota",
  onExplore,
}: {
  ready?: boolean;
  bookingHref?: string;
  onExplore: (index?: number) => void;
}) {
  return (
    <section
      id="dimora"
      className="hero hero-expand"
      aria-labelledby="hero-title"
    >
      <ScrollExpand
        src={photographs[3].src}
        alt={photographs[3].alt}
        title={
          <div className="hero-expand-title">
            <BlurText animationEnabled={ready} scrollLinked={false} as="p">
              {brand.location}
            </BlurText>
            <BlurText
              animationEnabled={ready}
              scrollLinked={false}
              as="h1"
              id="hero-title"
            >
              AGROSILENTE
            </BlurText>
            <span>DIMORE IN PUGLIA</span>
          </div>
        }
        scrollHint="Scorri, entra nella quiete ↓"
        startWidth={68}
        startHeight={64}
        startRadius={26}
        mediaZoom={1.08}
        scrollDistance={0.85}
        holdDistance={0.15}
        overlayScrim={0.85}
        enabled={ready}
        useWindowScroll
        footer={
          <div className="hero-expand-actions">
            <SpecularButton href={bookingHref} className="primary-cta">
              Prenota Ora{" "}
              <span className="cta-icon">
                <ArrowIcon className="size-5" />
              </span>
            </SpecularButton>
            <button
              type="button"
              className="hero-gallery-link"
              aria-haspopup="dialog"
              onClick={() => onExplore()}
            >
              Guarda le fotografie
            </button>
          </div>
        }
      >
        <BlurText as="h2" className="hero-expand-slogan">
          Calma.
          <br />
          <em>Con carattere.</em>
        </BlurText>
        <BlurText as="p" className="hero-expand-description">
          Sette dimore tra i trulli di Locorotondo.
          <br />
          La Puglia da abitare, il tempo da ritrovare.
        </BlurText>
      </ScrollExpand>
      <div className="page-shell hero-facts">
        <span>Sette suite, ognuna diversa</span>
        <span>Trulli e cummersa</span>
        <span>Nel cuore della Valle d’Itria</span>
        <a href="#suite" className="text-link">
          Scegli la tua suite
        </a>
      </div>
    </section>
  );
}

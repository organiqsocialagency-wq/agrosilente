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
        src={photographs[0].src}
        alt={photographs[0].alt}
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
              TRULLO NATALINO
            </BlurText>
            <span>UNA CASA, TUTTA PER TE</span>
            <p className="hero-motto">Qui il tempo è più gentile.</p>
          </div>
        }
        scrollHint="Scorri, entra nella quiete ↓"
        startWidth={68}
        startHeight={74}
        startRadius={26}
        mediaZoom={1}
        fitMediaToFrame
        scrollDistance={0.85}
        holdDistance={0.15}
        overlayScrim={0.85}
        enabled={ready}
        useWindowScroll
        footer={
          <div className="hero-expand-actions">
            <SpecularButton href={bookingHref} className="primary-cta">
              Prenota il tuo soggiorno{" "}
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
          Pietra, tramonti.
          <br />
          <em>E tempo per te.</em>
        </BlurText>
        <BlurText as="p" className="hero-expand-description">
          Una casa nella campagna di Locorotondo.
          <br />
          La Puglia da abitare, il tempo da ritrovare.
        </BlurText>
      </ScrollExpand>
      <div className="page-shell hero-facts">
        <span>Una casa, tutta per te</span>
        <span>Pietra, natura e silenzio</span>
        <span>Nel cuore della Valle d’Itria</span>
        <a href="#essenza" className="text-link">
          Scopri il trullo
        </a>
      </div>
    </section>
  );
}

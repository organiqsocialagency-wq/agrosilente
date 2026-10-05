"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import { assetPath } from "@/lib/assets";
import BlurText from "./react-bits/BlurText";
import "./Events.css";

const events = [
  { image: "viva-festival.webp", alt: "VIVA! Valle d’Itria International Music Festival", variant: "logo-dark", caption: "" },
  { image: "luminarie.webp", alt: "Un vicolo di Locorotondo decorato con luci e alberi di Natale", variant: "photo", caption: "Luminarie di Locorotondo" },
  { image: "festival-logo.webp", alt: "Locus 2026", variant: "logo-light", caption: "" },
  { image: "fuochi-artificio.webp", alt: "Fuochi d’artificio colorati sopra il borgo di Locorotondo", variant: "photo", caption: "Fuochi D’artificio" },
];

export function Events() {
  const ref = useRef<HTMLElement>(null);
  const visible = useInView(ref, { amount: 0.1 });
  const [paused, setPaused] = useState(false);
  return (
    <section id="eventi" ref={ref} className="events-section section-space" aria-labelledby="events-title">
      <div className="page-shell events-heading">
        <div>
          <BlurText as="p" className="eyebrow section-kicker">Il borgo si accende</BlurText>
          <BlurText as="h2" id="events-title" className="section-title">Eventi a <em>Locorotondo</em></BlurText>
        </div>
        <button type="button" className="events-pause" aria-controls="events-track" aria-label={paused ? "Avvia scorrimento eventi" : "Pausa scorrimento eventi"} onClick={() => setPaused(!paused)}>
          <span aria-hidden="true">{paused ? "▶" : "Ⅱ"}</span> {paused ? "Riprendi" : "Pausa"}
        </button>
      </div>
      <div className="events-viewport" role="region" aria-label="Carosello degli eventi di Locorotondo" tabIndex={0}>
        <div id="events-track" className="events-track" data-paused={paused || !visible}>
          {[0, 1].map((copy) => (
            <div key={copy} className="events-group" role={copy === 0 ? "list" : undefined} aria-hidden={copy === 1 ? true : undefined}>
              {events.map((event) => (
                <figure key={event.image} className={`event-card event-card--${event.variant}`} role={copy === 0 ? "listitem" : undefined}>
                  <Image src={assetPath(`/images/events/${event.image}`)} alt={copy === 0 ? event.alt : ""} fill sizes="(max-width:600px) 82vw, 460px" draggable={false} />
                  {event.caption && <figcaption>{event.caption}</figcaption>}
                </figure>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

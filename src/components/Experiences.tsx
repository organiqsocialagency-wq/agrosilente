"use client";

import { assetPath } from "@/lib/assets";
import BlurText from "./react-bits/BlurText";
import AccordionGallery from "./react-bits/AccordionGallery";

const places = [
  { image: "locorotondo-2.webp", label: "Tra i vicoli bianchi", alt: "Un vicolo bianco di Locorotondo con la torre dell’orologio" },
  { image: "locorotondo-3.webp", label: "Una passeggiata in Via Morelli", alt: "Le case e i balconi di Via Morelli a Locorotondo" },
  { image: "locorotondo-1.webp", label: "Locorotondo, all’orizzonte", alt: "Il profilo circolare del borgo di Locorotondo visto dalla campagna" },
  { image: "locorotondo-5.webp", label: "L’ora più dolce", alt: "Il borgo di Locorotondo illuminato al tramonto" },
  { image: "locorotondo-4.webp", label: "Lo sguardo sulla Valle d’Itria", alt: "Trulli e campagna della Valle d’Itria visti dalla Villa Comunale di Locorotondo" },
].map((place) => ({ ...place, image: assetPath(`/images/locorotondo/${place.image}`) }));

export function Experiences() {
  return (
    <section id="esperienze" aria-labelledby="experiences-title" className="experiences-section section-space">
      <div className="page-shell">
        <div className="places-heading">
          <div>
            <BlurText as="p" className="eyebrow section-kicker">02 / Intorno a noi</BlurText>
            <BlurText as="h2" id="experiences-title" className="section-title">Fuori, il borgo.<br /><em>Dentro, la tua quiete.</em></BlurText>
          </div>
          <BlurText as="p" className="section-description">Le stradine bianche di Locorotondo, i tetti di pietra, la campagna che si perde all’orizzonte. Segui la curiosità, al tuo ritmo.</BlurText>
        </div>
        <AccordionGallery items={places} defaultIndex={2} />
        <a className="photo-credits-link" href={assetPath("/crediti-fotografici.html")} target="_blank" rel="noreferrer">Crediti fotografici <span className="sr-only">, nuova scheda</span></a>
      </div>
    </section>
  );
}

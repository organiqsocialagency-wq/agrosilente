"use client";

import { assetPath } from "@/lib/assets";
import BlurText from "./react-bits/BlurText";
import AccordionGallery from "./react-bits/AccordionGallery";
import "./Seaside.css";

const beaches = [
  { image: "bay", label: "Calette da scoprire", alt: "Una baia di acqua turchese tra scogliere chiare e macchia mediterranea" },
  { image: "sea-cave", label: "Riflessi nella roccia", alt: "Acqua limpida illuminata dal sole sotto una volta di pietra sul mare" },
  { image: "dunes", label: "Un sentiero verso il blu", alt: "Un sentiero di sabbia tra dune e staccionate conduce alla spiaggia" },
  { image: "coast", label: "Lasciati guidare dalla costa", alt: "Veduta dall’alto di una costa rocciosa con piccole insenature e mare trasparente" },
  { image: "clear-water", label: "Solo il suono del mare", alt: "Acqua cristallina e fondale sabbioso davanti a una lunga spiaggia" },
].map((item) => ({ ...item, image: assetPath(`/images/seaside/${item.image}.webp`) }));

export function Seaside() {
  return (
    <section id="mare" className="seaside-section section-space" aria-labelledby="seaside-title">
      <div className="page-shell">
        <div className="places-heading">
          <div>
            <BlurText as="p" className="eyebrow section-kicker">Mare e spiagge</BlurText>
            <BlurText as="h2" id="seaside-title" className="section-title">A due passi<br /><em>dal mare</em></BlurText>
          </div>
          <BlurText as="p" className="section-description">Calette, scogliere e spiagge di sabbia: scegli il tuo modo di vivere il mare. Un tuffo nell’acqua limpida, una passeggiata sulla riva, poi il ritorno alla quiete di Trullo Natalino.</BlurText>
        </div>
        <AccordionGallery items={beaches} defaultIndex={0} galleryName="mare e spiagge" />
        <p className="seaside-note">Il sole sulla pelle, la sabbia sotto i piedi. E tutto il tempo per fermarsi.</p>
      </div>
    </section>
  );
}

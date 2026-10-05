"use client";

import BlurText from "./react-bits/BlurText";

import { photographs } from "@/lib/brand";
import DepthCarousel from "./react-bits/DepthCarousel";
import MaskedHeading from "./react-bits/MaskedHeading";

export const galleryItems = photographs.map((photo) => ({
  image: photo.src,
  alt: photo.alt,
  caption: photo.caption,
  position: ["50% 53%", "50% 46%", "50% 34%", "50% 36%", "50% 54%", "50% 50%", "50% 48%", "50% 58%", "50% 64%", "50% 45%"][photographs.indexOf(photo)],
}));

export function GallerySection({
  onExplore,
}: {
  onExplore: (index: number) => void;
}) {
  return (
    <section
      id="fotografie"
      className="gallery-section section-space"
      aria-labelledby="photo-story-title"
    >
      <div className="page-shell">
        <div className="gallery-heading">
          <BlurText as="p" className="eyebrow section-kicker">
            03 / Dieci sguardi, una casa
          </BlurText>
          <BlurText as="div">
            <MaskedHeading
              id="photo-story-title"
              className="font-display"
              text="Dentro Trullo Natalino."
              src={photographs[2].src}
              brightness={0.65}
              saturation={0.8}
              weight={600}
              textScale={0.095}
              reveal="wipe"
              drift={8}
              parallax={18}
            />
          </BlurText>
          <BlurText as="p" className="section-description mx-auto">
            La luce, la pietra, i dettagli. Sfoglia la tua prossima pausa.
          </BlurText>
        </div>
        <div className="gallery-carousel">
          <DepthCarousel
            items={galleryItems}
            cardWidth={450}
            cardHeight={450}
            depth={190}
            spread={125}
            tilt={18}
            perspective={1400}
            visibleCards={4}
            falloff={0.14}
            blur={3}
            tint="#493323"
            duration={850}
            onOpen={onExplore}
            showCaption={false}
            showControls={false}
            showIndicators={false}
          />
        </div>
      </div>
    </section>
  );
}

"use client";

import { useCallback, useRef, useState } from "react";
import { GallerySection } from "./GallerySection";
import { Intro } from "./Intro";
import { Dimora } from "./Dimora";
import { Hero } from "./Hero";
import { Navbar } from "./Navbar";
import { Experiences } from "./Experiences";
import { Events } from "./Events";
import { Booking } from "./Booking";
import { Footer } from "./Footer";
import { PhotoGallery } from "./PhotoGallery";

export function HomePage() {
  const [introComplete, setIntroComplete] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const finishIntro = useCallback(() => setIntroComplete(true), []);
  const [galleryIndex, setGalleryIndex] = useState<number | null>(null);
  const openGallery = (index = 0) => setGalleryIndex(index);
  return (
    <>
      {!introComplete && (
        <Intro contentRef={contentRef} onComplete={finishIntro} />
      )}
      <div ref={contentRef}>
        <Navbar bookingHref="#prenota" onExplore={openGallery} />
        <main id="main-content" tabIndex={-1}>
          <Hero
            ready={introComplete}
            bookingHref="#prenota"
            onExplore={openGallery}
          />
          <Dimora onExplore={openGallery} />
          <Experiences />
          <Events />
          <GallerySection onExplore={openGallery} />
          <Booking />
        </main>
        <Footer />
      </div>
      {galleryIndex !== null && (
        <PhotoGallery
          initialIndex={galleryIndex}
          onClose={() => setGalleryIndex(null)}
        />
      )}
    </>
  );
}

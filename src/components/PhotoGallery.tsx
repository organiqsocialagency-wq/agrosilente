"use client";

import DepthCarousel from "./react-bits/DepthCarousel";
import { galleryItems } from "./GallerySection";
import { useEffect, useRef } from "react";

interface PhotoGalleryProps {
  initialIndex: number;
  onClose: () => void;
}

export function PhotoGallery({ initialIndex, onClose }: PhotoGalleryProps) {
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const element = dialog.current;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    element?.showModal();
    element
      ?.querySelector<HTMLElement>('[aria-roledescription="carousel"]')
      ?.focus();
    document.body.style.overflow = "hidden";
    return () => {
      element?.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, []);

  return (
    <dialog
      ref={dialog}
      aria-labelledby="gallery-title"
      className="photo-dialog fixed inset-0 m-auto max-h-[95dvh] w-[min(1100px,94vw)] max-w-none overflow-y-auto bg-calce p-5 text-ink sm:p-8"
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          const rect = event.currentTarget.getBoundingClientRect();
          if (
            event.clientX < rect.left ||
            event.clientX > rect.right ||
            event.clientY < rect.top ||
            event.clientY > rect.bottom
          )
            onClose();
        }
      }}
    >
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 id="gallery-title" className="font-display text-3xl sm:text-4xl">
          Dentro Agrosilente
        </h2>
        <button
          type="button"
          onClick={onClose}
          className="min-h-11 px-3 text-xs tracking-widest uppercase"
        >
          Chiudi{" "}
          <span aria-hidden="true" className="ml-2 text-lg">
            ×
          </span>
        </button>
      </div>
      <DepthCarousel
        items={galleryItems}
        initialIndex={initialIndex}
        cardWidth={520}
        cardHeight={520}
        depth={200}
        spread={110}
        tilt={18}
        visibleCards={4}
        falloff={0.14}
        blur={3}
        tint="#293c35"
        duration={850}
      />
    </dialog>
  );
}

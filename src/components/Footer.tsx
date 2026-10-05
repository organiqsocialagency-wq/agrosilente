"use client";

import BlurText from "./react-bits/BlurText";
import { brand } from "@/lib/brand";
import { BrandMark } from "./BrandLogo";
import { ArrowIcon } from "./icons";

export function Footer() {
  return (
    <footer id="contatti" className="site-footer overflow-hidden bg-ink pt-16 text-calce lg:pt-24">
      <div className="page-shell">
        <div className="grid gap-12 border-b border-calce/20 pb-14 md:grid-cols-[1.4fr_1fr_1fr] lg:gap-16 lg:pb-20">
          <div>
            <BrandMark className="footer-brand-mark" />
            <BlurText as="p" className="font-display text-3xl leading-[1.3] lg:text-4xl">
              Le cose belle<br /><em>sanno aspettarti.</em>
            </BlurText>
            <p className="mt-6 text-[10px] tracking-[.2em] text-calce/75 uppercase">Trullo Natalino · Una casa in Puglia</p>
          </div>
          <div>
            <h2 className="eyebrow mb-6 text-calce/70">Ci trovi qui</h2>
            <address className="text-sm leading-[1.9] not-italic">{brand.contact.address}<br />{brand.contact.city}</address>
            <a href={brand.locationHref} target="_blank" rel="noreferrer" className="mt-5 inline-flex min-h-11 items-center gap-4 border-b border-calce/40 text-xs">
              Indicazioni per raggiungerci <ArrowIcon className="size-4" />
            </a>
          </div>
          <div>
            <h2 className="eyebrow mb-6 text-calce/70">Parliamo del tuo soggiorno</h2>
            <a href={brand.contact.phoneHref} className="block min-h-11 text-lg">{brand.contact.phone}</a>
            <a href={brand.contact.whatsapp} target="_blank" rel="noreferrer" className="footer-link border-b border-calce/40 text-sm">Scrivici su WhatsApp</a>
            <p className="mt-5 text-xs leading-relaxed text-calce/70">Una casa da vivere.<br />Un’accoglienza da ricordare.</p>
          </div>
        </div>
        <nav aria-label="Navigazione footer" className="flex flex-wrap gap-x-7 gap-y-1 py-7 text-xs">
          <a className="footer-link" href="#essenza">La casa</a>
          <a className="footer-link" href="#esperienze">Locorotondo</a>
          <a className="footer-link" href="#fotografie">Le fotografie</a>
          <a className="footer-link" href="#prenota">Il tuo soggiorno</a>
        </nav>
        <div className="overflow-hidden py-5" aria-hidden="true">
          <p className="footer-wordmark font-display leading-[1.15] tracking-[-.045em]">TRULLO NATALINO</p>
        </div>
        <div className="mt-4 flex items-center justify-between gap-5 border-t border-calce/20 py-7 text-[9px] tracking-[.12em] text-calce/65">
          <p>TRULLO NATALINO · LOCOROTONDO, PUGLIA</p>
          <a href="#dimora" className="flex min-h-11 items-center gap-3">Torna all’inizio <ArrowIcon className="size-4 -rotate-90" /></a>
        </div>
      </div>
    </footer>
  );
}

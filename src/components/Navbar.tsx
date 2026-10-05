"use client";

import Dock, { type DockItemData } from "./react-bits/Dock";
import { BrandLogo } from "./BrandLogo";
export function Navbar({
  onExplore,
  bookingHref = "#prenota",
}: {
  onExplore: (index?: number) => void;
  bookingHref?: string;
}) {
  const items: DockItemData[] = [
    { label: "Dimora", href: "#essenza" },
    { label: "Suite", href: "#suite" },
    { label: "Esperienze", mobileLabel: "Vivi", href: "#esperienze" },
    { label: "Foto", onClick: () => onExplore() },
    {
      label: "Prenota Ora",
      mobileLabel: "Prenota",
      href: bookingHref,
      className: "dock-booking",
    },
  ];
  return (
    <header className="dock-header">
      <a
        href="#dimora"
        aria-label="Agrosilente, inizio pagina"
        className="header-brand"
      >
        <BrandLogo />
      </a>
      <Dock items={items} />
    </header>
  );
}

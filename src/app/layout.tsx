import type { Metadata } from "next";
import "@fontsource-variable/manrope";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/400-italic.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agrosilente — Dimore in Puglia",
  description:
    "Natura, pietra e silenzio. Scopri Agrosilente, una dimora tra i trulli a Locorotondo, nel cuore della Valle d’Itria.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it">
      <body>
        <a href="#main-content" className="skip-link">
          Vai al contenuto
        </a>
        {children}
      </body>
    </html>
  );
}

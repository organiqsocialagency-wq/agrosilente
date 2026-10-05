import type { Metadata } from "next";
import "@fontsource-variable/montserrat";
import "@fontsource-variable/lora";
import "@fontsource-variable/lora/wght-italic.css";
import { assetPath } from "@/lib/assets";
import "./globals.css";

export const metadata: Metadata = {
  icons: { icon: assetPath("/brand/trullo-natalino-mark.svg") },
  title: "Trullo Natalino — Una casa in Puglia",
  description:
    "Una casa tutta per te a Locorotondo. Pietra, tramonti e campagna a Trullo Natalino, in Contrada Pentimone, nel cuore della Valle d’Itria.",
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

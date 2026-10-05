import { assetPath } from "./assets";

/**
 * Verified on 2026-10-05 against the property manager's room listing.
 * Photos were downloaded from the gallery underneath each named suite.
 * No occupancy, room-size or price assumptions are made here.
 */
export interface Suite {
  id: string;
  name: string;
  type: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
  features: readonly [string, string];
  sourceUrl: string;
  bookingUrl: string;
  imageSourceUrl: string;
}

export const suitesSourceUrl =
  "https://www.inpugliaservice.com/rooms/agrosilente/";
const imageBase = "https://www.inpugliaservice.com/wp-content/uploads/2023/07/";
const bookingBase = "https://booking.inreception.com/agrosilente?room=";

export const suites = [
  {
    id: "buganville",
    name: "Buganville",
    type: "Junior suite",
    description: "Pietra a vista e intimità, per rallentare.",
    imageSrc: assetPath("/images/suites/buganville.jpg"),
    imageAlt: "Buganville: letto matrimoniale sotto una volta in pietra",
    features: ["Ingresso indipendente", "Angolo colazione"],
    sourceUrl: suitesSourceUrl,
    bookingUrl: `${bookingBase}9678`,
    imageSourceUrl: `${imageBase}agrosilente-buganville-5-799x533.jpg`,
  },
  {
    id: "mirto",
    name: "Mirto",
    type: "Junior suite",
    description: "Una pausa raccolta tra luce e pietra.",
    imageSrc: assetPath("/images/suites/mirto.jpg"),
    imageAlt: "Mirto: letto matrimoniale e nicchie nella pietra",
    features: ["Ingresso indipendente", "Angolo colazione"],
    sourceUrl: suitesSourceUrl,
    bookingUrl: `${bookingBase}9705`,
    imageSourceUrl: `${imageBase}agrosilente-mirto-9-799x533.jpg`,
  },
  {
    id: "malva",
    name: "Malva",
    type: "Junior suite",
    description: "Il carattere discreto di una cummersa.",
    imageSrc: assetPath("/images/suites/malva.jpg"),
    imageAlt: "Malva: letto matrimoniale, specchio e bagno sul fondo",
    features: ["Tetto in pietra", "Ingresso indipendente"],
    sourceUrl: suitesSourceUrl,
    bookingUrl: `${bookingBase}8482`,
    imageSourceUrl: `${imageBase}agrosilente-malva-5-799x533.jpg`,
  },
  {
    id: "lauro",
    name: "Lauro",
    type: "Junior suite",
    description: "Spazio per riposare, tempo per sé.",
    imageSrc: assetPath("/images/suites/lauro.jpg"),
    imageAlt: "Lauro: letto chiaro accanto alla porta verde",
    features: ["Soggiorno con divano", "Ingresso indipendente"],
    sourceUrl: suitesSourceUrl,
    bookingUrl: `${bookingBase}8483`,
    imageSourceUrl: `${imageBase}agrosilente-lauro-8-799x533.jpg`,
  },
  {
    id: "vite",
    name: "Vite",
    type: "Junior suite",
    description: "Una dimora da vivere al proprio ritmo.",
    imageSrc: assetPath("/images/suites/vite.jpg"),
    imageAlt: "Vite: letto matrimoniale tra pareti bianche e pietra",
    features: ["Soggiorno con divano", "Angolo colazione"],
    sourceUrl: suitesSourceUrl,
    bookingUrl: `${bookingBase}9704`,
    imageSourceUrl: `${imageBase}agrosilente-vite-6-799x533.jpg`,
  },
  {
    id: "gelsomino",
    name: "Gelsomino",
    type: "Junior suite",
    description: "Pietra, luce e spazio alla quiete.",
    imageSrc: assetPath("/images/suites/gelsomino.jpg"),
    imageAlt: "Gelsomino: letto matrimoniale e parete in pietra",
    features: ["Doppio ingresso indipendente", "Zona living"],
    sourceUrl: suitesSourceUrl,
    bookingUrl: `${bookingBase}9706`,
    imageSourceUrl: `${imageBase}agrosilente-gelsomino-8-799x533.jpg`,
  },
  {
    id: "corbezzolo",
    name: "Corbezzolo",
    type: "Suite familiare",
    description: "Il piacere di abitare insieme la vacanza.",
    imageSrc: assetPath("/images/suites/corbezzolo.jpg"),
    imageAlt: "Corbezzolo: letto matrimoniale e arredi bianchi",
    features: ["Cucina attrezzata", "Soggiorno con divano"],
    sourceUrl: suitesSourceUrl,
    bookingUrl: `${bookingBase}9420`,
    imageSourceUrl: `${imageBase}agrosilente-corbezzolo-7-799x533.jpg`,
  },
] as const satisfies readonly Suite[];

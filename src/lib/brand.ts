import { assetPath } from "./assets";

export const brand = {
  name: "Trullo Natalino",
  descriptor: "Una casa in Puglia",
  location: "Locorotondo · Valle d’Itria",
  contact: {
    phone: "+39 331 302 1588",
    phoneHref: "tel:+393313021588",
    whatsapp: "https://wa.me/393313021588",
    address: "Contrada Pentimone",
    city: "70010 Locorotondo BA",
  },
  // 40°45'42.1"N 17°20'27.1"E, posizione indicata dal proprietario.
  locationHref: "https://www.google.com/maps/search/?api=1&query=40.761694%2C17.340861",
} as const;

export const photographs = [
  {
    src: assetPath("/images/photographs/exterior-edited.webp"),
    alt: "L’esterno della dimora con il trullo, il patio e le piante in vaso",
    caption: "La luce della Puglia",
  },
  {
    src: assetPath("/images/photographs/lemons.webp"),
    alt: "Un cesto di limoni sul tavolo del patio, all’ombra dell’ombrellone",
    caption: "Il profumo delle cose semplici",
  },
  {
    src: assetPath("/images/photographs/trullo-sunset.webp"),
    alt: "Il pinnacolo bianco del trullo e le sue pietre al tramonto",
    caption: "Quando il giorno rallenta",
  },
  {
    src: assetPath("/images/photographs/living-samsung.webp"),
    alt: "Il soggiorno con archi bianchi, tavolo in legno e televisore Samsung",
    caption: "Spazio alla quiete",
  },
  {
    src: assetPath("/images/photographs/bedroom.webp"),
    alt: "La camera matrimoniale con letto in ferro nero e tende bianche",
    caption: "Il piacere di sentirsi altrove",
  },
  {
    src: assetPath("/images/photographs/kitchen.webp"),
    alt: "La cucina attrezzata accanto al camino in pietra a vista",
    caption: "La bellezza, nei dettagli",
  },
  {
    src: assetPath("/images/photographs/bedroom-reverse.webp"),
    alt: "La camera vista dal letto, con armadio, scrittoio e comodino bianco",
    caption: "Il tempo, tutto per sé",
  },
  {
    src: assetPath("/images/photographs/bathroom.webp"),
    alt: "Il bagno con lavabo, specchio e rivestimenti bianchi e antracite",
    caption: "Semplicemente essenziale",
  },
  {
    src: assetPath("/images/photographs/bathroom-shower.webp"),
    alt: "La doccia del bagno illuminata dalla luce naturale del lucernario",
    caption: "Una pausa di benessere",
  },
  {
    src: assetPath("/images/photographs/wardrobe-samsung.webp"),
    alt: "La stanza con armadio bianco, specchio e aria condizionata, affacciata sul soggiorno",
    caption: "L’anima di una casa",
  },
] as const;

import { assetPath } from "./assets";

export const brand = {
  name: "Agrosilente",
  descriptor: "Dimore in Puglia",
  location: "Locorotondo · Valle d’Itria",
  instagramPost: "https://www.instagram.com/p/CwZ693WtfCM/",
  bookingUrl: "https://booking.inreception.com/agrosilente/it",
  propertySource: "https://www.inpugliaservice.com/rooms/agrosilente/",
  experiencesUrl: "https://www.inpugliaservice.com/esperienze/",
  contact: {
    manager: "In Puglia",
    email: "info@inpugliaservice.com",
    phone: "+39 328 295 7789",
    phoneHref: "tel:+393282957789",
    whatsapp: "https://wa.me/393282957789",
    address: "Contrada Ritunno Piccolo S.N.",
    city: "70010 Locorotondo (BA), Puglia",
    instagram: "https://www.instagram.com/inpugliaservice/",
    facebook: "https://www.facebook.com/Inpugliaservice/",
  },
  locationHref: "https://maps.app.goo.gl/1sTnYgJkXkfgkdaCA",
} as const;

export const photographs = [
  {
    src: assetPath("/images/agrosilente/agrosilente-01.jpg"),
    alt: "I trulli di Agrosilente sotto il cielo azzurro",
    caption: "La luce della Puglia",
  },
  {
    src: assetPath("/images/agrosilente/agrosilente-02.jpg"),
    alt: "Il giardino di Agrosilente illuminato al tramonto",
    caption: "Quando il giorno rallenta",
  },
  {
    src: assetPath("/images/agrosilente/agrosilente-03.jpg"),
    alt: "La facciata in pietra e la scala esterna all’ora blu",
    caption: "Pietra, luce e silenzio",
  },
  {
    src: assetPath("/images/agrosilente/agrosilente-04.jpg"),
    alt: "La corte dei trulli con le luci della sera",
    caption: "Il respiro della dimora",
  },
  {
    src: assetPath("/images/agrosilente/agrosilente-05.jpg"),
    alt: "Una camera luminosa con pareti in pietra e letto matrimoniale",
    caption: "Il piacere di sentirsi altrove",
  },
  {
    src: assetPath("/images/agrosilente/agrosilente-06.jpg"),
    alt: "Una nicchia in pietra con lavabo e maioliche colorate",
    caption: "La bellezza, nei dettagli",
  },
  {
    src: assetPath("/images/agrosilente/agrosilente-07.jpg"),
    alt: "Un divano chiaro incastonato tra le pareti in pietra",
    caption: "Spazio alla quiete",
  },
  {
    src: assetPath("/images/agrosilente/agrosilente-08.jpg"),
    alt: "Un lavabo bianco su un piano in legno accanto a un’orchidea",
    caption: "Semplicemente essenziale",
  },
  {
    src: assetPath("/images/agrosilente/agrosilente-09.jpg"),
    alt: "L’angolo cucina della dimora con camino e finiture chiare",
    caption: "L’anima di una casa",
  },
  {
    src: assetPath("/images/agrosilente/agrosilente-10.jpg"),
    alt: "Una camera matrimoniale sotto la volta di pietra del trullo",
    caption: "Abitare la storia",
  },
] as const;

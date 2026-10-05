import { brand } from "./brand";

export interface StayRequest {
  arrival: string;
  departure: string;
  adults: number;
  children: number;
}

export function localDate(date = new Date()): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function nextDate(value: string): string {
  const date = parseDate(value);
  if (!date) return "";
  date.setDate(date.getDate() + 1);
  return localDate(date);
}

function parseDate(value: string): Date | null {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return null;
  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(year, month - 1, day, 12);
  return localDate(date) === value ? date : null;
}

export function validateStay(
  stay: StayRequest,
  today = localDate(),
): string | null {
  if (!parseDate(stay.arrival) || !parseDate(stay.departure))
    return "Scegli la data di arrivo e quella di partenza.";
  if (stay.arrival < today)
    return "La data di arrivo deve essere oggi o un giorno successivo.";
  if (stay.departure <= stay.arrival)
    return "La partenza deve essere successiva all’arrivo.";
  if (
    !Number.isInteger(stay.adults) ||
    stay.adults < 1 ||
    stay.adults > 14 ||
    !Number.isInteger(stay.children) ||
    stay.children < 0 ||
    stay.children > 6
  )
    return "Controlla il numero di ospiti.";
  return null;
}

export function stayNights(stay: StayRequest): number {
  const start = parseDate(stay.arrival);
  const end = parseDate(stay.departure);
  if (!start || !end) return 0;
  return Math.max(
    0,
    Math.round((end.getTime() - start.getTime()) / 86_400_000),
  );
}

export function stayMessage(stay: StayRequest): string {
  const format = (value: string) =>
    parseDate(value)?.toLocaleDateString("it-IT", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }) ?? value;
  return `Buongiorno, vorrei informazioni sulla disponibilità di Agrosilente.\nArrivo: ${format(stay.arrival)}\nPartenza: ${format(stay.departure)}\nAdulti: ${stay.adults}\nBambini: ${stay.children}${stay.children ? " (età da comunicare)" : ""}\nGrazie!`;
}

export function whatsappHref(stay: StayRequest): string {
  return `${brand.contact.whatsapp}?text=${encodeURIComponent(stayMessage(stay))}`;
}

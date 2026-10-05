"use client";

import BlurText from "./react-bits/BlurText";

import { useRef, useState, useSyncExternalStore, type FormEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { brand } from "@/lib/brand";
import {
  localDate,
  nextDate,
  stayNights,
  validateStay,
  whatsappHref,
  type StayRequest,
} from "@/lib/booking";
import { MapPinIcon } from "./icons";
import SpecularButton from "./react-bits/SpecularButton";
import { Reveal } from "./Motion";

// A stable server snapshot avoids rendering a server-timezone date into a local date input.
const subscribe = () => () => {};
const serverDate = () => "";
const browserDate = () => localDate();

function CalendarIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      className="size-5 shrink-0"
    >
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M7 2v6m10-6v6M3 11h18" />
    </svg>
  );
}

export function Booking() {
  const today = useSyncExternalStore(subscribe, browserDate, serverDate);
  const [stay, setStay] = useState<StayRequest>({
    arrival: "",
    departure: "",
    adults: 2,
    children: 0,
  });
  const [error, setError] = useState<string | null>(null);
  const [openedRequest, setOpenedRequest] = useState(false);
  const arrivalInput = useRef<HTMLInputElement>(null);
  const departureInput = useRef<HTMLInputElement>(null);
  const reduceMotion = useReducedMotion();
  const nights = stayNights(stay);

  function updateStay<K extends keyof StayRequest>(
    key: K,
    value: StayRequest[K],
  ) {
    setError(null);
    setOpenedRequest(false);
    setStay((current) => ({ ...current, [key]: value }));
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const problem = validateStay(stay);
    if (problem) {
      setError(problem);
      if (!stay.arrival || stay.arrival < localDate())
        arrivalInput.current?.focus();
      else departureInput.current?.focus();
      return;
    }
    setError(null);
    setOpenedRequest(true);
    window.open(whatsappHref(stay), "_blank", "noopener,noreferrer");
  }

  return (
    <section
      id="prenota"
      aria-labelledby="booking-title"
      className="booking-section relative overflow-hidden section-space"
    >
      <div className="page-shell relative">
        <Reveal className="mx-auto max-w-3xl text-center">
          <BlurText as="p" className="eyebrow mb-7 text-action">
            04 / Il tuo soggiorno
          </BlurText>
          <BlurText as="h2" id="booking-title" className="section-title">
            Riservati ora
            <br />
            <em>un momento di relax.</em>
          </BlurText>
          <BlurText
            as="p"
            className="mx-auto mt-7 max-w-md text-sm leading-[1.9] text-muted"
          >
            Scegli quando partire e con chi condividere la quiete.
            Scrivici per prenotare la casa e organizzare il tuo soggiorno.
          </BlurText>
        </Reveal>
        <div className="booking-layout">
          <div className="booking-location">
            <BlurText as="h3">
              La tua pausa,
              <br />
              <em>a Locorotondo.</em>
            </BlurText>
            <BlurText as="p" className="section-description">
              Tra i trulli e la campagna della Valle d’Itria, un luogo da
              raggiungere per sentirsi lontani da tutto.
            </BlurText>
            <ul className="booking-contact-list">
              <li>
                <span aria-hidden="true">
                  <MapPinIcon className="size-5" />
                </span>
                <div>
                  <strong>Trullo Natalino · Una casa in Puglia</strong>
                  <br />
                  {brand.contact.address}
                  <br />
                  {brand.contact.city}
                </div>
              </li>
              <li>
                <span aria-hidden="true">◷</span>
                <div>
                  <strong>Parliamo del tuo soggiorno</strong>
                  <br />
                  <a href={brand.contact.phoneHref}>{brand.contact.phone}</a>
                </div>
              </li>
            </ul>
            <div className="booking-map">
              <div className="booking-map-preview">
                <iframe src={brand.mapEmbed} title="Mappa di Contrada Pentimone, 70010 Locorotondo BA"
                  loading="lazy" referrerPolicy="no-referrer-when-downgrade" allowFullScreen />
              </div>
              <div className="booking-map-meta">
                <strong>Trullo Natalino · Una casa in Puglia</strong>
                <span>{brand.contact.address} · Locorotondo</span>
              </div>
              <a
                href={brand.locationHref}
                target="_blank"
                rel="noreferrer"
                className="text-link"
              >
                Apri in Google Maps{" "}
              </a>
            </div>
            <a className="booking-email" href={brand.contact.whatsapp} target="_blank" rel="noreferrer">
              Preferisci scriverci? <span>Ci trovi su WhatsApp</span>
            </a>
          </div>
          <div className="booking-panel">
            <BlurText as="p" className="eyebrow text-action">
              Il primo passo verso la tua pausa
            </BlurText>
            <BlurText as="h3">Il tuo soggiorno</BlurText>
            <BlurText as="p" className="booking-panel-intro">
              Scegli le date e chi porterai con te.
              <br />
              La casa ti aspetta, tutta per te.
            </BlurText>
            <form
              onSubmit={submit}
              noValidate
              aria-describedby="booking-help"
              className="booking-form"
            >
              <div className="booking-fields">
                <motion.label
                  whileTap={reduceMotion ? undefined : { scale: 0.99 }}
                  transition={{ type: "spring", stiffness: 150, damping: 25 }}
                  className="booking-field"
                >
                  <span className="flex items-center justify-between gap-4">
                    <span className="eyebrow text-muted">Arrivo</span>
                    <CalendarIcon />
                  </span>
                  <input
                    ref={arrivalInput}
                    type="date"
                    name="arrival"
                    aria-label="Data di arrivo"
                    aria-required="true"
                    aria-invalid={
                      error && (!stay.arrival || stay.arrival < today)
                        ? true
                        : undefined
                    }
                    aria-describedby={error ? "booking-error" : undefined}
                    min={today || undefined}
                    value={stay.arrival}
                    onInput={(e) =>
                      updateStay("arrival", e.currentTarget.value)
                    }
                    onChange={(e) => updateStay("arrival", e.target.value)}
                    className="booking-input"
                  />
                </motion.label>
                <motion.label
                  whileTap={reduceMotion ? undefined : { scale: 0.99 }}
                  transition={{ type: "spring", stiffness: 150, damping: 25 }}
                  className="booking-field"
                >
                  <span className="flex items-center justify-between gap-4">
                    <span className="eyebrow text-muted">Partenza</span>
                    <CalendarIcon />
                  </span>
                  <input
                    ref={departureInput}
                    type="date"
                    name="departure"
                    aria-label="Data di partenza"
                    aria-required="true"
                    aria-invalid={
                      error &&
                      (!stay.departure || stay.departure <= stay.arrival)
                        ? true
                        : undefined
                    }
                    aria-describedby={error ? "booking-error" : undefined}
                    min={
                      stay.arrival ? nextDate(stay.arrival) : today || undefined
                    }
                    value={stay.departure}
                    onInput={(e) =>
                      updateStay("departure", e.currentTarget.value)
                    }
                    onChange={(e) => updateStay("departure", e.target.value)}
                    className="booking-input"
                  />
                </motion.label>
                <fieldset className="booking-field">
                  <legend className="sr-only">Ospiti del soggiorno</legend>
                  <span className="eyebrow block text-muted">
                    Con chi viaggi
                  </span>
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <label className="text-[10px] text-muted">
                      Adulti
                      <select
                        aria-label="Numero di adulti"
                        value={stay.adults}
                        onChange={(e) =>
                          updateStay("adults", Number(e.target.value))
                        }
                        className="mt-1 block min-h-8 w-full bg-transparent text-base text-ink"
                      >
                        {Array.from({ length: 14 }, (_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="text-[10px] text-muted">
                      Bambini
                      <select
                        aria-label="Numero di bambini"
                        value={stay.children}
                        onChange={(e) =>
                          updateStay("children", Number(e.target.value))
                        }
                        className="mt-1 block min-h-8 w-full bg-transparent text-base text-ink"
                      >
                        {Array.from({ length: 7 }, (_, i) => (
                          <option key={i} value={i}>
                            {i}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                </fieldset>
                <SpecularButton
                  type="submit"
                  radius={18}
                  className="booking-submit group"
                >
                  <span className="text-[13px] leading-relaxed">
                    Richiedi disponibilità
                  </span>
                </SpecularButton>
              </div>
              {error && (
                <BlurText
                  as="p"
                  role="alert"
                  id="booking-error"
                  className="px-5 pt-4 pb-2 text-sm text-[#8a3f30]"
                >
                  {error}
                </BlurText>
              )}
            </form>
            <div className="booking-help">
              <BlurText as="p" id="booking-help">
                La richiesta si apre su WhatsApp. Disponibilità e tariffe da
                confermare.
              </BlurText>
              <BlurText as="p" aria-live="polite">
                {nights > 0
                  ? `${nights} ${nights === 1 ? "notte" : "notti"} · ${stay.adults + stay.children} ${stay.adults + stay.children === 1 ? "ospite" : "ospiti"}`
                  : "Il primo passo verso la tua pausa."}
              </BlurText>
            </div>
            {openedRequest && (
              <BlurText
                as="p"
                role="status"
                className="mt-5 text-center text-sm text-action"
              >
                Il messaggio è pronto su WhatsApp.{" "}
                <a
                  href={whatsappHref(stay)}
                  target="_blank"
                  rel="noreferrer"
                  className="underline underline-offset-4"
                >
                  Aprilo qui
                </a>{" "}
                se la nuova scheda non si è aperta.
              </BlurText>
            )}
            <div className="booking-alternative">
              <a
                href={brand.contact.phoneHref}
                className="inline-flex min-h-11 items-center gap-3 border-b border-action/40 text-action"
              >
                Preferisci chiamarci? {brand.contact.phone}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

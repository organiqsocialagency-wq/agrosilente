# Agrosilente — Dimore in Puglia

Sito Next.js, React e TypeScript con Tailwind CSS, Framer Motion e componenti React Bits adattati al brand.

## Sviluppo

Richiede Node.js 22 e npm.

```sh
npm ci
npm run dev
```

## Pubblicazione

Sito: https://organiqsocialagency-wq.github.io/agrosilente/

Ogni push su `main` esegue i controlli, genera il sito statico e pubblica su GitHub Pages tramite Actions. La build statica usa il prefisso `/agrosilente`; lo sviluppo locale rimane alla radice.

```sh
npm run build:pages
```

L'export viene scritto in `.next-export/`. Le immagini sono servite come file statici. Il modulo prepara una richiesta WhatsApp; la prenotazione online rimanda al portale del gestore.

## Verifiche

```sh
npm run typecheck
npm run lint
npm run test:booking
```

Font e fotografie sono inclusi localmente. Crediti dei componenti in `THIRD_PARTY_NOTICES.md`.

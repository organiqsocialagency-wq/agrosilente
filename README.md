# Trullo Natalino — Una casa in Puglia

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

L'export viene scritto in `.next-export/`. Le immagini sono servite come file statici. Trullo Natalino è un’unica casa: il modulo prepara una richiesta di disponibilità su WhatsApp al numero +39 331 302 1588. Disponibilità e tariffe vengono confermate dal proprietario.

## Verifiche

```sh
npm run typecheck
npm run lint
npm run test:booking
```

Font e fotografie sono inclusi localmente. Crediti dei componenti in `THIRD_PARTY_NOTICES.md`; attribuzioni delle immagini di Locorotondo in `public/crediti-fotografici.html`.

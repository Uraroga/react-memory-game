# React Memory Game

React Memory Game e un gioco memory per due giocatori. I giocatori scoprono le carte a turno e cercano di trovare coppie uguali. Vince chi trova piu coppie alla fine della partita.

Il gioco funziona interamente in locale e non richiede chiavi API, servizi esterni o file `.env`.

## Tecnologie utilizzate

- React
- TypeScript
- Vite
- Tailwind CSS tramite CDN

## Requisiti

- Node.js
- npm
- Git, se vuoi scaricare il progetto con `git clone`

Versione consigliata di Node.js: 22.12.0 o superiore.

## Scaricare il progetto

```bash
git clone https://github.com/Uraroga/react-memory-game.git
```

## Entrare nella cartella

```bash
cd react-memory-game
```

## Installare le dipendenze

```bash
npm install
```

## Avviare il server locale

```bash
npm run dev
```

Dopo l'avvio, apri questo indirizzo nel browser:

```text
http://localhost:3000
```

Se la porta 3000 e gia occupata, Vite potrebbe indicare un indirizzo diverso nel terminale. In quel caso apri l'indirizzo mostrato da Vite.

## Arrestare il server

Per fermare il server locale, torna nel terminale in cui e in esecuzione `npm run dev` e premi:

```text
Ctrl + C
```

## Creare la versione di produzione

```bash
npm run build
```

I file generati vengono salvati nella cartella `dist`.

## Struttura essenziale del progetto

```text
.
├── App.tsx
├── components/
│   ├── Card.tsx
│   ├── GameBoard.tsx
│   ├── GameControls.tsx
│   ├── GameOverModal.tsx
│   └── PlayerDisplay.tsx
├── hooks/
│   └── useGameLogic.ts
├── constants.ts
├── types.ts
├── index.html
├── index.tsx
├── package.json
├── tsconfig.json
└── vite.config.ts
```

## Note sulla licenza

Nel progetto non e presente un file di licenza.

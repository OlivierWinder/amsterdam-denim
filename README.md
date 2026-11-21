# Atelier

A website for a bespoke denim workshop in Amsterdam. Jeans are measured, cut and sewn in-house, one pair at a time.

## Pages

- **Home** — tiled-floor still with a slight black overlay
- **[Style](/styles)** — Bespoke opener, Cuts, Fit and Shape, Features, Fabric, Standard Jeans
- **[The process](/the-process)** — six pinned steps; each clip scrubs with scroll
- **[About](/about)**
- **[Order](/order)** — inquiry form (no account, nothing stored)
- **[Catalog](/catalog)** — 3-across stills, 2 columns on small screens; click for a lightbox

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:4317](http://localhost:4317). The app binds `0.0.0.0:4317`.

## Process clips

Two workshop clips in `public/process/` alternate across the six steps (odd / even):

- `measuring.mp4` — Consultation & Measurement, Fittings, Final Fitting
- `process.mp4` — Pattern Cutting, Cutting & Making, Finishing

## Inquiry form

The form validates on the server and confirms. It does not save to a database; submissions are logged in the terminal.

## Build

```bash
npm run build
npm start
```

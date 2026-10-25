# Saiteja Challa · portfolio

Live: https://saiteja2003.github.io/react-portfolio/

**Concept: The Thread.** The page is one continuous thread. A spine on the left fills as you scroll and marks each chapter. On desktop the visitor holds a loose strand tied to the spine's tip, and clicking empty space slings a strand to the nearest heading. Each project chapter runs a browser port of that project's real logic: Vela's quality gate and spaced-recall schedule, Solum Trade OS's SHA-256 audit chain, and Honing's tailoring guard.

## Develop

```bash
npm install
npm run dev      # local server
npm run build    # production build into dist/
npm run lint
npm run deploy   # builds and publishes dist/ to the gh-pages branch
```

## Where things live

- `src/data/content.js` holds every claim on the site, with the file that backs it.
- `src/lib/mechanisms.js` holds the ported project logic the demos run.
- `src/components/Thread.jsx` draws the spine and the rope (one canvas, sleeps when idle).
- `src/styles/global.css` holds the design tokens and all styles.

Reduced-motion visitors, touch devices and anyone who switches the thread off get the same content with no rope, no smooth scrolling and no reveal animations.

# ShopMind AI – interface

React + Vite + Tailwind + Framer Motion front end for the ShopMind n8n workflow.

## Run
```
npm install
npm run dev
```
Open http://localhost:5173. The workflow must be **Active** (production URL `/webhook/shopmind`).

- Copy `.env.example` to `.env` to change the n8n address.
- `http://localhost:5173/?mock=1` runs with built-in sample answers (no n8n needed): use it as a demo safety net.
- Image upload: the dev server stores the file and gives n8n a URL (`http://localhost:5173/uploads/...`). If n8n runs in Docker, set `VITE_PUBLIC_HOST=host.docker.internal:5173`.

## What it handles
Recommendations, comparisons, direct technical answers, refusals, multi-product and error replies,
the Fallback output (partial results), FR/EN/AR with RTL, dark/light, drag-and-drop image.

## Notes
The progress stepper is time-based: n8n returns one response at the end, it does not stream stages.

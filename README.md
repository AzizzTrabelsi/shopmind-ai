# ShopMind AI

Multi-agent shopping advisor for consumer electronics, orchestrated with **n8n**.
Describe a need in text (optionally with a photo) and ShopMind AI recommends up to 3 products that fit your usage and budget, using live offers from Tunisian retailers. Every recommendation is verified before it is sent.

> ESPRIT School of Engineering, Advanced Deep Learning final project (2026-2027, 5DS)
> Supervised by Pr. Ines Slimen

## Architecture

```
Client (text + image) → n8n Webhook → Router agent → Intent Switch
                                                      ├─ out of scope / multi-product / error → canned reply
                                                      ├─ tech question / compatibility → Direct answer agent
                                                      └─ recommend / compare
                                                           ├─ Vision agent (only if an image is attached)
                                                           ├─ Product Search agent (Serper + price extraction)  ┐ parallel
                                                           ├─ RAG agent (Qdrant knowledge base)                 ┘
                                                           ├─ Recommendation agent
                                                           └─ Verification (rules + LLM) → retry (max 2) → Fallback → response
```

| Agent | Role |
|---|---|
| Router | Turns the message into structured JSON (intent, category, budget, usages, brands, language) |
| Vision | Extracts facts from the image (product, port, spec screenshot) |
| Product Search | Finds live product pages and prices at Tunisian retailers |
| RAG | Retrieves technical specs from the Qdrant knowledge base |
| Recommendation | Combines, filters and ranks up to 3 products |
| Verification | Code checks (budget, price, source, brands) plus LLM check of written claims |

Design principle: the LLM handles language and judgment, code handles everything measurable (budgets, prices, sources).

## Repository structure

```
shopmind-ai/
├── workflows/
│   ├── ShopMind-AI.json              # main n8n workflow (webhook /shopmind)
│   └── ShopMind-RAG-Ingestion.json   # one-time knowledge base ingestion
├── shopmind-ui/                      # React + Vite + Tailwind frontend
└── README.md
```

## Tech stack

n8n · Google Gemini (flash-lite) · Qdrant · Ollama (`nomic-embed-text`) · Serper API · React · Vite · Tailwind CSS

## Prerequisites

- n8n (self-hosted or cloud)
- Qdrant (e.g. `docker run -p 6333:6333 qdrant/qdrant`)
- Ollama with the embedding model: `ollama pull nomic-embed-text`
- Google Gemini API key
- Serper API key (https://serper.dev)
- Node.js 18+
- Knowledge base CSV files: smartphones, laptops, TELEVISION, headphones, smartwatches

## Setup

### 1. Backend (n8n)

1. Start Qdrant and Ollama.
2. Place the CSV files in `/data/shopmind/knowledge_base/raw-corpus/` (as seen by n8n; mount this folder if n8n runs in Docker).
3. In n8n, import both files from `workflows/`.
4. Create the credentials:
   - **Google Gemini (PaLM) API**: your Gemini key
   - **Ollama**: your Ollama base URL
   - **Qdrant**: your Qdrant URL (and API key if enabled)
5. Open the `Serper-API` node and set the `X-API-KEY` header to your Serper key (the exported file contains the placeholder `YOUR_SERPER_API_KEY`).
6. Run **ShopMind - RAG Ingestion** once with the manual trigger. If you re-run it, empty the `shopmind_products` collection first to avoid duplicates.
7. Activate the main workflow (**ShopMind - Router**).

### 2. Frontend

```bash
cd shopmind-ui
cp .env.example .env      # Windows PowerShell: copy .env.example .env
```

Edit `.env` and set the n8n webhook URL. ⚠️ Use the variable name that `.env.example` and `src/api.js` actually use (e.g. `VITE_WEBHOOK_URL`).

```bash
npm install
npm run dev
```

Open the URL printed by Vite (usually http://localhost:5173).
`src/mock.js` provides mock responses for working on the UI without the backend.

## API

`POST <n8n-url>/webhook/shopmind` (use `/webhook-test/shopmind` while testing in the n8n editor)

Request:
```json
{
  "message": "Je cherche un laptop pour programmer, 2500 dt max, pas de HP",
  "session_id": "user-123",
  "image_url": null
}
```

- `session_id`: keeps the Router's conversation memory per user.
- `image_url`: optional public image URL, which triggers the Vision agent.

Response (recommendation path, simplified):
```json
{
  "failed": false,
  "recommendation": {
    "recommendations": [
      {
        "name": "...",
        "price_tnd": 2349,
        "source": "live_search",
        "key_specs": ["..."],
        "why": "...",
        "source_ref": "https://..."
      }
    ],
    "note": "...",
    "comparison": null
  }
}
```

⚠️ Check this against what `src/api.js` expects. If the frontend reads other field names, adjust this section.

## Example queries

- `Je cherche un laptop pour programmer, 2500 dt max, pas de HP`
- `iPhone 15 ou Samsung S24, lequel est mieux ?`
- `Est-ce que le chargeur USB-C d'un MacBook marche avec un Dell Latitude ?`
- Any message with `image_url` set to a photo of a laptop, phone or port

## Security notes

- Customer messages and image text are wrapped in tags and treated as data (prompt-injection defense in every agent).
- No API keys are stored in this repository. Configure them through n8n credentials or node parameters.
- Loops are bounded (agent max iterations, max 2 correction retries).

## Known limitations

- Knowledge base prices are converted reference values (INR and USD to TND). Live search is the source of truth for current prices.
- Price extraction depends on the structure of retailer pages.
- Multi-product requests (e.g. mouse + phone + laptop) are asked to be sent one at a time.
- Verification includes an LLM check, so it reduces but cannot eliminate errors.

## Team

Eya Zoghlami · May Salem · Ines Denguezli · Mouadh Hajri · Aziz Trabelsi · Malek Jemai
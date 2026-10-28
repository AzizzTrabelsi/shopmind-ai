import { MOCKS } from './mock'

const params = new URLSearchParams(location.search)
export const MOCK = params.get('mock') === '1'

export function newSession() {
  return 'sess-' + Math.random().toString(36).slice(2, 10)
}

// Uploads a local image to the dev server and returns a URL that n8n can fetch.
// If n8n runs in Docker, set VITE_PUBLIC_HOST=host.docker.internal:5173 in .env
export async function uploadImage(file) {
  const ext = (file.name.split('.').pop() || 'png').toLowerCase()
  const r = await fetch('/upload', { method: 'POST', headers: { 'x-file-ext': ext }, body: file })
  if (!r.ok) throw new Error('upload failed')
  const { file: name } = await r.json()
  const host = 'host.docker.internal:5173'
  return `${location.protocol}//${host}/uploads/${name}`
}

// Normalises every response shape the workflow can return into one object.
export function normalize(raw) {
  if (!raw || typeof raw !== 'object') return { kind: 'error' }
  if (raw.error) return { kind: 'error', detail: raw.error }

  // Flat shape (Fallback node) or wrapped shape (Gate / Direct reply / Format direct answer)
  const wrapped = raw.recommendation && typeof raw.recommendation === 'object'
  const rec = wrapped ? raw.recommendation : raw
  const items = Array.isArray(rec.recommendations) ? rec.recommendations : []
  const replyType = raw.reply_type || (items.length ? 'recommendation' : 'empty')

  return {
    kind: replyType,
    items,
    note: rec.note || '',
    comparison: rec.comparison || null,
    attempt: Number.isFinite(raw.attempt) ? raw.attempt : 0,
    partial: !wrapped,            // Fallback node output: some options were dropped
    confidence: raw.confidence || null
  }
}

export async function ask({ message, sessionId, imageUrl }) {
  if (MOCK) {
    await new Promise(r => setTimeout(r, 4200))
    const m = message.toLowerCase()
    const key = /iphone|samsung|compar/.test(m) ? 'compare'
      : /chargeur|charger|marche avec|compatib/.test(m) ? 'tech'
      : /capitale|capital/.test(m) ? 'refusal' : 'reco'
    return normalize(MOCKS[key])
  }
  const body = { message, session_id: sessionId }
  if (imageUrl) body.image_url = imageUrl
  const r = await fetch('/api/shopmind', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  })
  if (!r.ok) throw new Error('HTTP ' + r.status)
  const text = await r.text()
  let json
  try { json = JSON.parse(text) } catch { throw new Error('Invalid JSON from workflow') }
  return normalize(Array.isArray(json) ? json[0] : json)
}

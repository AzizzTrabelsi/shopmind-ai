import { motion } from 'framer-motion'
import { ExternalLink, Radio, Database, AlertTriangle } from 'lucide-react'

const fmt = n => new Intl.NumberFormat('fr-TN', { maximumFractionDigits: 0 }).format(Math.round(n))
const host = u => { try { return new URL(u).hostname.replace('www.', '') } catch { return '' } }
const clean = n => n.replace(/\s*\/\s*/g, ' · ').replace(/^pc portable\s+/i, '').replace(/\s+/g, ' ').trim()

export default function ProductCard({ item, rank, t, delay = 0 }) {
  const live = item.source === 'live_search'
  const url = /^https?:\/\//.test(item.source_ref || '') ? item.source_ref : null
  const hasPrice = typeof item.price_tnd === 'number'

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.45, ease: 'easeOut' }}
      className="card-hover relative flex flex-col rounded-2xl border border-line bg-surface p-5">
      <div className="flex items-start justify-between gap-3">
        <span className="font-display text-4xl font-extrabold leading-none text-brand/90">{String(rank).padStart(2, '0')}</span>
        <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold
          ${live ? 'border-brand/40 text-brand' : 'border-line text-mute'}`}>
          {live ? <Radio size={12} /> : <Database size={12} />}
          {live ? t.live : t.kb}
        </span>
      </div>

      <h3 className="mt-3 font-display text-lg font-bold leading-snug">{clean(item.name)}</h3>

      <div className="mt-3 flex items-baseline gap-1.5">
        {hasPrice ? (
          <>
            <span className="font-display text-3xl font-extrabold tabular-nums">{fmt(item.price_tnd)}</span>
            <span className="text-sm font-semibold text-mute">TND</span>
          </>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-warn">
            <AlertTriangle size={15} /> {t.priceUnknown}
          </span>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {(item.key_specs || []).map((s, i) => (
          <span key={i} className="rounded-lg bg-surface2 px-2.5 py-1 text-xs text-ink/90" dir="ltr">{s}</span>
        ))}
      </div>

      <p className="mt-4 text-sm leading-relaxed text-mute"><span className="font-semibold text-ink">{t.why} · </span>{item.why}</p>

      {url && (
        <a href={url} target="_blank" rel="noreferrer"
          className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-brand px-4 py-2.5 text-sm font-bold text-brandInk transition hover:brightness-110">
          {t.viewStore} {host(url)} <ExternalLink size={15} />
        </a>
      )}
    </motion.article>
  )
}

import { motion } from 'framer-motion'
import { ShieldCheck, ShieldAlert, Scale, Sparkles, Info } from 'lucide-react'
import ProductCard from './ProductCard'

function Badge({ r, t }) {
  const retried = r.attempt > 0
  const partial = r.partial
  const cls = partial ? 'border-warn/40 text-warn' : 'border-brand/40 text-brand'
  const Icon = partial ? ShieldAlert : ShieldCheck
  return (
    <div className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${cls}`}>
      <Icon size={15} />
      <span>{partial ? t.partial : retried ? t.corrected(r.attempt) : t.verified}</span>
      {!partial && !retried && <span className="hidden sm:inline text-mute font-medium">· {t.verifiedSub}</span>}
    </div>
  )
}

export default function Reply({ r, t }) {
  // Plain text replies: advisor answers, refusals, clarifications
  if (r.kind === 'direct_answer') {
    return (
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl rounded-2xl border border-brand/30 bg-surface p-5">
        <div className="mb-2 flex items-center justify-between">
          <span className="inline-flex items-center gap-2 font-display font-bold text-brand"><Sparkles size={16} />{t.advisor}</span>
          {r.confidence && <span className="text-xs text-mute">{t.confidence[r.confidence]}</span>}
        </div>
        <p className="leading-relaxed">{r.note}</p>
      </motion.div>
    )
  }
  if (['out_of_scope', 'multi_product', 'router_error'].includes(r.kind)) {
    return (
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl rounded-2xl border border-line bg-surface p-5 flex gap-3">
        <Info size={20} className="mt-0.5 shrink-0 text-mute" />
        <p className="leading-relaxed text-ink/90">{r.note}</p>
      </motion.div>
    )
  }

  if (!r.items.length) {
    return (
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl rounded-2xl border border-line bg-surface p-5">
        <p className="font-display font-bold">{t.noResult}</p>
        {r.note && <p className="mt-2 text-sm leading-relaxed text-mute">{r.note}</p>}
      </motion.div>
    )
  }

  return (
    <div className="space-y-5">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}><Badge r={r} t={t} /></motion.div>

      {r.comparison && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl rounded-2xl border border-brand/30 bg-surface p-5">
          <div className="mb-2 inline-flex items-center gap-2 font-display font-bold text-brand"><Scale size={16} />{t.comparison}</div>
          <p className="leading-relaxed">{r.comparison}</p>
        </motion.div>
      )}

      <div className={`grid gap-4 ${r.items.length === 1 ? 'max-w-md' : r.items.length === 2 ? 'md:grid-cols-2 max-w-3xl' : 'md:grid-cols-2 xl:grid-cols-3'}`}>
        {r.items.map((it, i) => <ProductCard key={i} item={it} rank={i + 1} t={t} delay={i * 0.1} />)}
      </div>

      {r.note && <p className="max-w-3xl text-sm leading-relaxed text-mute">{r.note}</p>}
    </div>
  )
}

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Loader2 } from 'lucide-react'

// n8n does not stream progress, so the stepper is time-based and mirrors the pipeline stages.
const AT = [0, 5, 16, 30]

export default function Stepper({ t }) {
  const [sec, setSec] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setSec(s => s + 1), 1000)
    return () => clearInterval(id)
  }, [])
  const active = AT.reduce((a, s, i) => (sec >= s ? i : a), 0)

  return (
    <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-line bg-surface p-5 max-w-xl">
      <div className="flex items-center justify-between mb-4">
        <span className="font-display font-semibold">{t.thinking}</span>
        <span className="font-mono text-xs text-mute tabular-nums">{sec}s</span>
      </div>
      <ol className="space-y-3">
        {t.steps.map((label, i) => {
          const done = i < active, cur = i === active
          return (
            <li key={i} className="flex items-center gap-3 text-sm">
              <span className={`grid place-items-center size-6 rounded-full border text-xs
                ${done ? 'bg-brand border-brand text-brandInk' : cur ? 'border-brand text-brand' : 'border-line text-mute'}`}>
                {done ? <Check size={14} strokeWidth={3} /> : cur ? <Loader2 size={14} className="animate-spin" /> : i + 1}
              </span>
              <span className={done ? 'text-mute' : cur ? 'text-ink font-medium' : 'text-mute/70'}>{label}</span>
            </li>
          )
        })}
      </ol>
      <div className="mt-4 h-1.5 rounded-full overflow-hidden skeleton" />
    </motion.div>
  )
}

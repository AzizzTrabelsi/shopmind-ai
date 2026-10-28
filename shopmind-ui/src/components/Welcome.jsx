import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import Logo from './Logo'

export default function Welcome({ t, onPick }) {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center px-4 pt-10 text-center md:pt-16">
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="animate-float"><Logo size={64} /></motion.div>
      <motion.h1 initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
        className="mt-6 font-display text-4xl font-extrabold leading-[1.05] tracking-tight md:text-6xl">
        {t.heroA}<br /><span className="text-brand">{t.heroB}</span>
      </motion.h1>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
        className="mt-5 max-w-xl text-base leading-relaxed text-mute md:text-lg">{t.sub}</motion.p>

      <div className="mt-10 grid w-full gap-3 sm:grid-cols-2">
        {t.suggestions.map((s, i) => (
          <motion.button key={i} onClick={() => onPick(s.q)}
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 + i * 0.07 }}
            className="card-hover group flex items-start justify-between rounded-2xl border border-line bg-surface p-4 text-start">
            <span>
              <span className="block font-display font-bold">{s.t}</span>
              <span className="mt-1 block text-sm text-mute">{s.s}</span>
            </span>
            <ArrowUpRight size={18} className="mt-1 shrink-0 text-mute transition group-hover:text-brand rtl:-scale-x-100" />
          </motion.button>
        ))}
      </div>
    </div>
  )
}

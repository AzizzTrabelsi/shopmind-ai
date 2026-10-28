import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Moon, Sun, RotateCcw, AlertCircle, UploadCloud } from 'lucide-react'
import { T, LANGS, detectLang } from './i18n'
import { ask, newSession, uploadImage, MOCK } from './api'
import Logo from './components/Logo'
import Welcome from './components/Welcome'
import Composer from './components/Composer'
import Stepper from './components/Stepper'
import Reply from './components/Reply'

const load = (k, d) => { try { return localStorage.getItem(k) || d } catch { return d } }
const save = (k, v) => { try { localStorage.setItem(k, v) } catch {} }

export default function App() {
  const [lang, setLang] = useState(load('sm_lang', 'fr'))
  const [theme, setTheme] = useState(load('sm_theme', 'dark'))
  const [messages, setMessages] = useState([])
  const [busy, setBusy] = useState(false)
  const [image, setImage] = useState(null)
  const [drag, setDrag] = useState(false)
  const [session, setSession] = useState(newSession)
  const endRef = useRef(null)
  const t = T[lang]

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    save('sm_theme', theme); save('sm_lang', lang)
  }, [theme, lang])

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' }) }, [messages, busy])

  const send = async text => {
    const detected = detectLang(text)
    if (detected && detected !== lang) setLang(detected)
    const img = image
    setImage(null)
    setMessages(m => [...m, { role: 'user', text, preview: img?.preview }])
    setBusy(true)
    try {
      const imageUrl = img && !MOCK ? await uploadImage(img.file) : undefined
      const reply = await ask({ message: text, sessionId: session, imageUrl })
      setMessages(m => [...m, reply.kind === 'error' ? { role: 'error', text } : { role: 'bot', reply }])
    } catch (e) {
      setMessages(m => [...m, { role: 'error', text }])
    } finally {
      setBusy(false)
    }
  }

  const retry = text => {
    setMessages(m => m.slice(0, -2))   // drop the failed user message + error
    send(text)
  }
  const reset = () => { setMessages([]); setSession(newSession()); setImage(null) }

  const onDrop = e => {
    e.preventDefault(); setDrag(false)
    const f = e.dataTransfer.files?.[0]
    if (f?.type.startsWith('image/')) setImage({ file: f, preview: URL.createObjectURL(f) })
  }

  return (
    <div className="relative z-10 flex h-full flex-col"
      onDragOver={e => { e.preventDefault(); setDrag(true) }} onDragLeave={() => setDrag(false)} onDrop={onDrop}>

      <header className="flex items-center justify-between border-b border-line/60 bg-bg/70 px-4 py-3 backdrop-blur md:px-8">
        <div className="flex items-center gap-3">
          <Logo size={34} />
          <div className="leading-tight">
            <div className="font-display text-lg font-extrabold tracking-tight">ShopMind <span className="text-brand">AI</span></div>
            <div className="hidden text-xs text-mute sm:block">{t.tagline}</div>
          </div>
          {MOCK && <span className="ms-2 rounded-md bg-warn/15 px-2 py-0.5 font-mono text-[10px] font-bold text-warn">MOCK</span>}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-xl border border-line bg-surface p-0.5">
            {Object.entries(LANGS).map(([k, v]) => (
              <button key={k} onClick={() => setLang(k)}
                className={`rounded-lg px-2.5 py-1 text-xs font-bold transition ${lang === k ? 'bg-brand text-brandInk' : 'text-mute hover:text-ink'}`}>{v}</button>
            ))}
          </div>
          <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} title={t.theme}
            className="grid size-9 place-items-center rounded-xl border border-line bg-surface text-mute transition hover:text-brand">
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          {messages.length > 0 && (
            <button onClick={reset} title={t.newChat}
              className="grid size-9 place-items-center rounded-xl border border-line bg-surface text-mute transition hover:text-brand"><RotateCcw size={17} /></button>
          )}
        </div>
      </header>

      <main className="flex-1 overflow-y-auto px-4 py-6 md:px-8">
        {messages.length === 0 ? <Welcome t={t} onPick={send} /> : (
          <div className="mx-auto max-w-6xl space-y-8">
            {messages.map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                {m.role === 'user' && (
                  <div className="flex justify-end">
                    <div className="max-w-xl rounded-2xl rounded-ee-md bg-brand px-4 py-3 text-brandInk">
                      {m.preview && <img src={m.preview} alt="" className="mb-2 max-h-40 rounded-lg" />}
                      <p dir="auto" className="whitespace-pre-wrap font-medium leading-relaxed">{m.text}</p>
                    </div>
                  </div>
                )}
                {m.role === 'bot' && <Reply r={m.reply} t={t} />}
                {m.role === 'error' && (
                  <div className="flex max-w-xl items-start gap-3 rounded-2xl border border-bad/40 bg-surface p-4">
                    <AlertCircle className="mt-0.5 shrink-0 text-bad" size={20} />
                    <div>
                      <p className="text-sm leading-relaxed">{t.error}</p>
                      <button onClick={() => retry(m.text)} className="mt-3 rounded-lg border border-line px-3 py-1.5 text-xs font-bold hover:border-brand hover:text-brand">{t.retry}</button>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
            {busy && <Stepper t={t} />}
            <div ref={endRef} />
          </div>
        )}
      </main>

      <footer className="px-4 pb-4 pt-2 md:px-8">
        <Composer t={t} busy={busy} onSend={send} image={image} setImage={setImage} />
        <p className="mt-2 text-center text-[11px] text-mute/80">{t.footer}</p>
      </footer>

      <AnimatePresence>
        {drag && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="pointer-events-none fixed inset-0 z-50 grid place-items-center bg-bg/80 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-3 rounded-3xl border-2 border-dashed border-brand px-16 py-12 text-brand">
              <UploadCloud size={44} /><span className="font-display text-xl font-bold">{t.dropHere}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

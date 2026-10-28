import { useRef, useState } from 'react'
import { ArrowUp, ImagePlus, X } from 'lucide-react'

export default function Composer({ t, busy, onSend, image, setImage }) {
  const [text, setText] = useState('')
  const fileRef = useRef(null)
  const taRef = useRef(null)

  const submit = () => {
    const v = text.trim()
    if (!v || busy) return
    onSend(v)
    setText('')
    if (taRef.current) taRef.current.style.height = 'auto'
  }
  const pick = f => { if (f && f.type.startsWith('image/')) setImage({ file: f, preview: URL.createObjectURL(f) }) }

  return (
    <div className="mx-auto w-full max-w-3xl">
      {image && (
        <div className="mb-2 inline-flex items-center gap-3 rounded-xl border border-line bg-surface p-2 pe-3">
          <img src={image.preview} alt="" className="size-12 rounded-lg object-cover" />
          <span className="text-xs text-mute">{t.imgHint}</span>
          <button onClick={() => setImage(null)} aria-label={t.removeImg} className="text-mute hover:text-ink"><X size={16} /></button>
        </div>
      )}
      <div className="flex items-end gap-2 rounded-2xl border border-line bg-surface p-2 shadow-lg shadow-black/10 focus-within:border-brand transition">
        <button onClick={() => fileRef.current?.click()} title={t.attach}
          className="grid size-10 shrink-0 place-items-center rounded-xl text-mute hover:bg-surface2 hover:text-brand transition">
          <ImagePlus size={20} />
        </button>
        <input ref={fileRef} type="file" accept="image/*" hidden onChange={e => pick(e.target.files?.[0])} />
        <textarea ref={taRef} rows={1} value={text} placeholder={t.placeholder} dir="auto"
          onChange={e => { setText(e.target.value); e.target.style.height = 'auto'; e.target.style.height = Math.min(e.target.scrollHeight, 140) + 'px' }}
          onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); submit() } }}
          className="max-h-36 min-h-10 flex-1 resize-none bg-transparent px-2 py-2.5 text-[15px] outline-none placeholder:text-mute/70" />
        <button onClick={submit} disabled={busy || !text.trim()} title={t.send}
          className="grid size-10 shrink-0 place-items-center rounded-xl bg-brand text-brandInk transition enabled:hover:brightness-110 disabled:opacity-40">
          <ArrowUp size={20} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  )
}

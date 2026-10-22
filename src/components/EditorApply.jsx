import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { social } from '../data/socialLinks'

const input = 'w-full rounded-xl border border-white/15 bg-bg/60 px-4 py-3 text-ink outline-none placeholder:text-mute/60 focus:border-cyan'
const empty = { name: '', telegram: '', software: '', price: '', website: '' } // website = spam trap (hidden)

export default function EditorApply() {
  const [open, setOpen] = useState(false)
  const [f, setF] = useState(empty)
  const [state, setState] = useState('idle') // idle | sending | sent | fallback | error
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    if (!/^@?[A-Za-z][A-Za-z0-9_]{4,31}$/.test(f.telegram.trim())) { setState('error'); return }
    setState('sending')
    try {
      const r = await fetch('/api/apply', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(f) })
      if (!r.ok) throw new Error('api')
      setState('sent'); setF(empty)
    } catch {
      // Server set nahi hai: Telegram chat khol do, text pehle se likha hua (visitor Send dabaye)
      const text = ['Editor application', `Name: ${f.name}`, `Telegram: ${f.telegram}`, `Software: ${f.software}`, `Price: ${f.price}`].join('\n')
      window.open(`${social.telegram}?text=${encodeURIComponent(text)}`, '_blank', 'noopener')
      setState('fallback')
    }
  }

  return (
    <section id="editors" className="border-t border-white/10 px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <p className="label">For editors</p>
        <h2 className="mt-3 text-4xl font-bold sm:text-5xl">Are you a video editor?</h2>
        <p className="mt-3 text-mute">Share a few details and I'll get in touch on Telegram.</p>
        <button onClick={() => setOpen(!open)} aria-expanded={open} className="btn btn-primary mt-6">You are an editor?</button>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <motion.form onSubmit={submit} initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="glass mx-auto mt-8 max-w-xl overflow-hidden rounded-3xl">
            <div className="space-y-4 p-6 md:p-8">
              <label className="block text-sm">Name
                <input required maxLength={80} value={f.name} onChange={set('name')} className={`${input} mt-1`} placeholder="Your name" />
              </label>
              <label className="block text-sm">Telegram ID
                <input required maxLength={33} value={f.telegram} onChange={set('telegram')} className={`${input} mt-1`} placeholder="@username" />
              </label>
              <label className="block text-sm">Which editing software do you use?
                <input required maxLength={120} value={f.software} onChange={set('software')} className={`${input} mt-1`} placeholder="Premiere Pro, Filmora..." />
              </label>
              <label className="block text-sm">What price do you charge?
                <input required maxLength={120} value={f.price} onChange={set('price')} className={`${input} mt-1`} placeholder="e.g. ₹500 per reel" />
              </label>
              <input tabIndex={-1} autoComplete="off" aria-hidden="true" value={f.website} onChange={set('website')} className="hidden" name="website" />
              <button disabled={state === 'sending'} className="btn btn-primary w-full justify-center disabled:opacity-60">{state === 'sending' ? 'Sending...' : 'Submit'}</button>
              <p role="status" className="text-sm text-mute">
                {state === 'sent' && 'Thanks! Your details were sent. I will contact you on Telegram.'}
                {state === 'fallback' && 'Telegram opened with your details filled in. Press Send there to finish.'}
                {state === 'error' && 'Please enter a valid Telegram username, like @riothakur.'}
              </p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </section>
  )
}
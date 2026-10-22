import { useEffect, useState } from 'react'
import { useScroll, useTransform, useMotionValueEvent, motion } from 'motion/react'

const marks = [['home', 'Home'], ['about', 'About'], ['work', 'Work'], ['services', 'Services'], ['pricing', 'Pricing'], ['contact', 'Contact']]
const maxScroll = () => Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
const clamp = (n) => Math.min(100, Math.max(0, n))

export default function ScrollRuler() {
  const { scrollYProgress } = useScroll()
  const top = useTransform(scrollYProgress, (v) => `${v * 100}%`)
  const [pos, setPos] = useState([])
  const [active, setActive] = useState('home')
  const [hover, setHover] = useState(null)

  useEffect(() => {
    const calc = () => {
      const list = marks
        .map(([id, label]) => { const el = document.getElementById(id); return el ? { id, label, pct: clamp(((el.getBoundingClientRect().top + window.scrollY) / maxScroll()) * 100) } : null })
        .filter(Boolean)
      for (let i = 1; i < list.length; i++) list[i].pct = Math.max(list[i].pct, list[i - 1].pct + 4) // overlap na ho
      let cap = 97
      for (let i = list.length - 1; i >= 0; i--) { list[i].pct = Math.min(list[i].pct, cap); cap = list[i].pct - 4 }
      setPos(list)
    }
    calc()
    const t = setTimeout(calc, 1500)
    window.addEventListener('resize', calc)
    window.addEventListener('load', calc)
    return () => { clearTimeout(t); window.removeEventListener('resize', calc); window.removeEventListener('load', calc) }
  }, [])

  const nearest = (p) => pos.reduce((cur, x) => (p >= x.pct - 2 ? x : cur), pos[0])
  useMotionValueEvent(scrollYProgress, 'change', (v) => { const n = nearest(v * 100); if (n) setActive((a) => (a === n.id ? a : n.id)) })

  const move = (e) => { const r = e.currentTarget.getBoundingClientRect(); setHover(clamp(((e.clientY - r.top) / r.height) * 100)) }
  const jump = () => { if (hover != null) window.scrollTo({ top: (hover / 100) * maxScroll(), behavior: 'smooth' }) }
  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <>
      {/* ruler: mouse se hover karo aur click karke us jagah jao */}
      <div aria-hidden="true" onMouseMove={move} onMouseLeave={() => setHover(null)} onClick={jump}
        className="fixed left-0 top-0 z-30 hidden h-screen w-12 cursor-pointer select-none xl:block">
        {Array.from({ length: 101 }, (_, i) => (
          <div key={i} className={`absolute left-0 h-px ${i % 10 === 0 ? 'w-5 bg-white/70' : i % 5 === 0 ? 'w-3.5 bg-white/45' : 'w-2 bg-white/25'}`} style={{ top: `${i}%` }} />
        ))}
        {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((n) => (
          <span key={n} className="absolute left-6 -translate-y-1/2 font-mono text-[9px] text-mute" style={{ top: `${n}%` }}>{n}</span>
        ))}
        <motion.div style={{ top }} className="absolute left-0 h-[2px] w-10 bg-white" />
        {hover != null && (
          <div className="absolute left-0 h-px w-12 bg-blue" style={{ top: `${hover}%` }}>
            <span className="absolute left-14 -top-2.5 whitespace-nowrap rounded border border-blue/40 bg-bg/90 px-2 py-0.5 font-mono text-[10px] text-cyan">
              {String(Math.round(hover)).padStart(3, '0')} %{nearest(hover) ? ` · ${nearest(hover).label.toUpperCase()}` : ''}
            </span>
          </div>
        )}
      </div>
      {/* section ke naam (bade screen par) */}
      <nav aria-label="Page sections" className="pointer-events-none fixed left-16 top-0 z-30 hidden h-screen 2xl:block">
        {pos.map((p) => (
          <button key={p.id} onClick={() => go(p.id)} style={{ top: `${p.pct}%` }}
            className={`pointer-events-auto absolute -translate-y-1/2 whitespace-nowrap font-mono text-[11px] uppercase tracking-[.18em] transition-colors ${active === p.id ? 'text-ink' : 'text-mute hover:text-ink'}`}>
            {p.label}
          </button>
        ))}
      </nav>
    </>
  )
}
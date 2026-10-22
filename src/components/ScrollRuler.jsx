import { useEffect, useState } from 'react'
import { useScroll, useTransform, useMotionValueEvent, motion } from 'motion/react'

// Ruler right side me. Mouse ruler par le jao to saare sections ke naam left me aa jate hain.
const marks = [
  ['home', 'Home'], ['about', 'About'], ['work', 'Work'], ['services', 'Services'],
  ['sample', 'Paid Sample'], ['pricing', 'Pricing'], ['contact', 'Contact'], ['editors', 'Editors'],
]
const maxScroll = () => Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
const clamp = (n) => Math.min(100, Math.max(0, n))

export default function ScrollRuler() {
  const { scrollYProgress } = useScroll()
  const top = useTransform(scrollYProgress, (v) => `${v * 100}%`)
  const [pos, setPos] = useState([])
  const [active, setActive] = useState('home')
  const [hover, setHover] = useState(null)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const calc = () => {
      const list = marks
        .map(([id, label]) => { const el = document.getElementById(id); return el ? { id, label, pct: clamp(((el.getBoundingClientRect().top + window.scrollY) / maxScroll()) * 100) } : null })
        .filter(Boolean)
      for (let i = 1; i < list.length; i++) list[i].pct = Math.max(list[i].pct, list[i - 1].pct + 4) // naam ek doosre par na chadhein
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
  const hoverId = hover != null ? nearest(hover)?.id : null

  return (
    <div onMouseEnter={() => setOpen(true)} onMouseLeave={() => { setOpen(false); setHover(null) }}
      className={`fixed right-0 top-0 z-30 hidden h-screen lg:block ${open ? 'w-64 bg-gradient-to-l from-bg/90 via-bg/60 to-transparent' : 'w-12'}`}>
      {/* section ke naam: sirf hover par */}
      <nav aria-label="Page sections" className={open ? '' : 'pointer-events-none'}>
        {pos.map((p) => (
          <button key={p.id} tabIndex={open ? 0 : -1} onClick={() => go(p.id)} style={{ top: `${p.pct}%` }}
            className={`absolute right-14 -translate-y-1/2 whitespace-nowrap text-right font-mono text-xs uppercase tracking-[.18em] transition-all duration-300 ${open ? 'translate-x-0 opacity-100' : 'translate-x-3 opacity-0'} ${hoverId === p.id ? 'text-cyan' : active === p.id ? 'text-ink' : 'text-mute hover:text-ink'}`}>
            {p.label}
          </button>
        ))}
      </nav>
      {/* ruler strip */}
      <div aria-hidden="true" onMouseMove={move} onClick={jump} className="absolute right-0 top-0 h-full w-12 cursor-pointer select-none">
        {Array.from({ length: 101 }, (_, i) => (
          <div key={i} className={`absolute right-0 h-px ${i % 10 === 0 ? 'w-5 bg-white/70' : i % 5 === 0 ? 'w-3.5 bg-white/45' : 'w-2 bg-white/25'}`} style={{ top: `${i}%` }} />
        ))}
        {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((n) => (
          <span key={n} className="absolute right-6 -translate-y-1/2 font-mono text-[9px] text-mute" style={{ top: `${n}%` }}>{n}</span>
        ))}
        <motion.div style={{ top }} className="absolute right-0 h-[2px] w-10 bg-white" />
        {hover != null && (
          <div className="absolute right-0 h-px w-12 bg-blue" style={{ top: `${hover}%` }}>
            <span className="absolute right-1 top-1 rounded bg-blue/20 px-1 font-mono text-[10px] text-cyan">{String(Math.round(hover)).padStart(3, '0')} %</span>
          </div>
        )}
      </div>
    </div>
  )
}
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
const links = [['home','Home'],['about','About'],['work','Work'],['services','Services'],['pricing','Pricing'],['contact','Contact']]
export default function Navbar() {
  const [active, setActive] = useState('home'), [open, setOpen] = useState(false)
  useEffect(() => {
    const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && setActive(e.target.id)), { rootMargin:'-45% 0px -50% 0px' })
    links.forEach(([id]) => { const el = document.getElementById(id); el && io.observe(el) })
    return () => io.disconnect()
  }, [])
  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav aria-label="Main" className="glass glow-border flex w-full max-w-3xl items-center justify-between rounded-full px-3 py-2">
        <a href="#home" className="px-3 font-black tracking-widest">RIO</a>
        <ul className="hidden gap-1 md:flex">{links.map(([id,l]) => (
          <li key={id}><a href={`#${id}`} aria-current={active===id?'true':undefined} className={`relative block rounded-full px-4 py-2 text-sm ${active===id?'bg-blue/25 text-ink ring-1 ring-cyan/30':'text-mute hover:text-ink'}`}>{l}</a></li>))}</ul>
        <button className="p-2 md:hidden" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </nav>
      {open && <ul className="glass absolute top-16 w-[calc(100%-2rem)] max-w-3xl rounded-3xl p-3 md:hidden">{links.map(([id,l]) => (
        <li key={id}><a href={`#${id}`} onClick={() => setOpen(false)} className="block rounded-2xl px-4 py-3 hover:bg-blue/15">{l}</a></li>))}</ul>}
    </header>
  )
}

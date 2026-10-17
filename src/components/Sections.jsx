import { motion } from 'motion/react'
import { Instagram, ArrowUp } from 'lucide-react'
import { services } from '../data/services'
import { pricing, pricingNote, formatPrice } from '../data/pricing'
import { social } from '../data/socialLinks'
import TelegramContactButton from './TelegramContactButton'
const reveal = { initial:{ opacity:0, y:24 }, whileInView:{ opacity:1, y:0 }, viewport:{ once:true }, transition:{ duration:.6 } }
// Edit freely: bio, tools and steps. Nothing here is invented client/award data.
const bio = { text:'', tools:['Premiere Pro','Filmora',] }
const steps = ['Understand the brief','Develop the concept','Create and refine','Deliver the final work']
export function About() {
  return (<section id="about" className="mx-auto max-w-6xl px-6 py-24">
    <motion.div {...reveal}><p className="label">01 / About</p><h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-6xl">About Rio</h2>
      <p className="mt-2 text-cyan">Video Editor · Script Writer</p>
      <p className="mt-5 max-w-2xl text-mute">{bio.text}</p><p className="mt-3 text-sm text-mute">Tools: {bio.tools.join(', ')}</p></motion.div>
    <ol className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{steps.map((s,i) => (
      <motion.li key={s} {...reveal} transition={{ delay:i*.12 }} className="glass rounded-2xl p-5"><span className="text-3xl font-black text-mute">0{i+1}</span><p className="mt-2 font-semibold">{s}</p></motion.li>))}</ol>
  </section>)
}
export function Services() {
  return (<section id="services" className="mx-auto max-w-6xl px-6 py-24"><p className="label">03 / Services</p><h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-6xl">Services</h2>
    <div className="mt-10 grid gap-6 sm:grid-cols-2">{services.map(s => (
      <motion.div key={s.title} {...reveal} className="glass rounded-2xl p-7"><h3 className="text-xl font-bold">{s.title}</h3><p className="mt-1 text-mute">{s.desc}</p>
        <ul className="mt-4 space-y-1 text-sm text-mute">{s.items.map(i => <li key={i}>• {i}</li>)}</ul>
        <div className="mt-6 flex gap-3"><a href="#pricing" className="btn btn-ghost">View Pricing</a><TelegramContactButton label="Contact Me" className="btn btn-primary" icon={false} /></div></motion.div>))}</div></section>)
}
export function Pricing() {
  return (<section id="pricing" className="mx-auto max-w-6xl px-6 py-24"><p className="label">04 / Pricing</p><h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-6xl">Pricing</h2>
    <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{pricing.map(e => (
      <motion.div key={e.name} {...reveal} className="glass flex flex-col rounded-2xl p-6"><p className="text-xs text-cyan">{e.group}</p><h3 className="text-lg font-bold">{e.name}</h3>
        <p className="mt-3 text-2xl font-black">{formatPrice(e)}</p><p className="text-xs text-mute">{e.unit}</p><p className="mt-3 text-sm text-mute">{e.description}</p>
        <ul className="mt-3 flex-1 space-y-1 text-sm text-mute">{e.deliverables.map(d => <li key={d}>✓ {d}</li>)}</ul>
        {e.delivery && <p className="mt-3 text-xs text-mute">Delivery: {e.delivery}</p>}{e.revisions && <p className="text-xs text-mute">Revisions: {e.revisions}</p>}
        <TelegramContactButton label="Get a Quote" className="btn btn-primary mt-5 justify-center" /></motion.div>))}</div>
    <p className="mt-6 text-sm text-mute">{pricingNote}</p></section>)
}
export function Contact() {
  return (<section id="contact" className="mx-auto max-w-4xl px-6 py-24 text-center"><motion.div {...reveal} className="glass rounded-3xl p-10 sm:p-16">
    <p className="label">05 / Contact</p><h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-6xl">Have a Project in Mind?</h2><p className="mx-auto mt-4 max-w-lg text-mute">Tell me what you're making. Telegram is the fastest way to reach me — you start the conversation, and I'll reply there.</p>
    <div className="mt-8 flex flex-wrap justify-center gap-3"><TelegramContactButton label={`Message ${social.telegramHandle}`} />
      <a href={social.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-ghost"><Instagram size={18} aria-hidden /> Follow on Instagram</a>
      {social.email && <a href={`mailto:${social.email}`} className="btn btn-ghost">Email</a>}</div></motion.div></section>)
}
export function Footer() {
  return (<footer className="border-t border-white/10 px-6 py-10"><div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 text-sm text-mute">
    <div><p className="font-bold text-ink">Rio Thakur</p><p>Video Editing · Script Writing</p><p>© {new Date().getFullYear()} Rio Thakur</p></div>
    <div className="flex items-center gap-4"><a className="hover:text-ink" href={social.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
      <a className="hover:text-ink" href={social.telegram} target="_blank" rel="noopener noreferrer">Telegram</a>
      <a href="#home" aria-label="Back to top" className="glass rounded-full p-3"><ArrowUp size={16} /></a></div></div></footer>)
}

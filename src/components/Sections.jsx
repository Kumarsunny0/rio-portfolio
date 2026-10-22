import { motion } from 'motion/react'
import { Instagram, ArrowUp } from 'lucide-react'
import { services } from '../data/services'
import { pricing, pricingNote, formatPrice } from '../data/pricing'
import { social } from '../data/socialLinks'
import { about } from '../data/about'
import TelegramContactButton from './TelegramContactButton'
import Highlight from './Highlight'
const reveal = { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.6 } }
const H2 = 'mt-3 text-4xl font-bold tracking-tight sm:text-6xl'
const letters = 'ABCDEFGH'

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-24">
      <motion.div {...reveal}>
        <p className="label">01 / About</p>
        <h2 className={H2}>About Rio.</h2>
        <p className="mt-3 text-cyan">{about.roles}</p>
        <p className="mt-5 max-w-2xl text-mute">{about.bio}</p>
        <p className="mt-3 text-sm text-mute">Tools: {about.tools.join(', ')}</p>
      </motion.div>
      <p className="label mt-14">How I work</p>
      <ol className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {about.steps.map((s, i) => (
          <motion.li key={s.title} {...reveal} transition={{ delay: i * 0.1 }} className="glass rounded-2xl p-6">
            <span className="label !text-mute">{letters[i]}</span>
            <h3 className="mt-3 text-lg font-bold">{s.title}</h3>
            <p className="mt-2 text-sm text-mute">{s.text}</p>
          </motion.li>
        ))}
      </ol>
    </section>
  )
}

export function Services() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-6 py-24">
      <p className="label">03 / Services</p>
      <h2 className={H2}>What I can make for you.</h2>
      <ol className="mt-12 divide-y divide-white/10 border-y border-white/10">
        {services.map((s, i) => (
          <motion.li key={s.title} {...reveal} className="grid gap-5 py-9 md:grid-cols-[13rem_1fr_auto] md:items-start">
            <div>
              <p className="label">{s.title}</p>
              <p className="mt-2 text-4xl font-bold text-mute">0{i + 1}</p>
            </div>
            <div>
              <h3 className="text-2xl font-bold">{s.desc}</h3>
              <ul className="mt-4 flex flex-wrap gap-2 text-sm text-mute">
                {s.items.map((it) => (
                  <li key={it} className="rounded-full border border-white/10 px-3 py-1">{it}</li>
                ))}
              </ul>
            </div>
            <div className="flex gap-3">
              <a href="#pricing" className="btn btn-ghost">View Pricing</a>
              <TelegramContactButton label="Contact Me" className="btn btn-primary" icon={false} />
            </div>
          </motion.li>
        ))}
      </ol>
    </section>
  )
}

export function Pricing() {
  return (
    <section id="pricing" className="mx-auto max-w-6xl px-6 py-24">
      <p className="label">04 / Pricing</p>
      <h2 className={H2}>Simple, clear <Highlight>pricing.</Highlight></h2>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {pricing.map((e) => (
          <motion.div key={e.name} {...reveal} className="glass glow-border flex flex-col rounded-2xl p-6">
            <p className="label">{e.group}</p>
            <h3 className="mt-1 text-lg font-bold">{e.name}</h3>
            <p className="mt-3 text-2xl font-bold">{formatPrice(e)}</p>
            <p className="text-xs text-mute">{e.unit}</p>
            <p className="mt-3 text-sm text-mute">{e.description}</p>
            <ul className="mt-3 flex-1 space-y-1 text-sm text-mute">
              {e.deliverables.map((d) => <li key={d}>✓ {d}</li>)}
            </ul>
            {e.delivery && <p className="mt-3 text-xs text-mute">Delivery: {e.delivery}</p>}
            {e.revisions && <p className="text-xs text-mute">Revisions: {e.revisions}</p>}
            <TelegramContactButton label="Get a Quote" className="btn btn-primary mt-5 justify-center" />
          </motion.div>
        ))}
      </div>
      <p className="mt-6 text-sm text-mute">{pricingNote}</p>
    </section>
  )
}

export function Contact() {
  return (
    <section id="contact" className="border-t border-white/10 px-6 py-28 text-center">
      <motion.div {...reveal} className="mx-auto max-w-3xl">
        <p className="label">Let's work together</p>
        <h2 className="mt-4 text-5xl font-bold tracking-tight sm:text-7xl">Start your <Highlight>project.</Highlight></h2>
        <p className="mx-auto mt-5 max-w-lg text-mute">
          Tell me what you're making. Telegram is the fastest way to reach me — you start the conversation, and I reply there.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <TelegramContactButton label={`Message ${social.telegramHandle}`} />
          <a href={social.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            <Instagram size={18} aria-hidden /> Follow on Instagram
          </a>
          {social.email && <a href={`mailto:${social.email}`} className="btn btn-ghost">Email</a>}
        </div>
      </motion.div>
    </section>
  )
}

const col = 'mt-3 space-y-2 text-sm text-mute'
export function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-14">
      <div className="mx-auto grid max-w-6xl gap-10 text-sm md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <p className="text-lg font-bold">Rio Thakur</p>
          <p className="mt-2 max-w-xs text-mute">Video editing, graphic design, motion graphics and UI/UX.</p>
        </div>
        <div>
          <p className="label">Explore</p>
          <ul className={col}>
            {[['#about', 'About'], ['#work', 'Work'], ['#services', 'Services'], ['#pricing', 'Pricing']].map(([h, l]) => (
              <li key={h}><a className="hover:text-ink" href={h}>{l}</a></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="label">Services</p>
          <ul className={col}>{services.map((s) => <li key={s.title}>{s.title}</li>)}</ul>
        </div>
        <div>
          <p className="label">Connect</p>
          <ul className={col}>
            <li><a className="hover:text-ink" href={social.telegram} target="_blank" rel="noopener noreferrer">Telegram</a></li>
            <li><a className="hover:text-ink" href={social.instagram} target="_blank" rel="noopener noreferrer">Instagram</a></li>
            {social.email && <li><a className="hover:text-ink" href={`mailto:${social.email}`}>Email</a></li>}
          </ul>
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-6xl items-center justify-between text-xs text-mute">
        <p>© {new Date().getFullYear()} Rio Thakur · Made by Rio</p>
        <a href="#home" aria-label="Back to top" className="rounded-full border border-white/15 p-3 hover:border-cyan"><ArrowUp size={16} /></a>
      </div>
    </footer>
  )
}
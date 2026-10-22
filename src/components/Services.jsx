import { motion } from 'motion/react'
import { services } from '../data/services'
import { visuals } from './MotionGraphics'
import TelegramContactButton from './TelegramContactButton'
import Highlight from './Highlight'
const reveal = { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-80px' }, transition: { duration: 0.7 } }

export default function Services() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-6 py-24">
      <p className="label">03 / Services</p>
      <h2 className="mt-3 text-5xl font-bold sm:text-7xl">The control that makes a good edit <Highlight>great.</Highlight></h2>
      <ol className="mt-14 space-y-6">
        {services.map((s, i) => {
          const Visual = visuals[i % visuals.length]
          return (
            <motion.li key={s.title} {...reveal} className="glass grid items-center gap-8 rounded-3xl p-6 md:grid-cols-[1fr_1.1fr] md:p-10">
              <div className={i % 2 ? 'md:order-2' : ''}>
                <p className="label">{s.title}</p>
                <p className="mt-2 text-6xl font-bold text-white/15">0{i + 1}</p>
                <h3 className="mt-2 text-3xl font-bold">{s.desc}</h3>
                <ul className="mt-5 flex flex-wrap gap-2 text-sm text-mute">
                  {s.items.map((it) => <li key={it} className="rounded-full border border-white/10 px-3 py-1">{it}</li>)}
                </ul>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a href="#pricing" className="btn btn-ghost">View Pricing</a>
                  <TelegramContactButton label="Contact Me" className="btn btn-primary" icon={false} />
                </div>
              </div>
              <div className="aspect-[2/1] overflow-hidden rounded-2xl border border-blue/20 bg-bg/80"><Visual /></div>
            </motion.li>
          )
        })}
      </ol>
    </section>
  )
}
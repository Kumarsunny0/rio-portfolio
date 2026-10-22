import { motion } from 'motion/react'
import { sample } from '../data/sample'
import { formatPrice } from '../data/pricing'
import { sampleMessage } from '../data/messages'
import { TimelineMotion } from './MotionGraphics'
import TelegramContactButton from './TelegramContactButton'

export default function SampleOffer() {
  const meta = [['Length', sample.duration], ['Delivery', sample.delivery], ['Revisions', sample.revisions]].filter(([, v]) => v)
  return (
    <section id="sample" className="mx-auto max-w-6xl px-6 py-24">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
        className="glass glow-border grid items-center gap-8 rounded-3xl p-6 md:grid-cols-[1.1fr_1fr] md:p-12">
        <div>
          <p className="label">Paid Sample</p>
          <h2 className="mt-3 text-4xl font-bold sm:text-6xl">{sample.headline}</h2>
          <p className="mt-4 max-w-md text-mute">{sample.description}</p>
          <p className="mt-6 text-3xl font-bold">{formatPrice(sample)}</p>
          <p className="text-xs text-mute">{sample.unit}</p>
          <ul className="mt-5 space-y-2 text-sm text-mute">{sample.includes.map((x) => <li key={x}>✓ {x}</li>)}</ul>
          {meta.length > 0 && <p className="mt-4 text-sm text-mute">{meta.map(([k, v]) => `${k}: ${v}`).join(' · ')}</p>}
          <div className="mt-7 flex flex-wrap items-center gap-4">
            <TelegramContactButton label={sample.cta} message={sampleMessage(sample)} />
            <span className="text-xs text-mute">{sample.note}</span>
          </div>
        </div>
        <div className="aspect-[2/1] overflow-hidden rounded-2xl border border-blue/20 bg-bg/80"><TimelineMotion /></div>
      </motion.div>
    </section>
  )
}
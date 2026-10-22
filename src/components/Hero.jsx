import { useState } from 'react'
import { motion } from 'motion/react'
import TelegramContactButton from './TelegramContactButton'
import Highlight from './Highlight'
import { about } from '../data/about'

const words = ['Turning', 'Ideas', 'Into', 'Visual', 'Experiences.']
const tags = ['YouTube Editing', 'Reels & Shorts', 'Documentary Edits', 'Motion Graphics', 'Thumbnails', 'Color & Sound', ...about.tools]

export default function Hero() {
  const [ok, setOk] = useState(true)
  return (
    <section id="home" className="relative flex min-h-screen flex-col justify-between overflow-hidden pt-28">
      <div className="blob -right-20 top-10 h-[32rem] w-[32rem] opacity-25" />
      <div className="relative mx-auto grid w-full max-w-6xl flex-1 items-center gap-10 px-6 md:grid-cols-[1.5fr_1fr]">
        <div>
          <p className="label">Rio Thakur / {about.roles}</p>
          <h1 className="mt-5 text-[2.6rem] font-bold leading-[1.05] sm:text-7xl lg:text-8xl">
            {words.map((w, i) => {
              const word = (
                <span className="inline-block overflow-hidden pb-2 align-bottom">
                  <motion.span className="inline-block" initial={{ y: '110%' }} animate={{ y: 0 }} transition={{ duration: 0.8, delay: 0.1 + i * 0.12, ease: [0.2, 0.7, 0.2, 1] }}>{w}</motion.span>
                </span>
              )
              return <span key={w} className="mr-4 inline-block align-bottom">{i === words.length - 1 ? <Highlight delay={0.9}>{word}</Highlight>: word}</span>
            })}
          </h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }} className="mt-8 max-w-xl text-lg text-mute">
            I'm Rio Thakur — a video editor and designer creating engaging videos, striking graphics, and modern digital experiences.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="mt-8 flex flex-wrap gap-3">
            <a href="#work" className="btn btn-primary">Explore My Work</a>
            <TelegramContactButton label="Let's Work Together" className="btn btn-ghost" icon={false} />
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, clipPath: 'inset(100% 0 0 0)' }} animate={{ opacity: 1, clipPath: 'inset(0% 0 0 0)' }} transition={{ duration: 1.2, delay: 0.3 }} className="relative mx-auto w-full max-w-sm">
          {ok ? <img src="/images/rio-portrait.png" alt="Rio Thakur portrait" className="w-full object-contain" onError={() => setOk(false)} />
            : <div className="grid aspect-[4/5] place-items-center text-7xl font-bold text-mute">RT</div>}
          <span className="glass flt absolute -left-2 top-8 rounded-full px-3 py-1 text-xs"><span className="mr-2 inline-block h-2 w-2 animate-pulse rounded-full bg-red-500" />REC</span>
          <span className="glass flt absolute -right-2 bottom-16 rounded-full px-3 py-1 text-xs text-cyan" style={{ '--d': '1s' }}>4K · 24 fps</span>
        </motion.div>
      </div>
      <div className="relative mt-10 overflow-hidden border-y border-white/10 py-4" aria-hidden>
        <div className="marquee">
          {[0, 1].map((k) => (
            <ul key={k} className="flex shrink-0">{tags.map((t) => <li key={t} className="label whitespace-nowrap px-6 !text-mute">▪ {t}</li>)}</ul>
          ))}
        </div>
      </div>
    </section>
  )
}
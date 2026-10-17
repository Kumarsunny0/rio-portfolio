import { useState } from 'react'
import { motion } from 'motion/react'
import TelegramContactButton from './TelegramContactButton'
const tags = ['Video Editing','Graphic Design','Motion Graphics','UI/UX Design','YouTube Edits','Reels & Shorts','Thumbnails','Branding']
export default function Hero() {
  const [ok, setOk] = useState(true)
  return (
    <section id="home" className="relative flex min-h-screen flex-col justify-between overflow-hidden pt-28">
      <div className="blob right-0 top-10 h-[30rem] w-[30rem] opacity-20" />
      <div className="relative mx-auto grid w-full max-w-6xl flex-1 items-center gap-8 px-6 md:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="label">Rio Thakur / Video Editor · Script Writer</p>
          <motion.h1 initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} transition={{ duration:.9 }} className="mt-5 text-5xl font-bold leading-[1.02] tracking-tight sm:text-7xl">
            Turning Ideas Into <span className="text-cyan">Visual Experiences.</span></motion.h1>
          <p className="mt-6 max-w-xl text-lg text-mute">I'm Rio Thakur — a video editor and designer creating engaging videos, striking graphics, and modern digital experiences. and i turn into compelling narratives that captivate your audience.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#work" className="btn btn-primary">Explore My Work</a>
            <TelegramContactButton label="Let's Work Together" className="btn btn-ghost" icon={false} />
          </div>
        </div>
        <motion.div initial={{ opacity:0, clipPath:'inset(100% 0 0 0)' }} animate={{ opacity:1, clipPath:'inset(0% 0 0 0)' }} transition={{ duration:1.2, delay:.2 }} className="mx-auto w-full max-w-sm">
          {ok ? <img src="/images/rio-portrait.png" alt="Rio Thakur, ASCII-style portrait" className="w-full object-contain" onError={() => setOk(false)} />
            : <div className="grid aspect-[4/5] place-items-center text-7xl font-bold text-mute">RT</div>}
        </motion.div>
      </div>
      <div className="relative mt-10 overflow-hidden border-y border-white/10 py-4" aria-hidden>
        <div className="marquee">{[0,1].map(k => <ul key={k} className="flex shrink-0">{tags.map(t => <li key={t} className="label whitespace-nowrap px-6 !text-mute">▪ {t}</li>)}</ul>)}</div>
      </div>
    </section>
  )
}

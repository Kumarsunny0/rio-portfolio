import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Play, Maximize2, Instagram } from 'lucide-react'
import { projects, categories } from '../data/projects'
import VideoPlayerModal, { getYouTubeId } from './VideoPlayerModal'
import Highlight from './Highlight'
function Card({ p, onOpen, i }) {
  const yt = p.mediaType==='youtube' ? getYouTubeId(p.mediaUrl) : null
  const ytThumb = yt ? `https://i.ytimg.com/vi/${yt}/hqdefault.jpg` : null
  const [src, setSrc] = useState(p.thumbnail || ytThumb)
  const [ok, setOk] = useState(true)
  const failed = () => (ytThumb && src !== ytThumb) ? setSrc(ytThumb) : setOk(false)
  return (
    <motion.article layout initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:(i%3)*.08 }} className="glass group overflow-hidden rounded-2xl">
      <div className="relative aspect-video overflow-hidden bg-bg2">
        {ok && src ? <img src={src} alt={`${p.title} thumbnail`} loading="lazy" onError={failed} className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
          : p.mediaType==='local' ? <video src={`${p.mediaUrl}#t=0.5`} preload="metadata" muted playsInline className="h-full w-full object-cover" />
          : <div className="flex h-full flex-col items-center justify-center gap-2 bg-gradient-to-br from-blue/25 to-bg2 text-xs text-mute">{p.mediaType==='instagram' ? <><Instagram size={28} aria-hidden /><span>Instagram Reel</span></> : 'Thumbnail not found'}</div>}
        <button onClick={() => onOpen(p)} className="absolute inset-0 grid place-items-center bg-black/0 opacity-0 transition group-hover:bg-black/40 group-hover:opacity-100 focus-visible:opacity-100" aria-label={`View ${p.title}`}>
          <span className="btn btn-primary">{p.mediaType==='image' ? <Maximize2 size={16}/> : <Play size={16}/>} {p.mediaType==='image' ? 'View' : 'Play'}</span></button>
      </div>
      <div className="p-5"><p className="text-xs text-cyan">{p.category}{p.date && ` · ${p.date}`}{p.duration && ` · ${p.duration}`}</p>
        <h3 className="mt-1 text-lg font-bold">{p.title}</h3><p className="mt-1 text-sm text-mute">{p.description}</p>
        <p className="mt-3 text-xs text-mute">{p.tools?.join(' · ')}</p></div>
    </motion.article>
  )
}
export default function PortfolioGallery() {
  const [cat, setCat] = useState(categories[0]), [open, setOpen] = useState(null)
  const list = cat===categories[0] ? projects : projects.filter(p => p.category===cat)
  return (
    <section id="work" className="mx-auto max-w-6xl px-6 py-24">
      <p className="label">02 / Work</p><h2 className="mt-3 text-4xl font-bold tracking-tight sm:text-6xl">Selected <Highlight> Work</Highlight></h2>
      <div className="mt-6 flex flex-wrap gap-2" role="group" aria-label="Filter projects">{categories.map(c => (
        <button key={c} onClick={() => setCat(c)} aria-pressed={cat===c} className={`rounded-full px-4 py-2 text-sm ${cat===c?'bg-ink font-semibold text-bg':'glass text-mute hover:text-ink'}`}>{c}</button>))}</div>
      {list.length ? <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{list.map((p,i) => <Card key={p.id} p={p} i={i} onOpen={setOpen} />)}</div>
        : <div className="glass mt-10 rounded-2xl p-12 text-center text-mute">Nothing in “{cat}” yet — new work is on the way.</div>}
      <AnimatePresence>{open && <VideoPlayerModal project={open} onClose={() => setOpen(null)} />}</AnimatePresence>
    </section>
  )
}

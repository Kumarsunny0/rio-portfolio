import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { X } from 'lucide-react'
export function getYouTubeId(url) {
  try {
    const u = new URL(url), h = u.hostname.replace(/^www\.|^m\./,''); let id = ''
    if (h==='youtu.be') id = u.pathname.slice(1)
    else if (h==='youtube.com' || h==='youtube-nocookie.com') id = u.searchParams.get('v') || (u.pathname.match(/^\/(?:shorts|embed|live)\/([^/]+)/)||[])[1] || ''
    return /^[\w-]{11}$/.test(id) ? id : null
  } catch { return null }
}
export function getInstagramEmbed(url) {
  const m = String(url).match(/^https:\/\/(?:www\.)?instagram\.com\/(reels?|p|tv)\/([\w-]+)/)
  return m ? `https://www.instagram.com/${m[1]==='reels'?'reel':m[1]}/${m[2]}/embed` : null
}
export default function VideoPlayerModal({ project, onClose }) {
  const box = useRef(null), vid = useRef(null), [err, setErr] = useState(false)
  useEffect(() => {
    const prev = document.activeElement, v = vid.current
    document.body.style.overflow = 'hidden'; box.current?.querySelector('button')?.focus()
    const key = (e) => {
      if (e.key==='Escape') onClose()
      if (e.key==='Tab') { const f = [...box.current.querySelectorAll('button,a[href],iframe,video')]; if (!f.length) return
        const i = f.indexOf(document.activeElement); const n = e.shiftKey ? (i<=0?f.length-1:i-1) : (i===f.length-1?0:i+1); f[n].focus(); e.preventDefault() }
    }
    document.addEventListener('keydown', key)
    return () => { document.removeEventListener('keydown', key); document.body.style.overflow = ''; v?.pause(); prev?.focus?.() }
  }, [onClose])
  const id = project.mediaType==='youtube' ? getYouTubeId(project.mediaUrl) : null
  const ig = project.mediaType==='instagram' ? getInstagramEmbed(project.mediaUrl) : null
  return (
    <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} className="fixed inset-0 z-[90] grid place-items-center bg-black/80 p-4 backdrop-blur-sm" onClick={onClose}>
      <motion.div ref={box} role="dialog" aria-modal="true" aria-label={project.title} initial={{ scale:.94, y:20 }} animate={{ scale:1, y:0 }} exit={{ scale:.94 }}
        className="glass w-full max-w-4xl rounded-3xl p-3" onClick={e => e.stopPropagation()}>
        <div className="mb-2 flex items-center justify-between px-2"><h3 className="font-semibold">{project.title}</h3>
          <button onClick={onClose} aria-label="Close" className="rounded-full p-2 hover:bg-blue/20"><X /></button></div>
        {project.mediaType==='image' && <img src={project.mediaUrl} alt={project.title} className="max-h-[75vh] w-full rounded-2xl object-contain" />}
        {project.mediaType==='local' && (err ? <p className="p-8 text-center text-mute">This video could not be loaded.</p>
          : <video ref={vid} src={project.mediaUrl} controls preload="metadata" playsInline onError={() => setErr(true)} className="max-h-[75vh] w-full rounded-2xl bg-black" />)}
        {project.mediaType==='youtube' && (id ? <div className="aspect-video"><iframe className="h-full w-full rounded-2xl" title={project.title} src={`https://www.youtube-nocookie.com/embed/${id}?rel=0`}
            allow="encrypted-media; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" /></div>
          : <p className="p-8 text-center text-mute">This video link isn't valid yet. Add a real YouTube URL in <code>src/data/projects.js</code>.</p>)}
        {project.mediaType==='instagram' && (ig ? <><iframe src={ig} title={project.title} loading="lazy" allowFullScreen className="mx-auto block h-[75vh] w-full max-w-md rounded-2xl bg-white" />
          <p className="px-2 pt-2 text-center text-xs text-mute">If it doesn't load, <a className="text-cyan underline" href={project.mediaUrl} target="_blank" rel="noopener noreferrer">open on Instagram</a>.</p></>
          : <p className="p-8 text-center text-mute">Invalid Instagram link. Use a link like https://www.instagram.com/reel/XXXX/</p>)}
        {id && <p className="px-2 pt-2 text-xs text-mute">If playback is blocked, <a className="text-cyan underline" href={project.mediaUrl} target="_blank" rel="noopener noreferrer">watch on YouTube</a>.</p>}
      </motion.div>
    </motion.div>
  )
}

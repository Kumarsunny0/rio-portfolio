import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'motion/react'
const KEY = 'rio-intro-seen'
export default function IntroAnimation() {
  const reduce = useReducedMotion()
  const [open, setOpen] = useState(() => { try { return !sessionStorage.getItem(KEY) } catch { return true } })
  const [imgOk, setImgOk] = useState(true)
  const close = () => { try { sessionStorage.setItem(KEY,'1') } catch {} setOpen(false) }
  return (
    <AnimatePresence>
      {open && !reduce && (
        <motion.div className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-bg px-6 text-center"
          exit={{ opacity:0, scale:1.05 }} transition={{ duration:.8 }} role="dialog" aria-label="Introduction">
          <motion.div className="blob h-[60vmax] w-[60vmax] opacity-30" animate={{ x:[-80,80,-80], y:[-40,40,-40] }} transition={{ duration:10, repeat:Infinity }} />
          <motion.div className="relative mb-8 h-72 w-56 sm:h-96 sm:w-72"
            initial={{ clipPath:'inset(100% 0% 0% 0%)' }} animate={{ clipPath:'inset(0% 0% 0% 0%)' }} transition={{ duration:1.6, delay:.6, ease:'easeOut' }}>
            {imgOk ? <img src="/images/rio-portrait.png" alt="Portrait of Rio Thakur" className="h-full w-full object-contain" onError={() => setImgOk(false)} />
              : <div className="grid h-full w-full place-items-center bg-gradient-to-br from-blue/40 to-bg2 text-6xl font-bold">RT</div>}
          </motion.div>
          <motion.h1 className="relative text-4xl font-black tracking-tight sm:text-6xl" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:1.6, duration:.8 }}>RIO THAKUR</motion.h1>
          <motion.p className="relative mt-3 text-xs tracking-[.3em] text-mute sm:text-sm" initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:2.1, duration:.8 }}>VIDEO EDITOR · DESIGNER · CREATIVE</motion.p>
          <motion.button onClick={close} className="btn btn-primary relative mt-8" initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:2.6 }}>ENTER PORTFOLIO</motion.button>
          <button onClick={close} className="absolute right-5 top-5 text-sm text-mute underline-offset-4 hover:underline">Skip</button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

import { motion, useReducedMotion } from 'motion/react'

// Scroll karke ye shabd screen par aate hi border ek point se bada hota hai.
// delay = kitni der baad shuru ho (seconds)
export default function Highlight({ children, delay = 0 }) {
  const reduce = useReducedMotion()
  const frame = {
    hide: { left: '50%', right: '50%', top: '50%', bottom: '50%', opacity: 0 },
    show: { left: '0%', right: '0%', top: '0%', bottom: '0%', opacity: 1 },
  }
  return (
    <motion.span className="hlx" initial={reduce ? 'show' : 'hide'} whileInView="show" viewport={{ once: true, amount: 0.6 }}>
      <motion.span className="hlx-frame" variants={frame} transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1], delay: delay + 0.1 }} aria-hidden="true">
        <i className="tl" /><i className="tr" /><i className="bl" /><i className="br" />
      </motion.span>
      {children}
    </motion.span>
  )
}
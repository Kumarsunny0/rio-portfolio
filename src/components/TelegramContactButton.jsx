import { Send } from 'lucide-react'
import { social } from '../data/socialLinks'

// message dene par Telegram chat me wo text pehle se likha hua khulta hai (visitor ko Send dabana padta hai).
export default function TelegramContactButton({ label = "Let's Talk", className = 'btn btn-primary', icon = true, message = '' }) {
  const href = message ? `${social.telegram}?text=${encodeURIComponent(message)}` : social.telegram
  // Agar Telegram text pre-fill na kare to visitor paste kar sake
  const copy = () => { if (message) navigator.clipboard?.writeText(message).catch(() => {}) }
  return (
    <a href={href} onClick={copy} target="_blank" rel="noopener noreferrer" className={className}>
      {icon && <Send size={18} aria-hidden />}{label}
    </a>
  )
}
import { Send } from 'lucide-react'
import { social } from '../data/socialLinks'
export default function TelegramContactButton({ label="Let's Talk", className='btn btn-primary', icon=true }) {
  return <a href={social.telegram} target="_blank" rel="noopener noreferrer" className={className}>{icon && <Send size={18} aria-hidden />}{label}</a>
}

// Vercel serverless function: editor form ka data aapke Telegram par bhejta hai.
// Bot token sirf Vercel ke Environment Variables me rakho (code me kabhi mat likho).
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ ok: false })
  const b = req.body || {}
  if (b.website) return res.status(200).json({ ok: true }) // spam trap
  const clean = (v, max) => String(v || '').replace(/\s+/g, ' ').trim().slice(0, max)
  const d = { name: clean(b.name, 80), telegram: clean(b.telegram, 33), software: clean(b.software, 120), price: clean(b.price, 120) }
  if (!d.name || !/^@?[A-Za-z][A-Za-z0-9_]{4,31}$/.test(d.telegram) || !d.software || !d.price) return res.status(400).json({ ok: false })
  const token = process.env.TELEGRAM_BOT_TOKEN, chat = process.env.TELEGRAM_CHAT_ID
  if (!token || !chat) return res.status(503).json({ ok: false, error: 'not_configured' })
  const text = ['New editor application', `Name: ${d.name}`, `Telegram: ${d.telegram.startsWith('@') ? d.telegram : '@' + d.telegram}`, `Software: ${d.software}`, `Price: ${d.price}`].join('\n')
  try {
    const r = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ chat_id: chat, text }) })
    return res.status(r.ok ? 200 : 502).json({ ok: r.ok })
  } catch { return res.status(502).json({ ok: false }) }
}
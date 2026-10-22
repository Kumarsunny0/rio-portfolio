import { formatPrice } from './pricing'

// Client kisi price card par click kare to ye message Telegram me aata hai.
export const quoteMessage = (e) =>
  [
    "Hi Rio! I'm interested in this service:",
    `Service: ${e.name} (${e.group})`,
    `Price: ${formatPrice(e)}${e.unit ? ` ${e.unit}` : ''}`,
    e.deliverables?.length ? `Includes: ${e.deliverables.join(', ')}` : '',
    e.delivery ? `Delivery: ${e.delivery}` : '',
    e.revisions ? `Revisions: ${e.revisions}` : '',
  ].filter(Boolean).join('\n')

export const sampleMessage = (s) =>
  `Hi Rio! I'd like to order the paid sample video.\nPrice: ${formatPrice(s)}${s.unit ? ` ${s.unit}` : ''}`
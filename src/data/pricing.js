// Prices badalne ke liye har block me `price` ki value likho.
//   price: null      -> site par "Price to be updated" dikhega
//   price: 1500      -> number likho, quotes mat lagao
//   mode: 'starting' -> "Starting at ₹1,500"
//   mode: 'fixed'    -> "₹1,500"
//   mode: 'custom'   -> "Custom Quote" (price ignore hota hai)
// delivery aur revisions optional hain (khali chhodo to dikhenge nahi).

export const pricing = [
  {
    group: 'Video Editing',
    name: 'Reels / Shorts',
    price: 500,
    mode: 'Starting',
    unit: 'per video',
    description: 'Vertical edits made for retention.',
    deliverables: ['Edit & pacing', 'Sound polish', 'Viral Edit'],
    delivery: '5 hours',
    revisions: '',
  },
  {
    group: 'Video Editing',
    name: 'Reels / Shorts',
    price: 900,
    mode: 'Starting',
    unit: 'per video',
    description: 'Vertical edits made for retention.',
    deliverables: ['Edit & pacing','Caption', 'Sound polish'],
    delivery: '12 hours',
    revisions: '',
  },
  {
    group: 'Video Editing',
    name: 'Reels / Shorts',
    price: 1200,
    mode: 'Starting',
    unit: 'per video',
    description: 'Vertical edits made for retention.',
    deliverables: ['Edit & pacing','Caption', 'Sound polish', 'Scripting'],
    delivery: '24 hours',
    revisions: '',
  },
  {
    group: 'Video Editing',
    name: 'YouTube Video',
    price: 2000,
    mode: 'starting',
    unit: 'per video',
    description: 'Story-led long-form editing.',
    deliverables: ['Edit & cuts', 'Color & audio', 'Final export'],
    delivery: '',
    revisions: '',
  },
  {
    group: 'Video Editing',
    name: 'Documentary Video',
    price: 4000,
    mode: 'starting',
    unit: 'per project',
    description: 'Narrative editing for longer pieces.',
    deliverables: ['Story edit', 'Color & sound', 'Final export'],
    delivery: '',
    revisions: '',
  },
  {
    group: 'Video Editing',
    name: 'Podcast Video',
    price: 5000,
    mode: 'starting',
    unit: 'per project',
    description: 'Narrative editing for longer pieces.',
    deliverables: ['Story edit', 'Color & sound', 'Final export'],
    delivery: '',
    revisions: '',
  },
  
  {
    group: 'Graphic Design',
    name: 'Social Media Post',
    price: 400,
    mode: 'starting',
    unit: 'per design',
    description: 'On-brand social creatives.',
    deliverables: ['Design', 'Export for platforms'],
    delivery: '',
    revisions: '',
  },
  {
    group: 'Writing',
    name: 'Script Writing',
    price: 5000,
    mode: 'starting',
  
    description: 'On-brand social scripts.',
    deliverables: ['Script', 'Research', 'Hook & CTA'],
    delivery: '',
    revisions: '',
  },
];

export const pricingNote = 'Final pricing depends on project scope and requirements.'

export const formatPrice = (e) => {
  if (e.mode === 'custom') return 'Custom Quote'
  if (e.price == null) return 'Price to be updated'
  const prefix = e.mode === 'starting' ? 'Starting at ' : ''
  return `${prefix}₹${e.price.toLocaleString('en-IN')}`
}
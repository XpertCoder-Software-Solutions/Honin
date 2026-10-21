import type { Category, QuoteStatus } from './types'

// Validated with the dataviz palette checker (lightness, chroma, CVD separation).
export const categoryColors: Record<Category, string> = {
  construction: '#3d7fb8',
  landscaping: '#1a8a55',
  'pest-control': '#c9a227',
}

export const seriesColors = { visits: '#1a8a55', visitors: '#3d7fb8', quotes: '#1a8a55' }

export const statusTones: Record<QuoteStatus, 'gold' | 'blue' | 'green' | 'gray' | 'red'> = {
  new: 'gold',
  contacted: 'blue',
  in_progress: 'green',
  closed: 'gray',
  spam: 'red',
}

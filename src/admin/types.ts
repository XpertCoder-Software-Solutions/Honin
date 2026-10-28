export type Category = 'construction' | 'landscaping' | 'pest-control'
export type Role = 'admin' | 'editor'
export type QuoteStatus = 'new' | 'contacted' | 'in_progress' | 'closed' | 'spam'

export const categoryLabels: Record<Category, string> = {
  construction: 'المقاولات والأعمال المساحية',
  landscaping: 'الزراعة وتنسيق الحدائق',
  'pest-control': 'مكافحة الحشرات والقوارض',
}

export const categories = Object.keys(categoryLabels) as Category[]

export const statusLabels: Record<QuoteStatus, string> = {
  new: 'جديد',
  contacted: 'تم التواصل',
  in_progress: 'قيد التنفيذ',
  closed: 'مغلق',
  spam: 'مزعج',
}

export type User = {
  id: number
  name: string
  email: string
  role: Role
  is_active: boolean
  last_login_at: string | null
  created_at: string
}

export type QuoteRequest = {
  id: number
  name: string
  phone: string
  service: Category | null
  service_label: string | null
  message: string
  status: QuoteStatus
  notes: string | null
  handler?: { id: number; name: string } | null
  contacted_at: string | null
  created_at: string
}

export type HeroSlide = {
  id: number
  category: Category
  title: string
  subtitle: string | null
  card_title: string
  card_description: string | null
  image_url: string | null
  sort_order: number
  is_active: boolean
}

export type Project = {
  id: number
  category: Category
  title: string
  description: string | null
  image_url: string | null
  is_featured: boolean
  is_published: boolean
  sort_order: number
}

export type GalleryImage = {
  id: number
  category: Category
  caption: string | null
  image_url: string | null
  sort_order: number
}

export type Client = {
  id: number
  name: string
  website: string | null
  logo_url: string | null
  sort_order: number
}

export type Service = {
  id: number
  category: Category
  title: string
  description: string | null
  features: string[]
}

export type Settings = {
  phones?: Array<{ label: string; number: string }>
  email?: string | null
  address?: string | null
  working_hours?: string[]
  emergency_note?: string | null
  tax_number?: string | null
  commercial_register?: string | null
  stats?: { years: number; projects: number; clients: number }
}

export type DailyPoint = { date: string; visits: number; visitors: number; quotes: number }

export type Stats = {
  range: { days: number; from: string; to: string }
  totals: {
    visits: number
    visits_previous: number
    visitors: number
    quotes: number
    quotes_previous: number
    quotes_new: number
    projects: number
    gallery_images: number
  }
  daily: DailyPoint[]
  quotes_by_service: Partial<Record<Category, number>>
  quotes_by_status: Partial<Record<QuoteStatus, number>>
  top_pages: Array<{ path: string; total: number }>
  devices: Partial<Record<'desktop' | 'mobile' | 'tablet', number>>
  recent_quotes: QuoteRequest[]
}

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { API_URL } from './api'

export type Category = 'construction' | 'landscaping' | 'pest-control'

export type SiteContent = {
  hero_slides: Array<{ id: number; category: Category; title: string; subtitle: string | null; card_title: string; card_description: string | null; image_url: string | null }>
  services: Array<{ id: number; category: Category; title: string; description: string | null; features: string[] }>
  projects: Array<{ id: number; category: Category; category_label: string; title: string; description: string | null; image_url: string | null; is_featured: boolean }>
  gallery: Array<{ id: number; category: Category; caption: string | null; image_url: string | null }>
  clients: Array<{ id: number; name: string; website: string | null; logo_url: string | null }>
  settings: {
    phones?: Array<{ label: string; number: string }>
    email?: string | null
    address?: string | null
    working_hours?: string[]
    emergency_note?: string | null
    tax_number?: string | null
    commercial_register?: string | null
    social?: Partial<Record<'facebook' | 'twitter' | 'instagram' | 'linkedin', string | null>>
    stats?: { years: number; projects: number; clients: number }
  }
}

const SiteContentContext = createContext<SiteContent | null>(null)

/**
 * Loads the dashboard-managed content once. Until it arrives — or when no API
 * is configured or it fails — components render their built-in content.
 */
export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent | null>(null)

  useEffect(() => {
    if (!API_URL) return
    const controller = new AbortController()

    fetch(`${API_URL}/api/site`, { signal: controller.signal, headers: { Accept: 'application/json' } })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => data && setContent(data))
      .catch(() => {})

    return () => controller.abort()
  }, [])

  return <SiteContentContext.Provider value={content}>{children}</SiteContentContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useSiteContent() {
  return useContext(SiteContentContext)
}

/** Use the API list when it has items, otherwise the built-in fallback. */
// eslint-disable-next-line react-refresh/only-export-components
export function pick<T>(fromApi: T[] | undefined, fallback: T[]): T[] {
  return fromApi && fromApi.length ? fromApi : fallback
}

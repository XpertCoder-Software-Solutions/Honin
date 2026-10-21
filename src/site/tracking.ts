import { useEffect } from 'react'
import { API_URL } from './api'

// Sends one anonymous page view per route change. Failures are ignored on purpose.
export function useVisitTracking(path: string) {
  useEffect(() => {
    if (!API_URL || navigator.webdriver) return

    const body = JSON.stringify({ path, referrer: document.referrer || null })
    fetch(`${API_URL}/api/visits`, {
      method: 'POST',
      body,
      keepalive: true,
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    }).catch(() => {})
  }, [path])
}

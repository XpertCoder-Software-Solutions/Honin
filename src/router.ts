import { useSyncExternalStore } from 'react'

// Hash based routing (#/works, #/gallery) keeps the site deployable as static
// files with no server rewrites. Any other hash (#services, #contact...) is a
// section anchor on the home page.
export type Route = '/' | '/works' | '/gallery'

const routes: Route[] = ['/', '/works', '/gallery']

function subscribe(onChange: () => void) {
  window.addEventListener('hashchange', onChange)
  return () => window.removeEventListener('hashchange', onChange)
}

function getHash() {
  return window.location.hash
}

export function useLocation(): { route: Route; section: string | null } {
  const hash = useSyncExternalStore(subscribe, getHash)

  if (hash.startsWith('#/')) {
    const path = hash.slice(1) as Route
    return { route: routes.includes(path) ? path : '/', section: null }
  }

  return { route: '/', section: hash ? decodeURIComponent(hash.slice(1)) : null }
}

/** Raw hash path, e.g. "/admin/projects" for "#/admin/projects?x=1". */
export function useHashPath() {
  const hash = useSyncExternalStore(subscribe, getHash)
  return hash.startsWith('#/') ? hash.slice(1).split('?')[0] : '/'
}

export function navigate(path: string) {
  window.location.hash = path
}

export function routeHref(route: Route) {
  return route === '/' ? '#/' : `#${route}`
}

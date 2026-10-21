import { useCallback, useEffect, useState } from 'react'
import { ApiError } from '../site/api'
import { useAuth } from './auth'

export function errorMessage(error: unknown) {
  return error instanceof Error ? error.message : 'حدث خطأ غير متوقع.'
}

/** First validation message per field, for showing under inputs. */
export function fieldErrors(error: unknown): Record<string, string> {
  if (!(error instanceof ApiError)) return {}
  return Object.fromEntries(Object.entries(error.errors).map(([field, messages]) => [field, messages[0]]))
}

export function useApi<T>(path: string | null) {
  const { request } = useAuth()
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(Boolean(path))
  const [version, setVersion] = useState(0)

  useEffect(() => {
    if (!path) return
    let cancelled = false

    request<T>(path)
      .then((result) => {
        if (cancelled) return
        setData(result)
        setError(null)
      })
      .catch((err) => !cancelled && setError(errorMessage(err)))
      .finally(() => !cancelled && setLoading(false))

    return () => {
      cancelled = true
    }
  }, [path, request, version])

  const reload = useCallback(() => {
    setLoading(true)
    setVersion((current) => current + 1)
  }, [])

  return { data, setData, error, loading, reload }
}

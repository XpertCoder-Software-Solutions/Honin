// Base URL of the Laravel API. Empty means "no backend": the public site then
// keeps its built-in content and the quote form works offline-only.
export const API_URL = (import.meta.env.VITE_API_URL ?? '').replace(/\/$/, '')

export class ApiError extends Error {
  status: number
  errors: Record<string, string[]>

  constructor(status: number, message: string, errors: Record<string, string[]> = {}) {
    super(message)
    this.status = status
    this.errors = errors
  }
}

export async function apiRequest<T>(path: string, init: RequestInit & { token?: string | null } = {}): Promise<T> {
  if (!API_URL) {
    throw new ApiError(0, 'لم يتم ضبط عنوان الخادم (VITE_API_URL).')
  }

  const { token, headers, body, ...rest } = init
  const isForm = body instanceof FormData

  let response: Response
  try {
    response = await fetch(`${API_URL}/api${path}`, {
      ...rest,
      body,
      headers: {
        Accept: 'application/json',
        ...(isForm || body === undefined ? {} : { 'Content-Type': 'application/json' }),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
    })
  } catch {
    throw new ApiError(0, 'تعذر الاتصال بالخادم. تحقق من اتصالك بالإنترنت.')
  }

  if (response.status === 204) {
    return undefined as T
  }

  const data = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new ApiError(response.status, data.message ?? 'حدث خطأ غير متوقع.', data.errors ?? {})
  }

  return data as T
}

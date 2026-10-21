import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { ApiError, apiRequest } from '../site/api'
import type { User } from './types'

const TOKEN_KEY = 'honain_admin_token'

function readToken() {
  try {
    return localStorage.getItem(TOKEN_KEY)
  } catch {
    return null
  }
}

function writeToken(token: string | null) {
  try {
    if (token) localStorage.setItem(TOKEN_KEY, token)
    else localStorage.removeItem(TOKEN_KEY)
  } catch {
    // Private mode: the session simply won't survive a reload.
  }
}

type AuthState = {
  user: User | null
  token: string | null
  status: 'loading' | 'ready'
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  setUser: (user: User) => void
  /** Authenticated request; signs the user out when the token is rejected. */
  request: <T>(path: string, init?: RequestInit) => Promise<T>
}

const AuthContext = createContext<AuthState | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(readToken)
  const [user, setUser] = useState<User | null>(null)
  const [status, setStatus] = useState<'loading' | 'ready'>(token ? 'loading' : 'ready')

  const clear = useCallback(() => {
    writeToken(null)
    setToken(null)
    setUser(null)
  }, [])

  const request = useCallback(
    async <T,>(path: string, init: RequestInit = {}) => {
      try {
        return await apiRequest<T>(path, { ...init, token })
      } catch (error) {
        if (error instanceof ApiError && error.status === 401) clear()
        throw error
      }
    },
    [token, clear],
  )

  useEffect(() => {
    if (!token) return

    let cancelled = false
    apiRequest<{ data: User }>('/auth/me', { token })
      .then(({ data }) => !cancelled && setUser(data))
      .catch(() => !cancelled && clear())
      .finally(() => !cancelled && setStatus('ready'))

    return () => {
      cancelled = true
    }
  }, [token, clear])

  const login = useCallback(async (email: string, password: string) => {
    const result = await apiRequest<{ token: string; user: User }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
    writeToken(result.token)
    setUser(result.user)
    setToken(result.token)
  }, [])

  const logout = useCallback(async () => {
    await apiRequest('/auth/logout', { method: 'POST', token }).catch(() => {})
    clear()
  }, [token, clear])

  const value = useMemo(
    () => ({ user, token, status, login, logout, setUser, request }),
    [user, token, status, login, logout, request],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useAuth must be used inside AuthProvider')
  return context
}

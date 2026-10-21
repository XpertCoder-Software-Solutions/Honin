import { createContext, useCallback, useContext, useState, type ReactNode } from 'react'
import { CircleAlert, CircleCheck } from 'lucide-react'

type Toast = { id: number; tone: 'success' | 'error'; message: string }

const ToastContext = createContext<(message: string, tone?: Toast['tone']) => void>(() => {})

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const push = useCallback((message: string, tone: Toast['tone'] = 'success') => {
    const id = Date.now() + Math.random()
    setToasts((current) => [...current, { id, tone, message }])
    window.setTimeout(() => setToasts((current) => current.filter((toast) => toast.id !== id)), 3500)
  }, [])

  return (
    <ToastContext.Provider value={push}>
      {children}
      <div className="pointer-events-none fixed bottom-4 left-4 z-[120] flex flex-col gap-2" aria-live="polite">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`fade-up flex items-center gap-2 rounded-[14px] px-4 py-3 text-[14px] font-bold text-white shadow-xl ${toast.tone === 'success' ? 'bg-brand' : 'bg-[#a93226]'}`}
          >
            {toast.tone === 'success' ? <CircleCheck className="h-5 w-5" /> : <CircleAlert className="h-5 w-5" />}
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useToast() {
  return useContext(ToastContext)
}

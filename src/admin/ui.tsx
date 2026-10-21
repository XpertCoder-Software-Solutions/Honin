import { useEffect, useId, useMemo, useRef, type ButtonHTMLAttributes, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react'
import { createPortal } from 'react-dom'
import { ImagePlus, Loader2, X } from 'lucide-react'

type ButtonVariant = 'primary' | 'gold' | 'secondary' | 'ghost' | 'danger'

const buttonVariants: Record<ButtonVariant, string> = {
  primary: 'bg-brand text-white hover:bg-[#154d33] shadow-[0_8px_20px_-10px_rgba(15,61,39,0.7)]',
  gold: 'bg-gold-bright-gradient text-[#0a0a0a] hover:brightness-105',
  secondary: 'border border-[#dfe3df] bg-white text-ink hover:border-brand/40 hover:bg-[#f6f7f5]',
  ghost: 'text-body hover:bg-[#eef1ee] hover:text-brand',
  danger: 'bg-[#c0392b] text-white hover:bg-[#a93226]',
}

export function Button({
  variant = 'primary',
  loading = false,
  icon,
  className = '',
  children,
  disabled,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: ButtonVariant; loading?: boolean; icon?: ReactNode }) {
  return (
    <button
      type="button"
      disabled={disabled || loading}
      className={`inline-flex min-h-11 items-center justify-center gap-2 rounded-[12px] px-4 text-[15px] font-bold transition duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-gold/35 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 ${buttonVariants[variant]} ${className}`}
      {...props}
    >
      {loading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : icon}
      {children}
    </button>
  )
}

export function IconButton({ label, className = '', children, ...props }: ButtonHTMLAttributes<HTMLButtonElement> & { label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      className={`inline-flex h-10 w-10 items-center justify-center rounded-[10px] text-body transition hover:bg-[#eef1ee] hover:text-brand focus:outline-none focus-visible:ring-4 focus-visible:ring-gold/35 ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

const controlClass =
  'w-full rounded-[12px] border border-[#dfe3df] bg-white px-4 text-[15px] text-ink outline-none transition placeholder:text-[#9aa19c] focus:border-brand focus:ring-4 focus:ring-brand/10 aria-[invalid=true]:border-[#c0392b]'

type FieldProps = { label: string; error?: string; hint?: string; children: (id: string) => ReactNode; className?: string }

export function Field({ label, error, hint, children, className = '' }: FieldProps) {
  const id = useId()

  return (
    <div className={className}>
      <label htmlFor={id} className="mb-2 block text-[14px] font-bold text-ink">
        {label}
      </label>
      {children(id)}
      {error ? (
        <p className="mt-1.5 text-[13px] font-bold text-[#c0392b]" role="alert">
          {error}
        </p>
      ) : hint ? (
        <p className="mt-1.5 text-[13px] text-muted">{hint}</p>
      ) : null}
    </div>
  )
}

export function TextInput({ label, error, hint, className, ...props }: InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string; hint?: string }) {
  return (
    <Field label={label} error={error} hint={hint} className={className}>
      {(id) => <input id={id} aria-invalid={Boolean(error)} className={`${controlClass} h-11`} {...props} />}
    </Field>
  )
}

export function TextArea({ label, error, hint, className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string; error?: string; hint?: string }) {
  return (
    <Field label={label} error={error} hint={hint} className={className}>
      {(id) => <textarea id={id} aria-invalid={Boolean(error)} rows={4} className={`${controlClass} resize-y py-3 leading-7`} {...props} />}
    </Field>
  )
}

export function SelectInput({
  label,
  error,
  options,
  className,
  ...props
}: SelectHTMLAttributes<HTMLSelectElement> & { label: string; error?: string; options: Array<{ value: string; label: string }> }) {
  return (
    <Field label={label} error={error} className={className}>
      {(id) => (
        <select id={id} aria-invalid={Boolean(error)} className={`${controlClass} h-11 cursor-pointer`} {...props}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
    </Field>
  )
}

export function Toggle({ label, checked, onChange, description }: { label: string; checked: boolean; onChange: (checked: boolean) => void; description?: string }) {
  return (
    <label className="flex cursor-pointer items-start justify-between gap-4 rounded-[12px] border border-[#dfe3df] bg-white px-4 py-3">
      <span>
        <span className="block text-[14px] font-bold text-ink">{label}</span>
        {description ? <span className="mt-0.5 block text-[13px] text-muted">{description}</span> : null}
      </span>
      <span className="relative mt-0.5 shrink-0">
        <input type="checkbox" className="peer sr-only" checked={checked} onChange={(event) => onChange(event.target.checked)} />
        <span className="block h-6 w-11 rounded-full bg-[#d5dad6] transition peer-checked:bg-brand peer-focus-visible:ring-4 peer-focus-visible:ring-gold/35" />
        <span className="absolute right-0.5 top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform peer-checked:-translate-x-5" />
      </span>
    </label>
  )
}

export function ImagePicker({ label, currentUrl, file, onChange, error, required }: { label: string; currentUrl?: string | null; file: File | null; onChange: (file: File | null) => void; error?: string; required?: boolean }) {
  const inputRef = useRef<HTMLInputElement>(null)
  // Object URL for the picked file; revoked when the file changes or the picker unmounts.
  const preview = useMemo(() => (file ? URL.createObjectURL(file) : null), [file])
  useEffect(() => () => {
    if (preview) URL.revokeObjectURL(preview)
  }, [preview])

  const shown = preview ?? currentUrl ?? null

  return (
    <div>
      <p className="mb-2 text-[14px] font-bold text-ink">
        {label} {required ? <span className="text-[#c0392b]">*</span> : null}
      </p>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        aria-invalid={Boolean(error)}
        className="group relative flex aspect-[16/9] w-full items-center justify-center overflow-hidden rounded-[14px] border-2 border-dashed border-[#cfd6d0] bg-[#f6f7f5] text-muted transition hover:border-brand/50 aria-[invalid=true]:border-[#c0392b]"
      >
        {shown ? (
          <>
            <img src={shown} alt="" className="absolute inset-0 h-full w-full object-cover" />
            <span className="absolute inset-0 flex items-center justify-center bg-black/45 text-[14px] font-bold text-white opacity-0 transition group-hover:opacity-100">
              تغيير الصورة
            </span>
          </>
        ) : (
          <span className="flex flex-col items-center gap-2 text-[14px]">
            <ImagePlus className="h-8 w-8" aria-hidden="true" />
            اضغط لاختيار صورة (JPG أو PNG أو WebP حتى 8MB)
          </span>
        )}
      </button>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="sr-only"
        tabIndex={-1}
        onChange={(event) => onChange(event.target.files?.[0] ?? null)}
      />
      {error ? <p className="mt-1.5 text-[13px] font-bold text-[#c0392b]">{error}</p> : null}
    </div>
  )
}

export function Modal({ open, title, onClose, children, footer, size = 'md' }: { open: boolean; title: string; onClose: () => void; children: ReactNode; footer?: ReactNode; size?: 'md' | 'lg' }) {
  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => event.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

  // Portal to <body>: the animated page wrapper has a transform, which would otherwise trap position:fixed.
  return createPortal(
    <div className="lightbox-backdrop fixed inset-0 z-[90] flex items-end justify-center bg-[#0b1f15]/55 p-0 backdrop-blur-[2px] sm:items-center sm:p-6" onMouseDown={onClose}>
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onMouseDown={(event) => event.stopPropagation()}
        className={`fade-up flex max-h-[92vh] w-full flex-col rounded-t-[22px] bg-white shadow-2xl sm:rounded-[22px] ${size === 'lg' ? 'sm:max-w-[760px]' : 'sm:max-w-[560px]'}`}
      >
        <div className="flex items-center justify-between border-b border-[#eceeec] px-6 py-4">
          <h2 className="text-[18px] font-extrabold text-brand">{title}</h2>
          <IconButton label="إغلاق" onClick={onClose}>
            <X className="h-5 w-5" />
          </IconButton>
        </div>
        <div className="overflow-y-auto px-6 py-5">{children}</div>
        {footer ? <div className="flex flex-wrap items-center justify-end gap-3 border-t border-[#eceeec] px-6 py-4">{footer}</div> : null}
      </div>
    </div>,
    document.body,
  )
}

export function ConfirmDialog({ open, title, message, confirmLabel = 'حذف', loading, onConfirm, onClose }: { open: boolean; title: string; message: string; confirmLabel?: string; loading?: boolean; onConfirm: () => void; onClose: () => void }) {
  return (
    <Modal
      open={open}
      title={title}
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            إلغاء
          </Button>
          <Button variant="danger" loading={loading} onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </>
      }
    >
      <p className="text-[15px] leading-7 text-body">{message}</p>
    </Modal>
  )
}

export function Card({ title, action, children, className = '' }: { title?: string; action?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={`min-w-0 rounded-[18px] border border-[#e6e9e6] bg-white p-5 shadow-[0_1px_2px_rgba(15,61,39,0.04)] sm:p-6 ${className}`}>
      {title ? (
        <div className="mb-4 flex items-center justify-between gap-3">
          <h2 className="text-[16px] font-extrabold text-ink">{title}</h2>
          {action}
        </div>
      ) : null}
      {children}
    </section>
  )
}

export function PageHeader({ title, description, actions }: { title: string; description?: string; actions?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="text-[24px] font-black text-brand sm:text-[28px]">{title}</h1>
        {description ? <p className="mt-1 text-[15px] text-muted">{description}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap gap-3">{actions}</div> : null}
    </div>
  )
}

const badgeTones = {
  green: 'bg-[#e6f4ec] text-[#14653f]',
  gold: 'bg-[#fbf3d9] text-[#7a5d07]',
  blue: 'bg-[#e8f0f8] text-[#2a5d8a]',
  gray: 'bg-[#eff1ef] text-[#555c57]',
  red: 'bg-[#fbe9e7] text-[#a93226]',
}

export function Badge({ tone = 'gray', children }: { tone?: keyof typeof badgeTones; children: ReactNode }) {
  return <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1 text-[12px] font-bold ${badgeTones[tone]}`}>{children}</span>
}

export function EmptyState({ icon, title, description, action }: { icon: ReactNode; title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center rounded-[18px] border border-dashed border-[#d5dad6] bg-white px-6 py-14 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-[16px] bg-[#eef3ef] text-brand">{icon}</span>
      <h3 className="mt-4 text-[17px] font-extrabold text-ink">{title}</h3>
      {description ? <p className="mt-1 max-w-[380px] text-[14px] leading-6 text-muted">{description}</p> : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  )
}

export function Skeleton({ className = '' }: { className?: string }) {
  return <span className={`block animate-pulse rounded-[12px] bg-[#e9ece9] ${className}`} />
}

export function ErrorNotice({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-[14px] border border-[#f1c6c0] bg-[#fdf1ef] px-4 py-3 text-[14px] font-bold text-[#a93226]" role="alert">
      {message}
      {onRetry ? (
        <Button variant="secondary" onClick={onRetry}>
          إعادة المحاولة
        </Button>
      ) : null}
    </div>
  )
}

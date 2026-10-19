import { useEffect } from 'react'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

type LightboxProps = {
  images: Array<{ src: string; alt: string }>
  index: number | null
  onClose: () => void
  onChange: (index: number) => void
}

function Lightbox({ images, index, onClose, onChange }: LightboxProps) {
  const isOpen = index !== null

  useEffect(() => {
    if (index === null) return

    function handleKey(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
      if (index === null) return
      // RTL: the left arrow moves forward
      if (event.key === 'ArrowLeft') onChange((index + 1) % images.length)
      if (event.key === 'ArrowRight') onChange((index - 1 + images.length) % images.length)
    }

    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [index, images.length, onChange, onClose])

  if (!isOpen) return null

  const image = images[index]
  const hasMany = images.length > 1

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={image.alt}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4"
      onClick={onClose}
    >
      <img
        src={image.src}
        alt={image.alt}
        className="max-h-[85vh] max-w-full rounded-[16px] object-contain"
        onClick={(event) => event.stopPropagation()}
      />

      <button
        type="button"
        aria-label="إغلاق"
        onClick={onClose}
        className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
      >
        <X className="h-6 w-6" />
      </button>

      {hasMany ? (
        <>
          <button
            type="button"
            aria-label="الصورة السابقة"
            onClick={(event) => {
              event.stopPropagation()
              onChange((index - 1 + images.length) % images.length)
            }}
            className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          <button
            type="button"
            aria-label="الصورة التالية"
            onClick={(event) => {
              event.stopPropagation()
              onChange((index + 1) % images.length)
            }}
            className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
        </>
      ) : null}
    </div>
  )
}

export default Lightbox

import type { CSSProperties, ReactNode } from 'react'
import { useInView } from '../hooks'

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  variant?: 'up' | 'fade' | 'scale'
}

// Fades/slides its content in the first time it scrolls into view.
function Reveal({ children, className = '', delay = 0, variant = 'up' }: RevealProps) {
  const { ref, inView } = useInView<HTMLDivElement>()
  const variantClass = variant === 'fade' ? 'reveal-fade' : variant === 'scale' ? 'reveal-scale' : ''

  return (
    <div
      ref={ref}
      className={`reveal ${variantClass} ${inView ? 'is-visible' : ''} ${className}`}
      style={{ '--reveal-delay': `${delay}ms` } as CSSProperties}
    >
      {children}
    </div>
  )
}

export default Reveal

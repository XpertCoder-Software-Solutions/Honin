import { useEffect, useRef, useState } from 'react'

export function useWidth<T extends HTMLElement>(initial = 600) {
  const ref = useRef<T>(null)
  const [width, setWidth] = useState(initial)

  useEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new ResizeObserver(([entry]) => setWidth(Math.max(240, Math.round(entry.contentRect.width))))
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  return { ref, width }
}

/** Clean y-axis maximum and ticks (0, step, 2·step…). */
export function niceScale(max: number, tickCount = 4) {
  if (max <= 0) return { max: tickCount, ticks: Array.from({ length: tickCount + 1 }, (_, i) => i) }
  const rough = max / tickCount
  const magnitude = 10 ** Math.floor(Math.log10(rough))
  const step = [1, 2, 2.5, 5, 10].map((m) => m * magnitude).find((s) => s >= rough) ?? rough
  const niceMax = Math.ceil(max / step) * step
  return { max: niceMax, ticks: Array.from({ length: Math.round(niceMax / step) + 1 }, (_, i) => Math.round(i * step * 100) / 100) }
}

import { useState } from 'react'
import { compactNumber, formatDay, formatNumber } from '../format'
import { niceScale, useWidth } from './useWidth'

export type Series = { key: string; label: string; color: string; values: number[] }

type Props = {
  dates: string[]
  series: Series[]
  height?: number
  /** "line" draws lines with a light area wash; "column" draws one column per day (single series). */
  kind?: 'line' | 'column'
  ariaLabel: string
}

const PAD = { top: 12, right: 12, bottom: 28, left: 40 }

function TrendChart({ dates, series, height = 240, kind = 'line', ariaLabel }: Props) {
  const { ref, width } = useWidth<HTMLDivElement>(320)
  const [hover, setHover] = useState<number | null>(null)

  const innerW = width - PAD.left - PAD.right
  const innerH = height - PAD.top - PAD.bottom
  const { max, ticks } = niceScale(Math.max(1, ...series.flatMap((s) => s.values)))
  const count = dates.length
  const step = count > 1 ? innerW / (count - 1) : innerW
  const band = innerW / Math.max(count, 1)

  const x = (i: number) => (kind === 'column' ? PAD.left + band * i + band / 2 : PAD.left + step * i)
  const y = (v: number) => PAD.top + innerH - (v / max) * innerH

  const labelEvery = Math.ceil(count / Math.max(2, Math.floor(innerW / 70)))

  function handleMove(clientX: number, rect: DOMRect) {
    const relative = clientX - rect.left - PAD.left
    const index = kind === 'column' ? Math.floor(relative / band) : Math.round(relative / step)
    setHover(index >= 0 && index < count ? index : null)
  }

  const tooltipLeft = hover === null ? 0 : Math.min(Math.max(x(hover), 90), width - 90)

  return (
    <div ref={ref} className="relative w-full min-w-0 overflow-hidden" dir="ltr">
      <svg
        width={width}
        height={height}
        role="img"
        aria-label={ariaLabel}
        className="block touch-none select-none"
        onPointerMove={(event) => handleMove(event.clientX, event.currentTarget.getBoundingClientRect())}
        onPointerLeave={() => setHover(null)}
      >
        {ticks.map((tick) => (
          <g key={tick}>
            <line x1={PAD.left} x2={width - PAD.right} y1={y(tick)} y2={y(tick)} stroke="#e8ebe8" strokeWidth={1} />
            <text x={PAD.left - 8} y={y(tick)} dy="0.32em" textAnchor="end" fontSize={11} fill="#7a817c">
              {compactNumber(tick)}
            </text>
          </g>
        ))}

        {dates.map((date, i) => {
          // Evenly spaced labels; the last day is always shown, so drop the regular label just before it if they would collide.
          const isLast = i === count - 1
          const regular = i % labelEvery === 0 && (isLast || count - 1 - i >= labelEvery * 0.6)
          if (!regular && !isLast) return null
          const anchor = i === 0 && kind === 'line' ? 'start' : isLast ? 'end' : 'middle'
          return (
            <text key={date} x={isLast ? Math.min(x(i) + (kind === 'column' ? band / 2 : 0), width - PAD.right) : x(i)} y={height - 8} textAnchor={anchor} fontSize={11} fill="#7a817c">
              {formatDay(date)}
            </text>
          )
        })}

        {kind === 'column'
          ? series[0]?.values.map((value, i) => {
              const barW = Math.min(24, Math.max(2, band - 2))
              const h = Math.max(value > 0 ? 2 : 0, (value / max) * innerH)
              const top = PAD.top + innerH - h
              const r = Math.min(4, barW / 2, h)
              return (
                <path
                  key={i}
                  d={`M${x(i) - barW / 2},${PAD.top + innerH} V${top + r} q0,-${r} ${r},-${r} H${x(i) + barW / 2 - r} q${r},0 ${r},${r} V${PAD.top + innerH} Z`}
                  fill={series[0].color}
                  opacity={hover === null || hover === i ? 1 : 0.45}
                />
              )
            })
          : series.map((s) => {
              const points = s.values.map((v, i) => `${x(i)},${y(v)}`).join(' L')
              return (
                <g key={s.key}>
                  <path d={`M${x(0)},${y(0)} L${points} L${x(count - 1)},${y(0)} Z`} fill={s.color} opacity={0.1} />
                  <path d={`M${points}`} fill="none" stroke={s.color} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
                </g>
              )
            })}

        <line x1={PAD.left} x2={width - PAD.right} y1={y(0)} y2={y(0)} stroke="#cfd5d0" strokeWidth={1} />

        {hover !== null && kind === 'line' ? (
          <g>
            <line x1={x(hover)} x2={x(hover)} y1={PAD.top} y2={PAD.top + innerH} stroke="#9aa19c" strokeWidth={1} />
            {series.map((s) => (
              <circle key={s.key} cx={x(hover)} cy={y(s.values[hover])} r={4.5} fill={s.color} stroke="#fff" strokeWidth={2} />
            ))}
          </g>
        ) : null}
      </svg>

      {hover !== null ? (
        <div
          className="pointer-events-none absolute top-0 z-10 min-w-[150px] -translate-x-1/2 rounded-[12px] bg-[#0f2a1c] px-3 py-2 text-[12px] text-white shadow-lg"
          style={{ left: tooltipLeft }}
          dir="rtl"
        >
          <p className="mb-1 font-bold text-white/70">{formatDay(dates[hover])}</p>
          {series.map((s) => (
            <p key={s.key} className="flex items-center justify-between gap-4">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full" style={{ background: s.color }} />
                {s.label}
              </span>
              <span className="font-bold tabular-nums">{formatNumber(s.values[hover])}</span>
            </p>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default TrendChart

import { formatNumber } from '../format'

type Item = { key: string; label: string; value: number; color?: string }

/** Horizontal bars with the label above and the value at the tip — readable without a legend. */
function BarList({ items, emptyLabel = 'لا توجد بيانات بعد' }: { items: Item[]; emptyLabel?: string }) {
  const max = Math.max(1, ...items.map((item) => item.value))
  const total = items.reduce((sum, item) => sum + item.value, 0)

  if (!total) {
    return <p className="py-8 text-center text-[14px] text-muted">{emptyLabel}</p>
  }

  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li key={item.key} title={`${item.label}: ${formatNumber(item.value)}`}>
          <div className="mb-1.5 flex items-center justify-between gap-3 text-[13px]">
            <span className="flex min-w-0 items-center gap-2 font-bold text-ink">
              {item.color ? <span className="h-2.5 w-2.5 shrink-0 rounded-full" style={{ background: item.color }} /> : null}
              <span className="truncate">{item.label}</span>
            </span>
            <span className="shrink-0 tabular-nums text-body">
              {formatNumber(item.value)} <span className="text-muted">({Math.round((item.value / total) * 100)}%)</span>
            </span>
          </div>
          <div className="h-2.5 rounded-full bg-[#eef1ee]">
            <div
              className="h-full rounded-full transition-[width] duration-700"
              style={{ width: `${(item.value / max) * 100}%`, background: item.color ?? '#1a8a55' }}
            />
          </div>
        </li>
      ))}
    </ul>
  )
}

export default BarList

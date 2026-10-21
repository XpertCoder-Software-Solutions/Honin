const dateFormat = new Intl.DateTimeFormat('ar-SA-u-nu-latn-ca-gregory', { day: 'numeric', month: 'short', year: 'numeric' })
const dateTimeFormat = new Intl.DateTimeFormat('ar-SA-u-nu-latn-ca-gregory', { day: 'numeric', month: 'short', hour: 'numeric', minute: '2-digit' })
const dayFormat = new Intl.DateTimeFormat('ar-SA-u-nu-latn-ca-gregory', { day: 'numeric', month: 'short' })
const numberFormat = new Intl.NumberFormat('en-US')

export const formatDate = (value: string | null) => (value ? dateFormat.format(new Date(value)) : '—')
export const formatDateTime = (value: string | null) => (value ? dateTimeFormat.format(new Date(value)) : '—')
export const formatDay = (value: string) => dayFormat.format(new Date(`${value}T00:00:00`))
export const formatNumber = (value: number) => numberFormat.format(value)

export function compactNumber(value: number) {
  return value >= 1000 ? `${Math.round(value / 100) / 10}K` : String(value)
}

/** Percentage change vs the previous period, or null when there is no baseline. */
export function percentChange(current: number, previous: number) {
  if (!previous) return null
  return Math.round(((current - previous) / previous) * 100)
}

// Arabic count phrases: 1 → singular, 2 → dual, 3–10 → plural, 11+ → singular accusative.
function arabicCount(count: number, [one, two, few, many]: [string, string, string, string]) {
  if (count === 1) return one
  if (count === 2) return two
  if (count <= 10) return `${count} ${few}`
  return `${count} ${many}`
}

export function timeAgo(value: string) {
  const minutes = Math.round((Date.now() - new Date(value).getTime()) / 60000)
  if (minutes < 1) return 'الآن'
  if (minutes < 60) return `منذ ${arabicCount(minutes, ['دقيقة', 'دقيقتين', 'دقائق', 'دقيقة'])}`
  const hours = Math.round(minutes / 60)
  if (hours < 24) return `منذ ${arabicCount(hours, ['ساعة', 'ساعتين', 'ساعات', 'ساعة'])}`
  const days = Math.round(hours / 24)
  return days < 30 ? `منذ ${arabicCount(days, ['يوم', 'يومين', 'أيام', 'يومًا'])}` : formatDate(value)
}

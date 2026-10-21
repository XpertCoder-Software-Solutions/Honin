import { useState, type ReactNode } from 'react'
import { ArrowDownLeft, ArrowUpLeft, Eye, Inbox, MousePointerClick, Table2, UsersRound } from 'lucide-react'
import BarList from '../charts/BarList'
import TrendChart from '../charts/TrendChart'
import { formatDay, formatNumber, percentChange, timeAgo } from '../format'
import { categoryColors, seriesColors, statusTones } from '../palette'
import { categories, categoryLabels, statusLabels, type Stats } from '../types'
import { Badge, Card, ErrorNotice, PageHeader, Skeleton } from '../ui'
import { useApi } from '../useApi'
import { useAuth } from '../auth'

const ranges = [7, 30, 90] as const

const pageNames: Record<string, string> = { '/': 'الرئيسية', '/works': 'أعمالنا', '/gallery': 'المعرض' }
const deviceNames: Record<string, string> = { desktop: 'كمبيوتر', mobile: 'جوال', tablet: 'جهاز لوحي' }

function StatTile({ label, value, icon, change, href, highlight }: { label: string; value: number; icon: ReactNode; change?: number | null; href?: string; highlight?: boolean }) {
  const body = (
    <>
      <div className="flex items-center justify-between">
        <span className="text-[14px] font-bold text-body">{label}</span>
        <span className={`flex h-10 w-10 items-center justify-center rounded-[12px] ${highlight ? 'bg-gold-bright-gradient text-brand' : 'bg-[#eef3ef] text-brand'}`}>{icon}</span>
      </div>
      <p className="mt-3 text-[32px] font-black leading-none text-ink tabular-nums">{formatNumber(value)}</p>
      {change !== undefined ? (
        <p className="mt-2 flex items-center gap-1 text-[13px] text-muted">
          {change === null ? (
            'لا توجد بيانات للفترة السابقة'
          ) : (
            <>
              <span className={`inline-flex items-center gap-0.5 font-bold ${change >= 0 ? 'text-[#14653f]' : 'text-[#a93226]'}`}>
                {change >= 0 ? <ArrowUpLeft className="h-4 w-4" /> : <ArrowDownLeft className="h-4 w-4" />}
                {Math.abs(change)}%
              </span>
              مقارنة بالفترة السابقة
            </>
          )}
        </p>
      ) : null}
    </>
  )

  const className = 'block rounded-[18px] border border-[#e6e9e6] bg-white p-5 transition'
  return href ? (
    <a href={href} className={`${className} hover:-translate-y-0.5 hover:border-gold/60 hover:shadow-md`}>
      {body}
    </a>
  ) : (
    <div className={className}>{body}</div>
  )
}

function DailyTable({ stats }: { stats: Stats }) {
  return (
    <div className="max-h-[260px] overflow-auto rounded-[12px] border border-[#eceeec]">
      <table className="w-full text-[13px]">
        <thead className="sticky top-0 bg-[#f6f7f5] text-right text-body">
          <tr>
            <th className="px-3 py-2">اليوم</th>
            <th className="px-3 py-2">الزيارات</th>
            <th className="px-3 py-2">الزوار</th>
            <th className="px-3 py-2">الطلبات</th>
          </tr>
        </thead>
        <tbody>
          {[...stats.daily].reverse().map((day) => (
            <tr key={day.date} className="border-t border-[#f0f2f0] tabular-nums">
              <td className="px-3 py-2">{formatDay(day.date)}</td>
              <td className="px-3 py-2">{day.visits}</td>
              <td className="px-3 py-2">{day.visitors}</td>
              <td className="px-3 py-2">{day.quotes}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function OverviewPage() {
  const { user } = useAuth()
  const [days, setDays] = useState<(typeof ranges)[number]>(30)
  const [showTable, setShowTable] = useState(false)
  const { data: stats, error, loading, reload } = useApi<Stats>(`/admin/stats?days=${days}`)

  const rangeControl = (
    <div className="flex rounded-[12px] border border-[#dfe3df] bg-white p-1" role="group" aria-label="الفترة الزمنية">
      {ranges.map((range) => (
        <button
          key={range}
          type="button"
          aria-pressed={days === range}
          onClick={() => setDays(range)}
          className={`rounded-[9px] px-3 py-1.5 text-[13px] font-bold transition ${days === range ? 'bg-brand text-white' : 'text-body hover:text-brand'}`}
        >
          آخر {range} يوم
        </button>
      ))}
    </div>
  )

  return (
    <>
      <PageHeader title={`أهلًا، ${user?.name ?? ''}`} description="ملخص أداء الموقع وطلبات العملاء." actions={rangeControl} />

      {error ? <ErrorNotice message={error} onRetry={reload} /> : null}

      {!stats ? (
        loading ? (
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }, (_, i) => (
              <Skeleton key={i} className="h-[132px]" />
            ))}
            <Skeleton className="h-[320px] sm:col-span-2 xl:col-span-4" />
          </div>
        ) : null
      ) : (
        <div className={`space-y-6 transition-opacity ${loading ? 'opacity-60' : ''}`}>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <StatTile label="الزيارات" value={stats.totals.visits} icon={<Eye className="h-5 w-5" />} change={percentChange(stats.totals.visits, stats.totals.visits_previous)} />
            <StatTile label="الزوار" value={stats.totals.visitors} icon={<UsersRound className="h-5 w-5" />} />
            <StatTile label="طلبات عروض الأسعار" value={stats.totals.quotes} icon={<MousePointerClick className="h-5 w-5" />} change={percentChange(stats.totals.quotes, stats.totals.quotes_previous)} />
            <StatTile label="طلبات تنتظر الرد" value={stats.totals.quotes_new} icon={<Inbox className="h-5 w-5" />} href="#/admin/quotes" highlight={stats.totals.quotes_new > 0} />
          </div>

          <Card
            title="الزيارات اليومية"
            action={
              <button type="button" onClick={() => setShowTable((value) => !value)} className="inline-flex items-center gap-1.5 text-[13px] font-bold text-brand hover:text-gold" aria-pressed={showTable}>
                <Table2 className="h-4 w-4" /> {showTable ? 'عرض كرسم' : 'عرض كجدول'}
              </button>
            }
          >
            {showTable ? (
              <DailyTable stats={stats} />
            ) : (
              <>
                <div className="mb-3 flex gap-5 text-[13px] text-body">
                  <span className="flex items-center gap-1.5"><span className="h-0.5 w-4 rounded-full" style={{ background: seriesColors.visits }} />الزيارات</span>
                  <span className="flex items-center gap-1.5"><span className="h-0.5 w-4 rounded-full" style={{ background: seriesColors.visitors }} />الزوار</span>
                </div>
                <TrendChart
                  ariaLabel="الزيارات والزوار يوميًا"
                  dates={stats.daily.map((d) => d.date)}
                  series={[
                    { key: 'visits', label: 'الزيارات', color: seriesColors.visits, values: stats.daily.map((d) => d.visits) },
                    { key: 'visitors', label: 'الزوار', color: seriesColors.visitors, values: stats.daily.map((d) => d.visitors) },
                  ]}
                />
              </>
            )}
          </Card>

          <div className="grid gap-6 xl:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
            <Card title="طلبات عروض الأسعار يوميًا">
              <TrendChart
                kind="column"
                height={220}
                ariaLabel="عدد طلبات عروض الأسعار يوميًا"
                dates={stats.daily.map((d) => d.date)}
                series={[{ key: 'quotes', label: 'الطلبات', color: seriesColors.quotes, values: stats.daily.map((d) => d.quotes) }]}
              />
            </Card>

            <Card title="الطلبات حسب الخدمة">
              <BarList
                emptyLabel="لا توجد طلبات في هذه الفترة"
                items={categories.map((category) => ({
                  key: category,
                  label: categoryLabels[category],
                  value: stats.quotes_by_service[category] ?? 0,
                  color: categoryColors[category],
                }))}
              />
            </Card>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <Card title="أحدث الطلبات" className="lg:col-span-2" action={<a href="#/admin/quotes" className="text-[13px] font-bold text-brand hover:text-gold">عرض الكل</a>}>
              {stats.recent_quotes.length ? (
                <ul className="divide-y divide-[#f0f2f0]">
                  {stats.recent_quotes.map((quote) => (
                    <li key={quote.id}>
                      <a href={`#/admin/quotes?id=${quote.id}`} className="flex items-center justify-between gap-3 rounded-[10px] px-2 py-3 transition hover:bg-[#f6f7f5]">
                        <span className="min-w-0">
                          <span className="block truncate text-[14px] font-bold text-ink">{quote.name}</span>
                          <span className="block truncate text-[13px] text-muted">{quote.service_label ?? 'بدون تحديد خدمة'} · {timeAgo(quote.created_at)}</span>
                        </span>
                        <Badge tone={statusTones[quote.status]}>{statusLabels[quote.status]}</Badge>
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="py-8 text-center text-[14px] text-muted">لم تصل أي طلبات بعد.</p>
              )}
            </Card>

            <div className="space-y-6">
              <Card title="الأجهزة">
                <BarList
                  items={Object.entries(deviceNames).map(([key, label]) => ({ key, label, value: stats.devices[key as keyof Stats['devices']] ?? 0, color: '#1a8a55' }))}
                />
              </Card>
              <Card title="أكثر الصفحات زيارة">
                <BarList items={stats.top_pages.map((page) => ({ key: page.path, label: pageNames[page.path] ?? page.path, value: page.total, color: '#3d7fb8' }))} />
              </Card>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default OverviewPage

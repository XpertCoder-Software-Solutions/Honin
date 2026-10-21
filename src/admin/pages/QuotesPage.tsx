import { useEffect, useState } from 'react'
import { Download, Inbox, MessageCircle, Phone, Search, Trash2 } from 'lucide-react'
import { API_URL } from '../../site/api'
import { useAuth } from '../auth'
import { formatDateTime, timeAgo } from '../format'
import { statusTones } from '../palette'
import { categories, categoryLabels, statusLabels, type QuoteRequest, type QuoteStatus } from '../types'
import { Badge, Button, ConfirmDialog, EmptyState, ErrorNotice, Modal, PageHeader, SelectInput, Skeleton, TextArea } from '../ui'
import { errorMessage, useApi } from '../useApi'
import { useToast } from '../toast'

type Page = {
  data: QuoteRequest[]
  meta: { current_page: number; last_page: number; total: number }
  counts: Partial<Record<QuoteStatus, number>>
}

const statuses = Object.keys(statusLabels) as QuoteStatus[]

function readInitialId() {
  const match = window.location.hash.match(/[?&]id=(\d+)/)
  return match ? Number(match[1]) : null
}

function QuoteDetail({ quoteId, onClose, onChanged }: { quoteId: number; onClose: () => void; onChanged: () => void }) {
  const { request } = useAuth()
  const toast = useToast()
  const { data, setData, error } = useApi<{ data: QuoteRequest }>(`/admin/quote-requests/${quoteId}`)
  const quote = data?.data
  const [notes, setNotes] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  async function save(changes: Partial<Pick<QuoteRequest, 'status' | 'notes'>>) {
    setSaving(true)
    try {
      const result = await request<{ data: QuoteRequest }>(`/admin/quote-requests/${quoteId}`, { method: 'PUT', body: JSON.stringify(changes) })
      setData(result)
      setNotes(null)
      onChanged()
      toast('تم حفظ التغييرات')
    } catch (err) {
      toast(errorMessage(err), 'error')
    } finally {
      setSaving(false)
    }
  }

  async function remove() {
    setSaving(true)
    try {
      await request(`/admin/quote-requests/${quoteId}`, { method: 'DELETE' })
      toast('تم حذف الطلب')
      onChanged()
      onClose()
    } catch (err) {
      toast(errorMessage(err), 'error')
      setSaving(false)
    }
  }

  const whatsapp = quote ? `https://wa.me/966${quote.phone.slice(1)}` : '#'

  return (
    <Modal open title={quote ? `طلب رقم ${quote.id}` : 'تفاصيل الطلب'} onClose={onClose} size="lg">
      {error ? <ErrorNotice message={error} /> : null}
      {!quote ? (
        <div className="space-y-3"><Skeleton className="h-6 w-1/2" /><Skeleton className="h-24" /></div>
      ) : (
        <div className="space-y-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h3 className="text-[20px] font-extrabold text-ink">{quote.name}</h3>
              <p className="mt-1 text-[14px] text-muted">{formatDateTime(quote.created_at)} · {quote.service_label ?? 'بدون تحديد خدمة'}</p>
            </div>
            <Badge tone={statusTones[quote.status]}>{statusLabels[quote.status]}</Badge>
          </div>

          <div className="flex flex-wrap gap-3">
            <a href={`tel:+966${quote.phone.slice(1)}`} className="inline-flex min-h-11 items-center gap-2 rounded-[12px] bg-brand px-4 text-[15px] font-bold text-white hover:bg-[#154d33]">
              <Phone className="h-4 w-4" /> <span dir="ltr">{quote.phone}</span>
            </a>
            <a href={whatsapp} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-[12px] border border-[#dfe3df] px-4 text-[15px] font-bold text-ink hover:border-brand/40">
              <MessageCircle className="h-4 w-4" /> واتساب
            </a>
          </div>

          <div className="rounded-[14px] bg-[#f6f7f5] p-4">
            <p className="mb-1 text-[13px] font-bold text-muted">الرسالة</p>
            <p className="whitespace-pre-line text-[15px] leading-7 text-ink">{quote.message}</p>
          </div>

          <div>
            <p className="mb-2 text-[14px] font-bold text-ink">حالة الطلب</p>
            <div className="flex flex-wrap gap-2">
              {statuses.map((status) => (
                <button
                  key={status}
                  type="button"
                  disabled={saving}
                  aria-pressed={quote.status === status}
                  onClick={() => quote.status !== status && save({ status })}
                  className={`rounded-full border px-3.5 py-1.5 text-[13px] font-bold transition ${
                    quote.status === status ? 'border-brand bg-brand text-white' : 'border-[#dfe3df] bg-white text-body hover:border-brand/40'
                  }`}
                >
                  {statusLabels[status]}
                </button>
              ))}
            </div>
            {quote.handler ? <p className="mt-2 text-[13px] text-muted">آخر تحديث بواسطة {quote.handler.name}</p> : null}
          </div>

          <div>
            <TextArea label="ملاحظات داخلية" placeholder="مثال: تم الاتصال وتحديد موعد للمعاينة" value={notes ?? quote.notes ?? ''} onChange={(event) => setNotes(event.target.value)} />
            <div className="mt-3 flex flex-wrap justify-between gap-3">
              <Button variant="ghost" className="text-[#a93226] hover:bg-[#fbe9e7] hover:text-[#a93226]" icon={<Trash2 className="h-4 w-4" />} onClick={() => setConfirmDelete(true)}>
                حذف الطلب
              </Button>
              <Button loading={saving} disabled={notes === null} onClick={() => save({ notes })}>
                حفظ الملاحظات
              </Button>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog open={confirmDelete} title="حذف الطلب" message="سيتم حذف هذا الطلب نهائيًا. هل أنت متأكد؟" loading={saving} onConfirm={remove} onClose={() => setConfirmDelete(false)} />
    </Modal>
  )
}

function QuotesPage() {
  const { token } = useAuth()
  const toast = useToast()
  const [status, setStatus] = useState<QuoteStatus | ''>('')
  const [service, setService] = useState('')
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('')
  const [page, setPage] = useState(1)
  const [openId, setOpenId] = useState<number | null>(readInitialId)

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setQuery(search.trim())
      setPage(1)
    }, 350)
    return () => window.clearTimeout(timer)
  }, [search])

  const params = new URLSearchParams({ page: String(page) })
  if (status) params.set('status', status)
  if (service) params.set('service', service)
  if (query) params.set('search', query)

  const { data, error, loading, reload } = useApi<Page>(`/admin/quote-requests?${params}`)
  const total = Object.values(data?.counts ?? {}).reduce((sum, value) => sum + (value ?? 0), 0)

  async function exportCsv() {
    params.delete('page')
    try {
      const response = await fetch(`${API_URL}/api/admin/quote-requests/export?${params}`, { headers: { Authorization: `Bearer ${token}` } })
      if (!response.ok) throw new Error()
      const url = URL.createObjectURL(await response.blob())
      const link = Object.assign(document.createElement('a'), { href: url, download: `طلبات-عروض-الأسعار.csv` })
      link.click()
      URL.revokeObjectURL(url)
    } catch {
      toast('تعذر تصدير الملف', 'error')
    }
  }

  function closeDetail() {
    setOpenId(null)
    if (window.location.hash.includes('?')) history.replaceState(null, '', '#/admin/quotes')
  }

  return (
    <>
      <PageHeader
        title="طلبات عروض الأسعار"
        description="الطلبات الواردة من نموذج «طلب عرض سعر» في الموقع."
        actions={<Button variant="secondary" icon={<Download className="h-4 w-4" />} onClick={exportCsv}>تصدير Excel</Button>}
      />

      <div className="mb-4 flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="تصفية حسب الحالة">
        {[{ value: '' as const, label: 'الكل', count: total }, ...statuses.map((value) => ({ value, label: statusLabels[value], count: data?.counts[value] ?? 0 }))].map((tab) => (
          <button
            key={tab.value || 'all'}
            type="button"
            role="tab"
            aria-selected={status === tab.value}
            onClick={() => {
              setStatus(tab.value)
              setPage(1)
            }}
            className={`flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-[14px] font-bold transition ${status === tab.value ? 'bg-brand text-white' : 'bg-white text-body hover:text-brand'}`}
          >
            {tab.label}
            <span className={`rounded-full px-2 text-[12px] tabular-nums ${status === tab.value ? 'bg-white/20' : 'bg-[#eef1ee]'}`}>{tab.count}</span>
          </button>
        ))}
      </div>

      <div className="mb-4 grid gap-3 sm:grid-cols-[minmax(0,1fr)_260px]">
        <div className="relative">
          <Search className="pointer-events-none absolute right-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="ابحث بالاسم أو رقم الجوال أو نص الرسالة"
            aria-label="بحث"
            className="h-11 w-full rounded-[12px] border border-[#dfe3df] bg-white pl-4 pr-11 text-[15px] outline-none focus:border-brand focus:ring-4 focus:ring-brand/10"
          />
        </div>
        <SelectInput
          label="الخدمة"
          className="[&>label]:sr-only"
          value={service}
          onChange={(event) => {
            setService(event.target.value)
            setPage(1)
          }}
          options={[{ value: '', label: 'كل الخدمات' }, ...categories.map((value) => ({ value, label: categoryLabels[value] }))]}
        />
      </div>

      {error ? <ErrorNotice message={error} onRetry={reload} /> : null}

      {!data && loading ? (
        <div className="space-y-3">{Array.from({ length: 5 }, (_, i) => <Skeleton key={i} className="h-[72px]" />)}</div>
      ) : data && !data.data.length ? (
        <EmptyState icon={<Inbox className="h-7 w-7" />} title="لا توجد طلبات" description={query || status || service ? 'لا توجد نتائج مطابقة لعوامل التصفية الحالية.' : 'ستظهر هنا الطلبات القادمة من الموقع.'} />
      ) : data ? (
        <div className={`overflow-hidden rounded-[18px] border border-[#e6e9e6] bg-white transition-opacity ${loading ? 'opacity-60' : ''}`}>
          <table className="w-full text-right">
            <thead className="hidden bg-[#f6f7f5] text-[13px] text-body md:table-header-group">
              <tr>
                <th className="px-5 py-3 font-bold">العميل</th>
                <th className="px-5 py-3 font-bold">الخدمة</th>
                <th className="px-5 py-3 font-bold">الرسالة</th>
                <th className="px-5 py-3 font-bold">التاريخ</th>
                <th className="px-5 py-3 font-bold">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {data.data.map((quote) => (
                <tr
                  key={quote.id}
                  tabIndex={0}
                  onClick={() => setOpenId(quote.id)}
                  onKeyDown={(event) => event.key === 'Enter' && setOpenId(quote.id)}
                  className={`grid cursor-pointer grid-cols-[1fr_auto] gap-x-3 gap-y-1 border-t border-[#f0f2f0] px-4 py-3.5 transition first:border-t-0 hover:bg-[#f9faf9] focus:bg-[#f3f6f3] focus:outline-none md:table-row md:px-0 ${quote.status === 'new' ? 'bg-[#fffcf2]' : ''}`}
                >
                  <td className="md:px-5 md:py-4">
                    <span className="block text-[15px] font-bold text-ink">{quote.name}</span>
                    <span className="block text-[13px] text-muted" dir="ltr" style={{ textAlign: 'right' }}>{quote.phone}</span>
                  </td>
                  <td className="order-3 text-[13px] text-body md:order-none md:px-5 md:py-4">{quote.service_label ?? '—'}</td>
                  <td className="col-span-2 order-4 max-w-[340px] truncate text-[14px] text-body md:order-none md:px-5 md:py-4">{quote.message}</td>
                  <td className="order-5 whitespace-nowrap text-[13px] text-muted md:order-none md:px-5 md:py-4" title={formatDateTime(quote.created_at)}>{timeAgo(quote.created_at)}</td>
                  <td className="order-2 md:order-none md:px-5 md:py-4"><Badge tone={statusTones[quote.status]}>{statusLabels[quote.status]}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>

          {data.meta.last_page > 1 ? (
            <div className="flex items-center justify-between border-t border-[#f0f2f0] px-5 py-3 text-[14px]">
              <span className="text-muted">صفحة {data.meta.current_page} من {data.meta.last_page} · {data.meta.total} طلب</span>
              <div className="flex gap-2">
                <Button variant="secondary" disabled={page <= 1} onClick={() => setPage(page - 1)}>السابق</Button>
                <Button variant="secondary" disabled={page >= data.meta.last_page} onClick={() => setPage(page + 1)}>التالي</Button>
              </div>
            </div>
          ) : null}
        </div>
      ) : null}

      {openId !== null ? <QuoteDetail quoteId={openId} onClose={closeDetail} onChanged={reload} /> : null}
    </>
  )
}

export default QuotesPage

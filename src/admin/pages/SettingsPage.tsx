import { useState } from 'react'
import { Plus, X } from 'lucide-react'
import { useAuth } from '../auth'
import type { Settings } from '../types'
import { Button, Card, ErrorNotice, IconButton, PageHeader, Skeleton, TextInput } from '../ui'
import { errorMessage, fieldErrors, useApi } from '../useApi'
import { useToast } from '../toast'

function SettingsForm({ initial }: { initial: Settings }) {
  const { request } = useAuth()
  const toast = useToast()
  const [values, setValues] = useState<Settings>({
    phones: [],
    working_hours: [],
    stats: { years: 0, projects: 0, clients: 0 },
    ...initial,
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<unknown>(null)
  const errors = fieldErrors(error)

  const set = <K extends keyof Settings>(key: K, value: Settings[K]) => setValues((current) => ({ ...current, [key]: value }))
  const phones = values.phones ?? []
  const hours = values.working_hours ?? []
  const stats = values.stats ?? { years: 0, projects: 0, clients: 0 }

  async function save() {
    setSaving(true)
    setError(null)
    try {
      const { data } = await request<{ data: Settings }>('/admin/settings', { method: 'PUT', body: JSON.stringify(values) })
      setValues((current) => ({ ...current, ...data }))
      toast('تم حفظ الإعدادات')
    } catch (err) {
      setError(err)
      toast(errorMessage(err), 'error')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card title="أرقام التواصل">
        <ul className="space-y-3">
          {phones.map((phone, index) => (
            <li key={index} className="grid grid-cols-[1fr_1fr_auto] items-end gap-3">
              <TextInput label="القسم" value={phone.label} error={errors[`phones.${index}.label`]} onChange={(event) => set('phones', phones.map((p, i) => (i === index ? { ...p, label: event.target.value } : p)))} />
              <TextInput label="رقم الجوال" dir="ltr" inputMode="tel" value={phone.number} error={errors[`phones.${index}.number`]} onChange={(event) => set('phones', phones.map((p, i) => (i === index ? { ...p, number: event.target.value } : p)))} />
              <IconButton label="حذف الرقم" onClick={() => set('phones', phones.filter((_, i) => i !== index))} className="mb-0.5 hover:bg-[#fbe9e7] hover:text-[#a93226]"><X className="h-4 w-4" /></IconButton>
            </li>
          ))}
        </ul>
        <Button variant="ghost" className="mt-3" icon={<Plus className="h-4 w-4" />} disabled={phones.length >= 6} onClick={() => set('phones', [...phones, { label: '', number: '' }])}>إضافة رقم</Button>
      </Card>

      <Card title="بيانات التواصل">
        <div className="grid gap-4 md:grid-cols-2">
          <TextInput label="البريد الإلكتروني" type="email" dir="ltr" value={values.email ?? ''} error={errors.email} onChange={(event) => set('email', event.target.value)} />
          <TextInput label="العنوان" value={values.address ?? ''} error={errors.address} onChange={(event) => set('address', event.target.value)} />
          <TextInput label="ملاحظة الطوارئ" value={values.emergency_note ?? ''} onChange={(event) => set('emergency_note', event.target.value)} />
        </div>

        <p className="mb-2 mt-5 text-[14px] font-bold text-ink">ساعات العمل</p>
        <ul className="space-y-2">
          {hours.map((line, index) => (
            <li key={index} className="flex items-center gap-2">
              <input aria-label={`سطر ساعات العمل ${index + 1}`} value={line} onChange={(event) => set('working_hours', hours.map((h, i) => (i === index ? event.target.value : h)))} className="h-10 flex-1 rounded-[10px] border border-[#dfe3df] px-3 text-[14px] outline-none focus:border-brand focus:ring-4 focus:ring-brand/10" />
              <IconButton label="حذف" onClick={() => set('working_hours', hours.filter((_, i) => i !== index))}><X className="h-4 w-4" /></IconButton>
            </li>
          ))}
        </ul>
        <Button variant="ghost" className="mt-2" icon={<Plus className="h-4 w-4" />} onClick={() => set('working_hours', [...hours, ''])}>إضافة سطر</Button>
      </Card>

      <Card title="أرقام قسم «أرقامنا تتحدث عن نفسها»">
        <div className="grid gap-4 sm:grid-cols-3">
          <TextInput label="سنوات الخبرة" type="number" min={0} value={stats.years} onChange={(event) => set('stats', { ...stats, years: Number(event.target.value) })} />
          <TextInput label="المشاريع المنجزة" type="number" min={0} value={stats.projects} onChange={(event) => set('stats', { ...stats, projects: Number(event.target.value) })} />
          <TextInput label="العملاء" type="number" min={0} value={stats.clients} onChange={(event) => set('stats', { ...stats, clients: Number(event.target.value) })} />
        </div>
      </Card>

      <Card title="البيانات الرسمية">
        <div className="grid gap-4 md:grid-cols-2">
          <TextInput label="الرقم الضريبي" dir="ltr" value={values.tax_number ?? ''} onChange={(event) => set('tax_number', event.target.value)} />
          <TextInput label="السجل التجاري" dir="ltr" value={values.commercial_register ?? ''} onChange={(event) => set('commercial_register', event.target.value)} />
        </div>
      </Card>

      <div className="sticky bottom-4 flex justify-end">
        <Button loading={saving} onClick={save} className="shadow-xl">حفظ الإعدادات</Button>
      </div>
    </div>
  )
}

function SettingsPage() {
  const { data, error, loading, reload } = useApi<{ data: Settings }>('/admin/settings')

  return (
    <>
      <PageHeader title="الإعدادات" description="بيانات التواصل والأرقام التي تظهر في الموقع والفوتر." />
      {error ? <ErrorNotice message={error} onRetry={reload} /> : null}
      {data ? <SettingsForm initial={Array.isArray(data.data) ? {} : data.data} /> : loading ? <Skeleton className="h-[480px]" /> : null}
    </>
  )
}

export default SettingsPage

import { useState } from 'react'
import { Layers, Plus, X } from 'lucide-react'
import { useAuth } from '../auth'
import { categoryColors } from '../palette'
import type { Service } from '../types'
import { Button, Card, EmptyState, ErrorNotice, IconButton, PageHeader, Skeleton, TextArea, TextInput } from '../ui'
import { errorMessage, fieldErrors, useApi } from '../useApi'
import { useToast } from '../toast'

function ServiceEditor({ service, onSaved }: { service: Service; onSaved: (service: Service) => void }) {
  const { request } = useAuth()
  const toast = useToast()
  const [title, setTitle] = useState(service.title)
  const [description, setDescription] = useState(service.description ?? '')
  const [features, setFeatures] = useState<string[]>(service.features)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<unknown>(null)
  const errors = fieldErrors(error)
  const dirty = title !== service.title || description !== (service.description ?? '') || JSON.stringify(features) !== JSON.stringify(service.features)

  async function save() {
    setSaving(true)
    setError(null)
    try {
      const { data } = await request<{ data: Service }>(`/admin/services/${service.id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, description, features }),
      })
      setFeatures(data.features)
      onSaved(data)
      toast('تم حفظ الخدمة')
    } catch (err) {
      setError(err)
      toast(errorMessage(err), 'error')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Card>
      <div className="mb-5 flex items-center gap-3">
        <span className="h-3 w-3 rounded-full" style={{ background: categoryColors[service.category] }} />
        <h2 className="text-[18px] font-extrabold text-ink">{service.title}</h2>
      </div>

      <div className="grid gap-5 lg:grid-cols-2">
        <div className="space-y-4">
          <TextInput label="اسم الخدمة" value={title} maxLength={120} error={errors.title} onChange={(event) => setTitle(event.target.value)} />
          <TextArea label="الوصف" rows={5} value={description} maxLength={1000} error={errors.description} onChange={(event) => setDescription(event.target.value)} />
        </div>

        <div>
          <p className="mb-2 text-[14px] font-bold text-ink">الخدمات الفرعية</p>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <input
                  value={feature}
                  aria-label={`الخدمة الفرعية ${index + 1}`}
                  maxLength={120}
                  onChange={(event) => setFeatures(features.map((item, i) => (i === index ? event.target.value : item)))}
                  className="h-10 flex-1 rounded-[10px] border border-[#dfe3df] px-3 text-[14px] outline-none focus:border-brand focus:ring-4 focus:ring-brand/10"
                />
                <IconButton label="حذف" onClick={() => setFeatures(features.filter((_, i) => i !== index))} className="hover:bg-[#fbe9e7] hover:text-[#a93226]">
                  <X className="h-4 w-4" />
                </IconButton>
              </li>
            ))}
          </ul>
          <Button variant="ghost" className="mt-2" icon={<Plus className="h-4 w-4" />} disabled={features.length >= 20} onClick={() => setFeatures([...features, ''])}>
            إضافة خدمة فرعية
          </Button>
        </div>
      </div>

      <div className="mt-5 flex justify-end border-t border-[#f0f2f0] pt-4">
        <Button loading={saving} disabled={!dirty} onClick={save}>حفظ التغييرات</Button>
      </div>
    </Card>
  )
}

function ServicesPage() {
  const { data, setData, error, loading, reload } = useApi<{ data: Service[] }>('/admin/services')

  return (
    <>
      <PageHeader title="الخدمات" description="محتوى قسم «مجالات عملنا الرئيسية» في الصفحة الرئيسية." />
      {error ? <ErrorNotice message={error} onRetry={reload} /> : null}
      {!data && loading ? (
        <div className="space-y-5">{Array.from({ length: 3 }, (_, i) => <Skeleton key={i} className="h-[320px]" />)}</div>
      ) : data && !data.data.length ? (
        <EmptyState icon={<Layers className="h-7 w-7" />} title="لا توجد خدمات" description="شغّل أمر php artisan db:seed لإضافة الخدمات الأساسية." />
      ) : (
        <div className="space-y-6">
          {data?.data.map((service) => (
            <ServiceEditor key={service.id} service={service} onSaved={(updated) => setData({ data: data.data.map((s) => (s.id === updated.id ? updated : s)) })} />
          ))}
        </div>
      )}
    </>
  )
}

export default ServicesPage

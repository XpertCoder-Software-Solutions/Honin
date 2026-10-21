import { useState, type FormEvent, type ReactNode } from 'react'
import { ArrowLeft, ArrowRight, ImageOff, Pencil, Plus, Trash2 } from 'lucide-react'
import { useAuth } from './auth'
import { categories, categoryLabels, type Category } from './types'
import { Button, ConfirmDialog, EmptyState, ErrorNotice, IconButton, ImagePicker, Modal, PageHeader, SelectInput, Skeleton, TextArea, TextInput, Toggle } from './ui'
import { errorMessage, fieldErrors, useApi } from './useApi'
import { useToast } from './toast'

export type FieldSpec =
  | { name: string; label: string; type: 'text' | 'url'; required?: boolean; hint?: string; maxLength?: number }
  | { name: string; label: string; type: 'textarea'; required?: boolean; hint?: string; maxLength?: number }
  | { name: string; label: string; type: 'category'; required?: boolean }
  | { name: string; label: string; type: 'toggle'; description?: string; default?: boolean }

type BaseItem = { id: number; sort_order: number; category?: Category }

type Props<T extends BaseItem> = {
  endpoint: string
  title: string
  description: string
  singular: string
  fields: FieldSpec[]
  imageField: keyof T & string
  imageLabel?: string
  imageAspect?: string
  filterByCategory?: boolean
  emptyIcon: ReactNode
  card: (item: T) => { title: string; subtitle?: string | null; badges?: ReactNode }
}

function ItemForm<T extends BaseItem>({ item, props, defaultCategory, onClose, onSaved }: { item: T | null; props: Props<T>; defaultCategory: Category; onClose: () => void; onSaved: () => void }) {
  const { request } = useAuth()
  const toast = useToast()
  const initial = Object.fromEntries(
    props.fields.map((field) => {
      const current = item ? (item as Record<string, unknown>)[field.name] : undefined
      if (field.type === 'toggle') return [field.name, current ?? field.default ?? true]
      if (field.type === 'category') return [field.name, current ?? defaultCategory]
      return [field.name, current ?? '']
    }),
  )
  const [values, setValues] = useState<Record<string, unknown>>(initial)
  const [image, setImage] = useState<File | null>(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<unknown>(null)
  const errors = fieldErrors(error)

  const set = (name: string, value: unknown) => setValues((current) => ({ ...current, [name]: value }))

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setSaving(true)
    setError(null)

    const body = new FormData()
    for (const field of props.fields) {
      const value = values[field.name]
      body.append(field.name, field.type === 'toggle' ? (value ? '1' : '0') : String(value ?? ''))
    }
    if (image) body.append('image', image)

    try {
      await request(item ? `${props.endpoint}/${item.id}` : props.endpoint, { method: 'POST', body })
      toast(item ? 'تم حفظ التعديلات' : `تمت إضافة ${props.singular}`)
      onSaved()
      onClose()
    } catch (err) {
      setError(err)
      if (!Object.keys(fieldErrors(err)).length) toast(errorMessage(err), 'error')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Modal
      open
      size="lg"
      title={item ? `تعديل ${props.singular}` : `إضافة ${props.singular}`}
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>إلغاء</Button>
          <Button type="submit" form="content-form" loading={saving}>{item ? 'حفظ التعديلات' : 'إضافة'}</Button>
        </>
      }
    >
      <form id="content-form" onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]" noValidate>
        <ImagePicker
          label={props.imageLabel ?? 'الصورة'}
          required={!item}
          currentUrl={item ? (item[props.imageField] as string | null) : null}
          file={image}
          onChange={setImage}
          error={errors.image}
        />

        <div className="space-y-4">
          {props.fields.map((field) => {
            const value = values[field.name]
            switch (field.type) {
              case 'category':
                return (
                  <SelectInput key={field.name} label={field.label} value={String(value)} error={errors[field.name]} onChange={(event) => set(field.name, event.target.value)} options={categories.map((c) => ({ value: c, label: categoryLabels[c] }))} />
                )
              case 'toggle':
                return <Toggle key={field.name} label={field.label} description={field.description} checked={Boolean(value)} onChange={(checked) => set(field.name, checked)} />
              case 'textarea':
                return <TextArea key={field.name} label={field.label} hint={field.hint} maxLength={field.maxLength} value={String(value ?? '')} error={errors[field.name]} onChange={(event) => set(field.name, event.target.value)} />
              default:
                return (
                  <TextInput
                    key={field.name}
                    label={field.label}
                    type={field.type === 'url' ? 'url' : 'text'}
                    dir={field.type === 'url' ? 'ltr' : undefined}
                    hint={field.hint}
                    maxLength={field.maxLength}
                    required={field.required}
                    value={String(value ?? '')}
                    error={errors[field.name]}
                    onChange={(event) => set(field.name, event.target.value)}
                  />
                )
            }
          })}
        </div>
      </form>
    </Modal>
  )
}

function ContentManager<T extends BaseItem>(props: Props<T>) {
  const { request } = useAuth()
  const toast = useToast()
  const [category, setCategory] = useState<Category | ''>('')
  const { data, setData, error, loading, reload } = useApi<{ data: T[] }>(props.endpoint)
  const [editing, setEditing] = useState<T | 'new' | null>(null)
  const [deleting, setDeleting] = useState<T | null>(null)
  const [busy, setBusy] = useState(false)

  const all = data?.data ?? []
  const items = category ? all.filter((item) => item.category === category) : all

  async function move(index: number, direction: -1 | 1) {
    const target = index + direction
    if (target < 0 || target >= items.length) return

    const visible = [...items]
    ;[visible[index], visible[target]] = [visible[target], visible[index]]
    // Keep hidden (filtered-out) items in place; only the visible ones swap.
    const visibleIds = new Set(visible.map((item) => item.id))
    let cursor = 0
    const ordered = all.map((item) => (visibleIds.has(item.id) ? visible[cursor++] : item))

    setData({ data: ordered })
    try {
      await request(`${props.endpoint}/reorder`, { method: 'POST', body: JSON.stringify({ ids: ordered.map((item) => item.id) }) })
    } catch (err) {
      toast(errorMessage(err), 'error')
      reload()
    }
  }

  async function remove() {
    if (!deleting) return
    setBusy(true)
    try {
      await request(`${props.endpoint}/${deleting.id}`, { method: 'DELETE' })
      setData({ data: all.filter((item) => item.id !== deleting.id) })
      toast(`تم حذف ${props.singular}`)
      setDeleting(null)
    } catch (err) {
      toast(errorMessage(err), 'error')
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <PageHeader
        title={props.title}
        description={props.description}
        actions={<Button icon={<Plus className="h-5 w-5" />} onClick={() => setEditing('new')}>إضافة {props.singular}</Button>}
      />

      {props.filterByCategory ? (
        <div className="mb-5 flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="تصفية حسب التصنيف">
          {[{ value: '' as const, label: 'الكل' }, ...categories.map((value) => ({ value, label: categoryLabels[value] }))].map((tab) => (
            <button
              key={tab.value || 'all'}
              type="button"
              role="tab"
              aria-selected={category === tab.value}
              onClick={() => setCategory(tab.value)}
              className={`shrink-0 rounded-full px-4 py-2 text-[14px] font-bold transition ${category === tab.value ? 'bg-brand text-white' : 'bg-white text-body hover:text-brand'}`}
            >
              {tab.label}
              <span className="mr-1.5 text-[12px] opacity-70">({tab.value ? all.filter((item) => item.category === tab.value).length : all.length})</span>
            </button>
          ))}
        </div>
      ) : null}

      {error ? <ErrorNotice message={error} onRetry={reload} /> : null}

      {!data && loading ? (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{Array.from({ length: 6 }, (_, i) => <Skeleton key={i} className="h-[260px]" />)}</div>
      ) : data && !items.length ? (
        <EmptyState icon={props.emptyIcon} title={`لا يوجد ${props.singular} بعد`} description="ابدأ بالإضافة وسيظهر المحتوى في الموقع مباشرة." action={<Button icon={<Plus className="h-5 w-5" />} onClick={() => setEditing('new')}>إضافة {props.singular}</Button>} />
      ) : (
        <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {items.map((item, index) => {
            const card = props.card(item)
            const imageUrl = item[props.imageField] as string | null
            return (
              <li key={item.id} className="group flex flex-col overflow-hidden rounded-[18px] border border-[#e6e9e6] bg-white transition hover:shadow-[0_16px_30px_-18px_rgba(15,61,39,0.45)]">
                <div className={`relative overflow-hidden bg-[#eef1ee] ${props.imageAspect ?? 'aspect-[16/10]'}`}>
                  {imageUrl ? (
                    <img src={imageUrl} alt="" loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]" />
                  ) : (
                    <span className="flex h-full items-center justify-center text-muted"><ImageOff className="h-8 w-8" /></span>
                  )}
                  <span className="absolute right-3 top-3 rounded-full bg-black/55 px-2.5 py-0.5 text-[12px] font-bold text-white tabular-nums">#{index + 1}</span>
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="text-[16px] font-extrabold leading-6 text-ink">{card.title}</h3>
                  {card.subtitle ? <p className="mt-1 line-clamp-2 text-[13px] leading-6 text-muted">{card.subtitle}</p> : null}
                  {card.badges ? <div className="mt-3 flex flex-wrap gap-1.5">{card.badges}</div> : null}
                  <div className="mt-auto flex items-center justify-between gap-2 pt-4">
                    <div className="flex">
                      <IconButton label="نقل إلى ترتيب أسبق" disabled={index === 0} onClick={() => move(index, -1)} className="disabled:opacity-30">
                        <ArrowRight className="h-4 w-4" />
                      </IconButton>
                      <IconButton label="نقل إلى ترتيب لاحق" disabled={index === items.length - 1} onClick={() => move(index, 1)} className="disabled:opacity-30">
                        <ArrowLeft className="h-4 w-4" />
                      </IconButton>
                    </div>
                    <div className="flex">
                      <IconButton label="تعديل" onClick={() => setEditing(item)}><Pencil className="h-4 w-4" /></IconButton>
                      <IconButton label="حذف" onClick={() => setDeleting(item)} className="hover:bg-[#fbe9e7] hover:text-[#a93226]"><Trash2 className="h-4 w-4" /></IconButton>
                    </div>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      )}

      {editing ? (
        <ItemForm<T>
          item={editing === 'new' ? null : editing}
          props={props}
          defaultCategory={category || 'construction'}
          onClose={() => setEditing(null)}
          onSaved={reload}
        />
      ) : null}

      <ConfirmDialog
        open={Boolean(deleting)}
        title={`حذف ${props.singular}`}
        message={`سيتم حذف «${deleting ? props.card(deleting).title : ''}» وصورته نهائيًا من الموقع.`}
        loading={busy}
        onConfirm={remove}
        onClose={() => setDeleting(null)}
      />
    </>
  )
}

export default ContentManager

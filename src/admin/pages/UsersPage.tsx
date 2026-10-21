import { useState, type FormEvent } from 'react'
import { Pencil, Plus, Trash2, Users } from 'lucide-react'
import { useAuth } from '../auth'
import { formatDate, timeAgo } from '../format'
import type { Role, User } from '../types'
import { Badge, Button, ConfirmDialog, EmptyState, ErrorNotice, IconButton, Modal, PageHeader, SelectInput, Skeleton, TextInput, Toggle } from '../ui'
import { errorMessage, fieldErrors, useApi } from '../useApi'
import { useToast } from '../toast'

const roleLabels: Record<Role, string> = { admin: 'مدير النظام', editor: 'محرر' }

function UserForm({ user, onClose, onSaved }: { user: User | null; onClose: () => void; onSaved: () => void }) {
  const { request, user: me } = useAuth()
  const toast = useToast()
  const [values, setValues] = useState({ name: user?.name ?? '', email: user?.email ?? '', password: '', role: user?.role ?? ('editor' as Role), is_active: user?.is_active ?? true })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<unknown>(null)
  const errors = fieldErrors(error)
  const isSelf = user?.id === me?.id

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setSaving(true)
    setError(null)
    const body = { ...values, ...(user && !values.password ? { password: undefined } : {}) }
    try {
      await request(user ? `/admin/users/${user.id}` : '/admin/users', { method: user ? 'PUT' : 'POST', body: JSON.stringify(body) })
      toast(user ? 'تم تحديث المستخدم' : 'تمت إضافة المستخدم')
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
      title={user ? 'تعديل مستخدم' : 'إضافة مستخدم'}
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>إلغاء</Button>
          <Button type="submit" form="user-form" loading={saving}>{user ? 'حفظ' : 'إضافة'}</Button>
        </>
      }
    >
      <form id="user-form" onSubmit={handleSubmit} className="space-y-4" noValidate>
        <TextInput label="الاسم" value={values.name} error={errors.name} onChange={(event) => setValues({ ...values, name: event.target.value })} />
        <TextInput label="البريد الإلكتروني" type="email" dir="ltr" value={values.email} error={errors.email} onChange={(event) => setValues({ ...values, email: event.target.value })} />
        <TextInput
          label={user ? 'كلمة مرور جديدة (اتركها فارغة للإبقاء على الحالية)' : 'كلمة المرور'}
          type="password"
          dir="ltr"
          autoComplete="new-password"
          hint="8 أحرف على الأقل"
          value={values.password}
          error={errors.password}
          onChange={(event) => setValues({ ...values, password: event.target.value })}
        />
        <SelectInput
          label="الصلاحية"
          value={values.role}
          disabled={isSelf}
          error={errors.role}
          onChange={(event) => setValues({ ...values, role: event.target.value as Role })}
          options={[
            { value: 'editor', label: 'محرر: يدير المحتوى والطلبات' },
            { value: 'admin', label: 'مدير النظام: كل الصلاحيات بما فيها المستخدمين والإعدادات' },
          ]}
        />
        {!isSelf ? <Toggle label="الحساب مفعّل" description="إيقافه يمنع الدخول فورًا" checked={values.is_active} onChange={(checked) => setValues({ ...values, is_active: checked })} /> : null}
      </form>
    </Modal>
  )
}

function UsersPage() {
  const { request, user: me } = useAuth()
  const toast = useToast()
  const { data, error, loading, reload } = useApi<{ data: User[] }>('/admin/users')
  const [editing, setEditing] = useState<User | 'new' | null>(null)
  const [deleting, setDeleting] = useState<User | null>(null)
  const [busy, setBusy] = useState(false)

  async function remove() {
    if (!deleting) return
    setBusy(true)
    try {
      await request(`/admin/users/${deleting.id}`, { method: 'DELETE' })
      toast('تم حذف المستخدم')
      setDeleting(null)
      reload()
    } catch (err) {
      toast(errorMessage(err), 'error')
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <PageHeader title="المستخدمون" description="حسابات فريق العمل وصلاحياتهم." actions={<Button icon={<Plus className="h-5 w-5" />} onClick={() => setEditing('new')}>إضافة مستخدم</Button>} />
      {error ? <ErrorNotice message={error} onRetry={reload} /> : null}

      {!data && loading ? (
        <Skeleton className="h-[240px]" />
      ) : data && !data.data.length ? (
        <EmptyState icon={<Users className="h-7 w-7" />} title="لا يوجد مستخدمون" />
      ) : data ? (
        <div className="relative overflow-x-auto rounded-[18px] border border-[#e6e9e6] bg-white">
          <table className="w-full min-w-[640px] text-right">
            <thead className="bg-[#f6f7f5] text-[13px] text-body">
              <tr>
                <th className="px-5 py-3 font-bold">المستخدم</th>
                <th className="px-5 py-3 font-bold">الصلاحية</th>
                <th className="px-5 py-3 font-bold">الحالة</th>
                <th className="px-5 py-3 font-bold">آخر دخول</th>
                <th className="px-5 py-3"><span className="sr-only">إجراءات</span></th>
              </tr>
            </thead>
            <tbody>
              {data.data.map((user) => (
                <tr key={user.id} className="border-t border-[#f0f2f0]">
                  <td className="px-5 py-4">
                    <span className="block text-[15px] font-bold text-ink">{user.name} {user.id === me?.id ? <span className="text-[12px] text-muted">(أنت)</span> : null}</span>
                    <span className="block text-[13px] text-muted" dir="ltr" style={{ textAlign: 'right' }}>{user.email}</span>
                  </td>
                  <td className="px-5 py-4"><Badge tone={user.role === 'admin' ? 'gold' : 'blue'}>{roleLabels[user.role]}</Badge></td>
                  <td className="px-5 py-4"><Badge tone={user.is_active ? 'green' : 'gray'}>{user.is_active ? 'مفعّل' : 'موقوف'}</Badge></td>
                  <td className="px-5 py-4 text-[13px] text-muted" title={formatDate(user.last_login_at)}>{user.last_login_at ? timeAgo(user.last_login_at) : 'لم يسجل الدخول'}</td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end">
                      <IconButton label="تعديل" onClick={() => setEditing(user)}><Pencil className="h-4 w-4" /></IconButton>
                      {user.id !== me?.id ? (
                        <IconButton label="حذف" onClick={() => setDeleting(user)} className="hover:bg-[#fbe9e7] hover:text-[#a93226]"><Trash2 className="h-4 w-4" /></IconButton>
                      ) : null}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}

      {editing ? <UserForm user={editing === 'new' ? null : editing} onClose={() => setEditing(null)} onSaved={reload} /> : null}
      <ConfirmDialog open={Boolean(deleting)} title="حذف المستخدم" message={`سيتم حذف حساب «${deleting?.name ?? ''}» نهائيًا.`} loading={busy} onConfirm={remove} onClose={() => setDeleting(null)} />
    </>
  )
}

export default UsersPage

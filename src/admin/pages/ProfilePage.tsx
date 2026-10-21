import { useState, type FormEvent } from 'react'
import { useAuth } from '../auth'
import type { User } from '../types'
import { Button, Card, PageHeader, TextInput } from '../ui'
import { errorMessage, fieldErrors } from '../useApi'
import { useToast } from '../toast'

function ProfilePage() {
  const { request, user, setUser } = useAuth()
  const toast = useToast()
  const [name, setName] = useState(user?.name ?? '')
  const [passwords, setPasswords] = useState({ current_password: '', password: '', password_confirmation: '' })
  const [saving, setSaving] = useState<'name' | 'password' | null>(null)
  const [error, setError] = useState<unknown>(null)
  const errors = fieldErrors(error)

  async function submit(kind: 'name' | 'password', body: object) {
    setSaving(kind)
    setError(null)
    try {
      const { data } = await request<{ data: User }>('/auth/me', { method: 'PUT', body: JSON.stringify(body) })
      setUser(data)
      if (kind === 'password') setPasswords({ current_password: '', password: '', password_confirmation: '' })
      toast(kind === 'name' ? 'تم تحديث الاسم' : 'تم تغيير كلمة المرور')
    } catch (err) {
      setError(err)
      if (!Object.keys(fieldErrors(err)).length) toast(errorMessage(err), 'error')
    } finally {
      setSaving(null)
    }
  }

  return (
    <>
      <PageHeader title="حسابي" description={user?.email} />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card title="البيانات الشخصية">
          <form onSubmit={(event: FormEvent) => { event.preventDefault(); submit('name', { name }) }} className="space-y-4">
            <TextInput label="الاسم" value={name} error={errors.name} onChange={(event) => setName(event.target.value)} />
            <Button type="submit" loading={saving === 'name'} disabled={name === user?.name}>حفظ</Button>
          </form>
        </Card>
        <Card title="تغيير كلمة المرور">
          <form onSubmit={(event: FormEvent) => { event.preventDefault(); submit('password', passwords) }} className="space-y-4">
            <TextInput label="كلمة المرور الحالية" type="password" dir="ltr" autoComplete="current-password" value={passwords.current_password} error={errors.current_password} onChange={(event) => setPasswords({ ...passwords, current_password: event.target.value })} />
            <TextInput label="كلمة المرور الجديدة" type="password" dir="ltr" autoComplete="new-password" hint="8 أحرف على الأقل" value={passwords.password} error={errors.password} onChange={(event) => setPasswords({ ...passwords, password: event.target.value })} />
            <TextInput label="تأكيد كلمة المرور" type="password" dir="ltr" autoComplete="new-password" value={passwords.password_confirmation} onChange={(event) => setPasswords({ ...passwords, password_confirmation: event.target.value })} />
            <Button type="submit" loading={saving === 'password'} disabled={!passwords.password}>تغيير كلمة المرور</Button>
          </form>
        </Card>
      </div>
    </>
  )
}

export default ProfilePage

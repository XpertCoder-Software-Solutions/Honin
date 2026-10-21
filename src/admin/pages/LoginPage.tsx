import { useState, type FormEvent } from 'react'
import { Eye, EyeOff, LockKeyhole } from 'lucide-react'
import headerLogo from '../../assets/Logo Header.png'
import heroImage from '../../assets/hero/landscaping.jpg'
import { API_URL } from '../../site/api'
import { useAuth } from '../auth'
import { Button, ErrorNotice, TextInput } from '../ui'
import { errorMessage, fieldErrors } from '../useApi'

function LoginPage() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>(null)
  const errors = fieldErrors(error)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setLoading(true)
    setError(null)
    try {
      await login(email.trim(), password)
    } catch (err) {
      setError(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="grid min-h-screen bg-[#f6f7f5] lg:grid-cols-[1fr_minmax(0,560px)]" dir="rtl">
      <div className="relative hidden overflow-hidden lg:block">
        <img src={heroImage} alt="" className="ken-burns absolute inset-0 h-full w-full object-cover" />
        <span className="absolute inset-0 bg-gradient-to-t from-brand via-brand/60 to-brand/20" />
        <div className="absolute inset-x-12 bottom-14 text-white">
          <p className="inline-flex items-center gap-3 text-[18px] text-white/85">
            <span className="h-0.5 w-8 rounded-full bg-gold" /> لوحة التحكم
          </p>
          <h2 className="mt-3 text-[44px] font-black leading-[1.2]">أدِر محتوى موقع حُنين وطلبات عملائك من مكان واحد</h2>
        </div>
      </div>

      <div className="flex items-center justify-center px-5 py-12 sm:px-12">
        <form onSubmit={handleSubmit} className="fade-up w-full max-w-[400px]" noValidate>
          <div className="mb-8 inline-flex rounded-[16px] bg-brand px-5 py-3">
            <img src={headerLogo} alt="Honain" className="h-[40px] w-auto" />
          </div>

          <h1 className="text-[28px] font-black text-brand">تسجيل الدخول</h1>
          <p className="mt-2 text-[15px] text-muted">أدخل بيانات حسابك للوصول إلى لوحة التحكم.</p>

          <div className="mt-8 space-y-5">
            {!API_URL ? <ErrorNotice message="لم يتم ضبط عنوان الخادم. أضف VITE_API_URL في ملف .env ثم أعد تشغيل المشروع." /> : null}
            {error && !Object.keys(errors).length ? <ErrorNotice message={errorMessage(error)} /> : null}

            <TextInput
              label="البريد الإلكتروني"
              type="email"
              dir="ltr"
              autoComplete="username"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              error={errors.email}
              required
            />

            <div className="relative">
              <TextInput
                label="كلمة المرور"
                type={showPassword ? 'text' : 'password'}
                dir="ltr"
                autoComplete="current-password"
                className="[&_input]:pl-12"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                error={errors.password}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                aria-label={showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'}
                className="absolute left-2 top-[34px] rounded-[8px] p-1.5 text-muted hover:text-brand"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            <Button type="submit" loading={loading} className="h-12 w-full text-[16px]" icon={<LockKeyhole className="h-5 w-5" />}>
              دخول
            </Button>
          </div>

          <a href="#/" className="mt-8 inline-block text-[14px] font-bold text-brand hover:text-gold">
            → العودة إلى الموقع
          </a>
        </form>
      </div>
    </div>
  )
}

export default LoginPage

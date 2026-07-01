import {
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from 'react'
import { Mail, MapPin, Phone, Send, type LucideIcon } from 'lucide-react'
import contactBackground from '../assets/Contact Us Bg.png'

const darkGreen = '#0F3D27'
const gold = '#C9A227'
const iconGradient =
  'linear-gradient(135deg, #0F3D27 0%, #104029 9.09%, #11422B 18.18%, #12452D 27.27%, #13472F 36.36%, #144A31 45.45%, #154D33 54.55%, #164F35 63.64%, #175237 72.73%, #185539 81.82%, #19573B 90.91%, #1A5A3D 100%)'

const phoneDepartments = [
  { label: 'قسم الزراعة', value: '0508542228' },
  { label: 'قسم المكافحة', value: '0543958080' },
  { label: 'قسم المقاولات', value: '0554177768' },
]

const contactEmail = 'info@honain.sa'

const formFields = [
  {
    id: 'name',
    label: 'الاسم',
    placeholder: 'أدخل اسمك الكامل',
    type: 'text',
    autoComplete: 'name',
  },
  {
    id: 'phone',
    label: 'رقم الهاتف',
    placeholder: '05xxxxxxxx',
    type: 'tel',
    autoComplete: 'tel',
  },
] as const

type FormValues = {
  name: string
  phone: string
  message: string
}

type FormErrors = Partial<Record<keyof FormValues, string>>
type TouchedFields = Partial<Record<keyof FormValues, boolean>>

const initialFormValues: FormValues = {
  name: '',
  phone: '',
  message: '',
}

const saudiPhonePattern = /^05\d{8}$/

function validateForm(values: FormValues) {
  const errors: FormErrors = {}
  const name = values.name.trim()
  const phone = values.phone.trim()
  const message = values.message.trim()

  if (!name) {
    errors.name = 'الاسم مطلوب'
  } else if (name.length < 3) {
    errors.name = 'الاسم يجب أن يكون 3 أحرف على الأقل'
  }

  if (!phone) {
    errors.phone = 'رقم الهاتف مطلوب'
  } else if (!saudiPhonePattern.test(phone)) {
    errors.phone = 'أدخل رقم سعودي صحيح بصيغة 05xxxxxxxx'
  }

  if (!message) {
    errors.message = 'الرسالة مطلوبة'
  } else if (message.length < 10) {
    errors.message = 'الرسالة يجب أن تكون 10 أحرف على الأقل'
  }

  return errors
}

function IconBox({ Icon }: { Icon: LucideIcon }) {
  return (
    <span
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white shadow-[0_12px_24px_rgba(11,74,47,0.25)] sm:h-14 sm:w-14 lg:h-16 lg:w-16 lg:rounded-2xl"
      style={{ background: iconGradient }}
    >
      <Icon className="h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7" strokeWidth={2.1} />
    </span>
  )
}

function ContactCard({
  Icon,
  children,
  className = '',
}: {
  Icon: LucideIcon
  children: ReactNode
  className?: string
}) {
  return (
    <article
      className={`flex w-full min-w-0 items-start justify-between gap-4 rounded-2xl bg-white p-5 text-right shadow-[0_18px_36px_rgba(11,74,47,0.16)] ring-1 ring-black/5 sm:items-center sm:p-6 lg:gap-5 lg:rounded-3xl lg:p-8 ${className}`}
      dir="ltr"
    >
      {children}
      <IconBox Icon={Icon} />
    </article>
  )
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) {
    return null
  }

  return (
    <p id={id} className="mt-2 text-sm font-bold text-red-600" role="alert">
      {message}
    </p>
  )
}

function ContactUs() {
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues)
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<TouchedFields>({})
  const [successMessage, setSuccessMessage] = useState('')

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const fieldName = event.target.name as keyof FormValues
    const fieldValue =
      fieldName === 'phone'
        ? event.target.value.replace(/\D/g, '').slice(0, 10)
        : fieldName === 'name'
          ? event.target.value.replace(/[^\p{L}\p{M}\s]/gu, '')
          : event.target.value
    const nextValues = {
      ...formValues,
      [fieldName]: fieldValue,
    }

    setFormValues(nextValues)
    setSuccessMessage('')

    if (touched[fieldName] || errors[fieldName]) {
      setErrors(validateForm(nextValues))
    }
  }

  const handleBlur = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const fieldName = event.target.name as keyof FormValues

    setTouched((currentTouched) => ({
      ...currentTouched,
      [fieldName]: true,
    }))
    setErrors(validateForm(formValues))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const validationErrors = validateForm(formValues)
    setErrors(validationErrors)
    setTouched({ name: true, phone: true, message: true })

    if (Object.keys(validationErrors).length > 0) {
      setSuccessMessage('')
      return
    }

    setSuccessMessage('تم إرسال البيانات بنجاح.')
    setFormValues(initialFormValues)
    setTouched({})
  }

  return (
    <section
      className="relative w-full overflow-hidden bg-cover bg-center px-4 py-12 sm:px-6 sm:py-16 md:px-8 md:py-20 lg:px-[50px] lg:py-[100px]"
      dir="rtl"
      style={{ backgroundImage: `url("${contactBackground}")` }}
    >
      <div
        className="absolute inset-0 bg-[#F8F4E6]/88 backdrop-blur-[1px]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto w-full max-w-[1440px]">
        <header className="mx-auto max-w-[1440px] text-center">
          <p
            className="text-base font-black sm:text-lg lg:text-[20px]"
            style={{ color: gold }}
          >
            تواصل معنا
          </p>
          <h1
            className="mt-3 text-[34px] font-black leading-tight sm:mt-4 sm:text-5xl md:text-6xl lg:mt-5 lg:text-[60px]"
            style={{ color: darkGreen }}
          >
            نحن هنا لخدمتك
          </h1>
          <p className="mx-auto mt-4 max-w-[680px] text-base font-medium leading-7 text-slate-600 sm:text-lg sm:leading-8 lg:mt-5 lg:max-w-[1440px] lg:text-[20px] lg:leading-9">
            تواصل معنا اليوم واحصل على استشارة مجانية وعرض سعر مخصص لمشروعك
          </p>
        </header>

        <div
          className="mx-auto mt-10 grid w-full max-w-[680px] gap-8 sm:mt-12 md:gap-10 lg:mt-[72px] lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-16 xl:gap-20"
          dir="ltr"
        >
          <div className="order-2 space-y-5 sm:space-y-6 lg:order-1 lg:space-y-8">
            <ContactCard
              Icon={Phone}
              className="items-start"
            >
              <div className="grid min-w-0 flex-1 grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5 lg:gap-8">
                {phoneDepartments.map(({ label, value }) => (
                  <div key={label} className="text-right sm:text-center" dir="rtl">
                    <p className="text-[13px] font-bold text-[#4A5565] sm:text-[14px] xl:text-[18px]">
                      {label}
                    </p>
                    <a
                      href={`tel:+966${value.slice(1)}`}
                      className="mt-1 inline-block text-[15px] font-black tracking-wide transition hover:text-[#C9A227] focus:outline-none focus:ring-2 focus:ring-[#C9A227]/50 sm:text-base lg:mt-2 xl:text-[20px]"
                      style={{ color: darkGreen }}
                      dir="ltr"
                    >
                      {value}
                    </a>
                  </div>
                ))}
              </div>
            </ContactCard>

            <ContactCard Icon={Mail}>
              <div className="min-w-0 flex-1" dir="rtl">
                <h2 className="text-base font-bold text-[#4A5565] sm:text-lg lg:text-[18px]">
                  البريد الإلكتروني
                </h2>
                <a
                  href={`mailto:${contactEmail}`}
                  className="mt-1 inline-block break-words text-lg font-black transition hover:text-[#C9A227] focus:outline-none focus:ring-2 focus:ring-[#C9A227]/50 sm:text-[20px] lg:mt-2"
                  style={{ color: darkGreen }}
                  dir="ltr"
                >
                  {contactEmail}
                </a>
              </div>
            </ContactCard>

            <ContactCard Icon={MapPin}>
              <div className="min-w-0 flex-1" dir="rtl">
                <h2 className="text-base font-bold text-[#4A5565] sm:text-lg lg:text-[18px]">
                  العنوان
                </h2>
                <p
                  className="mt-1 text-lg font-black leading-7 sm:text-[20px] sm:leading-9 lg:mt-2"
                  style={{ color: darkGreen }}
                >
                  الرياض، المملكة العربية السعودية
                </p>
              </div>
            </ContactCard>

            <article
              className="rounded-2xl p-5 text-right text-white shadow-[0_18px_36px_rgba(11,74,47,0.18)] sm:p-6 lg:rounded-3xl lg:p-9"
              style={{ background: iconGradient }}
              dir="rtl"
            >
              <h2 className="text-[22px] font-black sm:text-[24px]">
                ساعات العمل
              </h2>
              <div className="mt-5 space-y-3 text-base font-medium leading-7 text-white/80 sm:text-[18px] lg:mt-8 lg:space-y-5">
                <p>السبت - الخميس: 8:00 ص - 5:00 م</p>
                <p>الجمعة: مغلق</p>
              </div>
              <div className="my-5 h-px bg-white/20" />
              <p
                className="text-base font-black sm:text-[18px]"
                style={{ color: gold }}
              >
                خدمة الطوارئ متاحة 24/7
              </p>
            </article>
          </div>

          <form
            className="order-1 w-full rounded-2xl bg-white px-5 py-7 text-right shadow-[0_22px_50px_rgba(11,74,47,0.16)] ring-1 ring-black/5 sm:px-8 sm:py-10 md:px-10 md:py-12 lg:order-2 lg:rounded-3xl lg:p-12"
            dir="rtl"
            noValidate
            onSubmit={handleSubmit}
          >
            <h2
              className="mb-6 text-start text-2xl font-black sm:mb-8 sm:text-[28px] lg:text-[30px]"
              style={{ color: darkGreen }}
            >
              طلب عرض سعر
            </h2>

            <div className="space-y-6">
              {formFields.map(({ id, label, placeholder, type, autoComplete }) => (
                <label
                  key={id}
                  htmlFor={id}
                  className="block text-base font-black text-[#364153] sm:text-[18px]"
                >
                  {label}
                  <input
                    id={id}
                    name={id}
                    type={type}
                    value={formValues[id]}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    inputMode={id === 'phone' ? 'numeric' : undefined}
                    pattern={
                      id === 'phone' ? '[0-9]*' : '[\\p{L}\\p{M}\\s]+'
                    }
                    maxLength={id === 'phone' ? 10 : undefined}
                    aria-invalid={Boolean(errors[id])}
                    aria-describedby={errors[id] ? `${id}-error` : undefined}
                    className={`mt-2 h-[52px] w-full rounded-xl border-2 bg-slate-50/60 px-4 text-right text-base font-medium text-slate-800 outline-none transition placeholder:text-[14px] placeholder:text-[#0A0A0A]/50 focus:bg-white sm:mt-3 sm:h-[58px] sm:rounded-2xl sm:px-5 sm:text-[18px] sm:placeholder:text-[16px] lg:h-[64px] lg:px-6 ${
                      errors[id]
                        ? 'border-red-500 focus:border-red-600'
                        : 'border-slate-200 focus:border-[#0F3D27]'
                    }`}
                  />
                  <FieldError id={`${id}-error`} message={errors[id]} />
                </label>
              ))}

              <label
                htmlFor="message"
                className="block text-base font-black text-[#364153] sm:text-[18px]"
              >
                الرسالة
                <textarea
                  id="message"
                  name="message"
                  value={formValues.message}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="اكتب رسالتك هنا..."
                  rows={6}
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={
                    errors.message ? 'message-error' : undefined
                  }
                  className={`mt-2 min-h-36 w-full resize-none rounded-xl border-2 bg-slate-50/60 px-4 py-4 text-right text-base font-medium text-slate-800 outline-none transition placeholder:text-[14px] placeholder:text-[#0A0A0A]/50 focus:bg-white sm:mt-4 sm:min-h-20 sm:rounded-2xl sm:px-5 sm:py-5 sm:text-xl sm:placeholder:text-[16px] lg:px-6 ${
                    errors.message
                      ? 'border-red-500 focus:border-red-600'
                      : 'border-slate-200 focus:border-[#0F3D27]'
                  }`}
                />
                <FieldError id="message-error" message={errors.message} />
              </label>
            </div>

            {successMessage ? (
              <p className="mt-5 rounded-2xl bg-emerald-50 px-5 py-4 text-base font-black text-[#0F3D27]">
                {successMessage}
              </p>
            ) : null}

            <button
              type="submit"
              className="mt-6 flex h-[52px] w-full items-center justify-center gap-3 rounded-full px-5 text-base font-black transition hover:translate-y-[-1px] hover:brightness-105 focus:outline-none focus:ring-4 focus:ring-[#D4AF28]/35 sm:h-[60px] sm:text-xl lg:h-[68px] lg:gap-4 lg:px-8 lg:text-2xl"
              style={{
                background:
                  'linear-gradient(270deg, #C9A227 0%, #CBA52B 20%, #CDA82F 40%, #D0AA33 60%, #D2AD36 80%, #D4B03A 100%)',
                boxShadow:
                  '0px 8px 10px -6px rgba(0, 0, 0, 0.1), 0px 20px 25px -5px rgba(0, 0, 0, 0.1)',
                color: darkGreen,
              }}
            >
              <span>إرسال الطلب</span>
              <Send className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={2.2} />
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default ContactUs

import {
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from 'react'
import { ChevronDown, Loader2, Mail, MapPin, Phone, Send, type LucideIcon } from 'lucide-react'
import Reveal from '../components/Reveal'
import SectionHeader from '../components/SectionHeader'
import contactBackground from '../assets/contact-bg.jpg'
import { API_URL, ApiError, apiRequest } from '../site/api'
import { useSiteContent } from '../site/content'

const fallbackPhones = [
  { label: 'قسم المقاولات', value: '0554177768' },
  { label: 'قسم المكافحة', value: '0543958080' },
  { label: 'قسم الزراعة', value: '0508542228' },
]

const fallbackEmail = 'info@honain.sa'
const fallbackHours = ['السبت - الخميس: 8:00 ص - 5:00 م', 'الجمعة: مغلق']

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

const serviceOptions = [
  { value: 'construction', label: 'المقاولات والأعمال المساحية' },
  { value: 'landscaping', label: 'الزراعة وتنسيق الحدائق' },
  { value: 'pest-control', label: 'مكافحة الحشرات والقوارض' },
] as const

type FormValues = {
  name: string
  phone: string
  service: string
  message: string
}

type FormErrors = Partial<Record<keyof FormValues, string>>
type TouchedFields = Partial<Record<keyof FormValues, boolean>>

const initialFormValues: FormValues = {
  name: '',
  phone: '',
  service: '',
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
    errors.name = 'يجب أن يتكون الاسم من 3 أحرف على الأقل'
  }

  if (!phone) {
    errors.phone = 'رقم الهاتف مطلوب'
  } else if (!saudiPhonePattern.test(phone)) {
    errors.phone = 'أدخل رقمًا سعوديًا صحيحًا بصيغة 05xxxxxxxx'
  }

  if (!values.service) {
    errors.service = 'اختر الخدمة المطلوبة'
  }

  if (!message) {
    errors.message = 'الرسالة مطلوبة'
  } else if (message.length < 10) {
    errors.message = 'يجب أن تتكون الرسالة من 10 أحرف على الأقل'
  }

  return errors
}

function IconBox({ Icon }: { Icon: LucideIcon }) {
  return (
    <span className="flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-[16px] bg-green-gradient text-white shadow-[0_10px_7.5px_rgba(0,0,0,0.1),0_4px_3px_rgba(0,0,0,0.1)] transition duration-500 group-hover:rotate-[-8deg] sm:h-[64px] sm:w-[64px]">
      <Icon className="h-7 w-7" strokeWidth={2} />
    </span>
  )
}

function ContactCard({ Icon, children }: { Icon: LucideIcon; children: ReactNode }) {
  return (
    <article className="group flex w-full items-center gap-6 rounded-[16px] border border-[#f3f4f6] bg-white p-6 text-right shadow-[0_20px_12.5px_rgba(0,0,0,0.1),0_8px_5px_rgba(0,0,0,0.1)] transition duration-300 hover:-translate-y-1 sm:min-h-[130px] sm:px-[33px]">
      <IconBox Icon={Icon} />
      <div className="min-w-0 flex-1">{children}</div>
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
  const settings = useSiteContent()?.settings
  const phoneDepartments = settings?.phones?.length ? settings.phones.map(({ label, number }) => ({ label, value: number })) : fallbackPhones
  const contactEmail = settings?.email || fallbackEmail
  const address = settings?.address || 'الرياض، المملكة العربية السعودية'
  const workingHours = settings?.working_hours?.length ? settings.working_hours : fallbackHours
  const emergencyNote = settings?.emergency_note || 'خدمة الطوارئ متاحة 24/7'
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [formValues, setFormValues] = useState<FormValues>(initialFormValues)
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<TouchedFields>({})
  const [successMessage, setSuccessMessage] = useState('')

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
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
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const fieldName = event.target.name as keyof FormValues

    setTouched((currentTouched) => ({
      ...currentTouched,
      [fieldName]: true,
    }))
    setErrors(validateForm(formValues))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const validationErrors = validateForm(formValues)
    setErrors(validationErrors)
    setTouched({ name: true, phone: true, service: true, message: true })
    setSubmitError('')

    if (Object.keys(validationErrors).length > 0) {
      setSuccessMessage('')
      return
    }

    if (API_URL) {
      setSubmitting(true)
      try {
        const form = event.currentTarget
        const result = await apiRequest<{ message: string }>('/quote-requests', {
          method: 'POST',
          body: JSON.stringify({
            name: formValues.name.trim(),
            phone: formValues.phone.trim(),
            service: formValues.service,
            message: formValues.message.trim(),
            website: (form.elements.namedItem('website') as HTMLInputElement | null)?.value ?? '',
          }),
        })
        setSuccessMessage(result.message)
      } catch (error) {
        if (error instanceof ApiError && Object.keys(error.errors).length) {
          setErrors(Object.fromEntries(Object.entries(error.errors).map(([field, messages]) => [field, messages[0]])))
        } else {
          setSubmitError(error instanceof ApiError && error.status === 429 ? 'لقد أرسلت عدة طلبات خلال وقت قصير. حاول مرة أخرى بعد قليل.' : 'تعذر إرسال الطلب الآن. حاول مرة أخرى أو تواصل معنا هاتفيًا.')
        }
        return
      } finally {
        setSubmitting(false)
      }
    } else {
      setSuccessMessage('تم إرسال طلبك بنجاح، وسنتواصل معك قريبًا.')
    }

    setFormValues(initialFormValues)
    setTouched({})
  }

  const inputClass = (hasError: boolean) =>
    `mt-3 w-full rounded-[16px] border-2 bg-[#f9fafb] px-6 text-right text-[18px] text-[#0a0a0a] outline-none transition placeholder:text-[#0a0a0a]/50 focus:bg-white ${
      hasError ? 'border-red-500 focus:border-red-600' : 'border-[#e5e7eb] focus:border-brand'
    }`

  return (
    <section id="contact" className="relative w-full scroll-mt-8 overflow-hidden bg-cream px-4 py-16 sm:px-8 sm:py-20 lg:px-[64px] lg:py-[128px]" dir="rtl">
      <img src={contactBackground} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-5" />

      <div className="relative mx-auto w-full max-w-[1440px]">
        <SectionHeader
          eyebrow="تواصل معنا"
          title="نحن هنا لخدمتك"
          description="تواصل معنا اليوم واحصل على استشارة مجانية وعرض سعر مخصص لمشروعك"
        />

        <div className="mt-12 grid gap-8 lg:mt-[80px] lg:grid-cols-2 lg:items-start lg:gap-10 2xl:grid-cols-[615px_minmax(0,1fr)] 2xl:gap-16">
          <Reveal>
          <form
            className="w-full rounded-[24px] border border-[#f3f4f6] bg-white p-6 text-right shadow-[0_25px_25px_rgba(0,0,0,0.25)] sm:p-[49px]"
            noValidate
            onSubmit={handleSubmit}
          >
            <h3 className="text-[26px] font-extrabold leading-9 text-brand sm:text-[30px]">طلب عرض سعر</h3>

            <div className="mt-8 space-y-6">
              {formFields.map(({ id, label, placeholder, type, autoComplete }) => (
                <label key={id} htmlFor={id} className="block text-[18px] font-bold leading-7 text-[#364153]">
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
                    maxLength={id === 'phone' ? 10 : undefined}
                    aria-invalid={Boolean(errors[id])}
                    aria-describedby={errors[id] ? `${id}-error` : undefined}
                    className={`${inputClass(Boolean(errors[id]))} h-[64px] font-normal`}
                  />
                  <FieldError id={`${id}-error`} message={errors[id]} />
                </label>
              ))}

              <label htmlFor="service" className="block text-[18px] font-bold leading-7 text-[#364153]">
                الخدمة المطلوبة
                <span className="relative block">
                  <select
                    id="service"
                    name="service"
                    value={formValues.service}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    aria-invalid={Boolean(errors.service)}
                    aria-describedby={errors.service ? 'service-error' : undefined}
                    className={`${inputClass(Boolean(errors.service))} h-[64px] cursor-pointer appearance-none pl-14 font-normal ${formValues.service ? '' : 'text-[#0a0a0a]/50'}`}
                  >
                    <option value="" disabled>
                      اختر الخدمة
                    </option>
                    {serviceOptions.map((option) => (
                      <option key={option.value} value={option.value} className="text-[#0a0a0a]">
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown aria-hidden="true" className="pointer-events-none absolute left-6 top-1/2 mt-1.5 h-5 w-5 -translate-y-1/2 text-[#0a0a0a]/50" />
                </span>
                <FieldError id="service-error" message={errors.service} />
              </label>

              <label htmlFor="message" className="block text-[18px] font-bold leading-7 text-[#364153]">
                الرسالة
                <textarea
                  id="message"
                  name="message"
                  value={formValues.message}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="اكتب رسالتك هنا..."
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  className={`${inputClass(Boolean(errors.message))} h-[176px] resize-none py-4 font-normal leading-7`}
                />
                <FieldError id="message-error" message={errors.message} />
              </label>
            </div>

            {successMessage ? (
              <p className="fade-up mt-5 rounded-[16px] bg-emerald-50 px-5 py-4 text-[16px] font-bold text-brand" role="status">
                {successMessage}
              </p>
            ) : null}

            {submitError ? (
              <p className="fade-up mt-5 rounded-[16px] bg-red-50 px-5 py-4 text-[16px] font-bold text-red-700" role="alert">
                {submitError}
              </p>
            ) : null}

            {/* Honeypot: hidden from people, bots fill it and get rejected by the API. */}
            <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 opacity-0" />

            <button
              type="submit"
              disabled={submitting}
              className="mt-6 flex h-[68px] w-full items-center justify-center gap-3 rounded-full bg-gold-gradient text-[18px] font-extrabold text-brand shadow-[0_20px_12.5px_rgba(0,0,0,0.1),0_8px_5px_rgba(0,0,0,0.1)] transition duration-200 hover:-translate-y-0.5 hover:brightness-105 active:scale-[0.98] focus:outline-none focus:ring-4 focus:ring-gold/35 disabled:cursor-wait disabled:opacity-80"
            >
              {submitting ? 'جارٍ الإرسال…' : 'إرسال الطلب'}
              {submitting ? <Loader2 className="h-[22px] w-[22px] animate-spin" /> : <Send className="h-[22px] w-[22px] -scale-x-100" strokeWidth={2} />}
            </button>
          </form>
          </Reveal>

          <Reveal delay={150}>
          <div className="space-y-8">
            <ContactCard Icon={Phone}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-2 xl:grid-cols-3">
                {phoneDepartments.map(({ label, value }) => (
                  <div key={label} className="space-y-2">
                    <p className="whitespace-nowrap text-[16px] font-bold leading-7 text-body 2xl:text-[18px]">{label}</p>
                    <a
                      href={`tel:+966${value.slice(1)}`}
                      className="block text-[18px] font-bold leading-7 text-brand transition hover:text-gold 2xl:text-[20px]"
                      dir="ltr"
                      style={{ textAlign: 'right' }}
                    >
                      {value}
                    </a>
                  </div>
                ))}
              </div>
            </ContactCard>

            <ContactCard Icon={Mail}>
              <p className="text-[16px] font-bold leading-7 text-body sm:text-[18px]">البريد الإلكتروني</p>
              <a href={`mailto:${contactEmail}`} className="mt-2 block break-words text-[18px] font-bold leading-7 text-brand transition hover:text-gold sm:text-[20px]">
                {contactEmail}
              </a>
            </ContactCard>

            <ContactCard Icon={MapPin}>
              <p className="text-[16px] font-bold leading-7 text-body sm:text-[18px]">العنوان</p>
              <p className="mt-2 text-[18px] font-bold leading-7 text-brand sm:text-[20px]">{address}</p>
            </ContactCard>

            <article className="rounded-[16px] p-8 text-right text-white shadow-[0_25px_25px_rgba(0,0,0,0.25)]" style={{ backgroundImage: 'linear-gradient(161.3deg, #0f3d27 0%, #1a5a3d 100%)' }}>
              <h3 className="text-[24px] font-extrabold leading-8">ساعات العمل</h3>
              <div className="mt-4 space-y-3 text-[18px] leading-7">
                {workingHours.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
              <p className="mt-6 border-t border-white/20 pt-6 text-[18px] font-bold leading-7 text-gold">{emergencyNote}</p>
            </article>
          </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export default ContactUs

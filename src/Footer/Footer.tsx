import type { ReactNode } from 'react'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaTwitter } from 'react-icons/fa'
import { FiMail, FiMapPin, FiPhone } from 'react-icons/fi'
import type { IconType } from 'react-icons'
import footerLogo from '../assets/Footer Logo.png'
import saudiLogo from '../assets/Saudi Logo.png'
import vatLogo from '../assets/Saudi Vat Logo.png'
import { routeHref } from '../router'

const quickLinks = [
  { label: 'الرئيسية', href: routeHref('/') },
  { label: 'من نحن', href: '#about' },
  { label: 'الخدمات', href: '#services' },
  { label: 'المشاريع', href: routeHref('/works') },
  { label: 'تواصل معنا', href: '#contact' },
]

const services = [
  'المقاولات العامة',
  'الرفع المساحي',
  'تنسيق الحدائق',
  'اللاند سكيب',
  'مكافحة الحشرات',
  'مكافحة القوارض',
]

const phoneNumbers = [
  { label: 'قسم المقاولات', value: '0554177768' },
  { label: 'قسم المكافحة', value: '0543958080' },
  { label: 'قسم الزراعة', value: '0508542228' },
]

const contactEmail = 'info@honain.sa'

const registryItems = [
  { label: 'رقم ضريبي', value: '1131021685' },
  { label: 'سجل تجاري', value: '1131021685' },
]

// Right → left, as in the design.
const socialLinks: Array<{ label: string; Icon: IconType }> = [
  { label: 'Facebook', Icon: FaFacebookF },
  { label: 'Twitter', Icon: FaTwitter },
  { label: 'Instagram', Icon: FaInstagram },
  { label: 'LinkedIn', Icon: FaLinkedinIn },
]

function ColumnTitle({ children }: { children: string }) {
  return <h2 className="text-[24px] font-extrabold leading-8 text-white">{children}</h2>
}

function ContactIcon({ Icon }: { Icon: IconType }) {
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#cfa931]/10 text-[#cfa931]">
      <Icon size={18} aria-hidden="true" />
    </span>
  )
}

function ContactRow({ Icon, children }: { Icon: IconType; children: ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <ContactIcon Icon={Icon} />
      <div>{children}</div>
    </div>
  )
}

function BrandColumn() {
  return (
    <section aria-label="بيانات شركة حنين" className="flex w-full max-w-[460px] flex-col items-start gap-6">
      <img src={footerLogo} alt="Honain Contracting" className="h-[56px] w-full max-w-[392px] object-contain" loading="lazy" decoding="async" />

      <div className="flex flex-wrap items-center gap-6">
        <img src={saudiLogo} alt="شعار المملكة العربية السعودية" className="h-[64px] w-auto object-contain" loading="lazy" decoding="async" />

        {registryItems.map(({ label, value }) => (
          <div key={label} className="space-y-2">
            <p className="text-[18px] leading-[29.25px] text-[#d1d5dc]">{label}</p>
            <p className="text-[24px] font-extrabold leading-8 text-white">{value}</p>
          </div>
        ))}

        <img src={vatLogo} alt="ضريبة القيمة المضافة VAT" className="h-[64px] w-auto object-contain" loading="lazy" decoding="async" />
      </div>

      <p className="text-[18px] leading-[29.25px] text-[#d1d5dc]">
        شركة رائدة في مجالات المقاولات والزراعة ومكافحة الآفات بخبرة تمتد لأكثر من 40 عامًا
      </p>

      <div className="flex gap-3 self-center">
        {socialLinks.map(({ label, Icon }) => (
          <a
            key={label}
            href="#"
            aria-label={label}
            className="flex h-12 w-12 items-center justify-center rounded-[14px] border border-[#cfa931]/20 bg-[#cfa931]/10 text-[#cfa931] transition duration-300 hover:-translate-y-1 hover:bg-[#cfa931] hover:text-brand"
          >
            <Icon size={20} aria-hidden="true" />
          </a>
        ))}
      </div>
    </section>
  )
}

function QuickLinksColumn() {
  return (
    <nav aria-label="روابط سريعة" className="flex flex-col gap-6">
      <ColumnTitle>روابط سريعة</ColumnTitle>
      <ul className="space-y-2">
        {quickLinks.map(({ label, href }) => (
          <li key={label}>
            <a href={href} className="inline-block text-[18px] font-medium leading-7 text-[#d1d5dc] transition duration-200 hover:-translate-x-1 hover:text-gold">
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function ServicesColumn() {
  return (
    <section aria-label="خدماتنا" className="flex w-[185px] flex-col gap-6">
      <ColumnTitle>خدماتنا</ColumnTitle>
      <ul className="space-y-2">
        {services.map((service) => (
          <li key={service} className="flex items-center gap-4 text-[18px] leading-7 text-[#d1d5dc]">
            <span className="h-2 w-2 shrink-0 rounded-full bg-gold/50" aria-hidden="true" />
            {service}
          </li>
        ))}
      </ul>
    </section>
  )
}

function ContactColumn() {
  return (
    <section aria-label="تواصل معنا" className="flex w-full max-w-[413px] flex-col gap-6">
      <ColumnTitle>تواصل معنا</ColumnTitle>

      <div className="space-y-4">
        <ContactRow Icon={FiPhone}>
          <div className="flex flex-wrap gap-x-8 gap-y-3">
            {phoneNumbers.map(({ label, value }) => (
              <div key={label} className="space-y-1">
                <p className="text-[14px] leading-5 text-[#99a1af]">{label}</p>
                <a href={`tel:+966${value.slice(1)}`} className="block text-[18px] font-bold leading-7 text-[#d1d5dc] transition hover:text-gold">
                  {value}
                </a>
              </div>
            ))}
          </div>
        </ContactRow>

        <ContactRow Icon={FiMail}>
          <p className="text-[14px] leading-5 text-[#99a1af]">بريد</p>
          <a href={`mailto:${contactEmail}`} className="mt-1 block text-[18px] font-bold leading-7 text-[#d1d5dc] transition hover:text-gold">
            {contactEmail}
          </a>
        </ContactRow>

        <ContactRow Icon={FiMapPin}>
          <p className="text-[14px] leading-5 text-[#99a1af]">العنوان</p>
          <p className="mt-1 max-w-[260px] text-[18px] font-bold leading-7 text-[#d1d5dc]">الرياض، المملكة العربية السعودية</p>
        </ContactRow>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer
      dir="rtl"
      className="relative w-full overflow-hidden px-4 pt-16 text-white sm:px-8 lg:px-[64px] lg:pt-[80px]"
      style={{ backgroundImage: 'linear-gradient(161deg, #0f3d27 0%, #1a5a3d 100%)' }}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-5">
        <span className="absolute right-0 top-0 h-[384px] w-[384px] rounded-full bg-gold blur-[64px]" />
        <span className="absolute bottom-0 left-0 h-[384px] w-[384px] rounded-full bg-gold blur-[64px]" />
      </div>

      <div className="relative mx-auto w-full max-w-[1440px]">
        <div className="grid gap-x-10 gap-y-12 md:grid-cols-2 2xl:flex 2xl:items-start 2xl:justify-between">
          <BrandColumn />
          <QuickLinksColumn />
          <ServicesColumn />
          <ContactColumn />
        </div>

        <div className="mt-12 flex flex-col items-center gap-4 border-t border-white/20 py-8 text-center text-[#d1d5dc] lg:mt-[80px] lg:flex-row lg:justify-between lg:text-right">
          <p className="text-[16px] leading-7 sm:text-[18px]">© 2026 شركة حنين. جميع الحقوق محفوظة.</p>

          <div className="flex items-center gap-6 text-[16px] leading-6">
            <a href="#" className="transition hover:text-white">سياسة الخصوصية</a>
            <span aria-hidden="true">|</span>
            <a href="#" className="transition hover:text-white">الشروط والأحكام</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

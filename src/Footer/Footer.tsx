import { Fragment, type ReactNode } from 'react'
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa'
import {
  FaEnvelope,
  FaLocationDot,
  FaPhone,
  FaXTwitter,
} from 'react-icons/fa6'
import type { IconType } from 'react-icons'
import footerLogo from '../assets/Footer Logo.png'
import saudiLogo from '../assets/Saudi Logo.png'
import vatLogo from '../assets/Saudi Vat Logo.png'

const footerGradient =
  'linear-gradient(135deg, #0F3D27 0%, #104029 9.09%, #11422B 18.18%, #12452D 27.27%, #13472F 36.36%, #144A31 45.45%, #154D33 54.55%, #164F35 63.64%, #175237 72.73%, #185539 81.82%, #19573B 90.91%, #1A5A3D 100%)'

const quickLinks = ['الرئيسية', 'من نحن', 'الخدمات', 'المشاريع', 'تواصل معنا']

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

const socialLinks: Array<{ label: string; Icon: IconType }> = [
  { label: 'X', Icon: FaXTwitter },
  { label: 'LinkedIn', Icon: FaLinkedinIn },
  { label: 'Instagram', Icon: FaInstagram },
  { label: 'Facebook', Icon: FaFacebookF },
]

const footerLinks = ['سياسة الخصوصية', 'الشروط والأحكام']

const columnGridClasses =
  'mx-auto grid max-w-[1440px] justify-center gap-10 md:grid-cols-[minmax(0,220px)_minmax(0,220px)] md:gap-x-12 md:gap-y-14 lg:w-full lg:grid-cols-[minmax(0,428px)_minmax(0,146px)_minmax(0,161px)] lg:justify-center lg:gap-x-[64px] lg:gap-y-12 xl:grid-cols-[minmax(0,428px)_minmax(0,146px)_minmax(0,161px)_minmax(0,413px)] xl:justify-start xl:gap-[64px]'

function SectionTitle({
  children,
  className = '',
}: {
  children: string
  className?: string
}) {
  return (
    <h2
      className={`mb-5 text-center text-[22px] font-black text-white sm:text-[24px] lg:mb-8 lg:text-right lg:text-[22px] ${className}`}
    >
      {children}
    </h2>
  )
}

function IconFrame({ Icon }: { Icon: IconType }) {
  return (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] bg-[#E1AA26]/10 text-[#D5A125] ring-1 ring-[#D5A125]/10 sm:h-11 sm:w-11 lg:h-10 lg:w-10">
      <Icon size={18} aria-hidden="true" />
    </span>
  )
}

function HonainLogo() {
  return (
    <img
      src={footerLogo}
      alt="Honain Logo"
      className="h-auto w-full max-w-[428px]"
      loading="lazy"
      decoding="async"
    />
  )
}

function SaudiBadge() {
  return (
    <img
      src={saudiLogo}
      alt="شعار المملكة العربية السعودية"
      className="h-[62px] w-[62px] shrink-0 object-contain sm:h-[70px] sm:w-[70px]"
      loading="lazy"
      decoding="async"
    />
  )
}

function VatBadge() {
  return (
    <img
      src={vatLogo}
      alt="ضريبة القيمة المضافة VAT"
      className="h-[62px] w-[49px] shrink-0 object-contain sm:h-[70px] sm:w-[55px]"
      loading="lazy"
      decoding="async"
    />
  )
}

function BrandColumn() {
  return (
    <section
      aria-label="بيانات شركة حنين"
      className="mx-auto flex w-full max-w-[428px] flex-col items-center text-center md:col-span-2 lg:col-span-1 lg:mx-0 lg:items-start lg:text-right"
    >
      <HonainLogo />

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-white/70 sm:mt-9 sm:gap-4 lg:justify-start">
        <SaudiBadge />

        {registryItems.map(({ label, value }) => (
          <div key={label} className="min-w-[100px] text-center sm:min-w-[118px]">
            <p className="text-center text-[14px] font-medium text-white/70 sm:text-[18px]">
              {label}
            </p>
            <p
              className="mt-3 text-center text-[17px] font-black leading-none text-white sm:mt-4 sm:text-[20px]"
              dir="ltr"
            >
              {value}
            </p>
          </div>
        ))}

        <VatBadge />
      </div>

      <p className="mt-6 max-w-[428px] text-[16px] font-medium leading-[1.9] text-white/70 sm:mt-8 sm:text-[18px]">
        شركة رائدة في مجالات المقاولات والزراعة ومكافحة الآفات
        <br />
        بخبرة تمتد لأكثر من 40 عاماً
      </p>

      <div className="mt-6 flex w-full max-w-[428px] flex-wrap items-center justify-center gap-3 sm:mt-8 sm:gap-4">
        {socialLinks.map(({ label, Icon }) => (
          <a
            key={label}
            href="#"
            aria-label={label}
            className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-[#E1AA26]/10 text-[#D5A125] ring-1 ring-[#D5A125]/25 transition hover:-translate-y-1 hover:bg-[#E1AA26]/15 hover:text-[#F2BA21] sm:h-[48px] sm:w-[48px]"
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
    <nav
      aria-label="روابط سريعة"
      className="mx-auto w-full max-w-[146px] lg:mx-0"
    >
      <SectionTitle>روابط سريعة</SectionTitle>

      <ul className="space-y-2 text-center lg:text-right">
        {quickLinks.map((link) => (
          <li key={link}>
            <a
              href="#"
              className="text-[18px] font-semibold text-white/75 transition hover:text-white"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function ServicesColumn() {
  return (
    <section
      aria-label="خدماتنا"
      className="mx-auto w-full max-w-[161px] lg:mx-0"
    >
      <SectionTitle>خدماتنا</SectionTitle>

      <ul className="space-y-2 text-right">
        {services.map((service) => (
          <li
            key={service}
            className="flex items-center justify-start gap-3 text-[17px] font-medium text-white/70 sm:gap-5 sm:text-[18px]"
          >
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full bg-[#8D842A] sm:h-3 sm:w-3"
              aria-hidden="true"
            />
            <span>{service}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

function PhoneNumbers() {
  return (
    <div className="grid w-full grid-cols-3 justify-items-center gap-2 text-center sm:gap-[24px] md:justify-items-start md:text-right lg:max-w-[520px] lg:gap-6 xl:max-w-[333px] xl:gap-[32px]">
      {phoneNumbers.map(({ label, value }) => (
        <div
          key={label}
          className="flex min-w-0 flex-col items-center text-center md:items-start md:text-right"
        >
          <p className="text-center text-[12px] font-medium text-white/45 sm:text-[14px] md:text-right">
            {label}
          </p>
          <a
            href={`tel:+966${value.slice(1)}`}
            className="mt-1 text-center text-[13px] font-black leading-none text-white/80 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-[#D5A125]/60 sm:text-[16px] md:text-right"
            dir="ltr"
          >
            {value}
          </a>
        </div>
      ))}
    </div>
  )
}

function ContactRow({
  Icon,
  label,
  children,
}: {
  Icon: IconType
  label: string
  children: ReactNode
}) {
  return (
    <div className="mt-[24px] flex flex-col items-center gap-4 text-center sm:flex-row sm:items-center sm:justify-center sm:gap-5 sm:text-right md:justify-start">
      <IconFrame Icon={Icon} />
      <div>
        <p className="text-[14px] font-medium text-white/45">{label}</p>
        {children}
      </div>
    </div>
  )
}

function ContactColumn() {
  return (
    <section
      aria-label="تواصل معنا"
      className="mx-auto w-full max-w-[413px] md:col-span-2 md:mx-0 md:justify-self-start md:text-right lg:col-span-3 lg:max-w-full xl:col-span-1 xl:max-w-[413px]"
    >
      <SectionTitle className="md:text-right">تواصل معنا</SectionTitle>

      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start sm:justify-center sm:gap-5 md:justify-start">
        <IconFrame Icon={FaPhone} />
        <PhoneNumbers />
      </div>

      <ContactRow Icon={FaEnvelope} label="بريد">
        <a
          href={`mailto:${contactEmail}`}
          className="mt-1 block text-[17px] font-black text-white/80 transition hover:text-white focus:outline-none focus:ring-2 focus:ring-[#D5A125]/60 sm:text-[18px]"
          dir="ltr"
        >
          {contactEmail}
        </a>
      </ContactRow>

      <ContactRow Icon={FaLocationDot} label="العنوان">
        <p className="mt-1 text-[17px] font-black leading-relaxed text-white/80 sm:text-[18px]">
          الرياض، المملكة العربية السعودية
        </p>
      </ContactRow>
    </section>
  )
}

function FooterBottom() {
  return (
    <div className="mx-auto mt-[36px] flex max-w-[1440px] flex-col items-center gap-4 border-t border-white/18 pt-[24px] text-center text-[14px] font-medium text-white/70 sm:text-[16px] lg:flex-row lg:justify-between xl:text-[18px]">
      <p>© 2026 شركة حنين. جميع الحقوق محفوظة.</p>

      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
        {footerLinks.map((link, index) => (
          <Fragment key={link}>
            {index > 0 && <span className="text-white/55">|</span>}
            <a href="#" className="transition hover:text-white">
              {link}
            </a>
          </Fragment>
        ))}
      </div>
    </div>
  )
}

function Footer() {
  return (
    <footer
      dir="rtl"
      className="w-full overflow-hidden px-5 py-10 text-white sm:px-8 sm:py-12 lg:px-6 lg:py-10 xl:px-[50px]"
      style={{ background: footerGradient }}
    >
      <div className={columnGridClasses}>
        <BrandColumn />
        <QuickLinksColumn />
        <ServicesColumn />
        <ContactColumn />
      </div>

      <FooterBottom />
    </footer>
  )
}

export default Footer

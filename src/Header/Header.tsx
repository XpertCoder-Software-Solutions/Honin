import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import footerLogo from '../assets/Logo Header.png'
import saudiVisionLogo from '../assets/Saudi Vision.png'

const navItems = [
  { label: 'الرئيسية', href: '#', active: true },
  { label: 'خدماتنا', href: '#services' },
  { label: 'اعمالنا', href: '#work' },
  { label: 'المعرض', href: '#gallery' },
  { label: 'من نحن', href: '#about' },
  { label: 'تواصل معنا', href: '#contact' },
]

function VisionLogo() {
  return (
    <img
      src={saudiVisionLogo}
      alt="رؤية المملكة العربية السعودية 2030"
      className="h-[46px] w-[76px] shrink-0 object-contain sm:h-[58px] sm:w-[95px] lg:h-[70px] lg:w-[115px]"
    />
  )
}

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="absolute inset-x-0 top-4 z-50 px-4 sm:top-6 sm:px-8 lg:top-9 lg:px-[54px]">
      <div className="mx-auto flex w-full max-w-[1740px] items-center justify-between gap-3 rounded-[22px] border border-white/45 bg-[#0F3D27]/82 px-3 py-3 text-white shadow-[0_24px_70px_rgba(0,0,0,0.35)] backdrop-blur-md sm:gap-5 sm:rounded-[26px] sm:px-5 sm:py-4 lg:min-h-[118px] lg:gap-8 lg:rounded-[30px] lg:px-8">
        <VisionLogo />

        <a
          href="#contact"
          className="hidden min-h-[56px] min-w-[210px] items-center justify-center rounded-[20px] bg-[#D5A125] px-8 text-[16px] font-black text-[#07110D] shadow-[0_16px_34px_rgba(213,161,37,0.28)] transition hover:-translate-y-1 hover:bg-[#E7BC2A] focus:outline-none focus:ring-4 focus:ring-[#D5A125]/35 xl:flex"
        >
          استشارة مجانية
        </a>

        <nav
          aria-label="القائمة الرئيسية"
          className="hidden flex-1 items-center justify-center lg:flex lg:gap-4 xl:gap-8"
          dir="rtl"
        >
          {navItems.map(({ label, href, active }) => (
            <a
              key={label}
              href={href}
              className={`text-[16px] font-semibold transition hover:text-[#D5A125] ${
                active ? 'text-[#D5A125]' : 'text-white/82'
              }`}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <a href="#" aria-label="Honain Contracting" className="shrink-0">
            <img
              src={footerLogo}
              alt="Honain Contracting"
              className="h-auto w-[118px] object-contain sm:w-[148px] lg:w-[178px]"
            />
          </a>

          <button
            type="button"
            aria-label={isMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((current) => !current)}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] border border-white/25 bg-white/10 text-white transition hover:bg-white/18 focus:outline-none focus:ring-4 focus:ring-[#D5A125]/30 lg:hidden"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" strokeWidth={2.2} />
            ) : (
              <Menu className="h-6 w-6" strokeWidth={2.2} />
            )}
          </button>
        </div>
      </div>

      {isMenuOpen ? (
        <nav
          aria-label="قائمة الجوال"
          className="mx-auto mt-3 grid w-full max-w-[1740px] gap-2 rounded-[22px] border border-white/25 bg-[#0F3D27]/95 p-3 text-right text-white shadow-[0_24px_70px_rgba(0,0,0,0.35)] backdrop-blur-md lg:hidden"
          dir="rtl"
        >
          {navItems.map(({ label, href, active }) => (
            <a
              key={label}
              href={href}
              onClick={() => setIsMenuOpen(false)}
              className={`rounded-[14px] px-4 py-3 text-[16px] font-bold transition hover:bg-white/10 ${
                active ? 'text-[#D5A125]' : 'text-white/86'
              }`}
            >
              {label}
            </a>
          ))}

          <a
            href="#contact"
            onClick={() => setIsMenuOpen(false)}
            className="mt-1 inline-flex min-h-[50px] items-center justify-center rounded-[16px] bg-[#D5A125] px-5 text-[16px] font-black text-[#07110D] shadow-[0_16px_34px_rgba(213,161,37,0.24)]"
          >
            استشارة مجانية
          </a>
        </nav>
      ) : null}
    </header>
  )
}

export default Header

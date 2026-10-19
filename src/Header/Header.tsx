import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import headerLogo from '../assets/Logo Header.png'
import saudiVisionLogo from '../assets/Saudi Vision.png'
import { routeHref, useLocation, type Route } from '../router'
import { useScrolledPast } from '../hooks'

const navItems: Array<{ label: string; href: string; route?: Route }> = [
  { label: 'الرئيسية', href: routeHref('/'), route: '/' },
  { label: 'خدماتنا', href: '#services' },
  { label: 'أعمالنا', href: routeHref('/works'), route: '/works' },
  { label: 'المعرض', href: routeHref('/gallery'), route: '/gallery' },
  { label: 'من نحن', href: '#about' },
  { label: 'تواصل معنا', href: '#contact' },
]

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { route, section } = useLocation()
  const isScrolled = useScrolledPast(160)

  function isActive(item: (typeof navItems)[number]) {
    return item.route !== undefined && item.route === route && !(route === '/' && section)
  }

  return (
    <header
      className={`inset-x-0 z-50 px-4 sm:px-8 ${
        isScrolled ? 'header-slide-in fixed top-3' : 'absolute top-4 sm:top-6 lg:top-[30px]'
      }`}
    >
      <div className="relative mx-auto w-full max-w-[1400px] overflow-hidden rounded-[20px] border border-white/20 bg-gradient-to-r from-white/[0.08] to-white/[0.05] shadow-[0_25px_50px_rgba(0,0,0,0.2)] lg:rounded-[24px]">
        <span
          aria-hidden="true"
          className={`absolute inset-0 transition-colors duration-500 ${
            isScrolled ? 'bg-brand-dark/85 backdrop-blur-md' : 'bg-brand-dark/50'
          }`}
        />

        <div className={`relative flex min-h-[72px] items-center justify-between gap-4 px-4 py-2 transition-[height] duration-500 sm:px-6 lg:grid lg:grid-cols-[1fr_auto_1fr] ${isScrolled ? 'lg:h-[80px]' : 'lg:h-[96px]'} lg:px-[40px] lg:py-0`} dir="rtl">
          <a href={routeHref('/')} aria-label="Honain Contracting" className="shrink-0">
            <img
              src={headerLogo}
              alt="Honain Contracting"
              className="h-[40px] w-[127px] object-contain sm:h-[48px] sm:w-[153px] lg:h-[56px] lg:w-[178px]"
            />
          </a>

          <div className="hidden items-center gap-[32px] lg:flex">
            <nav aria-label="القائمة الرئيسية" className="flex items-center gap-6 xl:gap-[40px]">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  aria-current={isActive(item) ? 'page' : undefined}
                  className={`relative font-cairo text-[16px] font-semibold leading-6 transition-colors duration-200 after:absolute after:-bottom-1.5 after:right-0 after:h-0.5 after:w-full after:origin-right after:rounded-full after:bg-[#d3af38] after:transition-transform after:duration-300 hover:text-[#d3af38] hover:after:scale-x-100 ${
                    isActive(item) ? 'text-[#d3af38] after:scale-x-100' : 'text-[#fdfdfd] after:scale-x-0'
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <a
              href="#contact"
              className="flex h-[56px] w-[210px] items-center justify-center rounded-[16px] bg-gold-bright-gradient font-cairo text-[16px] font-bold text-[#0a0a0a] shadow-[0_10px_24px_rgba(231,188,42,0.25)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(231,188,42,0.4)] hover:brightness-105 active:scale-[0.97] focus:outline-none focus:ring-4 focus:ring-gold-bright/35"
            >
              استشارة مجانية
            </a>
          </div>

          <div className="flex shrink-0 items-center gap-3 lg:justify-self-end">
            <img
              src={saudiVisionLogo}
              alt="رؤية المملكة العربية السعودية 2030"
              className="h-[46px] w-[69px] shrink-0 object-contain sm:h-[56px] sm:w-[84px] lg:-my-[11px] lg:-ml-[16px] lg:h-[77px] lg:w-[115px]"
            />

            <button
              type="button"
              aria-label={isMenuOpen ? 'إغلاق القائمة' : 'فتح القائمة'}
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((current) => !current)}
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] border border-white/25 bg-white/10 text-white transition hover:bg-white/20 focus:outline-none focus:ring-4 focus:ring-gold/30 lg:hidden"
            >
              {isMenuOpen ? <X className="h-6 w-6" strokeWidth={2.2} /> : <Menu className="h-6 w-6" strokeWidth={2.2} />}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen ? (
        <nav
          aria-label="قائمة الجوال"
          className="fade-up mx-auto mt-3 grid w-full max-w-[1400px] gap-2 rounded-[20px] border border-white/20 bg-brand/95 p-3 text-right text-white shadow-[0_25px_50px_rgba(0,0,0,0.25)] backdrop-blur-md lg:hidden"
          dir="rtl"
        >
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setIsMenuOpen(false)}
              className={`rounded-[14px] px-4 py-3 font-cairo text-[16px] font-semibold transition hover:bg-white/10 ${
                isActive(item) ? 'text-[#d3af38]' : 'text-[#fdfdfd]'
              }`}
            >
              {item.label}
            </a>
          ))}

          <a
            href="#contact"
            onClick={() => setIsMenuOpen(false)}
            className="mt-1 inline-flex min-h-[52px] items-center justify-center rounded-[16px] bg-gold-bright-gradient font-cairo text-[16px] font-bold text-[#0a0a0a]"
          >
            استشارة مجانية
          </a>
        </nav>
      ) : null}
    </header>
  )
}

export default Header

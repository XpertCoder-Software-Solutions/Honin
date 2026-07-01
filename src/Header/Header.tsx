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
      className="h-[70px] w-[115px] shrink-0 object-contain"
    />
  )
}

function Header() {
  return (
    <header className="absolute inset-x-0 top-4 z-50 px-4 sm:top-6 sm:px-8 lg:top-9 lg:px-[54px]">
      <div className="mx-auto flex max-h-[96px] w-full max-w-[1740px] items-center justify-between gap-8 rounded-[28px] border border-white/45 bg-[#0F3D27]/82 px-6 py-4 text-white shadow-[0_24px_70px_rgba(0,0,0,0.35)] backdrop-blur-md lg:min-h-[118px] lg:rounded-[30px] lg:px-8">
        <VisionLogo />

        <a
          href="#contact"
          className="hidden min-h-[56px] min-w-[210px] items-center justify-center rounded-[20px] bg-[#D5A125] px-8 text-[16px] font-black text-[#07110D] shadow-[0_16px_34px_rgba(213,161,37,0.28)] transition hover:-translate-y-1 hover:bg-[#E7BC2A] focus:outline-none focus:ring-4 focus:ring-[#D5A125]/35 xl:flex"
        >
          استشارة مجانية
        </a>

        <nav
          aria-label="القائمة الرئيسية"
          className="hidden flex-1 items-center justify-center lg:flex xl:gap-8"
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

        <a href="#" aria-label="Honain Contracting" className="shrink-0">
          <img
            src={footerLogo}
            alt="Honain Contracting"
            className="h-auto w-[178px] object-contain"
          />
        </a>
      </div>
    </header>
  )
}

export default Header

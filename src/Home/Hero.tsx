import { useState } from 'react'
import {
  Bug,
  Building2,
  ChevronLeft,
  ChevronRight,
  Sprout,
  type LucideIcon,
} from 'lucide-react'
import constructionImage from '../assets/Hero pic 1.png'
import landscapeImage from '../assets/Hero pic 2.png'
import pestControlImage from '../assets/Hero pic 3.png'

const heroItems: Array<{
  label: string
  title: string
  subtitle: string
  cardTitle: string
  cardDescription: string
  image: string
  Icon: LucideIcon
  imageClass: string
}> = [
  {
    label: 'حلول متقدمة',
    title: 'المقاولات والأعمال المساحية',
    subtitle: 'تنفيذ مشاريع متكاملة بأعلى معايير الجودة',
    cardTitle: 'المقاولات والأعمال المساحية',
    cardDescription: 'تنفيذ مشاريع البنية التحتية بأعلى المعايير',
    image: constructionImage,
    Icon: Building2,
    imageClass: 'object-[50%_50%]',
  },
  {
    label: 'حلول متقدمة',
    title: 'الزراعة وتنسيق الحدائق',
    subtitle: 'تصميم وتنفيذ المساحات الخضراء',
    cardTitle: 'الزراعة وتنسيق الحدائق',
    cardDescription: 'تصميم وتنفيذ المساحات الخضراء',
    image: landscapeImage,
    Icon: Sprout,
    imageClass: 'object-[50%_50%]',
  },
  {
    label: 'حلول متقدمة',
    title: 'مكافحة الحشرات والقوارض',
    subtitle: 'حلول آمنة وفعالة لمكافحة الآفات',
    cardTitle: 'مكافحة الحشرات والقوارض',
    cardDescription: 'حلول آمنة وفعالة لمكافحة الآفات',
    image: pestControlImage,
    Icon: Bug,
    imageClass: 'object-[50%_50%]',
  },
]

function Hero() {
  const [activeIndex, setActiveIndex] = useState(0)
  const activeItem = heroItems[activeIndex]

  function showNext() {
    setActiveIndex((current) => (current + 1) % heroItems.length)
  }

  function showPrevious() {
    setActiveIndex((current) => (current - 1 + heroItems.length) % heroItems.length)
  }

  return (
    <section
      className="relative z-10 min-h-[900px] w-full overflow-visible bg-[#07110d] text-white"
      dir="rtl"
    >
      <div className="absolute inset-x-0 top-0 h-[900px] overflow-hidden">
        {heroItems.map((item, index) => (
          <img
            key={item.title}
            src={item.image}
            alt=""
            aria-hidden="true"
            className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-700 ease-in-out ${item.imageClass} ${
              index === activeIndex
                ? 'scale-100 opacity-100'
                : 'scale-105 opacity-0'
            }`}
          />
        ))}

        <span
          aria-hidden="true"
          className="absolute inset-0 bg-black/42"
        />

        <span
          aria-hidden="true"
          className="absolute inset-y-0 right-0 w-full bg-gradient-to-l from-black/40 via-black/18 to-transparent"
        />

        <span
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 h-[44%] bg-gradient-to-t from-black via-black/62 to-transparent"
        />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[900px] w-full max-w-[1780px] flex-col px-4 pt-[132px] sm:px-8 sm:pt-[150px] lg:px-[58px] lg:pt-[280px]">
        <div className="flex flex-1 items-center justify-start">
          <div
            key={activeItem.title}
            className="hero-content-enter max-w-[760px] text-right lg:mb-12"
          >
            <p className="text-[18px] font-medium leading-8 text-white/82 sm:text-[22px]">
              {activeItem.label}
            </p>

            <h1 className="mt-4 text-[72px] font-black leading-[90px] text-white">
              {activeItem.title}
            </h1>

            <p className="mt-8 text-[24px] font-medium text-white/78">
              {activeItem.subtitle}
            </p>

            <div className="mt-10 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-start">
              <a
                href="#"
                className="inline-flex min-h-[66px] items-center justify-center rounded-full bg-[#D5A125] px-10 text-[18px] font-black text-[#0F3D27] shadow-[0_22px_44px_rgba(0,0,0,0.22)] transition hover:-translate-y-1 hover:bg-[#E7BC2A] focus:outline-none focus:ring-4 focus:ring-[#D5A125]/35 sm:min-w-[236px]"
              >
                طلب عرض سعر
              </a>

              <a
                href="#"
                className="inline-flex min-h-[66px] items-center justify-center rounded-full border border-white/40 bg-white/10 px-10 text-[18px] font-black text-white backdrop-blur-sm transition hover:-translate-y-1 hover:bg-white/18 focus:outline-none focus:ring-4 focus:ring-white/25 sm:min-w-[236px]"
              >
                اكتشف المزيد
              </a>
            </div>
          </div>
        </div>

        <div className="mb-8 flex justify-center gap-3 lg:mb-10" dir="rtl">
          {heroItems.map((item, index) => (
            <button
              key={item.title}
              type="button"
              aria-label={`عرض ${item.cardTitle}`}
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 rounded-full transition ${
                index === activeIndex
                  ? 'w-16 bg-[#D5A125]'
                  : 'w-3 bg-white/45 hover:bg-white/70'
              }`}
            />
          ))}
        </div>

        <div className="relative z-20 -mt-10 grid translate-y-24 grid-cols-1 gap-6 md:grid-cols-3 lg:-mt-12 lg:translate-y-24 lg:gap-10" dir="rtl">
          {heroItems.map(({ cardTitle, cardDescription, Icon }, index) => {
            const isActive = index === activeIndex

            return (
              <button
                key={cardTitle}
                type="button"
                onClick={() => setActiveIndex(index)}
                onMouseEnter={() => setActiveIndex(index)}
                className={`group min-h-[224px] rounded-[18px] bg-white p-7 text-right shadow-[0_34px_70px_rgba(0,0,0,0.38)] outline-none transition hover:-translate-y-1 focus:ring-4 focus:ring-[#D5A125]/40 ${
                  isActive ? 'hero-card-active' : ''
                }`}
                dir="rtl"
              >
                <div className="flex items-start justify-between gap-4">
                  <span
                    className={`flex h-[80px] w-[80px] shrink-0 items-center justify-center rounded-[16px] transition ${
                      isActive
                        ? 'bg-[#D5A125] text-[#0F3D27]'
                        : 'bg-[#0F5A39] text-white group-hover:bg-[#D5A125] group-hover:text-[#0F3D27]'
                    }`}
                  >
                    <Icon className="h-8 w-8" strokeWidth={2} />
                  </span>

                  <h2 className="max-w-[330px] text-[30px] font-black leading-tight text-[#0F3D27]">
                    {cardTitle}
                  </h2>
                </div>

                <p className="mt-8 text-[18px] font-medium leading-8 text-[#697282]">
                  {cardDescription}
                </p>

                <span
                  className={`mt-8 block h-[5px] rounded-full transition ${
                    isActive ? 'bg-[#D5A125]' : 'bg-[#E4E7EC] group-hover:bg-[#D5A125]/80'
                  }`}
                />
              </button>
            )
          })}
        </div>
      </div>

      <div className="absolute left-4 top-1/2 z-20 hidden -translate-y-1/2 flex-col gap-5 lg:flex">
        <button
          type="button"
          onClick={showPrevious}
          aria-label="السابق"
          className="flex h-[56px] w-[56px] items-center justify-center rounded-full border border-white/35 bg-white/18 text-white backdrop-blur-sm transition hover:bg-white/28 focus:outline-none focus:ring-4 focus:ring-white/25"
        >
          <ChevronLeft className="h-6 w-6" strokeWidth={2.2} />
        </button>

        <button
          type="button"
          onClick={showNext}
          aria-label="التالي"
          className="flex h-[56px] w-[56px] items-center justify-center rounded-full border border-white/35 bg-white/18 text-white backdrop-blur-sm transition hover:bg-white/28 focus:outline-none focus:ring-4 focus:ring-white/25"
        >
          <ChevronRight className="h-6 w-6" strokeWidth={2.2} />
        </button>
      </div>
    </section>
  )
}

export default Hero

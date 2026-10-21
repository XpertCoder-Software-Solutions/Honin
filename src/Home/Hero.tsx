import { useState, type CSSProperties } from 'react'
import {
  Bug,
  Building2,
  ChevronLeft,
  ChevronRight,
  TreePine,
  type LucideIcon,
} from 'lucide-react'
import constructionImage from '../assets/hero/construction.jpg'
import landscapeImage from '../assets/hero/landscaping.jpg'
import pestControlImage from '../assets/hero/pest-control.jpg'
import { useSiteContent, type Category } from '../site/content'

type HeroItem = {
  title: string
  subtitle?: string | null
  cardTitle: string
  cardDescription: string
  image: string
  position?: string
  Icon: LucideIcon
}

const categoryIcons: Record<Category, LucideIcon> = {
  construction: Building2,
  landscaping: TreePine,
  'pest-control': Bug,
}

const defaultSubtitle = 'تنفيذ مشاريع متكاملة بأعلى معايير الجودة'

const fallbackItems: HeroItem[] = [
  {
    title: 'المقاولات والأعمال المساحية',
    cardTitle: 'المقاولات والأعمال المساحية',
    cardDescription: 'تنفيذ مشاريع البنية التحتية بأعلى المعايير',
    image: constructionImage,
    Icon: Building2,
  },
  {
    title: 'الزراعة وتنسيق الحدائق',
    cardTitle: 'الزراعة وتنسيق الحدائق',
    cardDescription: 'تصميم وتنفيذ المساحات الخضراء',
    image: landscapeImage,
    Icon: TreePine,
  },
  {
    title: 'مكافحة الحشرات والقوارض',
    cardTitle: 'مكافحة الحشرات والقوارض',
    cardDescription: 'حلول آمنة وفعالة لمكافحة الآفات',
    image: pestControlImage,
    position: 'object-[35%_42%]',
    Icon: Bug,
  },
]

const SLIDE_INTERVAL = 6000

const arrowButtonClass =
  'flex h-[56px] w-[56px] items-center justify-center rounded-full border border-white/30 bg-white/20 text-white transition hover:bg-white/30 focus:outline-none focus:ring-4 focus:ring-white/25'

function Hero() {
  const content = useSiteContent()
  const heroItems: HeroItem[] = content?.hero_slides.length
    ? content.hero_slides.map((slide) => ({
        title: slide.title,
        subtitle: slide.subtitle,
        cardTitle: slide.card_title,
        cardDescription: slide.card_description ?? '',
        image: slide.image_url ?? constructionImage,
        // The seeded pest-control photo is portrait; keep the worker in frame.
        position: slide.image_url?.includes('seed/hero/pest-control') ? 'object-[35%_42%]' : undefined,
        Icon: categoryIcons[slide.category],
      }))
    : fallbackItems
  const [rawIndex, setActiveIndex] = useState(0)
  const activeIndex = rawIndex % heroItems.length
  const [isPaused, setIsPaused] = useState(false)
  const activeItem = heroItems[activeIndex]

  function showNext() {
    setActiveIndex((current) => (current + 1) % heroItems.length)
  }

  function showPrevious() {
    setActiveIndex((current) => (current - 1 + heroItems.length) % heroItems.length)
  }

  return (
    <section
      className="relative z-10 w-full bg-cream lg:h-[944px]"
      dir="rtl"
      aria-roledescription="carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      style={{ '--hero-interval': `${SLIDE_INTERVAL}ms` } as CSSProperties}
    >
      <div className="relative h-[680px] overflow-hidden bg-[#07110d] text-white sm:h-[760px] lg:h-[944px]">
        {heroItems.map((item, index) => (
          <img
            key={`${item.title}-${index}`}
            src={item.image}
            alt=""
            aria-hidden="true"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${item.position ?? 'object-center'} ${
              index === activeIndex ? 'ken-burns opacity-100' : 'opacity-0'
            }`}
          />
        ))}

        <span
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-l from-black/60 via-black/30 to-black/5"
        />
        <span aria-hidden="true" className="absolute inset-0 bg-black/20 lg:hidden" />
        <span aria-hidden="true" className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-black/35 to-transparent" />

        <div className="relative z-10 mx-auto flex h-full w-full max-w-[1568px] items-center px-4 pt-16 sm:px-8 lg:px-16 lg:pt-0">
          <div key={activeItem.title} className="hero-content-enter w-full max-w-[768px] text-right" aria-live="polite">
            <p className="inline-flex items-center gap-3 text-[16px] leading-7 tracking-[0.5px] text-white sm:text-[20px]">
              <span aria-hidden="true" className="h-0.5 w-8 rounded-full bg-gold" />
              حلول متقدمة
            </p>

            <h1 className="mt-4 max-w-[638px] text-[40px] font-black leading-[1.25] text-white sm:text-[56px] lg:text-[72px] lg:leading-[90px] [text-wrap:wrap] [text-shadow:0_2px_24px_rgba(0,0,0,0.25)]">
              {activeItem.title}
            </h1>

            <p className="mt-6 text-[18px] leading-[1.6] text-[#e5e7eb] sm:text-[24px] sm:leading-[39px]">
              {activeItem.subtitle || defaultSubtitle}
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="inline-flex h-[60px] min-w-[193px] items-center justify-center rounded-full bg-gold-gradient px-10 text-[16px] font-bold text-brand shadow-[0_25px_25px_rgba(0,0,0,0.25)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_25px_35px_rgba(0,0,0,0.3)] hover:brightness-105 active:scale-[0.97] focus:outline-none focus:ring-4 focus:ring-gold/40"
              >
                طلب عرض سعر
              </a>

              <a
                href="#about"
                className="inline-flex h-[60px] min-w-[183px] items-center justify-center rounded-full border-2 border-white/30 bg-white/10 px-[42px] text-[16px] font-bold text-white backdrop-blur-sm transition duration-200 hover:-translate-y-0.5 hover:bg-white/20 active:scale-[0.97] focus:outline-none focus:ring-4 focus:ring-white/25"
              >
                اكتشف المزيد
              </a>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-8 z-10 flex justify-center gap-3 lg:bottom-auto lg:top-[706px]">
          {heroItems.map((item, index) => (
            <button
              key={`${item.title}-${index}`}
              type="button"
              aria-label={`عرض ${item.cardTitle}`}
              aria-current={index === activeIndex}
              onClick={() => setActiveIndex(index)}
              className={`relative h-2 overflow-hidden rounded-full transition-all duration-500 ${
                index === activeIndex ? 'w-12 bg-white/35' : 'w-2 bg-white/50 hover:bg-white/80'
              }`}
            >
              {index === activeIndex ? (
                <span
                  key={activeIndex}
                  aria-hidden="true"
                  className="hero-progress absolute inset-0 rounded-full bg-gold"
                  style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
                  onAnimationEnd={showNext}
                />
              ) : null}
            </button>
          ))}
        </div>

        <div className="absolute left-[48px] top-[408px] z-20 hidden flex-col gap-4 lg:flex">
          <button type="button" onClick={showPrevious} aria-label="السابق" className={arrowButtonClass}>
            <ChevronLeft className="h-6 w-6" strokeWidth={2} />
          </button>
          <button type="button" onClick={showNext} aria-label="التالي" className={arrowButtonClass}>
            <ChevronRight className="h-6 w-6" strokeWidth={2} />
          </button>
        </div>
      </div>

      <div className="relative z-20 mx-auto -mt-16 grid w-full max-w-[1568px] grid-cols-1 gap-5 px-4 pb-4 sm:px-8 lg:grid-cols-3 lg:absolute lg:inset-x-0 lg:top-[750px] lg:mt-0 lg:gap-8 lg:px-16 lg:pb-0 2xl:gap-[39px] 2xl:pr-[91px]">
        {heroItems.map(({ cardTitle, cardDescription, Icon }, index) => {
          const isActive = index === activeIndex

          return (
            <button
              key={`${cardTitle}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              onMouseEnter={() => setActiveIndex(index)}
              aria-pressed={isActive}
              className={`group flex flex-col justify-center rounded-[16px] bg-white p-6 text-right shadow-[0_25px_25px_rgba(0,0,0,0.25)] outline-none transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_40px_rgba(0,0,0,0.28)] focus-visible:ring-4 focus-visible:ring-gold/40 lg:p-7 2xl:px-[38px] 2xl:py-[42px] ${
                isActive ? 'hero-card-active' : ''
              }`}
            >
              <span className="flex items-center gap-4 2xl:gap-5">
                <span
                  className={`flex h-[64px] w-[64px] shrink-0 items-center justify-center rounded-[16px] text-white transition-all duration-500 group-hover:rotate-[-6deg] lg:h-[80px] lg:w-[80px] ${
                    isActive ? 'bg-gold-gradient 2xl:h-[85px] 2xl:w-[85px]' : 'bg-green-gradient'
                  }`}
                >
                  <Icon className="h-7 w-7 lg:h-8 lg:w-8" strokeWidth={2} />
                </span>

                <span className="[text-wrap:wrap] text-[22px] font-extrabold leading-[1.2] text-brand sm:text-[24px] lg:text-[22px] xl:text-[24px] 2xl:w-[259px] 2xl:shrink-0 2xl:text-[30px] 2xl:leading-[36px]">
                  {cardTitle}
                </span>
              </span>

              <span className="mt-[19px] block text-[16px] leading-[29.25px] text-body 2xl:text-[18px]">
                {cardDescription}
              </span>

              <span
                className={`mt-6 block w-full rounded-full transition-all duration-500 ${
                  isActive ? 'h-[5px] bg-gold' : 'h-1 bg-[#e5e7eb]'
                }`}
              />
            </button>
          )
        })}
      </div>
    </section>
  )
}

export default Hero

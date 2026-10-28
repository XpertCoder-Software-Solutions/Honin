import {
  Bug,
  Building2,
  CircleCheck,
  Sprout,
  type LucideIcon,
} from 'lucide-react'
import Reveal from '../components/Reveal'
import { useSiteContent, type Category } from '../site/content'

const fallbackServices: Array<{
  category: Category
  number: string
  title: string
  description: string
  Icon: LucideIcon
  borderClass: string
  features: string[]
}> = [
  {
    category: 'construction',
    number: '01',
    title: 'المقاولات والأعمال المساحية',
    description:
      'نقدم خدمات متكاملة في تنفيذ المشاريع الإنشائية وأعمال البنية التحتية، بالإضافة إلى جميع أعمال الرفع المساحي باستخدام أحدث التقنيات والأجهزة.',
    Icon: Building2,
    borderClass: 'border-[rgba(43,127,255,0.3)] hover:border-[rgba(43,127,255,0.7)]',
    features: [
      'أعمال الرفع المساحي',
      'التشييد والبناء',
      'تنفيذ مشاريع البنية التحتية',
      'شبكات المياه والصرف الصحي',
      'تصريف السيول',
      'الإشراف والصيانة',
      'الأعمال الكهربائية',
      'تنفيذ الإنترلوك',
      'تنفيذ المناقصات الحكومية',
    ],
  },
  {
    category: 'landscaping',
    number: '02',
    title: 'الزراعة وتنسيق الحدائق',
    description:
      'نقدم حلولًا متكاملة لتحويل المساحات إلى بيئات خضراء جذابة من خلال تصميم وتنفيذ مشاريع اللاند سكيب بأحدث الأساليب.',
    Icon: Sprout,
    borderClass: 'border-[rgba(0,201,80,0.3)] hover:border-[rgba(0,201,80,0.7)]',
    features: [
      'إنشاء وتشغيل وصيانة المشاتل',
      'تصميم وتنفيذ الحدائق',
      'تنفيذ المخططات العامة للمشاريع',
      'تصميم وتنفيذ شبكات الري',
      'أعمال اللاند سكيب',
      'تركيب النجيل الطبيعي والصناعي',
      'النباتات الداخلية',
      'الأشجار والزهور الخارجية',
    ],
  },
  {
    category: 'pest-control',
    number: '03',
    title: 'مكافحة الحشرات والقوارض',
    description:
      'نقدم خدمات متخصصة في مكافحة جميع أنواع الحشرات والآفات باستخدام أحدث التقنيات والمواد الآمنة للحفاظ على بيئة صحية.',
    Icon: Bug,
    borderClass: 'border-[rgba(255,105,0,0.3)] hover:border-[rgba(255,105,0,0.7)]',
    features: [
      'مكافحة الحشرات المنزلية',
      'مكافحة القوارض',
      'مكافحة الأرضة',
      'مكافحة البعوض والناموس',
      'مكافحة الزواحف والعقارب',
      'مكافحة الطيور الضارة',
      'مكافحة الحيوانات الضالة',
    ],
  },
]

function Services() {
  const content = useSiteContent()
  // Visuals (number, icon, border) stay fixed per category; the text comes from the dashboard.
  const services = fallbackServices.map((service) => {
    const fromApi = content?.services.find((item) => item.category === service.category)
    return fromApi
      ? { ...service, title: fromApi.title, description: fromApi.description ?? '', features: fromApi.features }
      : service
  })

  return (
    <section
      id="services"
      className="relative w-full scroll-mt-8 overflow-hidden px-4 py-16 font-cairo text-white sm:px-8 sm:py-20 lg:px-[64px] lg:pb-[91px] lg:pt-[128px]"
      dir="rtl"
      style={{ backgroundImage: 'linear-gradient(141.6deg, #0f3d27 0%, #1a5a3d 100%)' }}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-10">
        <span className="absolute right-0 top-0 h-[384px] w-[384px] rounded-full bg-gold blur-[64px]" />
        <span className="absolute bottom-0 left-0 h-[384px] w-[384px] rounded-full bg-gold blur-[64px]" />
      </div>

      <div className="relative mx-auto w-full max-w-[1240px]">
        <Reveal>
        <header className="mx-auto max-w-[768px] text-center">
          <p className="mx-auto inline-flex h-[42px] items-center rounded-full border border-gold-bright/30 bg-gold-bright/10 px-5 text-[14px] font-medium tracking-[0.7px] text-gold-bright">
            ماذا نقدم
          </p>

          <h2 className="mt-6 text-[34px] font-bold leading-[1.2] sm:text-[46px] lg:text-[60px] lg:leading-[60px]">
            مجالات عملنا الرئيسية
          </h2>

          <p className="mt-6 text-[16px] leading-7 text-white/70 sm:text-[20px]">
            نقدم مجموعة واسعة من الخدمات المتخصصة التي تلبي احتياجات المشاريع المختلفة وفق أعلى معايير الجودة والاحترافية.
          </p>
        </header>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:mt-[96px] lg:grid-cols-3">
          {services.map(({ number, title, description, Icon, borderClass, features }, index) => (
            <Reveal key={number} delay={index * 120} className="h-full">
            <article
              className={`group relative h-full rounded-[24px] border bg-white/5 p-8 text-right shadow-[0_16px_40px_rgba(0,0,0,0.2)] transition duration-500 hover:-translate-y-2 hover:bg-white/[0.08] hover:shadow-[0_24px_50px_rgba(0,0,0,0.3)] lg:min-h-[721px] lg:p-[40px] ${borderClass}`}
            >
              <span
                aria-hidden="true"
                className="absolute left-6 top-6 text-[60px] font-bold leading-[60px] text-white/5 transition group-hover:text-white/10"
              >
                {number}
              </span>

              <span className="relative flex h-[80px] w-[80px] items-center justify-center">
                <span aria-hidden="true" className="glow-pulse absolute inset-0 bg-gold-bright opacity-50 blur-[24px]" />
                <span className="relative flex h-[80px] w-[80px] items-center justify-center rounded-[16px] border border-gold-bright/30 bg-gold-bright/20 text-gold-bright transition duration-500 group-hover:scale-105 group-hover:rotate-[-6deg]">
                  <Icon className="h-10 w-10" strokeWidth={2} />
                </span>
              </span>

              <h3 className={`mt-6 text-[24px] font-bold leading-8 ${number === '01' ? 'max-w-[206px]' : ''}`}>{title}</h3>

              <p className="mt-6 text-[16px] leading-[26px] text-white/70">{description}</p>

              <span className="mt-6 block h-px w-full origin-right bg-gradient-to-l from-gold-bright/50 via-gold-bright/20 to-transparent transition-transform duration-700 group-hover:scale-x-110" />

              <ul className="mt-6 space-y-3">
                {features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3 text-[14px] leading-5 text-white/80 transition-colors duration-200 hover:text-white">
                    <CircleCheck className="h-5 w-5 shrink-0 text-gold-bright" strokeWidth={2} />
                    {feature}
                  </li>
                ))}
              </ul>
            </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services

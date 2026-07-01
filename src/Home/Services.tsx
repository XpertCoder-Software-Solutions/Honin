import {
  Bug,
  Building2,
  CheckCircle2,
  Sprout,
  type LucideIcon,
} from 'lucide-react'

const sectionGradient =
  'linear-gradient(135deg, #0F3D27 0%, #104029 9.09%, #11422B 18.18%, #12452D 27.27%, #13472F 36.36%, #144A31 45.45%, #154D33 54.55%, #164F35 63.64%, #175237 72.73%, #185539 81.82%, #19573B 90.91%, #1A5A3D 100%)'

const services: Array<{
  number: string
  title: string
  description: string
  Icon: LucideIcon
  borderClass: string
  hoverClass: string
  numberHoverClass: string
  features: string[]
}> = [
  {
    number: '03',
    title: 'مكافحة الآفات والحشرات',
    description:
      'نقدم خدمات متخصصة في مكافحة جميع أنواع الحشرات والآفات باستخدام أحدث التقنيات والمواد الآمنة للحفاظ على بيئة صحية.',
    Icon: Bug,
    borderClass: 'border-[#8D842A]/70',
    hoverClass:
      'hover:border-[#8D842A] hover:shadow-[0_0_18px_rgba(141,132,42,0.55),0_0_44px_rgba(141,132,42,0.32),0_24px_60px_rgba(2,30,18,0.18)]',
    numberHoverClass:
      'group-hover:text-[#8D842A] group-hover:[text-shadow:0_0_14px_rgba(141,132,42,0.75),0_0_30px_rgba(141,132,42,0.45)]',
    features: [
      'مكافحة الحشرات المنزلية',
      'مكافحة القوارض',
      'مكافحة الأرضة',
      'مكافحة العوض والناموس',
      'مكافحة الزواحف والعقارب',
      'مكافحة الطيور الضارة',
      'مكافحة الحيوانات الضالة',
    ],
  },
  {
    number: '02',
    title: 'الزراعة وتنسيق الحدائق',
    description:
      'نقدم حلولاً متكاملة لتحويل المساحات إلى بيئات خضراء جذابة من خلال تصميم وتنفيذ مشاريع اللاند سكيب بأحدث الأساليب.',
    Icon: Sprout,
    borderClass: 'border-[#1F8A5C]/70',
    hoverClass:
      'hover:border-[#1F8A5C] hover:shadow-[0_0_18px_rgba(31,138,92,0.55),0_0_44px_rgba(31,138,92,0.32),0_24px_60px_rgba(2,30,18,0.18)]',
    numberHoverClass:
      'group-hover:text-[#1F8A5C] group-hover:[text-shadow:0_0_14px_rgba(31,138,92,0.75),0_0_30px_rgba(31,138,92,0.45)]',
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
    number: '01',
    title: 'المقاولات والأعمال المساحية',
    description:
      'نقدم خدمات متكاملة في تنفيذ المشاريع الإنشائية وأعمال البنية التحتية، بالإضافة إلى جميع أعمال الرفع المساحي باستخدام أحدث التقنيات والأجهزة.',
    Icon: Building2,
    borderClass: 'border-[#24728A]/70',
    hoverClass:
      'hover:border-[#24728A] hover:shadow-[0_0_18px_rgba(36,114,138,0.55),0_0_44px_rgba(36,114,138,0.32),0_24px_60px_rgba(2,30,18,0.18)]',
    numberHoverClass:
      'group-hover:text-[#24728A] group-hover:[text-shadow:0_0_14px_rgba(36,114,138,0.75),0_0_30px_rgba(36,114,138,0.45)]',
    features: [
      'أعمال الرفع المساحي',
      'التشييد والبناء',
      'تنفيذ مشاريع البنية التحتية',
      'شبكات المياه والصرف الصحي',
      'تصريف السيول',
      'الإشراف والصيانة',
      'الأعمال الكهربائية',
      'تنفيذ البلوك والإنترلوك',
      'تنفيذ المناقصات الحكومية',
    ],
  },
]

function ServiceIcon({ Icon }: { Icon: LucideIcon }) {
  return (
    <span className="flex h-[64px] w-[64px] items-center justify-center rounded-[16px] border border-[#D5A125]/35 bg-[#D5A125]/35 text-[#F2C536] shadow-[0_16px_28px_rgba(213,161,37,0.12)] sm:h-[72px] sm:w-[72px] lg:h-[80px] lg:w-[80px] lg:rounded-[18px]">
      <Icon className="h-8 w-8 sm:h-9 sm:w-9 lg:h-10 lg:w-10" strokeWidth={2} />
    </span>
  )
}

function Services() {
  return (
    <section
      id="services"
      className="w-full overflow-hidden px-4 py-16 text-white sm:px-6 sm:py-20 md:px-8 lg:px-[50px] lg:py-[100px]"
      dir="rtl"
      style={{ background: sectionGradient }}
    >
      <div className="mx-auto w-full max-w-[1440px]">
        <header className="mx-auto max-w-[1440px] text-center">
          <p className="mx-auto inline-flex min-h-[42px] items-center justify-center rounded-full border border-[#D5A125]/35 bg-[#D5A125]/10 px-8 text-[14px] font-black text-[#D5A125]">
            ماذا نقدم
          </p>

          <h2 className="mt-6 text-[34px] font-black leading-tight sm:mt-8 sm:text-[44px] md:text-[52px] lg:text-[60px]">
            مجالات عملنا الرئيسية
          </h2>

          <p className="mx-auto mt-5 max-w-[900px] text-[16px] font-medium leading-8 text-white/62 sm:mt-7 sm:text-[18px] lg:max-w-[1440px] lg:text-[20px] lg:leading-10">
            نقدم مجموعة واسعة من الخدمات المتخصصة التي تلبي احتياجات المشاريع
            المختلفة وفق أعلى معايير الجودة والاحترافية.
          </p>
        </header>

        <div
          className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6 lg:mt-[96px] lg:grid-cols-3 lg:gap-8"
          dir="ltr"
        >
          {services.map(({ number, title, description, Icon, borderClass, hoverClass, numberHoverClass, features }) => (
            <article
              key={number}
              className={`group relative min-h-0 overflow-hidden rounded-[24px] border-2 bg-white/5 px-5 py-7 text-right shadow-[0_24px_60px_rgba(2,30,18,0.16)] backdrop-blur-sm transition-[border-color,box-shadow,transform] duration-300 ease-out hover:-translate-y-1 sm:px-8 sm:py-9 lg:min-h-[720px] lg:rounded-[30px] lg:px-10 lg:pb-10 lg:pt-10 ${borderClass} ${hoverClass}`}
              dir="rtl"
            >
              <div className="relative flex items-center justify-start">
                <span
                  className={`absolute left-0 top-1/2 -translate-y-1/2 text-[48px] font-black leading-none text-white/6 transition-[color,text-shadow] duration-300 ease-out sm:text-[56px] lg:text-[60px] ${numberHoverClass}`}
                  aria-hidden="true"
                >
                  {number}
                </span>
                <ServiceIcon Icon={Icon} />
              </div>

              <h3 className="mt-8 max-w-full text-[22px] font-black leading-[1.25] text-white sm:mt-10 sm:text-[24px] lg:mt-12">
                {title}
              </h3>

              <p className="mt-5 text-[15px] font-medium leading-7 text-white/62 sm:mt-7 sm:text-[16px] sm:leading-8 lg:mt-9 lg:leading-9">
                {description}
              </p>

              <span className="mt-7 block h-px w-full bg-gradient-to-l from-[#D5A125]/80 via-[#AEA14A]/45 to-transparent lg:mt-9" />

              <ul className="mt-6 space-y-3 sm:mt-8 sm:space-y-4">
                {features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-center justify-start gap-3 text-[14px] font-medium leading-6 text-white/72"
                  >
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-[#D5A125] sm:h-6 sm:w-6" strokeWidth={2.3} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services

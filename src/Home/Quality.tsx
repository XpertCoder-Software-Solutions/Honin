import {
  BadgeCheck,
  Clock3,
  Medal,
  UsersRound,
  type LucideIcon,
} from 'lucide-react'

const darkGreen = '#0F3D27'

const qualityItems: Array<{
  title: string
  description: string
  Icon: LucideIcon
}> = [
  {
    title: 'خدمة 24/7',
    description: 'متواجدون على مدار الساعة لخدمتكم',
    Icon: Clock3,
  },
  {
    title: 'جودة عالية',
    description: 'التزام تام بمعايير الجودة العالمية',
    Icon: BadgeCheck,
  },
  {
    title: 'فريق محترف',
    description: 'كوادر مؤهلة ومدربة على أعلى مستوى',
    Icon: UsersRound,
  },
  {
    title: 'خبرة طويلة',
    description: 'أكثر من 40 عاماً في تقديم الخدمات المتميزة',
    Icon: Medal,
  },
]

function QualityIcon({ Icon }: { Icon: LucideIcon }) {
  return (
    <span className="flex h-[80px] w-[80px] items-center justify-center rounded-[18px] bg-[#D5A125] text-[#0F3D27] shadow-[0_16px_24px_rgba(15,61,39,0.2)] sm:rounded-[20px]">
      <Icon className="h-9 w-9" strokeWidth={2} />
    </span>
  )
}

function Quality() {
  return (
    <section
      className="w-full overflow-hidden bg-[#F8F4E6] px-4 py-16 sm:px-6 sm:py-20 md:px-8 lg:px-[50px] lg:py-[100px]"
      dir="rtl"
    >
      <div className="mx-auto w-full max-w-[1440px]">
        <header className="mx-auto max-w-[1120px] text-center">
          <p className="font-black text-[#D5A125] text-[20px]">
            لماذا تختارنا
          </p>

          <h2 className="mt-3 text-[60px] font-black leading-tight text-[#0F3D27]">
            نتميز بالجودة والاحترافية
          </h2>

          <p className="mx-auto mt-6 max-w-[920px] text-[20px] font-medium leading-8 text-[#667085] lg:mt-9">
            نحن نضع ثقة عملائنا في المقام الأول ونسعى دائماً لتقديم أفضل الخدمات
          </p>
        </header>

        <div
          className="mt-14 grid grid-cols-1 gap-6 sm:mt-16 sm:grid-cols-2 lg:mt-[80px] lg:grid-cols-4 lg:gap-8 xl:gap-10"
          dir="ltr"
        >
          {qualityItems.map(({ title, description, Icon }) => (
            <article
              key={title}
              className="flex min-h-auto flex-col items-center rounded-[26px] bg-white px-6 py-10 text-center shadow-[0_22px_44px_rgba(15,61,39,0.16)] ring-1 ring-black/5 lg:rounded-[30px] lg:px-8"
            >
              <QualityIcon Icon={Icon} />

              <h3
                className="mt-8 text-[30px] font-black leading-tight"
                style={{ color: darkGreen }}
              >
                {title}
              </h3>

              <p className="mt-8 min-h-[64px] text-[18px] font-medium leading-8 text-[#667085]">
                {description}
              </p>

              <div className="mt-[24px] w-full">
                <span className="block h-1 rounded-full bg-gradient-to-l from-[#D5A125] via-[#AEA14A] to-transparent" />
              </div>
            </article>
          ))}
        </div>

        <div className="mt-14 flex justify-center lg:mt-[80px]">
          <a
            href="#"
            className="flex min-h-[58px] w-full max-w-[340px] items-center justify-center rounded-full bg-[#D5A125] px-8 text-center text-[20px] font-black text-[#0F3D27] shadow-[0_24px_54px_rgba(15,61,39,0.16)] transition hover:-translate-y-1 hover:bg-[#E1B626] focus:outline-none focus:ring-4 focus:ring-[#0F3D27]/20 sm:min-h-[72px] sm:max-w-[370px] sm:text-[24px]"
          >
            ابدأ مشروعك معنا الآن
          </a>
        </div>
      </div>
    </section>
  )
}

export default Quality

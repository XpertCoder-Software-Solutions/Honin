import { Heart, Quote, Target, type LucideIcon } from 'lucide-react'

const darkGreen = '#0F3D27'
const gold = '#D5A125'

const visionItems: Array<{
  title: string
  lead: string
  description: string
  Icon: LucideIcon
}> = [
  {
    title: 'رؤيتنا',
    lead: 'أن نكون من الرواد في تقديم الخدمات المتكاملة وتحقيق رؤية 2030',
    description:
      'نسعى لأن نكون الخيار الأول للعملاء في مجالات المقاولات والزراعة ومكافحة الآفات من خلال الابتكار والجودة والالتزام بأعلى المعايير',
    Icon: Target,
  },
  {
    title: 'رسالتنا',
    lead: 'تقديم خدمات عالية الجودة وبناء علاقات قائمة على الثقة',
    description:
      'نلتزم بتقديم حلول مبتكرة ومتكاملة تلبي احتياجات عملائنا وتتجاوز توقعاتهم مع الحفاظ على أعلى معايير السلامة والجودة والاحترافية',
    Icon: Heart,
  },
]

function IconBox({ Icon }: { Icon: LucideIcon }) {
  return (
    <span className="flex h-[72px] w-[72px] items-center justify-center rounded-[18px] bg-[#0F3D27] text-white shadow-[0_18px_28px_rgba(15,61,39,0.28)] sm:h-[82px] sm:w-[82px] sm:rounded-[20px] lg:h-[80px] lg:w-[80px]">
      <Icon className="h-8 w-8 sm:h-9 sm:w-9 lg:h-10 lg:w-10" strokeWidth={2.2} />
    </span>
  )
}

function VisionCard({
  title,
  lead,
  description,
  Icon,
}: {
  title: string
  lead: string
  description: string
  Icon: LucideIcon
}) {
  return (
    <article className="flex min-h-[320px] flex-col rounded-[24px] bg-white px-6 py-8 text-right shadow-[0_28px_70px_rgba(15,61,39,0.16)] ring-1 ring-black/5 sm:min-h-[380px] sm:rounded-[28px] sm:px-10 sm:py-10 lg:min-h-[476px] lg:rounded-[30px] lg:px-[64px] lg:py-[60px]">
      <div className="flex flex-col items-start">
        <IconBox Icon={Icon} />

        <h2
          className="mt-6 text-[32px] font-black leading-none sm:text-[40px] lg:text-[36px]"
          style={{ color: darkGreen }}
        >
          {title}
        </h2>
      </div>

      <p className="mt-6 text-right text-[18px] leading-[1.8] text-[#3F4858] sm:mt-10 sm:text-[22px] lg:text-[24px]">
        {lead}
      </p>

      <p className="mt-5 text-right text-[15px] font-medium leading-[1.9] text-[#667085] sm:mt-6 sm:text-[16px] lg:text-[18px]">
        {description}
      </p>

      <div className="mt-auto pt-8">
        <span className="block h-1 rounded-full bg-gradient-to-l from-[#D5A125] via-[#AEA14A] to-transparent" />
      </div>
    </article>
  )
}

function Vision() {
  return (
    <section
      className="w-full overflow-hidden bg-[#F8F4E6] px-4 py-16 sm:px-6 sm:py-20 md:px-8 lg:px-[50px] lg:pb-0 lg:pt-[100px]"
      dir="rtl"
    >
      <div className="mx-auto w-full max-w-[1720px]">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-[80px]">
          {visionItems.map((item) => (
            <VisionCard key={item.title} {...item} />
          ))}
        </div>

        <figure className="relative mt-12 overflow-hidden rounded-[24px] bg-[#0F3D27] px-6 py-14 text-center shadow-[0_28px_70px_rgba(15,61,39,0.16)] sm:mt-16 sm:rounded-[28px] sm:px-10 sm:py-16 lg:mt-[96px] lg:rounded-[30px] lg:px-16 lg:py-[82px]">
          <Quote
            className="absolute right-8 top-6 h-12 w-12 rotate-180 text-[#D5A125]/28 sm:right-10 sm:top-8 lg:right-12 lg:top-10 lg:h-16 lg:w-16"
            fill="currentColor"
            strokeWidth={0}
            aria-hidden="true"
          />

          <blockquote className="relative mx-auto max-w-[1420px] text-[24px] font-black leading-[1.65] text-white sm:text-[30px] md:text-[36px] lg:text-[42px]">
            نؤمن بأن النجاح الحقيقي يقاس برضا عملائنا وثقتهم المستمرة في خدماتنا
          </blockquote>

          <span
            className="relative mx-auto mt-10 block h-1 w-[160px] rounded-full sm:w-[260px] md:w-[320px] lg:mt-[64px] lg:w-[460px]"
            style={{ background: gold }}
            aria-hidden="true"
          />
        </figure>
      </div>
    </section>
  )
}

export default Vision

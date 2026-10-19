import { Heart, Target, type LucideIcon } from 'lucide-react'
import Reveal from '../components/Reveal'

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
      'نلتزم بتقديم حلول مبتكرة ومتكاملة تلبي احتياجات عملائنا وتتجاوز توقعاتهم، مع الحفاظ على أعلى معايير السلامة والجودة والاحترافية',
    Icon: Heart,
  },
]

function Vision() {
  return (
    <section className="w-full bg-cream px-4 py-16 sm:px-8 sm:py-20 lg:px-[64px] lg:py-[128px]" dir="rtl">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-12 lg:gap-[80px]">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
          {visionItems.map(({ title, lead, description, Icon }, index) => (
            <Reveal key={title} delay={index * 150} className="h-full">
            <article className="group flex h-full flex-col items-start rounded-[24px] border border-[#f3f4f6] bg-white p-8 text-right shadow-[0_25px_25px_rgba(0,0,0,0.25)] transition duration-300 hover:-translate-y-1.5 sm:p-[48px]">
              <span className="flex h-[80px] w-[80px] items-center justify-center rounded-[16px] bg-green-gradient text-white shadow-[0_20px_12.5px_rgba(0,0,0,0.1),0_8px_5px_rgba(0,0,0,0.1)] transition duration-500 group-hover:rotate-[-6deg] group-hover:scale-105">
                <Icon className="h-9 w-9" strokeWidth={2} />
              </span>

              <h2 className="mt-8 text-[32px] font-black leading-10 text-brand sm:text-[36px]">{title}</h2>

              <p className="mt-6 text-[20px] leading-[39px] text-[#364153] sm:text-[24px]">{lead}</p>

              <p className="mb-8 mt-6 text-[16px] leading-[29.25px] text-body sm:text-[18px]">{description}</p>

              <span className="mt-auto block h-1 w-full origin-right rounded-full bg-gold-fade transition-transform duration-500 group-hover:scale-x-105" />
            </article>
            </Reveal>
          ))}
        </div>

        <Reveal variant="scale">
        <figure className="relative overflow-hidden rounded-[24px] px-6 py-12 text-center shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] sm:px-16 sm:py-16" style={{ backgroundImage: 'linear-gradient(171.2deg, #0f3d27 0%, #1a5a3d 100%)' }}>
          <span
            aria-hidden="true"
            className="absolute right-8 top-8 text-[128px] font-black leading-[128px] text-gold/20"
          >
            "
          </span>

          <blockquote className="relative text-[22px] font-bold leading-[1.6] text-white sm:text-[30px] lg:text-[36px] lg:leading-[58.5px]">
            نؤمن بأن النجاح الحقيقي يُقاس برضا عملائنا وثقتهم المستمرة في خدماتنا
          </blockquote>

          <span className="relative mx-auto mt-8 block h-1 w-[200px] rounded-full bg-gold sm:w-[394px]" aria-hidden="true" />
        </figure>
        </Reveal>
      </div>
    </section>
  )
}

export default Vision

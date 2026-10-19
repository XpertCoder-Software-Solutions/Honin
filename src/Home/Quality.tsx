import { Award, CircleCheck, Clock, Users, type LucideIcon } from 'lucide-react'
import Reveal from '../components/Reveal'
import SectionHeader from '../components/SectionHeader'

const qualityItems: Array<{
  title: string
  description: string
  Icon: LucideIcon
}> = [
  { title: 'خبرة طويلة', description: 'أكثر من 40 عاماً في تقديم الخدمات المتميزة', Icon: Award },
  { title: 'فريق محترف', description: 'كوادر مؤهلة ومدربة على أعلى مستوى', Icon: Users },
  { title: 'جودة عالية', description: 'التزام تام بمعايير الجودة العالمية', Icon: CircleCheck },
  { title: 'خدمة 24/7', description: 'متواجدون على مدار الساعة لخدمتكم', Icon: Clock },
]

function Quality() {
  return (
    <section className="w-full bg-cream px-4 py-16 sm:px-8 lg:px-[64px] lg:py-[60px]" dir="rtl">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center gap-12 lg:gap-[80px]">
        <SectionHeader
          eyebrow="لماذا تختارنا"
          title="نتميز بالجودة والاحترافية"
          description="نحن نضع ثقة عملائنا في المقام الأول ونسعى دائماً لتقديم أفضل الخدمات"
        />

        <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {qualityItems.map(({ title, description, Icon }, index) => (
            <Reveal key={title} delay={index * 100} className="h-full">
            <article className="group flex h-full flex-col items-center rounded-[24px] border border-[#f3f4f6] bg-white px-8 pb-8 pt-8 text-center shadow-[0_20px_12.5px_rgba(0,0,0,0.1),0_8px_5px_rgba(0,0,0,0.1)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_28px_30px_rgba(0,0,0,0.12),0_10px_10px_rgba(0,0,0,0.08)]">
              <span className="flex h-[80px] w-[80px] items-center justify-center rounded-[16px] bg-gold-gradient text-brand shadow-[0_10px_7.5px_rgba(0,0,0,0.1),0_4px_3px_rgba(0,0,0,0.1)] transition duration-500 group-hover:-translate-y-1 group-hover:rotate-[-6deg]">
                <Icon className="h-9 w-9" strokeWidth={2} />
              </span>

              <h3 className="mt-6 text-[26px] font-extrabold leading-9 text-brand sm:text-[30px]">{title}</h3>

              <p className="mb-6 mt-4 text-[18px] leading-[29.25px] text-body">{description}</p>

              <span className="mt-auto block h-1 w-full origin-right bg-gold-fade pt-0 transition-transform duration-500 group-hover:scale-x-105" />
            </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
        <a
          href="#contact"
          className="inline-flex h-[59px] items-center justify-center rounded-full bg-gold-gradient px-12 text-[18px] font-extrabold leading-[27px] text-brand shadow-[0_25px_25px_rgba(0,0,0,0.25)] transition duration-200 hover:-translate-y-0.5 hover:brightness-105 active:scale-[0.97] focus:outline-none focus:ring-4 focus:ring-gold/40"
        >
          ابدأ مشروعك معنا الآن
        </a>
        </Reveal>
      </div>
    </section>
  )
}

export default Quality

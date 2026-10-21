import {
  ArrowLeft,
  Bug,
  Building2,
  CircleCheckBig,
  Sprout,
  type LucideIcon,
} from 'lucide-react'
import constructionImage from '../assets/about/construction.jpg'
import landscapeImage from '../assets/about/landscaping.jpg'
import pestControlImage from '../assets/about/pest-control.jpg'
import Reveal from '../components/Reveal'

const aboutCards: Array<{
  title: string
  image: string
  Icon: LucideIcon
}> = [
  { title: 'المقاولات والأعمال المساحية', image: constructionImage, Icon: Building2 },
  { title: 'الزراعة وتنسيق الحدائق', image: landscapeImage, Icon: Sprout },
  { title: 'مكافحة الآفات والقوارض', image: pestControlImage, Icon: Bug },
]

function AboutCard({ title, image, Icon }: (typeof aboutCards)[number]) {
  return (
    <article className="group relative h-[400px] overflow-hidden rounded-[24px] border border-white/10 bg-white/5 shadow-[0_20px_40px_-20px_rgba(15,61,39,0.45)] transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_50px_-20px_rgba(15,61,39,0.6)]">
      <img
        src={image}
        alt={title}
        className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.06]"
      />

      <span
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[rgba(10,10,10,0.9)] via-[rgba(10,10,10,0.5)] to-transparent"
      />

      <div className="absolute inset-x-6 bottom-[28px] flex flex-col items-start text-right">
        <span className="flex h-[56px] w-[56px] items-center justify-center rounded-[16px] bg-gold-bright-gradient text-white shadow-[0_8px_20px_rgba(231,188,42,0.35)] transition duration-500 group-hover:-translate-y-1 group-hover:rotate-[-6deg]">
          <Icon className="h-7 w-7" strokeWidth={2} />
        </span>

        <h3 className="mt-4 font-cairo text-[22px] font-bold leading-8 text-white sm:text-[24px]">{title}</h3>

        <span className="mt-2 block h-1 w-16 origin-right rounded-full bg-gradient-to-l from-gold-bright to-transparent transition-transform duration-500 group-hover:scale-x-150" />
      </div>
    </article>
  )
}

function About() {
  return (
    <section
      id="about"
      className="w-full scroll-mt-8 bg-cream px-4 pb-16 pt-14 font-cairo sm:px-8 sm:pb-20 sm:pt-16 lg:px-[64px] lg:pb-[110px] lg:pt-[110px]"
      dir="rtl"
    >
      <div className="mx-auto flex w-full max-w-[1240px] flex-col items-center gap-12 lg:gap-[71px]">
        <Reveal className="w-full max-w-[786px]">
        <header className="flex w-full flex-col items-center gap-3 text-center">
          <p className="inline-flex h-[42px] items-center gap-3 rounded-full border border-gold-bright/30 bg-gold-bright/10 px-5 text-[14px] font-medium tracking-[0.7px] text-ink">
            <span className="h-2 w-2 rounded-full bg-gold-bright" />
            نبذة عن شركة حنين
          </p>

          <h2 className="text-[34px] font-bold leading-[1.25] text-ink sm:text-[46px] lg:text-[60px] lg:leading-[75px]">
            خبرة أكثر من <span className="text-gold-gradient">40 عامًا</span>
            <br />
            في تنفيذ المشاريع والخدمات المتكاملة
          </h2>

          <p className="mt-7 max-w-[732px] text-[16px] leading-[29.25px] text-muted sm:text-[18px]">
            تُعد شركة حنين من الشركات الرائدة والمتخصصة في تقديم مجموعة متكاملة من الخدمات في مجالات المقاولات والأعمال المساحية، والزراعة وتنسيق الحدائق، ومكافحة الآفات والحشرات.
          </p>
        </header>
        </Reveal>

        <div className="mx-auto grid w-full max-w-[420px] grid-cols-1 gap-8 lg:max-w-none lg:grid-cols-3">
          {aboutCards.map((card, index) => (
            <Reveal key={card.title} delay={index * 120}>
              <AboutCard {...card} />
            </Reveal>
          ))}
        </div>

        <Reveal className="w-full max-w-[896px]" variant="scale">
        <div className="w-full rounded-[24px] border border-white/10 bg-brand-card shadow-[0_30px_60px_-30px_rgba(15,61,39,0.6)] px-6 pt-8 sm:px-[49px] sm:pb-[49px] sm:pt-[49px]">
          <div className="space-y-4 text-right text-[16px] leading-[29.25px] sm:text-[18px]">
            <p className="text-[#fdfdfd]">
              منذ تأسيس الشركة عام <span className="font-semibold">1401هـ</span> عملت حنين على تقديم حلول متكاملة تعتمد على الخبرة الطويلة والكفاءات المهنية المتخصصة من المهندسين والفنيين، إضافة إلى استخدام أحدث الأجهزة والمعدات لضمان تنفيذ المشاريع وفق أعلى معايير الجودة.
            </p>
            <p className="text-white/70">
              نحن نلتزم بتقديم خدمات احترافية تلبي احتياجات عملائنا في القطاعين الحكومي والخاص، مع الحرص على الدقة والالتزام بالمواعيد وتحقيق أفضل النتائج.
            </p>
          </div>

          <div className="mt-6 flex flex-col items-start justify-between gap-6 border-t border-[#e5e5e6] py-6 sm:min-h-[89px] sm:flex-row sm:items-center sm:py-0">
            <div className="flex items-center gap-4">
              <span className="flex h-[64px] w-[64px] shrink-0 items-center justify-center rounded-[16px] bg-gold-bright-gradient text-white">
                <CircleCheckBig className="h-8 w-8" strokeWidth={2} />
              </span>
              <div className="text-right">
                <h3 className="text-[20px] font-bold leading-7 text-[#fdfdfd]">معتمدون وموثوقون</h3>
                <p className="text-[14px] leading-5 text-[#fdfdfd]">شركة مسجلة ومرخصة في المملكة</p>
              </div>
            </div>

            <a
              href="#services"
              className="group/btn inline-flex h-[56px] w-full items-center justify-center gap-3 rounded-[16px] bg-gradient-to-r from-gold-bright to-[#d4ab1f] whitespace-nowrap px-8 text-[16px] font-semibold text-ink transition duration-200 hover:-translate-y-0.5 hover:brightness-105 active:scale-[0.97] focus:outline-none focus:ring-4 focus:ring-gold-bright/35 sm:w-auto sm:min-w-[194px]"
            >
              تعرّف علينا أكثر
              <ArrowLeft className="h-5 w-5 transition-transform duration-300 group-hover/btn:-translate-x-1" strokeWidth={2} />
            </a>
          </div>
        </div>
        </Reveal>
      </div>
    </section>
  )
}

export default About

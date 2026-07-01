import {
  ArrowLeft,
  BadgeCheck,
  Bug,
  Building2,
  Sprout,
  type LucideIcon,
} from 'lucide-react'
import contactImage from '../assets/Contact Us Bg.png'
import constructionImage from '../assets/projects/commercial-tower.png'
import landscapeImage from '../assets/projects/luxury-garden-design.png'

const aboutCards: Array<{
  eyebrow: string
  title: string
  image: string
  Icon: LucideIcon
  imageClass: string
}> = [
  {
    eyebrow: 'PEST CONTROL',
    title: 'مكافحة الآفات والقوارض',
    image: contactImage,
    Icon: Bug,
    imageClass: 'object-[32%_58%] scale-125',
  },
  {
    eyebrow: 'LANDSCAPING',
    title: 'الزراعة وتنسيق الحدائق',
    image: landscapeImage,
    Icon: Sprout,
    imageClass: 'object-[48%_14%] scale-125',
  },
  {
    eyebrow: 'CONSTRUCTION',
    title: 'المقاولات والأعمال المساحية',
    image: constructionImage,
    Icon: Building2,
    imageClass: 'object-[48%_8%] scale-125',
  },
]

function AboutCard({ eyebrow, title, image, Icon, imageClass }: (typeof aboutCards)[number]) {
  return (
    <article className="group relative aspect-[416/424] w-full overflow-hidden rounded-[20px] bg-[#09150f] shadow-[0_24px_54px_rgba(15,61,39,0.16)] sm:rounded-[24px]">
      <img
        src={image}
        alt=""
        aria-hidden="true"
        className={`absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-[1.32] ${imageClass}`}
      />

      <span
        aria-hidden="true"
        className="absolute inset-0 bg-black/45 transition duration-500 group-hover:bg-black/35"
      />

      <span
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-t from-black via-black/82 to-transparent"
      />

      <div className="absolute inset-0 z-10 flex flex-col justify-between px-7 py-7 text-left sm:px-9 sm:py-8">
        <div>
          <span className="mb-3 block h-[2px] w-12 rounded-full bg-[#E9C229]" />
          <p className="text-[18px] font-medium uppercase leading-none tracking-[0.02em] text-[#E9C229] sm:text-[20px]">
            {eyebrow}
          </p>
        </div>

        <div className="flex flex-col items-end text-right" dir="rtl">
          <span className="mb-5 flex h-[60px] w-[60px] items-center justify-center rounded-[16px] bg-[#E9C229] text-white shadow-[0_14px_28px_rgba(213,161,37,0.32)] transition group-hover:-translate-y-1 group-hover:shadow-[0_0_26px_rgba(233,194,41,0.55)] sm:h-[64px] sm:w-[64px]">
            <Icon className="h-8 w-8" strokeWidth={2.3} />
          </span>

          <h3 className="max-w-full text-[24px] font-black leading-tight text-white sm:text-[28px]">
            {title}
          </h3>

          <span className="mt-4 block h-[4px] w-[72px] rounded-full bg-gradient-to-l from-[#E9C229] to-transparent" />
        </div>
      </div>
    </article>
  )
}

function About() {
  return (
    <section
      className="w-full overflow-hidden bg-[#F8F4E6] px-4 py-16 sm:px-6 sm:py-20 md:px-8 lg:px-[50px] lg:pb-[100px] lg:pt-[160px]"
      dir="rtl"
    >
      <div className="mx-auto w-full max-w-[1320px]">
        <header className="mx-auto max-w-[1440px] text-center">
          <p className="mx-auto inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full border border-[#D5A125]/35 px-7 text-[14px] font-medium text-[#2C2C2C] bg-[#E7BC2A]/10">
            <span className="h-2.5 w-2.5 rounded-full bg-[#E7BC2A]" />
            نبذة عن شركة حنين
          </p>

          <h2 className="mx-auto mt-7 max-w-[1440px] text-center text-[60px] font-black leading-[1.28] text-[#252525]">
            خبرة أكثر من{' '}
            <span className="text-[#D5A125]">40 عاماً</span>
            <span className="block w-full text-center">في تنفيذ المشاريع والخدمات المتكاملة</span>
          </h2>

          <p className="mx-auto mt-7 max-w-[820px] text-[18px] font-medium leading-8 text-[#777777] lg:mt-9 lg:leading-10">
            تعد شركة حنين من الشركات الرائدة والمتخصصة في تقديم مجموعة متكاملة
            من الخدمات في مجالات المقاولات والأعمال المساحية، والزراعة وتنسيق
            الحدائق، ومكافحة الآفات والحشرات.
          </p>
        </header>

        <div className="mt-14 grid grid-cols-1 gap-7 md:grid-cols-3 lg:mt-[82px] lg:gap-8" dir="ltr">
          {aboutCards.map((card) => (
            <AboutCard key={card.eyebrow} {...card} />
          ))}
        </div>

        <div className="mx-auto mt-16 w-full max-w-[896px] rounded-[22px] bg-[#145538] p-12 text-white shadow-[0_24px_54px_rgba(15,61,39,0.18)] sm:rounded-[24px] lg:mt-[80px]">
          <p className="mx-auto text-start text-[18px] font-medium leading-9 text-white/82 lg:leading-10">
         منذ تأسيس الشركة عام 1401هـ عملت حنين على تقديم حلول متكاملة تعتمد على الخبرة الطويلة والكفاءات المهنية المتخصصة من المهندسين والفنيين، إضافة إلى استخدام أحدث الأجهزة والمعدات لضمان تنفيذ المشاريع وفق أعلى معايير الجودة.
         </p>

          <p className="mx-auto mt-4 text-start text-[18px] font-medium leading-9 text-white/62 lg:leading-10">
            نحن نلتزم بتقديم خدمات احترافية تلبي احتياجات عملائنا في القطاعين
            الحكومي والخاص، مع الحرص على الدقة والالتزام بالمواعيد وتحقيق أفضل
            النتائج.
          </p>

          <span className="my-6 block h-px w-full bg-white/36" />

          <div className="flex flex-col-reverse items-center justify-between gap-7 md:flex-row">
            <div className="flex items-center gap-5 text-right" dir="rtl">
              <span className="flex h-[64px] w-[64px] shrink-0 items-center justify-center rounded-[16px] bg-[#E9C229] text-white shadow-[0_14px_28px_rgba(0,0,0,0.12)]">
                <BadgeCheck className="h-8 w-8" strokeWidth={2} />
              </span>

              <div>
                <h3 className="text-[20px] font-black leading-tight text-white">
                  معتمدون وموثوقون
                </h3>
                <p className="mt-1 text-[14px] font-medium leading-7 text-white/70">
                  شركة مسجلة ومرخصة في المملكة
                </p>
              </div>
            </div>
            <a
              href="#"
              className="inline-flex min-h-[56px] w-full items-center justify-center gap-3 rounded-[14px] bg-[#E9C229] px-8 text-[16px] font-medium text-[#0F3D27] shadow-[0_14px_28px_rgba(0,0,0,0.12)] transition hover:-translate-y-1 hover:bg-[#F2C536] focus:outline-none focus:ring-4 focus:ring-[#E9C229]/35 sm:w-auto sm:min-w-[208px]"
            >
              تعرف علينا أكثر
              <ArrowLeft className="h-5 w-5" strokeWidth={2} />
            </a>


          </div>
        </div>
      </div>
    </section>
  )
}

export default About

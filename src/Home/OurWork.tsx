import { ExternalLink } from 'lucide-react'
import Reveal from '../components/Reveal'
import SectionHeader from '../components/SectionHeader'
import { routeHref } from '../router'
import commercialTowerImage from '../assets/projects/commercial-tower.jpg'
import infrastructureImage from '../assets/projects/infrastructure-project.jpg'
import landscapeImage from '../assets/projects/landscape-coordination.jpg'
import luxuryGardenImage from '../assets/projects/luxury-garden-design.jpg'
import residentialComplexImage from '../assets/projects/modern-residential-complex.jpg'
import surveyingImage from '../assets/projects/surveying-project.jpg'

const projects = [
  { category: 'مقاولات', title: 'مشروع البنية التحتية', image: infrastructureImage },
  { category: 'زراعة', title: 'تصميم حديقة فاخرة', image: luxuryGardenImage },
  { category: 'مقاولات', title: 'مجمع سكني حديث', image: residentialComplexImage },
  { category: 'زراعة', title: 'تنسيق لاند سكيب', image: landscapeImage },
  { category: 'مقاولات', title: 'مشروع رفع مساحي', image: surveyingImage },
  { category: 'مقاولات', title: 'برج تجاري', image: commercialTowerImage },
]

function OurWork() {
  return (
    <section id="work" className="w-full scroll-mt-8 bg-cream px-4 py-16 sm:px-8 sm:py-20 lg:px-[64px] lg:py-[128px]" dir="rtl">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col items-center">
        <SectionHeader
          eyebrow="أعمالنا"
          title="أعمال نفخر بإنجازها"
          description="نستعرض مجموعة من الأعمال المميزة التي تعكس جودة عملنا والتزامنا"
        />

        <div className="mt-12 grid w-full grid-cols-1 gap-10 md:grid-cols-2 lg:mt-[96px] xl:grid-cols-3">
          {projects.map((project, index) => (
            <Reveal key={project.title} delay={(index % 3) * 120}>
            <a
              href={routeHref('/works')}
              aria-label={`عرض المشروع: ${project.title}`}
              className="group relative block h-[320px] overflow-hidden rounded-[24px] bg-white shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_8px_10px_-6px_rgba(0,0,0,0.1)] outline-none transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_40px_-10px_rgba(15,61,39,0.35)] focus-visible:ring-4 focus-visible:ring-gold/40"
            >
              <img
                src={project.image}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover transition duration-700 ease-out group-hover:scale-110"
              />

              <span
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-brand via-brand/50 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95"
              />

              <div className="absolute inset-x-8 bottom-8 flex flex-col items-start text-right transition-transform duration-500 group-hover:-translate-y-1">
                <span className="inline-flex h-[37px] items-center rounded-full bg-gold px-4 text-[14px] font-bold leading-5 text-brand">
                  {project.category}
                </span>

                <h3 className="mt-[9px] text-[26px] font-extrabold leading-9 text-white sm:text-[30px]">{project.title}</h3>

                <span className="mt-4 inline-flex items-center gap-2 text-[16px] font-bold leading-6 text-white transition-colors duration-300 group-hover:text-gold-bright">
                  عرض المشروع
                  <ExternalLink className="h-5 w-5 transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-0.5" aria-hidden="true" />
                </span>
              </div>
            </a>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 lg:mt-16">
        <a
          href={routeHref('/works')}
          className="inline-flex h-[59px] items-center justify-center rounded-full bg-green-gradient px-12 text-[18px] font-bold leading-[27px] text-white shadow-[0_25px_25px_rgba(0,0,0,0.25)] transition hover:-translate-y-0.5 hover:brightness-110 focus:outline-none focus:ring-4 focus:ring-gold/40 active:scale-[0.97]"
        >
          شاهد المزيد من الأعمال
        </a>
        </Reveal>
      </div>
    </section>
  )
}

export default OurWork

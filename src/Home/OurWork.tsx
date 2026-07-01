import { ExternalLink } from 'lucide-react'
import commercialTowerImage from '../assets/projects/commercial-tower.png'
import infrastructureImage from '../assets/projects/infrastructure-project.png'
import landscapeImage from '../assets/projects/landscape-coordination.png'
import luxuryGardenImage from '../assets/projects/luxury-garden-design.png'
import residentialComplexImage from '../assets/projects/modern-residential-complex.png'
import surveyingImage from '../assets/projects/surveying-project.png'

const projects = [
  {
    category: 'مقاولات',
    title: 'مجمع سكني حديث',
    image: residentialComplexImage,
  },
  {
    category: 'زراعة',
    title: 'تصميم حديقة فاخرة',
    image: luxuryGardenImage,
  },
  {
    category: 'مقاولات',
    title: 'مشروع البنية التحتية',
    image: infrastructureImage,
  },
  {
    category: 'مقاولات',
    title: 'برج تجاري',
    image: commercialTowerImage,
  },
  {
    category: 'مقاولات',
    title: 'مشروع رفع مساحي',
    image: surveyingImage,
  },
  {
    category: 'زراعة',
    title: 'تنسيق لاند سكيب',
    image: landscapeImage,
  },
]

function OurWork() {
  return (
    <section
      id="work"
      className="w-full overflow-hidden bg-[#F8F4E6] px-4 py-16 sm:px-6 sm:py-20 md:px-8 lg:px-[50px] lg:py-28 xl:py-[100px]"
      dir="rtl"
    >
      <div className="mx-auto w-full max-w-[1720px]">
        <header className="mx-auto max-w-[860px] text-center">
          <p className="text-base font-black text-[#D5A125] sm:text-lg lg:text-[20px]">
            أعمالنا
          </p>

          <h2 className="mx-auto mt-3 max-w-[340px] text-[34px] font-black leading-tight text-[#0F3D27] sm:max-w-none sm:text-[44px] md:text-[52px] lg:mt-4 lg:text-[60px]">
            <span className="block sm:inline">اعمال نفخر بإنجازها</span>
          </h2>

          <p className="mx-auto mt-5 max-w-[760px] text-base font-medium leading-8 text-[#697282] sm:text-lg lg:mt-7 lg:text-[20px] lg:leading-10">
            نستعرض مجموعة من الاعمال المميزة التي تعكس جودة عملنا والتزامنا
          </p>
        </header>

        <div
          className="mt-10 grid min-w-0 grid-cols-1 justify-items-center gap-6 sm:mt-10 md:grid-cols-2 lg:gap-10 xl:mt-[80px] xl:grid-cols-3"
          dir="ltr"
        >
          {projects.map((project) => (
            <a
              key={project.title}
              href="#"
              aria-label={`عرض المشروع: ${project.title}`}
              className="group relative block aspect-[181/128] w-full max-w-[560px] min-w-0 overflow-hidden rounded-[24px] shadow-[0_18px_36px_rgba(15,61,39,0.12)] outline-none transition hover:-translate-y-1 hover:shadow-[0_24px_48px_rgba(15,61,39,0.18)] focus:ring-4 focus:ring-[#D5A125]/40"
              dir="rtl"
            >
              <img
                src={project.image}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />

              <span
                aria-hidden="true"
                className="absolute inset-0 bg-[#0F3D27]/20"
              />

              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-[68%] bg-[#0F3D27]/95"
              />

              <span
                aria-hidden="true"
                className="absolute inset-x-0 bottom-[68%] h-[18%]"
                style={{
                  background:
                    'linear-gradient(to top, rgba(15, 61, 39, 0.95), rgba(15, 61, 39, 0))',
                }}
              />

              <div className="absolute inset-0 z-10 flex flex-col items-end justify-end px-5 pb-5 text-right sm:px-7 sm:pb-7 lg:px-8 lg:pb-8">
                <span className="inline-flex min-h-[38px] items-center rounded-full bg-[#D5A125] px-5 text-base font-black text-[#0F3D27] sm:min-h-[46px] sm:px-7 sm:text-lg lg:min-h-[52px] lg:px-8 lg:text-[20px]">
                  {project.category}
                </span>

                <h3 className="mt-4 max-w-full text-[24px] font-black leading-tight text-white sm:mt-6 sm:text-[32px] lg:mt-7 lg:text-[40px] xl:text-[46px]">
                  {project.title}
                </h3>

                <span className="mt-4 inline-flex items-center gap-2 text-[16px] font-black text-white sm:mt-5 sm:gap-3 sm:text-xl lg:text-[24px]">
                  <ExternalLink className="h-5 w-5 sm:h-7 sm:w-7" aria-hidden="true" />
                  عرض المشروع
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-12 flex justify-center lg:mt-[80px]">
          <a
            href="#"
            className="flex min-h-[58px] w-full max-w-[330px] items-center justify-center rounded-full bg-[#0F3D27] px-8 text-center text-lg font-black text-white shadow-[0_24px_54px_rgba(15,61,39,0.25)] transition hover:-translate-y-1 hover:bg-[#154D33] focus:outline-none focus:ring-4 focus:ring-[#D5A125]/40 sm:min-h-[70px] sm:max-w-[370px] sm:text-xl lg:text-[22px]"
          >
            شاهد المزيد من الأعمال
          </a>
        </div>
      </div>
    </section>
  )
}

export default OurWork

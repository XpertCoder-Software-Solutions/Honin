import { useState } from 'react'
import { Image } from 'lucide-react'
import CategoryTabs, { type Category } from '../components/CategoryTabs'
import Lightbox from '../components/Lightbox'
import abhaFlies from '../assets/works/abha-flies.jpg'
import ahsaTermites from '../assets/works/ahsa-termites.jpg'
import bahaMonitoring from '../assets/works/baha-monitoring.jpg'
import communityEducation from '../assets/works/community-education.jpg'
import dammamRats from '../assets/works/dammam-rats.jpg'
import jeddahMosquitoes from '../assets/works/jeddah-mosquitoes.jpg'
import khobarAwareness from '../assets/works/khobar-awareness.jpg'
import madinahInsects from '../assets/works/madinah-insects.jpg'
import taifCockroaches from '../assets/works/taif-cockroaches.jpg'
import commercialTower from '../assets/projects/commercial-tower.jpg'
import infrastructure from '../assets/projects/infrastructure-project.jpg'
import landscapeCoordination from '../assets/projects/landscape-coordination.jpg'
import luxuryGarden from '../assets/projects/luxury-garden-design.jpg'
import residentialComplex from '../assets/projects/modern-residential-complex.jpg'
import surveying from '../assets/projects/surveying-project.jpg'

type Work = { title: string; description?: string; image: string }

const works: Record<Category, Work[]> = {
  'pest-control': [
    {
      title: 'مشروع القضاء على البعوض في جدة',
      description: 'تقليل انتشار الأمراض عن طريق القضاء على تجمعات البعوض من خلال استخدام طرق فعالة ومبتكرة.',
      image: jeddahMosquitoes,
    },
    {
      title: 'برنامج مكافحة الفئران في الدمام',
      description: 'تطبيق استراتيجيات متكاملة لمكافحة الفئران في المناطق السكنية والصناعية للحفاظ على سلامة الغذاء.',
      image: dammamRats,
    },
    {
      title: 'مكافحة الحشرات في المدينة المنورة',
      description: 'توفير حلول طبيعية وصديقة للبيئة لمكافحة الحشرات الطائرة والحفاظ على صحة المواطنين.',
      image: madinahInsects,
    },
    {
      title: 'استراتيجية مكافحة الصراصير في الطائف',
      description: 'استخدام تقنيات حديثة في رصد ومكافحة الصراصير لضمان بيئة نظيفة وصحية.',
      image: taifCockroaches,
    },
    {
      title: 'التحصين ضد النمل الأبيض في الأحساء',
      description: 'تقديم خدمات فحص وعلاج لمنازل الأحساء لحمايتها من هجمات النمل الأبيض.',
      image: ahsaTermites,
    },
    {
      title: 'حملة توعية ضد القوارض في الخبر',
      description: 'رفع مستوى الوعي حول أضرار القوارض وطرق مكافحتها من خلال ورش عمل ومواد توعوية.',
      image: khobarAwareness,
    },
    {
      title: 'حملة مكافحة الذباب في أبها',
      description: 'تنفيذ خطة شاملة للحد من انتشار الذباب في المناطق العامة بواسطة مبيدات آمنة.',
      image: abhaFlies,
    },
    {
      title: 'تثقيف المجتمع فى مكافحة الحشرات',
      description: 'تنظيم فعاليات تعليمية لتعريف المجتمع بكيفية مقاومة الحشرات ومكافحتها.',
      image: communityEducation,
    },
    {
      title: 'برنامج الرصد المبكر للآفات في الباحة',
      description: 'إنشاء نظام إنذار مبكر لرصد انتشار الآفات واتخاذ الإجراءات الوقائية اللازمة.',
      image: bahaMonitoring,
    },
  ],
  landscaping: [
    { title: 'تصميم حديقة فاخرة', image: luxuryGarden },
    { title: 'تنسيق لاند سكيب', image: landscapeCoordination },
  ],
  construction: [
    { title: 'مشروع البنية التحتية', image: infrastructure },
    { title: 'مجمع سكني حديث', image: residentialComplex },
    { title: 'مشروع رفع مساحي', image: surveying },
    { title: 'برج تجاري', image: commercialTower },
  ],
}

function Works() {
  const [category, setCategory] = useState<Category>('pest-control')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const items = works[category]

  return (
    <main className="w-full bg-white px-4 pb-16 pt-[128px] sm:px-8 lg:px-[84px] lg:pb-[78px] lg:pt-[284px]" dir="rtl">
      <h1 className="sr-only">أعمالنا</h1>

      <div className="mx-auto flex w-full max-w-[1400px] flex-col items-center gap-10 lg:gap-16">
        <CategoryTabs
          active={category}
          onChange={(next) => {
            setCategory(next)
            setLightboxIndex(null)
          }}
        />

        <div className="grid w-full grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((work, index) => (
            <article key={work.title} className="flex flex-col overflow-hidden rounded-[32px] border border-[#b0b1b3] bg-white">
              <div className="p-6 text-right sm:p-8">
                <h2 className="text-[20px] font-extrabold leading-9 text-brand">{work.title}</h2>
                {work.description ? (
                  <p className="font-cairo text-[16px] leading-[29.25px] text-muted">{work.description}</p>
                ) : null}
              </div>

              <button
                type="button"
                onClick={() => setLightboxIndex(index)}
                className="group relative mt-auto aspect-square w-full overflow-hidden outline-none"
                aria-label={`عرض صور ${work.title}`}
              >
                <img src={work.image} alt={work.title} loading="lazy" className="h-full w-full object-cover" />
                <span className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
                  <span className="flex items-center gap-2 rounded-[8px] bg-white p-2 text-[16px] font-bold leading-[1.6] text-brand">
                    <Image className="h-4 w-4" strokeWidth={2.2} />
                    عرض الصور
                  </span>
                </span>
              </button>
            </article>
          ))}
        </div>
      </div>

      <Lightbox
        images={items.map((work) => ({ src: work.image, alt: work.title }))}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onChange={setLightboxIndex}
      />
    </main>
  )
}

export default Works

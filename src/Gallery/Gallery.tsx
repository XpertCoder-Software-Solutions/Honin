import { useState } from 'react'
import { ArrowDown } from 'lucide-react'
import CategoryTabs, { type Category } from '../components/CategoryTabs'
import Lightbox from '../components/Lightbox'
import landscaping1 from '../assets/gallery/landscaping-1.jpg'
import landscaping2 from '../assets/gallery/landscaping-2.jpg'
import landscaping3 from '../assets/gallery/landscaping-3.jpg'
import landscaping4 from '../assets/gallery/landscaping-4.jpg'
import landscaping5 from '../assets/gallery/landscaping-5.jpg'
import landscaping6 from '../assets/gallery/landscaping-6.jpg'
import landscaping7 from '../assets/gallery/landscaping-7.jpg'
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
import residentialComplex from '../assets/projects/modern-residential-complex.jpg'
import surveying from '../assets/projects/surveying-project.jpg'

const PAGE_SIZE = 6

const galleryImages: Record<Category, string[]> = {
  landscaping: [landscaping1, landscaping2, landscaping3, landscaping4, landscaping5, landscaping6, landscaping7],
  'pest-control': [
    jeddahMosquitoes,
    dammamRats,
    madinahInsects,
    taifCockroaches,
    ahsaTermites,
    khobarAwareness,
    abhaFlies,
    communityEducation,
    bahaMonitoring,
  ],
  construction: [infrastructure, residentialComplex, surveying, commercialTower],
}

function Photo({ src, index, className, onOpen }: { src: string; index: number; className: string; onOpen: (index: number) => void }) {
  return (
    <button
      type="button"
      onClick={() => onOpen(index)}
      aria-label={`عرض الصورة ${index + 1}`}
      className={`group relative block overflow-hidden rounded-[16px] outline-none transition duration-300 hover:shadow-[0_20px_40px_-16px_rgba(15,61,39,0.4)] focus-visible:ring-4 focus-visible:ring-gold/50 ${className}`}
    >
      <img src={src} alt="" loading="lazy" className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105" />
      <span aria-hidden="true" className="absolute inset-0 bg-brand/0 transition duration-300 group-hover:bg-brand/15" />
    </button>
  )
}

// The landscaping set follows the exact Figma composition: three tall photos,
// then two tall photos beside two stacked wide ones.
function DesignedLayout({ images, onOpen }: { images: string[]; onOpen: (index: number) => void }) {
  return (
    <div className="flex w-full flex-col gap-5" dir="ltr">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
        {images.slice(0, 3).map((src, index) => (
          <Photo key={src} src={src} index={index} onOpen={onOpen} className="aspect-[9/16]" />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="grid grid-cols-2 gap-5">
          <Photo src={images[3]} index={3} onOpen={onOpen} className="aspect-[9/16]" />
          <Photo src={images[4]} index={4} onOpen={onOpen} className="aspect-[9/16]" />
        </div>
        <div className="flex flex-col gap-5">
          <Photo src={images[5]} index={5} onOpen={onOpen} className="aspect-[689/249]" />
          <Photo src={images[6]} index={6} onOpen={onOpen} className="aspect-[1200/560]" />
        </div>
      </div>
    </div>
  )
}

function Gallery() {
  const [category, setCategory] = useState<Category>('landscaping')
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const images = galleryImages[category]
  const usesDesignedLayout = images.length === 7
  const visibleImages = usesDesignedLayout ? images : images.slice(0, visibleCount)
  const hasMore = !usesDesignedLayout && visibleCount < images.length

  return (
    <main className="w-full bg-white px-4 pb-16 pt-[128px] sm:px-8 lg:px-[84px] lg:pb-[64px] lg:pt-[284px]" dir="rtl">
      <h1 className="sr-only">المعرض</h1>

      <div className="mx-auto flex w-full max-w-[1400px] flex-col items-center gap-10 lg:gap-16">
        <CategoryTabs
          active={category}
          onChange={(next) => {
            setCategory(next)
            setVisibleCount(PAGE_SIZE)
            setLightboxIndex(null)
          }}
        />

        <div key={category} className="fade-up flex w-full flex-col items-center gap-5">
          {usesDesignedLayout ? (
            <DesignedLayout images={images} onOpen={setLightboxIndex} />
          ) : (
            <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {visibleImages.map((src, index) => (
                <Photo key={src} src={src} index={index} onOpen={setLightboxIndex} className="aspect-square" />
              ))}
            </div>
          )}

          {hasMore ? (
            <button
              type="button"
              onClick={() => setVisibleCount((count) => count + PAGE_SIZE)}
              className="flex items-center gap-2 rounded-[16px] px-8 py-[23px] text-[20px] font-extrabold leading-9 text-brand transition hover:bg-brand/5"
            >
              عرض المزيد
              <ArrowDown className="h-6 w-6" strokeWidth={1.8} />
            </button>
          ) : null}
        </div>
      </div>

      <Lightbox
        images={visibleImages.map((src, index) => ({ src, alt: `صورة ${index + 1}` }))}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onChange={setLightboxIndex}
      />
    </main>
  )
}

export default Gallery

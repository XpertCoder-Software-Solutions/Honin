import { useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import kafdLogo from '../assets/clients/kafd.png'
import modonLogo from '../assets/clients/modon.png'
import nationalWaterLogo from '../assets/clients/national-water-company.png'
import riyadhMunicipalityLogo from '../assets/clients/riyadh-region-municipality.png'
import saudiElectricityLogo from '../assets/clients/saudi-electricity-company.png'
import qassimMunicipalityLogo from '../assets/clients/qassim-municipality.png'
import asyahMunicipalityLogo from '../assets/clients/asyah-municipality.png'
import alghatMunicipalityLogo from '../assets/clients/alghat-municipality.png'
import hawtatSudairMunicipalityLogo from '../assets/clients/hawtat-sudair-municipality.png'
import agricultureClientLogo from '../assets/clients/agriculture-client.png'
import bukayriyahMunicipalityLogo from '../assets/clients/bukayriyah-municipality.png'
import uyunAljiwaMunicipalityLogo from '../assets/clients/uyun-aljiwa-municipality.png'
import qubbahMunicipalityLogo from '../assets/clients/qubbah-municipality.png'
import unaizahMunicipalityLogo from '../assets/clients/unaizah-municipality.png'
import universityOfHailLogo from '../assets/clients/university-of-hail.png'
import qassimNationalHospitalLogo from '../assets/clients/qassim-national-hospital.png'
import armedForcesMedicalServicesLogo from '../assets/clients/armed-forces-medical-services.png'
import qassimHealthClusterLogo from '../assets/clients/qassim-health-cluster.png'
import qassimUniversityLogo from '../assets/clients/qassim-university.png'
import abanatMunicipalityLogo from '../assets/clients/abanat-municipality.png'
import nabhaniaMunicipalityLogo from '../assets/clients/nabhania-municipality.png'
import alfuwayliqMunicipalityLogo from '../assets/clients/alfuwayliq-municipality.png'
import albadaieMunicipalityLogo from '../assets/clients/albadaie-municipality.png'
import Reveal from '../components/Reveal'
import { prefersReducedMotion } from '../hooks'
import { pick, useSiteContent } from '../site/content'

// Visual order left → right, as in the design.
const fallbackClients = [
  { name: 'الشركة السعودية للكهرباء', logo: saudiElectricityLogo },
  { name: 'شركة المياه الوطنية', logo: nationalWaterLogo },
  { name: 'أمانة منطقة الرياض', logo: riyadhMunicipalityLogo },
  { name: 'مدن', logo: modonLogo },
  { name: 'KAFD', logo: kafdLogo },
  { name: 'أمانة منطقة القصيم', logo: qassimMunicipalityLogo },
  { name: 'بلدية محافظة الأسياح', logo: asyahMunicipalityLogo },
  { name: 'بلدية محافظة الغاط', logo: alghatMunicipalityLogo },
  { name: 'بلدية حوطة سدير', logo: hawtatSudairMunicipalityLogo },
  { name: 'عميل القطاع الزراعي', logo: agricultureClientLogo },
  { name: 'بلدية البكيرية', logo: bukayriyahMunicipalityLogo },
  { name: 'بلدية محافظة عيون الجواء', logo: uyunAljiwaMunicipalityLogo },
  { name: 'بلدية قبة', logo: qubbahMunicipalityLogo },
  { name: 'بلدية محافظة عنيزة', logo: unaizahMunicipalityLogo },
  { name: 'جامعة حائل', logo: universityOfHailLogo },
  { name: 'مستشفى القصيم الوطني', logo: qassimNationalHospitalLogo },
  { name: 'الخدمات الطبية للقوات المسلحة', logo: armedForcesMedicalServicesLogo },
  { name: 'تجمع القصيم الصحي', logo: qassimHealthClusterLogo },
  { name: 'جامعة القصيم', logo: qassimUniversityLogo },
  { name: 'بلدية محافظة أبانات', logo: abanatMunicipalityLogo },
  { name: 'بلدية محافظة النبهانية', logo: nabhaniaMunicipalityLogo },
  { name: 'بلدية الفويلق', logo: alfuwayliqMunicipalityLogo },
  { name: 'بلدية محافظة البدائع', logo: albadaieMunicipalityLogo },
]

const arrowButtonClass =
  'hidden h-[56px] w-[56px] shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/20 text-white transition hover:bg-white/30 focus:outline-none focus:ring-4 focus:ring-white/25 sm:flex'

// Card width (220) + gap (22).
const CARD_STEP = 242
// Auto-scroll speed in px per second.
const AUTO_SPEED = 40

function Clients() {
  const trackRef = useRef<HTMLDivElement>(null)
  // Auto-scroll stops while the pointer, focus or a finger is on the track, and briefly after an arrow click.
  const pausedRef = useRef(false)
  const resumeAtRef = useRef(0)
  const content = useSiteContent()
  const clients = pick(
    content?.clients.filter((client) => client.logo_url).map((client) => ({ name: client.name, logo: client.logo_url as string })),
    fallbackClients,
  )
  const autoScroll = clients.length > 1 && !prefersReducedMotion()

  useEffect(() => {
    const track = trackRef.current
    if (!track || !autoScroll) return

    let frame = 0
    let last = performance.now()
    let position = track.scrollLeft

    const tick = (now: number) => {
      const elapsed = Math.min(now - last, 100)
      last = now
      // The list is rendered twice, so jumping back by one copy's width is seamless.
      const loopWidth = track.scrollWidth / 2
      if (pausedRef.current || now < resumeAtRef.current) {
        position = track.scrollLeft
      } else {
        position += (AUTO_SPEED * elapsed) / 1000
        if (position >= loopWidth) position -= loopWidth
        track.scrollLeft = position
      }
      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [autoScroll, clients.length])

  function scrollBy(direction: 1 | -1) {
    const track = trackRef.current
    if (!track) return
    resumeAtRef.current = performance.now() + 2500
    if (autoScroll) {
      const loopWidth = track.scrollWidth / 2
      if (direction === -1 && track.scrollLeft < CARD_STEP) track.scrollLeft += loopWidth
      if (direction === 1 && track.scrollLeft >= loopWidth) track.scrollLeft -= loopWidth
    }
    track.scrollBy({ left: direction * CARD_STEP, behavior: 'smooth' })
  }

  function pause() {
    pausedRef.current = true
  }

  function resume() {
    pausedRef.current = false
  }

  const items = autoScroll ? [...clients, ...clients] : clients

  return (
    <section
      className="relative w-full overflow-hidden px-4 py-16 font-cairo text-white sm:px-8 lg:py-[48px]"
      dir="rtl"
      style={{ backgroundImage: 'linear-gradient(164deg, #0f3d27 0%, #1a5a3d 100%)' }}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-10">
        <span className="absolute right-0 top-0 h-[384px] w-[384px] rounded-full bg-gold blur-[64px]" />
        <span className="absolute bottom-0 left-0 h-[384px] w-[384px] rounded-full bg-gold blur-[64px]" />
      </div>

      <div className="relative mx-auto flex w-full max-w-[1440px] flex-col items-center gap-10 lg:min-h-[352px] lg:justify-center lg:gap-[47px]">
        <Reveal>
        <h2 className="text-center text-[34px] font-bold leading-[1.2] text-[#fdfdfd] sm:text-[46px] lg:text-[60px] lg:leading-[60px]">
          <span className="text-gold-gradient">عملاء</span> نفتخر بهم
        </h2>
        </Reveal>

        <div className="flex w-full items-center justify-center gap-[22px]" dir="ltr">
          <button type="button" aria-label="السابق" onClick={() => scrollBy(-1)} className={arrowButtonClass}>
            <ChevronLeft className="h-6 w-6" strokeWidth={2} />
          </button>

          <Reveal variant="fade" className="min-w-0 max-w-[1188px]">
          <div
            ref={trackRef}
            onMouseEnter={pause}
            onMouseLeave={resume}
            onFocus={pause}
            onBlur={resume}
            onTouchStart={pause}
            onTouchEnd={resume}
            className={`-my-3 flex gap-[22px] overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden ${autoScroll ? '[mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]' : 'snap-x'}`}
          >
            {items.map((client, index) => (
              <div
                key={`${client.name}-${index}`}
                aria-hidden={index >= clients.length || undefined}
                className="group flex h-[245px] w-[220px] shrink-0 snap-start rounded-[24px] border border-[#e5e5e6]/70 bg-white/5 p-4 transition duration-300 hover:-translate-y-1.5 hover:border-gold-bright hover:bg-white/10"
              >
                <div className="h-full w-full overflow-hidden rounded-[16px] bg-white">
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            ))}
          </div>
          </Reveal>

          <button type="button" aria-label="التالي" onClick={() => scrollBy(1)} className={arrowButtonClass}>
            <ChevronRight className="h-6 w-6" strokeWidth={2} />
          </button>
        </div>
      </div>
    </section>
  )
}

export default Clients

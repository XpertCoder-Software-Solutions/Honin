import { useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import kafdLogo from '../assets/clients/kafd.png'
import modonLogo from '../assets/clients/modon.png'
import nationalWaterLogo from '../assets/clients/national-water-company.png'
import riyadhMunicipalityLogo from '../assets/clients/riyadh-region-municipality.png'
import saudiElectricityLogo from '../assets/clients/saudi-electricity-company.png'

// Visual order left → right, as in the design.
const clients = [
  { name: 'الشركة السعودية للكهرباء', logo: saudiElectricityLogo },
  { name: 'شركة المياه الوطنية', logo: nationalWaterLogo },
  { name: 'أمانة منطقة الرياض', logo: riyadhMunicipalityLogo },
  { name: 'مدن', logo: modonLogo },
  { name: 'KAFD', logo: kafdLogo },
]

const arrowButtonClass =
  'hidden h-[56px] w-[56px] shrink-0 items-center justify-center rounded-full border border-white/30 bg-white/20 text-white transition hover:bg-white/30 focus:outline-none focus:ring-4 focus:ring-white/25 sm:flex'

function Clients() {
  const trackRef = useRef<HTMLDivElement>(null)

  function scrollBy(direction: 1 | -1) {
    trackRef.current?.scrollBy({ left: direction * 242, behavior: 'smooth' })
  }

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
        <h2 className="text-center text-[34px] font-bold leading-[1.2] text-[#fdfdfd] sm:text-[46px] lg:text-[60px] lg:leading-[60px]">
          <span className="text-gold-gradient">عملاء</span> نفتخر بهم
        </h2>

        <div className="flex w-full items-center justify-center gap-[22px]" dir="ltr">
          <button type="button" aria-label="السابق" onClick={() => scrollBy(-1)} className={arrowButtonClass}>
            <ChevronLeft className="h-6 w-6" strokeWidth={2} />
          </button>

          <div
            ref={trackRef}
            className="flex max-w-[1188px] snap-x gap-[22px] overflow-x-auto scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {clients.map((client) => (
              <div
                key={client.name}
                className="flex h-[245px] w-[220px] shrink-0 snap-start rounded-[24px] border border-[#e5e5e6] bg-white/5 p-4"
              >
                <div className="h-full w-full overflow-hidden rounded-[16px] bg-white">
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="h-full w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
            ))}
          </div>

          <button type="button" aria-label="التالي" onClick={() => scrollBy(1)} className={arrowButtonClass}>
            <ChevronRight className="h-6 w-6" strokeWidth={2} />
          </button>
        </div>
      </div>
    </section>
  )
}

export default Clients

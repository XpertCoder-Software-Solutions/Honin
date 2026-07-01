import kafdLogo from '../assets/clients/kafd.png'
import modonLogo from '../assets/clients/modon.png'
import nationalWaterLogo from '../assets/clients/national-water-company.png'
import riyadhMunicipalityLogo from '../assets/clients/riyadh-region-municipality.png'
import saudiElectricityLogo from '../assets/clients/saudi-electricity-company.png'

const clients = [
  {
    name: 'الشركة السعودية للكهرباء',
    logo: saudiElectricityLogo,
  },
  {
    name: 'شركة المياه الوطنية',
    logo: nationalWaterLogo,
  },
  {
    name: 'أمانة منطقة الرياض',
    logo: riyadhMunicipalityLogo,
  },
  {
    name: 'مدن',
    logo: modonLogo,
  },
  {
    name: 'KAFD',
    logo: kafdLogo,
  },
]

const sectionGradient =
  'linear-gradient(135deg, #0F3D27 0%, #104029 9.09%, #11422B 18.18%, #12452D 27.27%, #13472F 36.36%, #144A31 45.45%, #154D33 54.55%, #164F35 63.64%, #175237 72.73%, #185539 81.82%, #19573B 90.91%, #1A5A3D 100%)'
const goldTextGradient =
  'linear-gradient(90deg, #E7BC2A 0%, #E4B928 16.67%, #E1B626 33.33%, #DDB325 50%, #DAB123 66.67%, #D7AE21 83.33%, #D4AB1F 100%), linear-gradient(0deg, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0))'

function Clients() {
  return (
    <section
      id="gallery"
      className="relative w-full overflow-hidden px-4 py-14 text-white sm:px-6 sm:py-16 md:px-8 lg:px-[50px] lg:py-20 xl:py-[100px]"
      dir="rtl"
      style={{ background: sectionGradient }}
    >
      <div className="mx-auto w-full max-w-[1660px]">
        <h2 className="text-center text-[34px] font-black leading-tight sm:text-[44px] md:text-[56px] lg:text-[72px]">
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: goldTextGradient,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            عملاء
          </span>
          <span className="text-white"> نفتخر بهم</span>
        </h2>

        <div className="relative mt-10 sm:mt-12 lg:mt-[68px]">
          <div
            className="mx-auto flex max-w-[1440px] snap-x gap-5 overflow-x-auto scroll-smooth [scrollbar-width:none] sm:gap-6 lg:gap-7 xl:justify-center [&::-webkit-scrollbar]:hidden"
            dir="ltr"
          >
            {clients.map((client) => (
              <article
                key={client.name}
                data-client-card
                className="flex aspect-[286/320] w-[200px] shrink-0 snap-center items-center justify-center rounded-[22px] border-2 border-white/60 p-3 sm:w-[220px] sm:rounded-[24px] sm:p-4 lg:w-[240px] lg:rounded-[26px]"
              >
                <img
                  src={client.logo}
                  alt={client.name}
                  className="h-full w-full rounded-[22px] object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Clients

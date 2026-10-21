import Reveal from '../components/Reveal'
import SectionHeader from '../components/SectionHeader'
import { useCountUp, useInView } from '../hooks'
import { useSiteContent } from '../site/content'

const fallbackStatistics = [
  { icon: '🏆', value: 40, plus: true, label: 'سنة خبرة' },
  { icon: '🏗️', value: 500, plus: true, label: 'مشروع منجز' },
  { icon: '🤝', value: 300, plus: true, label: 'عميل راضٍ' },
  { icon: '⏰', value: null, plus: false, label: 'دعم مستمر' },
]

function StatValue({ value, plus, start }: { value: number | null; plus: boolean; start: boolean }) {
  const count = useCountUp(value ?? 0, start)

  return (
    <p
      className="mt-6 flex items-start font-black tabular-nums text-gold"
      dir="ltr"
      aria-label={value === null ? '24/7' : `${plus ? '+' : ''}${value}`}
    >
      {plus ? <span className="mt-2 text-[48px] leading-[48px]">+</span> : null}
      <span className="text-[60px] leading-[72px] sm:text-[72px]">{value === null ? '24/7' : count}</span>
    </p>
  )
}

function Statistics() {
  const { ref, inView } = useInView<HTMLDivElement>({ threshold: 0.3 })
  const stats = useSiteContent()?.settings.stats
  const statistics = stats
    ? [
        { ...fallbackStatistics[0], value: stats.years },
        { ...fallbackStatistics[1], value: stats.projects },
        { ...fallbackStatistics[2], value: stats.clients },
        fallbackStatistics[3],
      ]
    : fallbackStatistics

  return (
    <section
      className="relative w-full overflow-hidden px-4 py-16 text-white sm:px-8 sm:py-20 lg:px-[64px] lg:py-[128px]"
      dir="rtl"
      style={{ backgroundImage: 'linear-gradient(153.9deg, #0f3d27 0%, #1a5a3d 100%)' }}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-10">
        <span className="absolute right-0 top-0 h-[384px] w-[384px] rounded-full bg-gold blur-[64px]" />
        <span className="absolute bottom-0 left-0 h-[384px] w-[384px] rounded-full bg-gold blur-[64px]" />
      </div>

      <div className="relative mx-auto w-full max-w-[1440px]">
        <SectionHeader
          tone="dark"
          title="أرقامنا تتحدث عن نفسها"
          description="إنجازات تعكس التزامنا وتفانينا في خدمة عملائنا"
        />

        <div ref={ref} className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-[80px] lg:grid-cols-4 lg:gap-10">
          {statistics.map(({ icon, value, plus, label }, index) => (
            <Reveal key={label} delay={index * 100} className="h-full">
              <article className="group flex h-full flex-col items-center rounded-[24px] border border-white/20 bg-white/10 px-10 py-10 text-center shadow-[0_25px_50px_rgba(0,0,0,0.25)] transition duration-300 hover:-translate-y-2 hover:border-gold/40 hover:bg-white/[0.14]">
                <span
                  className="text-[60px] leading-[60px] transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-110"
                  aria-hidden="true"
                >
                  {icon}
                </span>

                <StatValue value={value} plus={plus} start={inView} />

                <h3 className="mt-4 text-[24px] font-bold leading-8">{label}</h3>

                <span
                  className="mt-6 block h-1 w-[149px] origin-center rounded-full bg-gold transition-transform duration-500 group-hover:scale-x-110"
                  aria-hidden="true"
                />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Statistics

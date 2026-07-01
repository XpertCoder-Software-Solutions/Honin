const sectionGradient =
  'linear-gradient(135deg, #0F3D27 0%, #104029 9.09%, #11422B 18.18%, #12452D 27.27%, #13472F 36.36%, #144A31 45.45%, #154D33 54.55%, #164F35 63.64%, #175237 72.73%, #185539 81.82%, #19573B 90.91%, #1A5A3D 100%)'

const statistics = [
  {
    icon: '⏰',
    value: '24/7',
    label: 'دعم مستمر',
  },
  {
    icon: '🤝',
    value: '+300',
    label: 'عميل راضٍ',
  },
  {
    icon: '🏗️',
    value: '+500',
    label: 'مشروع منجز',
  },
  {
    icon: '🏆',
    value: '+40',
    label: 'سنة خبرة',
  },
]

function Statistics() {
  return (
    <section
      className="w-full overflow-hidden px-4 py-16 text-white sm:px-6 sm:py-20 md:px-8 lg:px-[50px] lg:py-[100px]"
      dir="rtl"
      style={{ background: sectionGradient }}
    >
      <div className="mx-auto w-full max-w-[1810px]">
        <header className="mx-auto max-w-[980px] text-center">
          <h2 className="text-[34px] font-black leading-tight sm:text-[44px] md:text-[52px] lg:text-[60px]">
            أرقامنا تتحدث عن نفسها
          </h2>

          <p className="mx-auto mt-5 max-w-[780px] text-[16px] font-medium leading-8 text-white/62 sm:mt-6 sm:text-[18px] lg:text-[20px]">
            إنجازات تعكس التزامنا وتفانينا في خدمة عملائنا
          </p>
        </header>

        <div
          className="mt-12 grid grid-cols-1 gap-5 sm:mt-16 sm:grid-cols-2 sm:gap-6 lg:mt-20 lg:grid-cols-4 lg:gap-8 xl:gap-10"
          dir="ltr"
        >
          {statistics.map((statistic) => (
            <article
              key={statistic.label}
              className="flex min-h-[230px] flex-col items-center justify-center rounded-[24px] border-2 border-white/18 bg-white/10 px-6 py-8 text-center shadow-[0_22px_48px_rgba(4,35,21,0.12)] backdrop-blur-sm sm:min-h-[300px] sm:py-10 lg:min-h-[374px] xl:rounded-[30px]"
            >
              <span
                className="text-[46px] leading-none sm:text-[54px] lg:text-[60px]"
                aria-hidden="true"
              >
                {statistic.icon}
              </span>

              <p className="mt-6 text-[44px] font-black leading-none text-[#D5A125] sm:mt-7 sm:text-[54px] lg:text-[60px]">
                {statistic.value}
              </p>

              <h3 className="mt-7 text-[22px] font-black leading-tight text-white sm:mt-9 sm:text-[24px] lg:mt-11">
                {statistic.label}
              </h3>

              <span
                className="mt-7 block h-1 w-[130px] rounded-full bg-[#D5A125] sm:mt-10 sm:w-[180px]"
                aria-hidden="true"
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Statistics

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
          <h2 className="font-black leading-tight text-[60px]">
            أرقامنا تتحدث عن نفسها
          </h2>

          <p className="mx-auto mt-6 max-w-[780px] text-[20px] font-medium leading-8 text-white/62 ">
            إنجازات تعكس التزامنا وتفانينا في خدمة عملائنا
          </p>
        </header>

        <div
          className="mt-20 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8 xl:gap-10"
          dir="ltr"
        >
          {statistics.map((statistic) => (
            <article
              key={statistic.label}
              className="flex min-h-[300px] flex-col items-center justify-center rounded-[28px] border-2 border-white/18 bg-white/10 px-6 py-10 text-center shadow-[0_22px_48px_rgba(4,35,21,0.12)] backdrop-blur-sm sm:min-h-[330px] lg:min-h-[374px] xl:rounded-[30px]"
            >
              <span
                className="text-[60px] leading-none"
                aria-hidden="true"
              >
                {statistic.icon}
              </span>

              <p className="mt-7 text-[60px] font-black leading-none text-[#D5A125]">
                {statistic.value}
              </p>

              <h3 className="mt-11 text-[24px] font-black leading-tight text-white">
                {statistic.label}
              </h3>

              <span
                className="mt-10 block h-1 w-[150px] rounded-full bg-[#D5A125] sm:w-[180px]"
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

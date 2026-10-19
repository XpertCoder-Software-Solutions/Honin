import Reveal from './Reveal'

type SectionHeaderProps = {
  eyebrow?: string
  title: string
  description?: string
  tone?: 'light' | 'dark'
}

// Shared "eyebrow / title / description" block used by the Tajawal sections.
function SectionHeader({ eyebrow, title, description, tone = 'light' }: SectionHeaderProps) {
  const isDark = tone === 'dark'

  return (
    <Reveal className="w-full">
      <header className="mx-auto max-w-[1440px] text-center">
        {eyebrow ? (
          <p className="inline-flex items-center gap-3 text-[18px] font-bold leading-7 text-gold lg:text-[20px]">
            <span aria-hidden="true" className="h-px w-6 bg-gold/60" />
            {eyebrow}
            <span aria-hidden="true" className="h-px w-6 bg-gold/60" />
          </p>
        ) : null}

        <h2
          className={`text-[32px] font-black leading-[1.25] sm:text-[44px] md:text-[52px] lg:text-[60px] lg:leading-[1.15] ${
            eyebrow ? 'mt-3 lg:mt-4' : ''
          } ${isDark ? 'text-white' : 'text-brand'}`}
        >
          {title}
        </h2>

        {description ? (
          <p
            className={`mx-auto mt-5 max-w-[768px] text-[16px] leading-[1.75] sm:text-[18px] lg:mt-6 lg:text-[20px] lg:leading-[32.5px] ${
              isDark ? 'text-[#d1d5dc]' : 'text-body'
            }`}
          >
            {description}
          </p>
        ) : null}
      </header>
    </Reveal>
  )
}

export default SectionHeader

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
    <header className="mx-auto max-w-[1440px] text-center">
      {eyebrow ? (
        <p className="text-[18px] font-bold leading-7 text-gold lg:text-[20px]">{eyebrow}</p>
      ) : null}

      <h2
        className={`text-[34px] font-black leading-[1.2] sm:text-[44px] md:text-[52px] lg:text-[60px] lg:leading-[60px] ${
          eyebrow ? 'mt-4' : ''
        } ${isDark ? 'text-white' : 'text-brand'}`}
      >
        {title}
      </h2>

      {description ? (
        <p
          className={`mx-auto mt-6 max-w-[768px] text-[16px] leading-[1.6] sm:text-[18px] lg:text-[20px] lg:leading-[32.5px] ${
            isDark ? 'text-[#d1d5dc]' : 'text-body'
          }`}
        >
          {description}
        </p>
      ) : null}
    </header>
  )
}

export default SectionHeader

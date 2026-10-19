import { Bug, Building2, TreePine, type LucideIcon } from 'lucide-react'

export type Category = 'construction' | 'landscaping' | 'pest-control'

// Right → left, as in the design.
const categories: Array<{ id: Category; label: string; Icon: LucideIcon }> = [
  { id: 'construction', label: 'المقاولات والأعمال المساحية', Icon: Building2 },
  { id: 'landscaping', label: 'الزراعة وتنسيق الحدائق', Icon: TreePine },
  { id: 'pest-control', label: 'مكافحة الحشرات والقوارض', Icon: Bug },
]

type CategoryTabsProps = {
  active: Category
  onChange: (category: Category) => void
}

function CategoryTabs({ active, onChange }: CategoryTabsProps) {
  return (
    <div
      role="tablist"
      aria-label="تصنيف الأعمال"
      className="mx-auto flex max-w-full flex-col gap-1 rounded-[24px] border border-brand bg-[#f3f3f3] p-2 sm:flex-row sm:rounded-[32px] lg:p-4"
    >
      {categories.map(({ id, label, Icon }) => {
        const isActive = id === active

        return (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(id)}
            className={`flex items-center justify-center gap-2 rounded-[16px] px-5 py-4 text-[16px] font-extrabold leading-6 transition sm:text-[18px] lg:px-8 lg:py-[23px] lg:text-[20px] ${
              isActive ? 'bg-brand text-white' : 'text-brand hover:bg-brand/5'
            }`}
          >
            <Icon className="h-7 w-7 shrink-0 lg:h-8 lg:w-8" strokeWidth={1.8} />
            {label}
          </button>
        )
      })}
    </div>
  )
}

export default CategoryTabs

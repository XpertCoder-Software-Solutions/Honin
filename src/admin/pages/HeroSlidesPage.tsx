import { MonitorPlay } from 'lucide-react'
import ContentManager from '../ContentManager'
import { categoryLabels, type HeroSlide } from '../types'
import { Badge } from '../ui'

function HeroSlidesPage() {
  return (
    <ContentManager<HeroSlide>
      endpoint="/admin/hero-slides"
      title="شرائح الواجهة"
      description="الصور والعناوين المتحركة في أعلى الصفحة الرئيسية، وكروت الخدمات أسفلها."
      singular="شريحة"
      imageField="image_url"
      imageLabel="صورة الخلفية (يفضّل عرضية بدقة 1920px)"
      emptyIcon={<MonitorPlay className="h-7 w-7" />}
      fields={[
        { name: 'category', label: 'الخدمة', type: 'category' },
        { name: 'title', label: 'العنوان الرئيسي', type: 'text', required: true, maxLength: 120 },
        { name: 'subtitle', label: 'النص الفرعي', type: 'text', maxLength: 200 },
        { name: 'card_title', label: 'عنوان الكارت', type: 'text', required: true, maxLength: 120 },
        { name: 'card_description', label: 'وصف الكارت', type: 'text', maxLength: 200 },
        { name: 'is_active', label: 'ظاهرة في الموقع', type: 'toggle' },
      ]}
      card={(slide) => ({
        title: slide.title,
        subtitle: slide.card_description,
        badges: (
          <>
            <Badge tone="green">{categoryLabels[slide.category]}</Badge>
            {slide.is_active ? null : <Badge tone="gray">مخفية</Badge>}
          </>
        ),
      })}
    />
  )
}

export default HeroSlidesPage

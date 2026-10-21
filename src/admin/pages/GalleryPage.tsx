import { GalleryHorizontalEnd } from 'lucide-react'
import ContentManager from '../ContentManager'
import { categoryLabels, type GalleryImage } from '../types'
import { Badge } from '../ui'

function GalleryPage() {
  return (
    <ContentManager<GalleryImage>
      endpoint="/admin/gallery-images"
      title="المعرض"
      description="صور صفحة «المعرض» مقسمة حسب الخدمة."
      singular="صورة"
      imageField="image_url"
      imageAspect="aspect-square"
      filterByCategory
      emptyIcon={<GalleryHorizontalEnd className="h-7 w-7" />}
      fields={[
        { name: 'category', label: 'التصنيف', type: 'category' },
        { name: 'caption', label: 'وصف الصورة (اختياري)', type: 'text', hint: 'يساعد محركات البحث وقارئات الشاشة', maxLength: 160 },
      ]}
      card={(image) => ({
        title: image.caption || 'صورة بدون وصف',
        badges: <Badge tone="green">{categoryLabels[image.category]}</Badge>,
      })}
    />
  )
}

export default GalleryPage

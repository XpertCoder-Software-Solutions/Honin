import { Briefcase } from 'lucide-react'
import ContentManager from '../ContentManager'
import { categoryLabels, type Project } from '../types'
import { Badge } from '../ui'

function ProjectsPage() {
  return (
    <ContentManager<Project>
      endpoint="/admin/projects"
      title="المشاريع"
      description="المشاريع المعروضة في صفحة «أعمالنا»، والمميزة منها تظهر في الصفحة الرئيسية."
      singular="مشروع"
      imageField="image_url"
      filterByCategory
      emptyIcon={<Briefcase className="h-7 w-7" />}
      fields={[
        { name: 'category', label: 'التصنيف', type: 'category' },
        { name: 'title', label: 'اسم المشروع', type: 'text', required: true, maxLength: 160 },
        { name: 'description', label: 'وصف مختصر', type: 'textarea', maxLength: 1000 },
        { name: 'is_featured', label: 'مميز', description: 'يظهر في قسم «أعمال نفخر بإنجازها» بالصفحة الرئيسية', type: 'toggle', default: false },
        { name: 'is_published', label: 'منشور', description: 'إيقافه يخفي المشروع من الموقع دون حذفه', type: 'toggle' },
      ]}
      card={(project) => ({
        title: project.title,
        subtitle: project.description,
        badges: (
          <>
            <Badge tone="green">{categoryLabels[project.category]}</Badge>
            {project.is_featured ? <Badge tone="gold">مميز</Badge> : null}
            {project.is_published ? null : <Badge tone="gray">مسودة</Badge>}
          </>
        ),
      })}
    />
  )
}

export default ProjectsPage

import { Handshake } from 'lucide-react'
import ContentManager from '../ContentManager'
import type { Client } from '../types'

function ClientsPage() {
  return (
    <ContentManager<Client>
      endpoint="/admin/clients"
      title="العملاء"
      description="شعارات قسم «عملاء نفتخر بهم»."
      singular="عميل"
      imageField="logo_url"
      imageLabel="الشعار (يفضّل خلفية بيضاء)"
      imageAspect="aspect-[4/3]"
      emptyIcon={<Handshake className="h-7 w-7" />}
      fields={[
        { name: 'name', label: 'اسم الجهة', type: 'text', required: true, maxLength: 120 },
        { name: 'website', label: 'الموقع الإلكتروني (اختياري)', type: 'url' },
      ]}
      card={(client) => ({ title: client.name, subtitle: client.website })}
    />
  )
}

export default ClientsPage

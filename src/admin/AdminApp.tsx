import { useEffect, type ReactNode } from 'react'
import { useHashPath } from '../router'
import { AuthProvider, useAuth } from './auth'
import Layout from './Layout'
import { ToastProvider } from './toast'
import { EmptyState } from './ui'
import { ShieldAlert } from 'lucide-react'
import LoginPage from './pages/LoginPage'
import OverviewPage from './pages/OverviewPage'
import QuotesPage from './pages/QuotesPage'
import HeroSlidesPage from './pages/HeroSlidesPage'
import ServicesPage from './pages/ServicesPage'
import ProjectsPage from './pages/ProjectsPage'
import GalleryPage from './pages/GalleryPage'
import ClientsPage from './pages/ClientsPage'
import SettingsPage from './pages/SettingsPage'
import UsersPage from './pages/UsersPage'
import ProfilePage from './pages/ProfilePage'

const pages: Record<string, { title: string; render: () => ReactNode; adminOnly?: boolean }> = {
  '/admin': { title: 'نظرة عامة', render: () => <OverviewPage /> },
  '/admin/quotes': { title: 'طلبات عروض الأسعار', render: () => <QuotesPage /> },
  '/admin/hero': { title: 'شرائح الواجهة', render: () => <HeroSlidesPage /> },
  '/admin/services': { title: 'الخدمات', render: () => <ServicesPage /> },
  '/admin/projects': { title: 'المشاريع', render: () => <ProjectsPage /> },
  '/admin/gallery': { title: 'المعرض', render: () => <GalleryPage /> },
  '/admin/clients': { title: 'العملاء', render: () => <ClientsPage /> },
  '/admin/settings': { title: 'الإعدادات', render: () => <SettingsPage />, adminOnly: true },
  '/admin/users': { title: 'المستخدمون', render: () => <UsersPage />, adminOnly: true },
  '/admin/profile': { title: 'حسابي', render: () => <ProfilePage /> },
}

function Router() {
  const path = useHashPath().replace(/\/$/, '') || '/admin'
  const { user, status } = useAuth()
  const page = pages[path] ?? pages['/admin']

  useEffect(() => {
    document.title = `${user ? page.title : 'تسجيل الدخول'} | لوحة تحكم حُنين`
    return () => {
      document.title = 'Honain'
    }
  }, [page, user])

  if (status === 'loading') {
    return <div className="grid min-h-screen place-items-center bg-[#f6f7f5] text-[15px] font-bold text-brand">جارٍ التحميل…</div>
  }

  if (!user) return <LoginPage />

  return (
    <Layout path={path}>
      {page.adminOnly && user.role !== 'admin' ? (
        <EmptyState icon={<ShieldAlert className="h-7 w-7" />} title="لا تملك صلاحية الوصول" description="هذه الصفحة متاحة لمدير النظام فقط." />
      ) : (
        <div key={path} className="fade-up">
          {page.render()}
        </div>
      )}
    </Layout>
  )
}

function AdminApp() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Router />
      </ToastProvider>
    </AuthProvider>
  )
}

export default AdminApp

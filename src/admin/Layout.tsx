import { useEffect, useState, type ReactNode } from 'react'
import {
  Briefcase,
  ExternalLink,
  GalleryHorizontalEnd,
  Handshake,
  Inbox,
  LayoutDashboard,
  Layers,
  LogOut,
  Menu,
  MonitorPlay,
  Settings,
  UserRound,
  Users,
  X,
  type LucideIcon,
} from 'lucide-react'
import headerLogo from '../assets/Logo Header.png'
import { useAuth } from './auth'

type NavItem = { path: string; label: string; Icon: LucideIcon; adminOnly?: boolean }

const navGroups: Array<{ title?: string; items: NavItem[] }> = [
  {
    items: [
      { path: '/admin', label: 'نظرة عامة', Icon: LayoutDashboard },
      { path: '/admin/quotes', label: 'طلبات عروض الأسعار', Icon: Inbox },
    ],
  },
  {
    title: 'محتوى الموقع',
    items: [
      { path: '/admin/hero', label: 'شرائح الواجهة', Icon: MonitorPlay },
      { path: '/admin/services', label: 'الخدمات', Icon: Layers },
      { path: '/admin/projects', label: 'المشاريع', Icon: Briefcase },
      { path: '/admin/gallery', label: 'المعرض', Icon: GalleryHorizontalEnd },
      { path: '/admin/clients', label: 'العملاء', Icon: Handshake },
    ],
  },
  {
    title: 'الإدارة',
    items: [
      { path: '/admin/settings', label: 'الإعدادات', Icon: Settings, adminOnly: true },
      { path: '/admin/users', label: 'المستخدمون', Icon: Users, adminOnly: true },
    ],
  },
]

const REFRESH_MS = 60_000

/** Number of quote requests still marked "new"; refreshed every minute and whenever a request changes. */
function useNewQuotesCount() {
  const { request } = useAuth()
  const [count, setCount] = useState(0)

  useEffect(() => {
    let cancelled = false
    const load = () =>
      request<{ counts: Record<string, number> }>('/admin/quote-requests?status=new&per_page=5')
        .then(({ counts }) => !cancelled && setCount(counts.new ?? 0))
        .catch(() => {})

    load()
    const timer = window.setInterval(load, REFRESH_MS)
    window.addEventListener('quotes-changed', load)
    window.addEventListener('focus', load)
    return () => {
      cancelled = true
      window.clearInterval(timer)
      window.removeEventListener('quotes-changed', load)
      window.removeEventListener('focus', load)
    }
  }, [request])

  return count
}

function Sidebar({ path, onNavigate, newQuotes }: { path: string; onNavigate: () => void; newQuotes: number }) {
  const { user, logout } = useAuth()

  return (
    <div className="flex h-full flex-col bg-brand text-white">
      <div className="flex h-[76px] items-center px-6">
        <img src={headerLogo} alt="Honain" className="h-[40px] w-auto" />
      </div>

      <nav aria-label="قائمة لوحة التحكم" className="flex-1 space-y-6 overflow-y-auto px-3 py-4">
        {navGroups.map((group, index) => {
          const items = group.items.filter((item) => !item.adminOnly || user?.role === 'admin')
          if (!items.length) return null

          return (
            <div key={group.title ?? index}>
              {group.title ? <p className="mb-2 px-3 text-[12px] font-bold text-white/45">{group.title}</p> : null}
              <ul className="space-y-1">
                {items.map(({ path: itemPath, label, Icon }) => {
                  const active = itemPath === '/admin' ? path === '/admin' : path.startsWith(itemPath)

                  return (
                    <li key={itemPath}>
                      <a
                        href={`#${itemPath}`}
                        onClick={onNavigate}
                        aria-current={active ? 'page' : undefined}
                        className={`flex items-center gap-3 rounded-[12px] px-3 py-2.5 text-[15px] font-bold transition ${
                          active ? 'bg-white text-brand shadow-sm' : 'text-white/80 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        <Icon className={`h-5 w-5 shrink-0 ${active ? 'text-gold' : ''}`} strokeWidth={2} />
                        <span className="flex-1 whitespace-nowrap">{label}</span>
                        {itemPath === '/admin/quotes' && newQuotes > 0 ? (
                          <span className="min-w-6 rounded-full bg-gold-bright px-2 py-0.5 text-center text-[12px] font-black text-brand tabular-nums" aria-label={`${newQuotes} طلب جديد`}>
                            {newQuotes}
                          </span>
                        ) : null}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </nav>

      <div className="border-t border-white/10 p-3">
        <a
          href="#/"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-3 rounded-[12px] px-3 py-2.5 text-[14px] font-bold text-white/75 transition hover:bg-white/10 hover:text-white"
        >
          <ExternalLink className="h-5 w-5" /> عرض الموقع
        </a>
        <a
          href="#/admin/profile"
          onClick={onNavigate}
          className="mt-1 flex items-center gap-3 rounded-[12px] px-3 py-2.5 transition hover:bg-white/10"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold text-brand">
            <UserRound className="h-5 w-5" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-[14px] font-bold">{user?.name}</span>
            <span className="block text-[12px] text-white/55">{user?.role === 'admin' ? 'مدير النظام' : 'محرر'}</span>
          </span>
        </a>
        <button
          type="button"
          onClick={logout}
          className="mt-1 flex w-full items-center gap-3 rounded-[12px] px-3 py-2.5 text-[14px] font-bold text-white/75 transition hover:bg-white/10 hover:text-white"
        >
          <LogOut className="h-5 w-5" /> تسجيل الخروج
        </button>
      </div>
    </div>
  )
}

function Layout({ path, title, children }: { path: string; title: string; children: ReactNode }) {
  const [open, setOpen] = useState(false)
  const newQuotes = useNewQuotesCount()

  useEffect(() => {
    document.title = `${newQuotes ? `(${newQuotes}) ` : ''}${title} | لوحة تحكم حُنين`
    return () => {
      document.title = 'Honain'
    }
  }, [title, newQuotes])

  return (
    <div className="min-h-screen bg-[#f6f7f5]" dir="rtl">
      <aside className="fixed inset-y-0 right-0 z-40 hidden w-[264px] lg:block">
        <Sidebar path={path} onNavigate={() => {}} newQuotes={newQuotes} />
      </aside>

      {open ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button type="button" aria-label="إغلاق القائمة" className="lightbox-backdrop absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <aside className="fade-up absolute inset-y-0 right-0 w-[280px] max-w-[85vw] shadow-2xl">
            <Sidebar path={path} onNavigate={() => setOpen(false)} newQuotes={newQuotes} />
            <button type="button" aria-label="إغلاق القائمة" onClick={() => setOpen(false)} className="absolute left-3 top-5 rounded-[10px] p-2 text-white/80 hover:bg-white/10">
              <X className="h-5 w-5" />
            </button>
          </aside>
        </div>
      ) : null}

      <div className="lg:pr-[264px]">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-[#e6e9e6] bg-white/90 px-4 backdrop-blur lg:hidden">
          <button type="button" aria-label="فتح القائمة" onClick={() => setOpen(true)} className="rounded-[10px] p-2 text-brand hover:bg-[#eef1ee]">
            <Menu className="h-6 w-6" />
          </button>
          <span className="flex-1 text-[16px] font-extrabold text-brand">لوحة تحكم حُنين</span>
          {newQuotes > 0 ? (
            <a href="#/admin/quotes" className="rounded-full bg-gold-bright px-3 py-1 text-[13px] font-black text-brand">
              {newQuotes} طلب جديد
            </a>
          ) : null}
        </header>

        <main className="mx-auto w-full max-w-[1280px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  )
}

export default Layout

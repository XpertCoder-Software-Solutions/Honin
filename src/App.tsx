import { lazy, Suspense, useEffect } from 'react'
import Clients from './Home/Clients'
import ContactUs from './Home/ContactUs'
import OurWork from './Home/OurWork'
import Quality from './Home/Quality'
import Services from './Home/Services'
import Statistics from './Home/Statistics'
import Vision from './Home/Vision'
import About from './Home/about'
import Hero from './Home/Hero'
import Header from './Header/Header'
import Footer from './Footer/Footer'
import Works from './Works/Works'
import Gallery from './Gallery/Gallery'
import { useHashPath, useLocation } from './router'
import { useVisitTracking } from './site/tracking'

const AdminApp = lazy(() => import('./admin/AdminApp'))

function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <Quality />
      <Statistics />
      <Vision />
      <OurWork />
      <Clients />
      <ContactUs />
    </main>
  )
}

function PublicSite() {
  const { route, section } = useLocation()
  useVisitTracking(route)

  useEffect(() => {
    if (section) {
      document.getElementById(section)?.scrollIntoView()
    } else {
      window.scrollTo(0, 0)
    }
  }, [route, section])

  return (
    <div className="relative">
      <Header />
      {route === '/works' ? <Works /> : route === '/gallery' ? <Gallery /> : <HomePage />}
      <Footer />
    </div>
  )
}

function App() {
  const path = useHashPath()

  if (path === '/admin' || path.startsWith('/admin/')) {
    return (
      <Suspense fallback={<div className="grid min-h-screen place-items-center bg-[#f6f7f5] text-brand">جارٍ التحميل…</div>}>
        <AdminApp />
      </Suspense>
    )
  }

  return <PublicSite />
}

export default App

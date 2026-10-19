import { useEffect } from 'react'
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
import { useLocation } from './router'

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

function App() {
  const { route, section } = useLocation()

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

export default App

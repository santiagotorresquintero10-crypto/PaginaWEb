import { SpeedInsights } from '@vercel/speed-insights/react'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import AboutUs from './components/AboutUs.jsx'
import Values from './components/Values.jsx'
import Services from './components/Services.jsx'
import QualityPolicy from './components/QualityPolicy.jsx'
import Process from './components/Process.jsx'
import Testimonials from './components/Testimonials.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import WhatsAppFloat from './components/WhatsAppFloat.jsx'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <AboutUs />
        <Values />
        <Services />
        <QualityPolicy />
        <Process />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
      <SpeedInsights />
    </>
  )
}

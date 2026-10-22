import IntroAnimation from './components/IntroAnimation'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import PortfolioGallery from './components/PortfolioGallery'
import Services from './components/Services'
import SampleOffer from './components/SampleOffer'
import EditorApply from './components/EditorApply'
import TelegramContactButton from './components/TelegramContactButton'
import { About, Pricing, Contact, Footer } from './components/Sections'

export default function App() {
  return (
    <>
      <IntroAnimation />
      <Navbar />
      <main>
        <Hero />
        <About />
        <PortfolioGallery />
        <Services />
        <SampleOffer />
        <Pricing />
        <Contact />
        <EditorApply />
      </main>
      <Footer />
      <div className="glow-pill fixed bottom-5 right-5 z-40 bg-bg">
        <TelegramContactButton />
      </div>
    </>
  )
}
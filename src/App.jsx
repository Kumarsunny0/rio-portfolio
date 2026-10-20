import IntroAnimation from './components/IntroAnimation'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import PortfolioGallery from './components/PortfolioGallery'
import TelegramContactButton from './components/TelegramContactButton'
import { About, Services, Pricing, Contact, Footer } from './components/Sections'
export default function App() {
  return (<>
    <IntroAnimation /><Navbar />
    <main><Hero /><About /><PortfolioGallery /><Services /><Pricing /><Contact /></main>
    <Footer />
    <div className="fixed bottom-5 right-5 z-40 glow-pill"><TelegramContactButton /></div>
  </>)
}

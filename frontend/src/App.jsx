import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollProgressBar from './components/ScrollProgressBar'
import FloatingActions from './components/FloatingActions'
import LoadingScreen from './components/LoadingScreen'
import Toast from './components/Toast'
import ScrollToTopBtn from './components/ScrollToTopBtn'
import Home from './pages/Home'
import About from './pages/About'
import Gallery from './pages/Gallery'
import Services from './pages/Services'
import Booking from './pages/Booking'
import Pricing from './pages/Pricing'
import Testimonials from './pages/Testimonials'
import FAQ from './pages/FAQ'
import Contact from './pages/Contact'
import PrivacyPolicy from './pages/PrivacyPolicy'
import TermsOfService from './pages/TermsOfService'
import AdminDashboard from './pages/AdminDashboard'
import NotFound from './pages/NotFound'
import './App.css'

// Safe Scroll Restoration for all browsers
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    try {
      window.scrollTo(0, 0)
    } catch (e) {
      // Fallback
    }
  }, [pathname])
  return null
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <LoadingScreen />
      <ScrollProgressBar />
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/services" element={<Services />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/appointment" element={<Booking />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/dashboard" element={<AdminDashboard />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="/terms-and-conditions" element={<TermsOfService />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <FloatingActions />
        <ScrollToTopBtn />
        <Toast />
      </div>
    </Router>
  )
}

export default App

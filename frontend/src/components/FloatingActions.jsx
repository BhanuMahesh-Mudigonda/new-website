import { useState, useEffect } from 'react'
import './FloatingActions.css'

export default function FloatingActions() {
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true)
      } else {
        setShowBackToTop(false)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const whatsappMessage = encodeURIComponent('Hello PB Photography! I am interested in reserving a photography/cinema session.')
  const whatsappUrl = `https://wa.me/919642534945?text=${whatsappMessage}`

  return (
    <div className="floating-actions-container">
      
      {/* Vibrant WhatsApp Green Button */}
      <a 
        href={whatsappUrl} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="floating-whatsapp-btn"
        aria-label="Chat with PB Photography on WhatsApp"
      >
        <span className="whatsapp-tooltip">Chat with PB Photography</span>
        <svg className="whatsapp-svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.299.433 2.504 1.164 3.474l-.765 2.794 2.871-.753c.937.608 2.052.951 3.245.951 3.182 0 5.768-2.586 5.768-5.766 0-3.18-2.586-5.766-5.767-5.766zm3.385 8.165c-.144.405-.837.774-1.17.825-.312.048-.717.073-2.034-.471-1.684-.694-2.759-2.42-2.843-2.532-.084-.112-.686-.913-.686-1.742 0-.829.434-1.237.587-1.405.153-.168.334-.21.446-.21.112 0 .224.001.321.006.102.005.241-.039.377.288.144.346.49 1.196.533 1.284.043.088.072.191.014.305-.058.114-.087.185-.173.286-.086.101-.182.226-.26.303-.087.086-.178.181-.077.355.101.174.449.741.964 1.201.662.591 1.221.774 1.395.86.174.086.276.072.378-.043.102-.115.438-.511.554-.687.116-.176.232-.147.391-.088.159.059 1.011.477 1.184.564.173.087.289.13.332.202.043.072.043.418-.101.823z" />
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 2.152.68 4.145 1.836 5.779L2 22l4.354-1.789A9.948 9.948 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a7.96 7.96 0 0 1-4.225-1.202l-.303-.18-2.58.1.673-2.458-.198-.315A7.957 7.957 0 0 1 4 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z" />
        </svg>
      </a>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button 
          onClick={scrollToTop}
          className="back-to-top-btn"
          aria-label="Back to top"
        >
          ↑
        </button>
      )}

    </div>
  )
}

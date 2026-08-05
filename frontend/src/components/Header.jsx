import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import './Header.css'

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  const isActive = (path) => location.pathname === path ? 'active' : ''

  return (
    <header className={`site-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="container nav-wrap">
        
        {/* Brand Logo Box - PB PHOTOGRAPHY */}
        <Link to="/" className="brand" onClick={closeMenu}>
          <div className="pb-studio-logo-box">
            <span className="logo-spark">✦</span>
            <div className="logo-text-group">
              <span className="logo-main cormorant">PB PHOTOGRAPHY</span>
              <span className="logo-tagline">LUXURY PHOTOGRAPHY & CINEMA</span>
            </div>
          </div>
        </Link>
        
        {/* Clean Luxury Navigation Links */}
        <nav className={`site-nav ${isOpen ? 'open' : ''}`}>
          <button 
            className="close-nav" 
            onClick={closeMenu} 
            aria-label="Close navigation menu"
          >
            ×
          </button>
          <Link to="/" onClick={closeMenu} className={`nav-link ${isActive('/')}`}>HOME</Link>
          <Link to="/services" onClick={closeMenu} className={`nav-link ${isActive('/services')}`}>SERVICES</Link>
          <Link to="/gallery" onClick={closeMenu} className={`nav-link ${isActive('/gallery')}`}>PORTFOLIO</Link>
          <Link to="/about" onClick={closeMenu} className={`nav-link ${isActive('/about')}`}>ABOUT</Link>
          <Link to="/testimonials" onClick={closeMenu} className={`nav-link ${isActive('/testimonials')}`}>REVIEWS</Link>
          <Link to="/contact" onClick={closeMenu} className={`nav-link ${isActive('/contact')}`}>CONTACT</Link>
        </nav>

        {/* Right Single Action Button */}
        <div className="header-right-action">
          <Link to="/booking" onClick={closeMenu} className="btn-gold-primary nav-pill-btn">
            Book Your Shoot
          </Link>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="menu-overlay" 
              onClick={closeMenu} 
            />
          )}
        </AnimatePresence>
        
        <div className="header-actions-mobile">
          <button 
            className={`nav-toggle ${isOpen ? 'active' : ''}`}
            onClick={toggleMenu} 
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  )
}

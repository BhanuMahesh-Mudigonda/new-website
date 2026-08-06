import React, { useState, useEffect } from 'react'
import './ScrollToTopBtn.css'

export default function ScrollToTopBtn() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 250) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility, { passive: true })
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  if (!isVisible) return null

  return (
    <button 
      className="scroll-to-top-btn" 
      onClick={scrollToTop}
      aria-label="Back to Top"
      title="Back to Top"
    >
      <span className="arrow-icon">↑</span>
    </button>
  )
}

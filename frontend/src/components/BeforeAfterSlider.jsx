import { useState, useRef } from 'react'
import './BeforeAfterSlider.css'

export default function BeforeAfterSlider() {
  const [sliderPos, setSliderPos] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef(null)

  const handleMove = (clientX) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const x = clientX - rect.left
    let percentage = (x / rect.width) * 100
    if (percentage < 0) percentage = 0
    if (percentage > 100) percentage = 100
    setSliderPos(percentage)
  }

  const handleTouchMove = (e) => {
    if (!isDragging) return
    handleMove(e.touches[0].clientX)
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    handleMove(e.clientX)
  }

  return (
    <div className="before-after-section section bg-dots-pattern">
      <div className="container">
        <div className="section-title-wrap">
          <h2 className="section-title cormorant">Mastery in Editing & Color Grading</h2>
          <p className="section-subtitle">Original Unedited RAW vs PB Photography Signature Luxury Retouching</p>
        </div>

        <div 
          ref={containerRef}
          className="before-after-container glass-card"
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={handleMouseMove}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          onTouchMove={handleTouchMove}
        >
          {/* 1. AFTER IMAGE (Luxury Gold Retouched) - Full Base Layer */}
          <div className="slider-layer after-layer">
            <img 
              src="/gallery/couple_red_backdrop.jpg" 
              alt="Luxury Retouched PB Photography" 
              className="comparison-img after-retouched-style"
            />
            <span className="slider-label after-label">✦ PB PHOTOGRAPHY SIGNATURE</span>
          </div>

          {/* 2. BEFORE IMAGE (Original Camera RAW) - Clipped Overlay Layer */}
          <div 
            className="slider-layer before-layer"
            style={{ clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)` }}
          >
            <img 
              src="/gallery/couple_red_backdrop.jpg" 
              alt="Original Unedited Camera Capture" 
              className="comparison-img raw-filter"
            />
            <span className="slider-label before-label">ORIGINAL RAW</span>
          </div>

          {/* 3. GOLD DIVIDER HANDLE BAR */}
          <div 
            className="slider-divider"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="slider-handle">
              <span className="slider-arrow">◄</span>
              <span className="slider-arrow">►</span>
            </div>
          </div>
        </div>

        <p className="drag-hint">↔ Drag the slider to compare original camera RAW with our fine-art gold color grading</p>
      </div>
    </div>
  )
}

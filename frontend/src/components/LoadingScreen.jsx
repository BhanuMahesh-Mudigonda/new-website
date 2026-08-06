import { useState, useEffect } from 'react'
import './LoadingScreen.css'

export default function LoadingScreen() {
  const [fading, setFading] = useState(false)
  const [removed, setRemoved] = useState(false)

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFading(true)
    }, 350)

    const removeTimer = setTimeout(() => {
      setRemoved(true)
    }, 650)

    return () => {
      clearTimeout(fadeTimer)
      clearTimeout(removeTimer)
    }
  }, [])

  if (removed) return null

  return (
    <div className={`pb-luxury-loader ${fading ? 'fade-out' : ''}`}>
      <div className="loader-content">
        <div className="logo-spark-anim">✦</div>
        <h1 className="loader-logo cormorant">PB PHOTOGRAPHY</h1>
        <p className="loader-subtitle">LUXURY PHOTOGRAPHY & CINEMA</p>
        <div className="loader-gold-line"></div>
      </div>
    </div>
  )
}

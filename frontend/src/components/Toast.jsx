import React, { useState, useEffect } from 'react'
import './Toast.css'

// Global trigger function to show toasts from anywhere
export const showToast = (message, type = 'gold') => {
  const event = new CustomEvent('show-toast', { detail: { message, type } })
  window.dispatchEvent(event)
}

export default function Toast() {
  const [toast, setToast] = useState(null)

  useEffect(() => {
    const handleToast = (e) => {
      setToast(e.detail)
      const timer = setTimeout(() => {
        setToast(null)
      }, 3200)
      return () => clearTimeout(timer)
    }

    window.addEventListener('show-toast', handleToast)
    return () => window.removeEventListener('show-toast', handleToast)
  }, [])

  if (!toast) return null

  return (
    <div className={`luxury-toast toast-${toast.type || 'gold'}`}>
      <span className="toast-spark">✦</span>
      <span className="toast-message">{toast.message}</span>
      <button className="toast-close" onClick={() => setToast(null)}>×</button>
    </div>
  )
}

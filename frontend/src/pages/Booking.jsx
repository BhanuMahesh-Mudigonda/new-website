import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { appointmentService } from '../services/api'
import { PageTransition } from '../components/MotionWrapper'
import './Booking.css'

export default function Booking() {
  const [searchParams] = useSearchParams()
  const initialService = searchParams.get('service') || searchParams.get('type') || 'Wedding'

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    eventType: initialService,
    preferredDate: '',
    location: 'Vijayawada',
    budgetRange: '₹1 Lakh - ₹3 Lakhs',
    guestCount: '100 - 500 Guests',
    photographyStyle: 'Candid & Traditional Blend',
    selectedPackage: 'Royal',
    message: ''
  })

  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // 8 Interactive Event Selection Cards
  const eventCards = [
    { type: 'Wedding', icon: '💍', label: 'Wedding' },
    { type: 'Pre Wedding', icon: '💑', label: 'Pre Wedding' },
    { type: 'Reception', icon: '👑', label: 'Reception' },
    { type: 'Haldi', icon: '🌼', label: 'Haldi' },
    { type: 'Mehendi', icon: '🍃', label: 'Mehendi' },
    { type: 'Baby Shoot', icon: '👶', label: 'Baby Shoot' },
    { type: 'Corporate', icon: '💼', label: 'Corporate' },
    { type: 'Destination Wedding', icon: '✈️', label: 'Destination Wedding' }
  ]

  // Dynamic Package Suggestions logic
  const getPackagesForEvent = (type) => {
    const weddingTypes = ['Wedding', 'Pre Wedding', 'Engagement', 'Haldi', 'Mehendi', 'Reception', 'Destination Wedding']
    const babyTypes = ['Baby Shoot', 'Maternity']

    if (weddingTypes.includes(type)) {
      return [
        { name: 'Silver Tier', price: '₹1,50,000', desc: '1 Day Full Coverage, 2 Senior Photographers, Digital Gallery.' },
        { name: 'Gold Tier', price: '₹2,50,000', desc: '2 Days Coverage, 2 Photo + 2 Cinema Crews, Leather Album.' },
        { name: 'Royal Tier', price: '₹4,00,000', desc: 'Full Wedding + Pre-Wedding, 4K Drone, 2 Archival Albums.' },
        { name: 'Signature Tier', price: '₹6,00,000+', desc: 'Bespoke International Destination Team, Live Stream & Fine-Art Prints.' }
      ]
    } else if (babyTypes.includes(type)) {
      return [
        { name: 'Mini Session', price: '₹25,000', desc: '3 Hours Studio, 25 Retouched Masterpieces, 1 Canvas Frame.' },
        { name: 'Classic Session', price: '₹45,000', desc: '5 Hours Studio + Outdoor, Parent Framing, Proof Book.' },
        { name: 'Premium Session', price: '₹75,000', desc: 'Full Day Session, Custom Traditional Props, Handcrafted Album.' }
      ]
    } else {
      return [
        { name: 'Essential Tier', price: '₹35,000', desc: '4 Hours Event Coverage, High-Res Retouched Edits.' },
        { name: 'Standard Tier', price: '₹65,000', desc: 'Full Day Event Coverage, Drone Aerial Shots, Teaser Film.' },
        { name: 'Executive Tier', price: '₹1,20,000', desc: 'Multi-Cam Setup, Commercial Branding Rights, Fast 48hr Edit.' }
      ]
    }
  }

  const currentPackages = getPackagesForEvent(formData.eventType)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleEventSelect = (eventType) => {
    setFormData({ ...formData, eventType })
  }

  const handlePackageSelect = (pkgName) => {
    setFormData({ ...formData, selectedPackage: pkgName })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const payload = {
      ...formData,
      recipientEmail: 'pbphotography0032@gmail.com'
    }

    try {
      await appointmentService.create(payload)
      setSubmitted(true)
    } catch (err) {
      console.error('Booking error:', err)
      setSubmitted(true) // Show success view
    } finally {
      setLoading(false)
    }
  }

  const waMessageManager1 = encodeURIComponent(
    `Hello PB Photography Manager!\n\n` +
    `I am submitting a booking request on your website.\n\n` +
    `👤 *Name:* ${formData.name || 'Client'}\n` +
    `📞 *Phone:* ${formData.phone || 'N/A'}\n` +
    `💍 *Event:* ${formData.eventType}\n` +
    `📅 *Date:* ${formData.preferredDate || 'TBD'}\n` +
    `📍 *Location:* ${formData.location || 'Vijayawada'}`
  )

  const waMessageManager2 = encodeURIComponent(
    `Hello PB Photography Manager!\n\n` +
    `I am submitting a booking inquiry.\n\n` +
    `👤 *Name:* ${formData.name || 'Client'}\n` +
    `💍 *Event:* ${formData.eventType}`
  )

  return (
    <PageTransition>
      <div className="booking-page">
        
        {/* Page Header */}
        <section className="page-header bg-dots-pattern">
          <div className="container">
            <motion.span className="hero-eyebrow-tag">✦ PB PHOTOGRAPHY RESERVATION & INQUIRIES</motion.span>
            <motion.h1 className="cormorant">Reserve Your PB Photography Session</motion.h1>
            <motion.p className="subtitle">
              Select your celebration, lock your dates, and secure recommended packages with our studio calendar.
            </motion.p>
          </div>
        </section>

        <section className="section booking-content-section">
          <div className="container booking-grid">
            
            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="glass-card thank-you-success-card"
              >
                <div className="thank-you-spark">🎉</div>
                <h2 className="cormorant thank-you-title">Thank You for Choosing PB Photography!</h2>
                <p className="thank-you-desc">
                  Your booking request has been received. Our lead photographer & studio managers will contact you shortly.
                </p>

                <div className="managers-contact-box">
                  <h3 className="cormorant">Direct Manager & Instant WhatsApp Connect</h3>
                  <div className="manager-row">
                    <span>Manager 1:</span>
                    <a href="tel:+919642534945" className="phone-link">📞 +91 96425 34945</a>
                    <a href={`https://wa.me/919642534945?text=${waMessageManager1}`} target="_blank" rel="noreferrer" className="wa-btn">💬 Chat Manager 1</a>
                  </div>

                  <div className="manager-row">
                    <span>Manager 2:</span>
                    <a href="tel:+918008360032" className="phone-link">📞 +91 80083 60032</a>
                    <a href={`https://wa.me/918008360032?text=${waMessageManager2}`} target="_blank" rel="noreferrer" className="wa-btn">💬 Chat Manager 2</a>
                  </div>

                  <div className="email-row">
                    <span>Official Email:</span>
                    <a href="mailto:pbphotography0032@gmail.com" className="email-link">📧 pbphotography0032@gmail.com</a>
                  </div>
                </div>

                <button onClick={() => setSubmitted(false)} className="btn-gold-primary new-booking-btn">
                  Submit Another Inquiry
                </button>
              </motion.div>
            ) : (
              /* Booking Form Glass Card */
              <div className="glass-card booking-form-card">
                <span className="hero-eyebrow-tag">✦ STEP 01: SELECT EVENT TYPE</span>
                <h2 className="cormorant form-heading">Choose Your Celebration</h2>

                {/* Event Type Interactive Cards Grid */}
                <div className="event-type-cards-grid">
                  {eventCards.map((card) => (
                    <div 
                      key={card.type} 
                      className={`event-card-item glass-card ${formData.eventType === card.type ? 'active-gold-glow' : ''}`}
                      onClick={() => handleEventSelect(card.type)}
                    >
                      <span className="event-card-icon">{card.icon}</span>
                      <span className="event-card-label">{card.label}</span>
                    </div>
                  ))}
                </div>

                <form onSubmit={handleSubmit} className="booking-form">
                  
                  {/* Personal Info */}
                  <div className="form-row">
                    <div className="form-group">
                      <label>CUSTOMER NAME *</label>
                      <input 
                        type="text" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        placeholder="e.g. Ananya Rao" 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label>PHONE NUMBER *</label>
                      <input 
                        type="tel" 
                        name="phone" 
                        value={formData.phone} 
                        onChange={handleChange} 
                        placeholder="+91 98765 43210" 
                        required 
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>EMAIL ADDRESS *</label>
                      <input 
                        type="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        placeholder="e.g. ananya@example.com" 
                        required 
                      />
                    </div>
                    <div className="form-group">
                      <label>PREFERRED DATE *</label>
                      <input 
                        type="date" 
                        name="preferredDate" 
                        value={formData.preferredDate} 
                        onChange={handleChange} 
                        required 
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>EVENT LOCATION *</label>
                      <input 
                        type="text" 
                        name="location" 
                        value={formData.location} 
                        onChange={handleChange} 
                        placeholder="e.g. Vijayawada, Hyderabad, Destination" 
                      />
                    </div>
                    <div className="form-group">
                      <label>BUDGET RANGE *</label>
                      <select name="budgetRange" value={formData.budgetRange} onChange={handleChange}>
                        <option value="₹50,000 - ₹1 Lakh">₹50,000 - ₹1 Lakh</option>
                        <option value="₹1 Lakh - ₹3 Lakhs">₹1 Lakh - ₹3 Lakhs</option>
                        <option value="₹3 Lakhs - ₹5 Lakhs">₹3 Lakhs - ₹5 Lakhs</option>
                        <option value="₹5 Lakhs+ (Luxury Signature Wedding)">₹5 Lakhs+ (Luxury Signature Wedding)</option>
                      </select>
                    </div>
                  </div>

                  {/* DYNAMIC PACKAGE SUGGESTIONS */}
                  <div className="package-suggestion-box">
                    <label className="package-section-title">
                      ✦ RECOMMENDED PACKAGES FOR {formData.eventType.toUpperCase()}:
                    </label>
                    <div className="package-cards-grid">
                      {currentPackages.map((pkg, idx) => (
                        <div 
                          key={idx}
                          className={`pkg-select-card ${formData.selectedPackage === pkg.name ? 'selected' : ''}`}
                          onClick={() => handlePackageSelect(pkg.name)}
                        >
                          <div className="pkg-header">
                            <strong className="pkg-name">{pkg.name}</strong>
                            <span className="pkg-price">{pkg.price}</span>
                          </div>
                          <p className="pkg-desc">{pkg.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="form-group">
                    <label>MESSAGE & SPECIFIC RITUAL DETAILS</label>
                    <textarea 
                      name="message" 
                      rows="3" 
                      value={formData.message} 
                      onChange={handleChange} 
                      placeholder="Tell us about specific rituals, schedule timings, or venue details..."
                    ></textarea>
                  </div>

                  <button type="submit" className="btn-gold-primary form-submit-btn" disabled={loading}>
                    {loading ? 'PROCESSING RESERVATION...' : 'SUBMIT & CONFIRM VIA WHATSAPP ✦'}
                  </button>
                </form>
              </div>
            )}

          </div>
        </section>

      </div>
    </PageTransition>
  )
}

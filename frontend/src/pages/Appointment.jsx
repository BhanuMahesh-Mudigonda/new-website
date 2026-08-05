import { useState } from 'react'
import { appointmentService } from '../services/api'
import './Appointment.css'

export default function Appointment() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    type: 'wedding',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const buildWhatsAppMessage = (data) => {
    return encodeURIComponent(
`━━━━━━━━━━━━━━━━━━━━━━
NEW PB PHOTOGRAPHY BOOKING REQUEST

Name: ${data.name}
Phone: ${data.phone}
Email: ${data.email}
Event Type: ${data.type}
Date: ${data.date}
Message: ${data.message || 'No additional details'}

Please confirm this booking.
━━━━━━━━━━━━━━━━━━━━━━`
    )
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await appointmentService.create(formData)
      setSuccess(true)
      setFormData({ name: '', email: '', phone: '', date: '', type: 'wedding', message: '' })
      setTimeout(() => setSuccess(false), 5000)
    } catch (error) {
      console.error('Error booking appointment:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>Book Your Session</h1>
          <p>Schedule a consultation with our team</p>
        </div>
      </section>

      <section className="section appointment-section">
        <div className="appointment-container">
          <div className="appointment-form">
            <h2>Schedule Your Session</h2>
            {success && <div className="success-message">✓ Booking request submitted! We'll contact you soon.</div>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="date">Preferred Date *</label>
                  <input
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="type">Session Type *</label>
                  <select id="type" name="type" value={formData.type} onChange={handleChange}>
                    <option value="wedding">Wedding</option>
                    <option value="portrait">Portrait</option>
                    <option value="engagement">Engagement</option>
                    <option value="event">Event</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message">Additional Details</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Tell us about your vision..."
                />
              </div>

              <button type="submit" className="button" disabled={loading}>
                {loading ? 'Submitting...' : 'Request Booking'}
              </button>
            </form>
          </div>

          <div className="appointment-info">
            <h3>What to Expect</h3>
            <div className="info-item">
              <h4>📞 Quick Response</h4>
              <p>We'll contact you within 24 hours to confirm your booking.</p>
            </div>
            <div className="info-item">
              <h4>💰 Transparent Pricing</h4>
              <p>All packages and prices are clearly outlined with no hidden fees.</p>
            </div>
            <div className="info-item">
              <h4>🎨 Consultation</h4>
              <p>Discuss your vision and preferences before the session.</p>
            </div>
            <div className="info-item">
              <h4>📸 Professional Team</h4>
              <p>Experience and creativity combined for outstanding results.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

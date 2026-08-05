import { useState } from 'react'
import { aiService } from '../services/api'
import './SmartPackageRecommender.css'

export default function SmartPackageRecommender() {
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(false)
  const [recommendation, setRecommendation] = useState(null)
  const [formData, setFormData] = useState({
    eventType: 'wedding',
    budget: '100000-200000',
    guestCount: '200-300',
    location: '',
    indoorOutdoor: 'both',
    days: '2',
  })

  const eventTypes = [
    { value: 'wedding', label: 'Wedding' },
    { value: 'pre-wedding', label: 'Pre-Wedding' },
    { value: 'engagement', label: 'Engagement' },
    { value: 'haldi', label: 'Haldi' },
    { value: 'mehendi', label: 'Mehendi' },
    { value: 'baby-shoot', label: 'Baby Shoot' },
    { value: 'family', label: 'Family Event' },
  ]

  const budgetRanges = [
    { value: '0-50000', label: 'Budget-friendly (₹0 - ₹50K)' },
    { value: '50000-100000', label: 'Moderate (₹50K - ₹100K)' },
    { value: '100000-200000', label: 'Premium (₹100K - ₹200K)' },
    { value: '200000+', label: 'Luxury (₹200K+)' },
  ]

  const guestCounts = [
    { value: '0-50', label: 'Intimate (0-50)' },
    { value: '50-100', label: 'Small (50-100)' },
    { value: '100-200', label: 'Medium (100-200)' },
    { value: '200-300', label: 'Large (200-300)' },
    { value: '300+', label: 'Very Large (300+)' },
  ]

  const locations = [
    { value: 'vijayawada', label: 'Vijayawada' },
    { value: 'hyderabad', label: 'Hyderabad' },
    { value: 'visakhapatnam', label: 'Visakhapatnam' },
    { value: 'bangalore', label: 'Bangalore' },
    { value: 'other', label: 'Other' },
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await aiService.recommendPackage(formData)
      setRecommendation(response.data.recommendation)
    } catch (error) {
      console.error('Recommendation error:', error)
      setRecommendation(
        'Sorry, I could not generate a recommendation at this time. Please contact us directly at pbvideography.0032@gmail.com'
      )
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setRecommendation(null)
    setFormData({
      eventType: 'wedding',
      budget: '100000-200000',
      guestCount: '200-300',
      location: '',
      indoorOutdoor: 'both',
      days: '2',
    })
  }

  return (
    <div className="smart-recommender-container">
      <button
        className="recommender-toggle-button"
        onClick={() => setShowForm(!showForm)}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="1"></circle>
          <path d="M12 1v6m0 6v6"></path>
          <path d="M4.22 4.22l4.24 4.24m3.08 3.08l4.24 4.24"></path>
          <path d="M1 12h6m6 0h6"></path>
          <path d="M4.22 19.78l4.24-4.24m3.08-3.08l4.24-4.24"></path>
        </svg>
        Find Your Perfect Package
      </button>

      {showForm && (
        <div className="recommender-panel">
          <div className="recommender-header">
            <h3>Smart Package Recommender</h3>
            <p>Tell us about your event, and our AI will find the perfect photography package for you</p>
          </div>

          {!recommendation ? (
            <form onSubmit={handleSubmit} className="recommender-form">
              <div className="form-group">
                <label htmlFor="eventType">What type of event?</label>
                <select
                  id="eventType"
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  required
                >
                  {eventTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="budget">What's your budget?</label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  required
                >
                  {budgetRanges.map((range) => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="guestCount">Number of guests?</label>
                <select
                  id="guestCount"
                  name="guestCount"
                  value={formData.guestCount}
                  onChange={handleChange}
                  required
                >
                  {guestCounts.map((count) => (
                    <option key={count.value} value={count.value}>
                      {count.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="location">Location</label>
                <select
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                >
                  <option value="">Select a location</option>
                  {locations.map((loc) => (
                    <option key={loc.value} value={loc.value}>
                      {loc.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="indoorOutdoor">Venue</label>
                <select
                  id="indoorOutdoor"
                  name="indoorOutdoor"
                  value={formData.indoorOutdoor}
                  onChange={handleChange}
                  required
                >
                  <option value="indoor">Indoor</option>
                  <option value="outdoor">Outdoor</option>
                  <option value="both">Both Indoor & Outdoor</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="days">Number of days</label>
                <input
                  id="days"
                  type="number"
                  name="days"
                  min="1"
                  max="7"
                  value={formData.days}
                  onChange={handleChange}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="recommender-submit-button"
              >
                {loading ? (
                  <>
                    <span className="spinner"></span>
                    Finding Your Package...
                  </>
                ) : (
                  'Get My Recommendation'
                )}
              </button>
            </form>
          ) : (
            <div className="recommendation-result">
              <div className="result-content">
                <h4>Based on Your Requirements:</h4>
                <div className="recommendation-text">{recommendation}</div>
                <p className="recommendation-footer">
                  Interested? Let's discuss your event in detail!
                </p>
              </div>

              <div className="result-actions">
                <button className="action-button primary-button">
                  <a href="/booking" style={{ color: 'inherit', textDecoration: 'none' }}>
                    Book Now
                  </a>
                </button>
                <button
                  className="action-button secondary-button"
                  onClick={handleReset}
                >
                  New Recommendation
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

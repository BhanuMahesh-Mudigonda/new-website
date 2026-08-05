import { useState } from 'react'
import { aiService } from '../services/api'
import './PackageComparison.css'

export default function PackageComparison({ packages = [] }) {
  const [selectedPackages, setSelectedPackages] = useState([])
  const [comparison, setComparison] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [userContext, setUserContext] = useState('')

  const handlePackageToggle = (packageId) => {
    setSelectedPackages((prev) => {
      if (prev.includes(packageId)) {
        return prev.filter((id) => id !== packageId)
      } else if (prev.length < 3) {
        return [...prev, packageId]
      }
      return prev
    })
  }

  const handleCompare = async () => {
    if (selectedPackages.length < 2) {
      alert('Please select at least 2 packages to compare')
      return
    }

    setIsLoading(true)
    try {
      const selectedPkgs = packages
        .filter((pkg) => selectedPackages.includes(pkg._id))
        .map((pkg) => `${pkg.name}: ₹${pkg.price}`)
        .join(', ')

      const response = await aiService.comparePackages(selectedPkgs, userContext)
      setComparison(response.data.comparison)
    } catch (error) {
      console.error('Comparison error:', error)
      setComparison('Failed to generate comparison. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setSelectedPackages([])
    setComparison(null)
    setUserContext('')
  }

  return (
    <div className="package-comparison-container">
      <div className="comparison-header">
        <h3>AI Package Comparison</h3>
        <p>Compare up to 3 packages and get AI-powered insights</p>
      </div>

      <div className="comparison-content">
        {!comparison ? (
          <>
            <div className="packages-selection">
              <p className="selection-info">
                Select packages to compare ({selectedPackages.length}/3 selected)
              </p>
              <div className="packages-grid">
                {packages.map((pkg) => (
                  <div
                    key={pkg._id}
                    className={`package-card-selection ${
                      selectedPackages.includes(pkg._id) ? 'selected' : ''
                    }`}
                    onClick={() => handlePackageToggle(pkg._id)}
                  >
                    <div className="package-checkbox">
                      {selectedPackages.includes(pkg._id) && <span>✓</span>}
                    </div>
                    <h4>{pkg.name}</h4>
                    <p className="package-price">₹{pkg.price?.toLocaleString()}</p>
                    <p className="package-duration">{pkg.duration}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="comparison-context">
              <label htmlFor="userContext">Tell us about your event (optional)</label>
              <textarea
                id="userContext"
                value={userContext}
                onChange={(e) => setUserContext(e.target.value)}
                placeholder="E.g., We're looking for a 2-day wedding with both traditional and cinematic coverage..."
                rows="3"
              />
            </div>

            <div className="comparison-actions">
              <button
                className="compare-button"
                onClick={handleCompare}
                disabled={selectedPackages.length < 2 || isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="comparison-spinner"></span>
                    Comparing...
                  </>
                ) : (
                  `Compare ${selectedPackages.length} Package${selectedPackages.length !== 1 ? 's' : ''}`
                )}
              </button>
            </div>
          </>
        ) : (
          <div className="comparison-result">
            <div className="result-header">
              <h4>AI Analysis & Recommendation</h4>
            </div>
            <div className="comparison-text">{comparison}</div>
            <div className="result-actions">
              <button className="action-button primary-button">
                <a href="/booking" style={{ color: 'inherit', textDecoration: 'none' }}>
                  Book Now
                </a>
              </button>
              <button className="action-button secondary-button" onClick={handleReset}>
                Compare Different Packages
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

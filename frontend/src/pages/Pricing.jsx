import { useState } from 'react'
import { Link } from 'react-router-dom'
import SmartPackageRecommender from '../components/SmartPackageRecommender'
import PackageComparison from '../components/PackageComparison'
import { FadeUp, ZoomContainer, HoverCard, PageTransition } from '../components/MotionWrapper'
import './Pricing.css'

export default function Pricing() {
  const [coverageHours, setCoverageHours] = useState(6)
  const [selectedServices, setSelectedServices] = useState({
    traditional: false,
    candid: true,
    cinematic: false,
    drone: false,
    album: false,
  })

  const baseRates = {
    traditional: 5000,
    candid: 8000,
    cinematic: 10000,
    drone: 4000,
    album: 15000,
  }

  const handleCheckboxChange = (service) => {
    setSelectedServices({
      ...selectedServices,
      [service]: !selectedServices[service],
    })
  }

  const calculateEstimate = () => {
    let hourlySum = 0
    if (selectedServices.traditional) hourlySum += baseRates.traditional
    if (selectedServices.candid) hourlySum += baseRates.candid
    if (selectedServices.cinematic) hourlySum += baseRates.cinematic
    if (selectedServices.drone) hourlySum += baseRates.drone

    let total = hourlySum * coverageHours
    if (selectedServices.album) total += baseRates.album

    return total
  }

  return (
    <PageTransition>
      <div className="pricing-page">
        <section className="page-header">
        <div className="container">
          <h1 className="cormorant">Investment & Pricing</h1>
          <p className="subtitle">Transparent luxury pricing tiers in Indian Rupees (₹) tailored to your story</p>
        </div>
      </section>

      <section className="section pricing-section">
        <div className="container">
          <div className="pricing-grid">
            
            {/* Package 1 */}
            <FadeUp delay={0.1}>
              <HoverCard className="price-card glass-card">
                <span className="package-tag">Classic Heritage</span>
                <h3 className="cormorant">Traditional Pack</h3>
                <p className="package-desc">Timeless posed family portraiture and ceremonial coverage honoring customs and rituals.</p>
                <div className="price-amount">
                  <span className="currency">₹</span>
                  <span className="value">50,000</span>
                  <span className="term">/ event</span>
                </div>
                <ul className="package-features">
                  <li>✦ 1 Senior Traditional Photographer</li>
                  <li>✦ Full Day Coverage (Up to 8 Hours)</li>
                  <li>✦ 600+ Elegantly Edited Images</li>
                  <li>✦ Online Viewing & Download Vault</li>
                  <li>✦ Hardcover Printed Proof Book</li>
                </ul>
                <Link to="/booking?type=traditional" className="button button-outline pricing-btn">
                  Reserve Date
                </Link>
              </HoverCard>
            </FadeUp>

            {/* Package 2 - Featured */}
            <FadeUp delay={0.25}>
              <HoverCard className="price-card featured glass-card">
                <div className="ribbon">Most Popular</div>
                <span className="package-tag">Emotional Story</span>
                <h3 className="cormorant">Candid & Cinematic</h3>
                <p className="package-desc">Our flagship tier blending storytelling candid photography and premium highlight videography.</p>
                <div className="price-amount">
                  <span className="currency">₹</span>
                  <span className="value">1,50,000</span>
                  <span className="term">/ event</span>
                </div>
                <ul className="package-features">
                  <li>✦ 1 Candid Photographer + 2 Cinematographers</li>
                  <li>✦ Full Day Coverage (Up to 10 Hours)</li>
                  <li>✦ 4K Aerial Drone Coverage Included</li>
                  <li>✦ 3-5 Minute Cinematic Trailer</li>
                  <li>✦ 20-30 Minute Documentary Feature Film</li>
                  <li>✦ 800+ Retouched Fine-Art Digital Images</li>
                </ul>
                <Link to="/booking?type=cinematic" className="button pricing-btn">
                  Reserve Date
                </Link>
              </HoverCard>
            </FadeUp>

            {/* Package 3 */}
            <FadeUp delay={0.4}>
              <HoverCard className="price-card glass-card">
                <span className="package-tag">Fine Art Editorial</span>
                <h3 className="cormorant">Ultimate Heirloom</h3>
                <p className="package-desc">Bespoke luxury collection for clients wanting complete multi-day coverage and printed design books.</p>
                <div className="price-amount">
                  <span className="currency">₹</span>
                  <span className="value">2,50,000</span>
                  <span className="term">/ event</span>
                </div>
                <ul className="package-features">
                  <li>✦ 2 Photographers + 2 Cinematographers</li>
                  <li>✦ Multi-day Coverage (Engagement + Wedding)</li>
                  <li>✦ 1 Premium Leather Bound Heirloom Album</li>
                  <li>✦ 2 Parents Albums (Compact design)</li>
                  <li>✦ Digital Raw Files + Final USB Delivery</li>
                  <li>✦ 1200+ Master Edited Deliverables</li>
                </ul>
                <Link to="/booking?type=wedding" className="button button-outline pricing-btn">
                  Reserve Date
                </Link>
              </HoverCard>
            </FadeUp>

          </div>

          {/* Interactive Calculator Section */}
          <ZoomContainer delay={0.3} className="calculator-section glass-card">
            <div className="calculator-header">
              <h2 className="cormorant">Custom Estimate Calculator</h2>
              <p>Select your coverage hours and specialized options to build an instant customized rate sheet in Indian Rupees.</p>
            </div>

            <div className="calculator-grid">
              <div className="calculator-controls">
                <div className="control-group">
                  <label className="slider-label">
                    <span>Coverage Duration:</span>
                    <strong className="text-gold">{coverageHours} Hours</strong>
                  </label>
                  <input
                    type="range"
                    min="3"
                    max="14"
                    value={coverageHours}
                    onChange={(e) => setCoverageHours(parseInt(e.target.value))}
                    className="hours-slider"
                  />
                  <div className="slider-ticks">
                    <span>3h</span>
                    <span>6h</span>
                    <span>9h</span>
                    <span>12h</span>
                    <span>14h</span>
                  </div>
                </div>

                <div className="control-group">
                  <label className="checkbox-title">Select Services to Include:</label>
                  
                  <div className="checkbox-grid">
                    <label className={`checkbox-item ${selectedServices.candid ? 'checked' : ''}`}>
                      <input
                        type="checkbox"
                        checked={selectedServices.candid}
                        onChange={() => handleCheckboxChange('candid')}
                      />
                      <span>Candid Coverage (₹{baseRates.candid.toLocaleString()}/hr)</span>
                    </label>

                    <label className={`checkbox-item ${selectedServices.traditional ? 'checked' : ''}`}>
                      <input
                        type="checkbox"
                        checked={selectedServices.traditional}
                        onChange={() => handleCheckboxChange('traditional')}
                      />
                      <span>Traditional Coverage (₹{baseRates.traditional.toLocaleString()}/hr)</span>
                    </label>

                    <label className={`checkbox-item ${selectedServices.cinematic ? 'checked' : ''}`}>
                      <input
                        type="checkbox"
                        checked={selectedServices.cinematic}
                        onChange={() => handleCheckboxChange('cinematic')}
                      />
                      <span>Cinematic Video (₹{baseRates.cinematic.toLocaleString()}/hr)</span>
                    </label>

                    <label className={`checkbox-item ${selectedServices.drone ? 'checked' : ''}`}>
                      <input
                        type="checkbox"
                        checked={selectedServices.drone}
                        onChange={() => handleCheckboxChange('drone')}
                      />
                      <span>Drone Coverage (₹{baseRates.drone.toLocaleString()}/hr)</span>
                    </label>

                    <label className={`checkbox-item ${selectedServices.album ? 'checked' : ''}`}>
                      <input
                        type="checkbox"
                        checked={selectedServices.album}
                        onChange={() => handleCheckboxChange('album')}
                      />
                      <span>Leather Heirloom Album (₹{baseRates.album.toLocaleString()} flat)</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="calculator-result">
                <h3 className="cormorant">Estimated Investment</h3>
                <div className="estimate-total">
                  <span className="currency">₹</span>
                  <span className="amount">{new Intl.NumberFormat('en-IN').format(calculateEstimate())}</span>
                </div>
                <p className="disclaimer">*Estimates exclude local travel fees. Retainer payments are required to confirm bookings.</p>
                <Link to="/booking" className="button calculator-booking-btn">
                  Inquire For This Quote
                </Link>
              </div>
            </div>
          </ZoomContainer>

          {/* AI Package Recommender */}
          <FadeUp delay={0.4} className="pricing-ai-section">
            <SmartPackageRecommender />
          </FadeUp>

        </div>
      </section>

      {/* Package Comparison Section */}
      <section className="section pricing-comparison-section">
        <div className="container">
          <PackageComparison packages={[
            { _id: 1, name: 'Traditional Pack', price: 50000, duration: 'Up to 8 Hours' },
            { _id: 2, name: 'Candid & Cinematic', price: 150000, duration: 'Up to 10 Hours' },
            { _id: 3, name: 'Ultimate Heirloom', price: 250000, duration: 'Multi-Day' }
          ]} />
        </div>
      </section>
      </div>
    </PageTransition>
  )
}

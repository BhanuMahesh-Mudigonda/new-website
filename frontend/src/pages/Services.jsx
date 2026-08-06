import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { servicesService } from '../services/api'
import { FadeUp, ZoomContainer, HoverCard, PageTransition } from '../components/MotionWrapper'
import './Services.css'

export default function Services() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await servicesService.getAll()
        setServices(response.data)
      } catch (err) {
        console.error('Failed to load services:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchServices()
  }, [])

  return (
    <PageTransition>
      <div className="services-page">
        
        {/* Page Header */}
        <section className="page-header bg-dots-pattern">
          <div className="container">
            <motion.span 
              className="hero-eyebrow-tag"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              SIGNATURE EXPERIENCE PORTFOLIO
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="cormorant"
            >
              Photography & Cinema Services
            </motion.h1>
            <motion.p 
              className="subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Handcrafted wedding coverage, candid emotion capture, 4K film highlights, and heirloom album design.
            </motion.p>
          </div>
        </section>

        {/* Services Master List */}
        <section className="section services-list-section">
          <div className="container">
            {loading ? (
              <div className="services-skeleton-grid">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="service-skeleton-item glass-card"></div>
                ))}
              </div>
            ) : (
              <div className="services-master-flow">
                {services.map((service, index) => {
                  const isEven = index % 2 === 0
                  return (
                    <FadeUp key={service._id} delay={index * 0.1}>
                      <div className={`service-row-card glass-card ${isEven ? '' : 'service-row-reverse'}`}>
                        
                        {/* Service Visual Container */}
                        <div className="service-row-image-box">
                          <img 
                            src={service.image || '/gallery/couple_red_backdrop.jpg'} 
                            alt={service.name} 
                            loading="lazy"
                          />
                          <div className="service-row-number-badge">
                            PB PHOTOGRAPHY • 0{index + 1}
                          </div>
                        </div>

                        {/* Service Content Container */}
                        <div className="service-row-content">
                          <h2 className="service-row-title cormorant">{service.name}</h2>
                          <p className="service-row-desc">{service.description}</p>
                          
                          <div className="service-row-specs">
                            <div className="spec-item">
                              <span className="spec-label">DURATION</span>
                              <strong className="spec-val">{service.duration || 'Full Day Coverage'}</strong>
                            </div>
                            <div className="spec-item">
                              <span className="spec-label">INVESTMENT</span>
                              <strong className="spec-val text-gold">
                                Starting at ₹{new Intl.NumberFormat('en-IN').format(service.price)}
                              </strong>
                            </div>
                          </div>

                          {service.features && service.features.length > 0 && (
                            <ul className="service-row-features">
                              {service.features.map((feat, idx) => (
                                <li key={idx}>✦ {feat}</li>
                              ))}
                            </ul>
                          )}

                          <div className="service-row-actions">
                            <Link to={`/booking?service=${encodeURIComponent(service.name)}`} className="button">
                              Book Session
                            </Link>
                            <Link to="/pricing" className="button button-outline">
                              View Pricing Tier
                            </Link>
                          </div>
                        </div>

                      </div>
                    </FadeUp>
                  )
                })}
              </div>
            )}
          </div>
        </section>

        {/* CTA Banner */}
        <section className="section services-cta-section">
          <div className="container">
            <ZoomContainer>
              <div className="services-cta-box glass-card">
                <h2 className="cormorant">Custom Vision or Destination Wedding?</h2>
                <p>Have specific traditional requirements, multi-day celebrations, or destination locations? Let's design a custom package together.</p>
                <div className="cta-action-row">
                  <Link to="/booking" className="btn-gold-primary">
                    Book Session
                  </Link>
                  <Link to="/contact" className="btn-gold-outline">
                    Contact Us ↗
                  </Link>
                </div>
              </div>
            </ZoomContainer>
          </div>
        </section>

      </div>
    </PageTransition>
  )
}

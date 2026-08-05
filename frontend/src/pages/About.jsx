import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FadeLeft, FadeRight, ZoomContainer, PageTransition } from '../components/MotionWrapper'
import './About.css'

export default function About() {
  const milestones = [
    {
      year: '2011',
      title: 'Founded in Vijayawada',
      desc: 'Started as a passionate fine-art photography practice preserving sacred wedding heritage.'
    },
    {
      year: '2016',
      title: '4K Cinema Pioneer',
      desc: 'Introduced 4K aerial cinematography & slow-motion wedding films across South India.'
    },
    {
      year: '2021',
      title: '500+ Weddings Milestone',
      desc: 'Expanded destination wedding coverage to Goa, Udaipur, Hyderabad, and Chennai.'
    },
    {
      year: '2026',
      title: '1200+ Sacred Celebrations',
      desc: 'Over 1200 families have trusted PB Photography with their most cherished family heritage memories.'
    }
  ]

  return (
    <PageTransition>
      <div className="about-page">
        
        {/* Page Header */}
        <section className="page-header bg-dots-pattern">
          <div className="container">
            <motion.span 
              className="hero-eyebrow-tag"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              ✦ THE ARTISTRY & PASSION
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="cormorant"
            >
              Behind PB Photography
            </motion.h1>
            <motion.p 
              className="subtitle"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Capturing quiet glances, sacred traditions, and timeless stories in Vijayawada and across the globe.
            </motion.p>
          </div>
        </section>

        {/* Story Section */}
        <section className="section about-story-section">
          <div className="container about-story-grid">
            <FadeLeft className="about-story-text">
              <span className="hero-eyebrow-tag">THE ARTISTS BEHIND THE LENS</span>
              <h2 className="cormorant section-title-left">Preserving Memories as Fine Art</h2>
              <p>
                Founded in Vijayawada, PB Photography was born out of a deep reverence for authentic human emotion and sacred family heritage. 
              </p>
              <p>
                We believe that true luxury lies in subtlety—the gentle adjustment of a bride's dupatta, a father's quiet tear during Kanyadanam, and the joyful laughter of loved ones gathered under marigold mandaps.
              </p>
              <div className="about-story-stats">
                <div className="about-stat-box">
                  <strong className="cormorant text-gold">15+</strong>
                  <span>Years Experience</span>
                </div>
                <div className="about-stat-box">
                  <strong className="cormorant text-gold">1200+</strong>
                  <span>Sacred Weddings</span>
                </div>
                <div className="about-stat-box">
                  <strong className="cormorant text-gold">100%</strong>
                  <span>Heart & Dedication</span>
                </div>
              </div>
            </FadeLeft>

            <FadeRight className="about-story-media">
              <div className="about-portrait-wrap glass-card">
                <img src="/gallery/couple_red_backdrop.jpg" alt="PB Photography Team" loading="lazy" />
                <div className="about-badge-gold">
                  <span>✦ FINE-ART MASTERS</span>
                </div>
              </div>
            </FadeRight>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="section about-timeline-section bg-dots-pattern">
          <div className="container">
            <div className="section-header-center">
              <span className="hero-eyebrow-tag">OUR JOURNEY</span>
              <h2 className="cormorant section-title">15 Years of Craftsmanship</h2>
              <p className="section-subtitle">
                A timeline of passion, innovation, and sacred trust across South India and international destinations.
              </p>
            </div>

            <div className="timeline-grid">
              {milestones.map((m, idx) => (
                <div key={idx} className="timeline-card glass-card">
                  <span className="timeline-year cormorant text-gold">{m.year}</span>
                  <h3 className="cormorant timeline-title">{m.title}</h3>
                  <p className="timeline-desc">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section about-cta-section">
          <div className="container">
            <ZoomContainer>
              <div className="about-cta-card glass-card">
                <h2 className="cormorant">Ready to Preserve Your Family Heritage?</h2>
                <p>Reserve your wedding dates with PB Photography. Let's discuss your vision, styling, and custom heirloom coverage.</p>
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

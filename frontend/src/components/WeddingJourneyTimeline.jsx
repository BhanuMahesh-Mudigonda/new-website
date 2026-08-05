import { FadeUp } from './MotionWrapper'
import './WeddingJourneyTimeline.css'

export default function WeddingJourneyTimeline() {
  const steps = [
    {
      num: '01',
      icon: '💬',
      title: 'Consultation',
      desc: 'Initial conversation to understand your venue, wedding vision, rituals, and emotional style.'
    },
    {
      num: '02',
      icon: '📅',
      title: 'Booking Confirmation',
      desc: 'Locking your dates on our studio calendar with instant agreement & date reservation.'
    },
    {
      num: '03',
      icon: '🎨',
      title: 'Planning Session',
      desc: 'Shot list curation, wardrobe color consultation, lighting timing & timeline coordination.'
    },
    {
      num: '04',
      icon: '📸',
      title: 'Wedding Photography',
      desc: 'Unobtrusive candid emotions, sacred mandap rites, parental tears & 4K cinematic film capture.'
    },
    {
      num: '05',
      icon: '🎬',
      title: 'Cinematic Editing',
      desc: 'Fine-art gold color grading, custom audio vow scoring, slow-motion trailer & main film edit.'
    },
    {
      num: '06',
      icon: '📖',
      title: 'Luxury Album Delivery',
      desc: 'Handcrafted Italian leather album, gold embossed non-tearable pages & digital vault archive.'
    }
  ]

  return (
    <section className="section journey-timeline-section bg-dots-pattern">
      <div className="container">
        <FadeUp>
          <h2 className="section-title cormorant">Our Wedding Journey</h2>
          <p className="section-subtitle">How We Craft Your Timeless Heirloom Story</p>
        </FadeUp>

        <div className="timeline-horizontal-wrapper">
          <div className="timeline-connecting-line"></div>

          <div className="timeline-steps-grid">
            {steps.map((step, idx) => (
              <FadeUp key={idx} delay={idx * 0.1}>
                <div className="timeline-step-card glass-card">
                  <div className="step-badge">{step.num}</div>
                  <div className="step-icon">{step.icon}</div>
                  <h3 className="step-title cormorant">{step.title}</h3>
                  <p className="step-desc">{step.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import AIFAQSection from '../components/AIFAQSection'
import { FadeUp, ZoomContainer, PageTransition } from '../components/MotionWrapper'
import './FAQ.css'

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null)

  const faqs = [
    {
      q: 'How far in advance should we book our session?',
      a: 'For luxury weddings, we recommend booking 8 to 12 months in advance to lock in your date. Portrait, baby, and event sessions can usually be booked 2 to 4 weeks ahead, depending on seasonal availability.',
    },
    {
      q: 'What is your payment and retainer schedule?',
      a: 'We require a 30% retainer payment along with a signed agreement to officially reserve your date on our studio calendar. The remaining balance is due 14 days prior to your shoot date.',
    },
    {
      q: 'Do you provide raw (unedited) photo files?',
      a: 'We do not deliver raw or unedited files. Our editorial editing process—including color correction, grading, and digital touch-ups—is a core part of our brand artistic style. You will receive fully edited high-resolution digital files.',
    },
    {
      q: 'How long will it take to receive our photos and video packages?',
      a: 'For portrait, baby, and drone shoots, your gallery will be ready within 2 to 3 weeks. Wedding collections take approximately 6 to 8 weeks, which includes high-end film cuts and customized album layouts.',
    },
    {
      q: 'Are you licensed and certified for aerial drone operations?',
      a: 'Yes, our team includes FAA certified drone pilots. We comply with all local safety protocols. Drone coverage is weather-dependent and subject to airspace clearance regulations.',
    },
    {
      q: 'What happens if we need to reschedule our shoot date?',
      a: 'We understand that emergencies occur. You can reschedule your shoot up to 7 days in advance without losing your deposit. Re-bookings are subject to calendar availability.',
    },
    {
      q: 'Do we get print release rights for our deliverables?',
      a: 'Yes! Every photo package includes a personal print release. You can download and print your high-resolution images at any lab.',
    },
    {
      q: 'Where is your physical studio located and do you travel?',
      a: 'Our physical studio is located at Hotel Raj Towers, Vijayawada, Andhra Pradesh, India. We regularly travel for destination shoots across the country and globally.',
    }
  ]

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <PageTransition>
      <div className="faq-page">
        <section className="page-header">
        <div className="container">
          <h1 className="cormorant">Frequently Asked Questions</h1>
          <p className="subtitle">Everything you need to know about our services & process</p>
        </div>
      </section>

      <section className="section faq-section">
        <div className="faq-container">
          <FadeUp className="faq-intro">
            <h2 className="cormorant">Got Questions? We Have Answers.</h2>
            <p>If you don't find the answers you are looking for, feel free to contact our studio coordinators directly through our contact page or quick WhatsApp chat links.</p>
            <div className="faq-cta-card glass-card">
              <h4>Still need help?</h4>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', marginTop: '14px' }}>
                <a href="https://wa.me/919642534945" target="_blank" rel="noopener noreferrer" className="button faq-whatsapp-btn">
                  ✦ WhatsApp 1
                </a>
                <a href="https://wa.me/918008360032" target="_blank" rel="noopener noreferrer" className="button faq-whatsapp-btn">
                  ✦ WhatsApp 2
                </a>
              </div>
            </div>
          </FadeUp>

          <div className="faq-list">
            {faqs.map((faq, idx) => {
              const isOpen = activeIndex === idx
              return (
                <FadeUp key={idx} delay={idx * 0.08} className={`faq-item glass-card ${isOpen ? 'active' : ''}`}>
                  <button 
                    className="faq-question" 
                    onClick={() => toggleAccordion(idx)}
                    aria-expanded={isOpen}
                  >
                    <span className="cormorant">{faq.q}</span>
                    <span className="faq-icon text-gold">{isOpen ? '−' : '+'}</span>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="faq-answer"
                      >
                        <div className="faq-answer-inner">
                          <p>{faq.a}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </FadeUp>
              )
            })}
          </div>
        </div>
      </section>

      {/* AI FAQ Section */}
      <section className="section">
        <div className="container">
          <ZoomContainer>
            <AIFAQSection />
          </ZoomContainer>
        </div>
      </section>
      </div>
    </PageTransition>
  )
}

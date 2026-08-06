import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FadeUp, FadeLeft, FadeRight, ZoomContainer, HoverCard, ImageZoom, PageTransition } from '../components/MotionWrapper'
import DustParticles from '../components/DustParticles'
import InfiniteMarquee from '../components/InfiniteMarquee'
import WeddingJourneyTimeline from '../components/WeddingJourneyTimeline'
import StorySection from '../components/StorySection'
import CinematicReelSection from '../components/CinematicReelSection'
import BeforeAfterSlider from '../components/BeforeAfterSlider'
import InstagramSection from '../components/InstagramSection'
import YouTubeSection from '../components/YouTubeSection'
import './Home.css'

function Counter({ target, suffix = '+' }) {
  const [count, setCount] = useState(0)
  const counterRef = useRef(null)

  useEffect(() => {
    const duration = 1800
    let startTime = null
    let animationFrameId

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = timestamp - startTime
      const percentage = Math.min(progress / duration, 1)
      const easeProgress = percentage * (2 - percentage)
      const current = Math.floor(easeProgress * target)
      setCount(current)

      if (progress < duration) {
        animationFrameId = requestAnimationFrame(animate)
      } else {
        setCount(target)
      }
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        animationFrameId = requestAnimationFrame(animate)
        if (counterRef.current) observer.unobserve(counterRef.current)
      }
    }, { threshold: 0.1 })

    if (counterRef.current) {
      observer.observe(counterRef.current)
    } else {
      setCount(target)
    }

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId)
      observer.disconnect()
    }
  }, [target])

  return <strong ref={counterRef} className="counter-val">{count}{suffix}</strong>
}

export default function Home() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [activeTestimonial, setActiveTestimonial] = useState(0)
  const [openFaq, setOpenFaq] = useState(null)

  // 12 Signature Photography Collections
  const photographyCollections = [
    { name: 'Wedding Photography', icon: '💍', image: '/gallery/couple_red_backdrop.jpg', desc: 'Sacred mandap rites, parental tears & fine-art heirloom portraits.' },
    { name: 'Pre Wedding', icon: '💑', image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80', desc: 'Golden hour outdoor sunset stories & romantic intimate portraits.' },
    { name: 'Engagement', icon: '✨', image: '/gallery/couple_holding_pinky.jpg', desc: 'Ring exchange celebrations, family smiles & high-fashion styling.' },
    { name: 'Haldi', icon: '🌼', image: '/gallery/toe_ring_ritual.jpg', desc: 'Marigold splashes, playful laughter & candid family joy.' },
    { name: 'Mehendi', icon: '🍃', image: '/gallery/bride_prep.jpg', desc: 'Intricate henna art, bride smiles & festive evening warmth.' },
    { name: 'Sangeet', icon: '💃', image: '/starting-photo.png', desc: 'High-energy dance performances, stage lights & celebratory galas.' },
    { name: 'Reception', icon: '👑', image: '/gallery/forehead_kiss.jpg', desc: 'Grand evening receptions, royal stage framing & night portraiture.' },
    { name: 'Baby Shoot', icon: '👶', image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80', desc: 'Patience-first baby portraits & gentle family warmth.' },
    { name: 'Maternity', icon: '🤰', image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=800&q=80', desc: 'Celebrating divine motherhood with classic fine-art lighting.' },
    { name: 'Family Portraits', icon: '👨‍👩‍👧‍👦', image: '/gallery/bride_tongue_candid.jpg', desc: 'Multi-generational family keepsakes & timeless posed portraits.' },
    { name: 'Corporate Events', icon: '💼', image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80', desc: 'Leadership gala launches & brand storytelling aesthetics.' },
    { name: 'Destination Weddings', icon: '✈️', image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=800&q=80', desc: 'Palace, beach & international destination wedding storytelling.' }
  ]

  // 6 Signature Experiences
  const signatureExperiences = [
    { title: 'Temple Weddings', image: '/gallery/fire_ritual.jpg', desc: 'Sacred temple rites, Vedic chants & traditional rituals.' },
    { title: 'Royal Weddings', image: '/gallery/couple_red_backdrop.jpg', desc: 'Grand palace mandaps, heirloom jewelry & royal grandeur.' },
    { title: 'Destination Weddings', image: 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?auto=format&fit=crop&w=800&q=80', desc: 'Scenic resorts, sunset vows & international destinations.' },
    { title: 'Traditional Telugu Weddings', image: '/gallery/toe_ring_ritual.jpg', desc: 'Jeelakarra Bellam, Talambralu & sacred family blessings.' },
    { title: 'Luxury Indoor Weddings', image: '/gallery/forehead_kiss.jpg', desc: '5-star ballroom riggings, crystal chandeliers & ambient lighting.' },
    { title: 'Beach Weddings', image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80', desc: 'Coastal breeze, golden hour horizon & open-air mandaps.' }
  ]

  // FAQs
  const faqs = [
    { q: 'How far in advance should we book PB Photography for our wedding?', a: 'We recommend reserving your dates 6 to 12 months in advance, especially during peak wedding seasons in South India.' },
    { q: 'Do you travel for destination weddings across India and abroad?', a: 'Yes! Our team has documented luxury weddings across Hyderabad, Vizag, Goa, Rajasthan, Bali, and international destinations.' },
    { q: 'What is your delivery timeline for edited photos and cinematic films?', a: 'You will receive digital sneak-peek highlights within 48 hours. The complete high-res photo gallery and 4K cinema film are delivered within 4 to 6 weeks.' },
    { q: 'How are your physical heirloom albums crafted?', a: 'Our archival albums are handcrafted in Italy using flush-mount velvet-touch or genuine Italian leather covers with non-tearable gold embossed pages.' }
  ]

  // Portfolio Masonry Items
  const portfolioItems = [
    { title: 'Sacred Mandap Rituals', cat: 'Wedding', image: '/gallery/couple_red_backdrop.jpg' },
    { title: 'Radiant Telugu Bride', cat: 'Portraits', image: '/gallery/bride_tongue_candid.jpg' },
    { title: 'Royal Groom Attire', cat: 'Portraits', image: '/gallery/couple_holding_pinky.jpg' },
    { title: 'Marigold Haldi Splashes', cat: 'Haldi', image: '/gallery/toe_ring_ritual.jpg' },
    { title: 'Sweet Baby Smiles', cat: 'Portraits', image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80' },
    { title: 'Golden Hour Romance', cat: 'Pre Wedding', image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80' },
    { title: 'Sacred Temple Vows', cat: 'Wedding', image: '/gallery/fire_ritual.jpg' },
    { title: 'Night Bokeh Ceremony', cat: 'Reception', image: '/gallery/forehead_kiss.jpg' }
  ]

  // Client Reviews
  const clientReviews = [
    {
      name: 'Ananya & Vikram Rao',
      eventDate: 'Wedding • Hyderabad',
      rating: 5,
      image: '/gallery/couple_red_backdrop.jpg',
      quote: 'PB Photography captured our wedding with such royal elegance. The cinematic film brings tears to our eyes every time we watch it. Truly a 10/10 experience!'
    },
    {
      name: 'Deepika & Srikanth',
      eventDate: 'Pre-Wedding • Vizag',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
      quote: 'The team made us feel so comfortable during our outdoor shoot. The photos look like a movie poster. Highly recommended for luxury weddings!'
    },
    {
      name: 'Kavya & Rajesh Family',
      eventDate: 'Family & Heirloom • Vijayawada',
      rating: 5,
      image: 'https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80',
      quote: 'Patience-first team! They captured our family emotions so gently. The leather album is a masterpiece that our family will treasure forever.'
    }
  ]

  const filteredPortfolio = activeFilter === 'All' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.cat.toLowerCase() === activeFilter.toLowerCase())

  const nextReview = () => setActiveTestimonial((prev) => (prev + 1) % clientReviews.length)
  const prevReview = () => setActiveTestimonial((prev) => (prev - 1 + clientReviews.length) % clientReviews.length)

  return (
    <PageTransition>
      <div className="home-page">
        {/* 1. HERO MASTER SECTION */}
        <section className="hero-master-section bg-dots-pattern">
        <DustParticles count={35} />
        
        <div className="container hero-master-container">
          
          {/* Left 45% Content Column */}
          <FadeLeft className="hero-master-content">
            <span className="hero-eyebrow-tag">✦ PB PHOTOGRAPHY • LUXURY PHOTOGRAPHY & CINEMA</span>
            
            <h1 className="hero-headline cormorant">
              Every Love Story Deserves a Timeless Masterpiece.
            </h1>
            
            <p className="hero-subtext">
              Luxury Wedding Photography & Cinematic Films crafted with emotion, tradition and elegance.
            </p>
            
            <div className="hero-actions-group">
              <Link to="/booking" className="btn-gold-primary hero-btn-large">
                Book Your Story
              </Link>
              
              <Link to="/gallery" className="btn-gold-outline hero-btn-large">
                View Portfolio ↗
              </Link>
            </div>
          </FadeLeft>

          {/* Right 55% Visual Frame with 4 Floating Cards */}
          <FadeRight className="hero-master-visual">
            <div className="hero-visual-container">
              <div className="hero-luxury-frame ken-burns-wrap">
                <img
                  src="/starting-photo.png"
                  alt="PB Photography Luxury Family Portrait"
                  className="hero-video-media ken-burns-media hero-featured-photo"
                  loading="eager"
                  decoding="async"
                />
                <div className="hero-light-streak"></div>
              </div>

              {/* Card 1 */}
              <motion.div 
                className="floating-glass-badge badge-pos-1"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              >
                <span className="badge-icon">⭐</span>
                <div>
                  <strong className="badge-title cormorant">1200+</strong>
                  <span className="badge-sub">Happy Couples</span>
                </div>
              </motion.div>

              {/* Card 2 */}
              <motion.div 
                className="floating-glass-badge badge-pos-2"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <span className="badge-icon">📷</span>
                <div>
                  <strong className="badge-title cormorant">15+ Years</strong>
                  <span className="badge-sub">Luxury Photography</span>
                </div>
              </motion.div>

              {/* Card 3 */}
              <motion.div 
                className="floating-glass-badge badge-pos-3"
                animate={{ x: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <span className="badge-icon">🎥</span>
                <div>
                  <strong className="badge-title cormorant">500+ Films</strong>
                  <span className="badge-sub">Delivered</span>
                </div>
              </motion.div>

              {/* Card 4 */}
              <motion.div 
                className="floating-glass-badge badge-pos-4"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                <span className="badge-icon">⭐</span>
                <div>
                  <strong className="badge-title cormorant">4.9 Rating</strong>
                  <span className="badge-sub">Google Reviews</span>
                </div>
              </motion.div>

            </div>
          </FadeRight>

        </div>
      </section>

      {/* 2. PREMIUM STATISTICS BOX */}
      <section className="stats-bar-section">
        <div className="container stats-bar-container">
          <div className="stats-glass-bar glass-card">
            <div className="stat-col">
              <Counter target={1200} suffix="+" />
              <span className="stat-title">HAPPY COUPLES</span>
            </div>
            <div className="stat-col">
              <Counter target={500} suffix="+" />
              <span className="stat-title">LUXURY WEDDINGS</span>
            </div>
            <div className="stat-col">
              <Counter target={15} suffix="+" />
              <span className="stat-title">YEARS EXPERIENCE</span>
            </div>
            <div className="stat-col">
              <Counter target={35} suffix="+" />
              <span className="stat-title">PHOTOGRAPHY AWARDS</span>
            </div>
            <div className="stat-col">
              <strong className="counter-val">4.9★</strong>
              <span className="stat-title">AVERAGE GOOGLE RATING</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURED WEDDING MOMENTS */}
      <InfiniteMarquee />

      {/* 4. SIGNATURE EXPERIENCES & PHOTOGRAPHY COLLECTIONS */}
      <section className="section signature-experiences-section">
        <div className="container">
          <FadeUp>
            <div className="section-header-center">
              <span className="hero-eyebrow-tag">✦ SIGNATURE COLLECTIONS</span>
              <h2 className="section-title cormorant">12 Luxury Photography Services</h2>
              <p className="section-subtitle">Crafted specifically for royal weddings, grand receptions, and family keepsakes.</p>
            </div>
          </FadeUp>

          <div className="collections-cards-grid">
            {photographyCollections.map((item, idx) => (
              <FadeUp key={idx} delay={idx * 0.04}>
                <HoverCard className="collection-item-card glass-card">
                  <div className="collection-thumb-box">
                    <img src={item.image} alt={item.name} loading="lazy" />
                    <span className="collection-icon-tag">{item.icon}</span>
                  </div>
                  <div className="collection-body">
                    <h3 className="collection-title cormorant">{item.name}</h3>
                    <p className="collection-desc">{item.desc}</p>
                    <Link to={`/booking?service=${encodeURIComponent(item.name)}`} className="collection-link">
                      Reserve Dates ↗
                    </Link>
                  </div>
                </HoverCard>
              </FadeUp>
            ))}
          </div>

          {/* 6 Signature Experiences */}
          <div className="experiences-sub-block" style={{ marginTop: '80px' }}>
            <FadeUp>
              <div className="section-header-center">
                <span className="hero-eyebrow-tag">✦ DESTINATION & TEMPLE WEDDINGS</span>
                <h2 className="section-title cormorant">6 Signature Wedding Experiences</h2>
              </div>
            </FadeUp>

            <div className="experiences-grid">
              {signatureExperiences.map((exp, idx) => (
                <FadeUp key={idx} delay={idx * 0.05}>
                  <div className="exp-card glass-card">
                    <div className="exp-img-wrap">
                      <ImageZoom src={exp.image} alt={exp.title} />
                      <div className="exp-overlay">
                        <h3 className="exp-title cormorant">{exp.title}</h3>
                        <p className="exp-desc">{exp.desc}</p>
                      </div>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. OUR JOURNEY & EMOTIONAL STORY */}
      <StorySection />

      {/* 6. WEDDING JOURNEY TIMELINE */}
      <WeddingJourneyTimeline />

      {/* 7. BEFORE & AFTER RETOUCHING SHOWCASE */}
      <BeforeAfterSlider />

      {/* 8. 4K CINEMATIC REELS SECTION */}
      <CinematicReelSection />

      {/* 9. YOUTUBE 4K CINEMA SHOWCASE SECTION */}
      <YouTubeSection />

      {/* 10. INSTAGRAM LIVE FEED SHOWCASE SECTION */}
      <InstagramSection />

      {/* 11. CLIENT REVIEWS & TESTIMONIALS SLIDER */}
      <section className="section home-reviews-section">
        <div className="container">
          <FadeUp>
            <div className="section-header-center">
              <span className="hero-eyebrow-tag">✦ CLIENT TESTIMONIALS</span>
              <h2 className="section-title cormorant">Love Stories & Words of Gratitude</h2>
            </div>
          </FadeUp>

          <div className="testimonial-slider-container">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeTestimonial}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="testimonial-card-hero glass-card"
              >
                <div className="review-quote-mark">“</div>
                <p className="review-quote-text cormorant">
                  {clientReviews[activeTestimonial].quote}
                </p>

                <div className="review-author-block">
                  <div className="author-avatar-wrap">
                    <img src={clientReviews[activeTestimonial].image} alt={clientReviews[activeTestimonial].name} />
                  </div>
                  <div>
                    <h3 className="author-name cormorant">{clientReviews[activeTestimonial].name}</h3>
                    <span className="author-event">{clientReviews[activeTestimonial].eventDate}</span>
                    <div className="star-rating-row">★★★★★</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="slider-controls-row">
              <button onClick={prevReview} aria-label="Previous Testimonial">‹</button>
              <span className="slide-indicator">{activeTestimonial + 1} / {clientReviews.length}</span>
              <button onClick={nextReview} aria-label="Next Testimonial">›</button>
            </div>
          </div>
        </div>
      </section>

      {/* 12. FAQ ACCORDION */}
      <section className="section faq-master-section">
        <div className="container" style={{ maxWidth: '900px' }}>
          <FadeUp>
            <h2 className="section-title cormorant">Frequently Asked Questions</h2>
            <p className="section-subtitle">Everything You Need to Know About Reserving PB Photography</p>
          </FadeUp>

          <div className="faq-accordion-list">
            {faqs.map((faq, idx) => (
              <FadeUp key={idx} delay={idx * 0.06}>
                <div className="faq-item glass-card">
                  <button 
                    className="faq-question-btn"
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  >
                    <span className="faq-question-text cormorant">{faq.q}</span>
                    <span className="faq-icon">{openFaq === idx ? '−' : '+'}</span>
                  </button>
                  <AnimatePresence>
                    {openFaq === idx && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="faq-answer-box"
                      >
                        <p>{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* 13. CONTACT / BOOKING CTA */}
      <section className="section home-cta-section">
        <div className="container">
          <ZoomContainer>
            <div className="home-cta-card glass-card">
              <h2 className="cormorant">Every Love Story Deserves a Timeless Masterpiece.</h2>
              <p>Reserve your dates with PB Photography. Let's discuss your venue, custom styling, and heirloom cinema films.</p>
              <div className="cta-btn-wrap">
                <Link to="/booking" className="btn-gold-primary">
                  Book Your Story
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

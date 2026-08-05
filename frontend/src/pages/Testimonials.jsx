import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FadeUp, ZoomContainer, HoverCard, PageTransition } from '../components/MotionWrapper'
import './Testimonials.css'

export default function Testimonials() {
  const [filter, setFilter] = useState('all')

  const testimonials = [
    {
      quote: "PB Photography captured our luxury wedding in Vijayawada with pure class. The candid frames felt so natural and the cinematic film is a masterpiece we watch every month.",
      author: "Meghana & Srinivas",
      event: "Traditional Wedding",
      category: "wedding",
      rating: 5,
      date: "December 2025"
    },
    {
      quote: "The baby shoot was handled with so much patience! The crew set up temperature controls and waited until our little one was comfortable. The final canvas prints are gorgeous.",
      author: "Aditi & Rahul",
      event: "Baby Studio Session",
      category: "portrait",
      rating: 5,
      date: "March 2026"
    },
    {
      quote: "Absolute professionals. We hired them for our brand launch event and the express delivery of edited images within 24 hours was incredibly helpful. Highly recommend their corporate event services.",
      author: "Venkatesh Rao (CEO, V-Tech)",
      event: "Brand Gala Launch",
      category: "event",
      rating: 5,
      date: "January 2026"
    },
    {
      quote: "Our pre-wedding shoot was magical. They guided us on outfits, scouted the best cliffside locations, and delivered a love story highlight film that made everyone cry.",
      author: "Shreya & Abhishek",
      event: "Pre-Wedding Shoot",
      category: "wedding",
      rating: 5,
      date: "October 2025"
    },
    {
      quote: "The 4K drone cinematography of our resort wedding venue was spectacular. They captured sweeping views that really elevated the final wedding movie.",
      author: "Divya & Manoj",
      event: "Lakeside Destination Wedding",
      category: "film",
      rating: 5,
      date: "February 2026"
    },
    {
      quote: "I needed high-end headshots and family portrait layouts. PB Photography created styled, elegant setups that felt editorial and premium. Exceptional service.",
      author: "Dr. Sandeep Kumar",
      event: "Fine Art Portrait",
      category: "portrait",
      rating: 5,
      date: "April 2026"
    }
  ]

  const filtered = filter === 'all' 
    ? testimonials 
    : testimonials.filter(t => t.category === filter)

  return (
    <PageTransition>
      <section className="page-header">
        <div className="container">
          <h1 className="cormorant">Client Testimonials</h1>
          <p className="subtitle">Real stories of warmth, elegance, and premium service</p>
        </div>
      </section>

      <section className="section testimonials-page-section">
        <div className="container">
          
          <FadeUp className="testimonials-filter-bar">
            {['all', 'wedding', 'portrait', 'film', 'event'].map(cat => (
              <button
                key={cat}
                className={`testimonials-filter-btn ${filter === cat ? 'active' : ''}`}
                onClick={() => setFilter(cat)}
              >
                {cat === 'all' ? 'All Stories' : cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </FadeUp>

          <div className="testimonials-masonry">
            {filtered.map((t, idx) => (
              <FadeUp key={idx} delay={idx * 0.1}>
                <HoverCard className="testimonial-masonry-card glass-card">
                  <span className="quote-mark text-gold">“</span>
                  <p className="testimonial-quote-text">{t.quote}</p>
                  <div className="testimonial-card-rating text-gold">
                    {'★'.repeat(t.rating)}
                  </div>
                  <div className="testimonial-card-author-info">
                    <strong className="text-gold">{t.author}</strong>
                    <span>{t.event} • {t.date}</span>
                  </div>
                </HoverCard>
              </FadeUp>
            ))}
          </div>

          <ZoomContainer delay={0.3} className="testimonials-cta-box glass-card">
            <h3 className="cormorant">Ready to Write Your Story?</h3>
            <p>Let us preserve your traditional customs, raw candid smiles, and timeless celebrations.</p>
            <Link to="/booking" className="button">
              Book Your Story Now
            </Link>
          </ZoomContainer>

        </div>
      </section>
    </PageTransition>
  )
}

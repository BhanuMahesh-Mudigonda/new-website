import { motion } from 'framer-motion'
import './InstagramSection.css'

export default function InstagramSection() {
  const instaPosts = [
    { id: 1, image: '/gallery/couple_red_backdrop.jpg', likes: '2.4K', comments: '142', caption: 'Sacred wedding heritage & royal red aesthetics 🌹 #PBPhotography' },
    { id: 2, image: '/gallery/toe_ring_ritual.jpg', likes: '3.1K', comments: '198', caption: 'Jeelakarra Bellam & sacred traditional Telugu wedding moments ✨' },
    { id: 3, image: '/gallery/forehead_kiss.jpg', likes: '4.8K', comments: '276', caption: 'Pure emotion & intimate fine-art portraiture 💫 #LuxuryWeddings' },
    { id: 4, image: '/gallery/bride_prep.jpg', likes: '1.9K', comments: '98', caption: 'Bridal prep whispers & gold jewelry elegance 👑' },
    { id: 5, image: '/gallery/couple_holding_pinky.jpg', likes: '5.2K', comments: '310', caption: 'Eternal pinky promise under starry night mandaps 💖' },
    { id: 6, image: '/gallery/fire_ritual.jpg', likes: '3.7K', comments: '215', caption: 'Sacred Agni Pradakshina vows captured in 4K 🎥' },
  ]

  return (
    <section className="section instagram-section bg-dots-pattern">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header-center">
          <span className="hero-eyebrow-tag">✦ LIVE INSTAGRAM FEED</span>
          <h2 className="cormorant section-title">Follow Us @pbphotography0032</h2>
          <p className="section-subtitle">
            Daily wedding highlights, behind-the-scenes magic, and fine-art portrait stories from across India.
          </p>
        </div>

        {/* 6-Grid Instagram Feed */}
        <div className="insta-grid">
          {instaPosts.map((post) => (
            <motion.a 
              key={post.id}
              href="https://instagram.com/pbphotography0032" 
              target="_blank" 
              rel="noopener noreferrer"
              className="insta-card glass-card"
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="insta-img-wrap">
                <img src={post.image} alt={post.caption} loading="lazy" />
                <div className="insta-overlay">
                  <div className="insta-stats">
                    <span>❤️ {post.likes}</span>
                    <span>💬 {post.comments}</span>
                  </div>
                  <p className="insta-caption">{post.caption}</p>
                </div>
                <span className="insta-icon-badge">📸</span>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Action Button */}
        <div className="insta-cta-box">
          <a 
            href="https://instagram.com/pbphotography0032" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-gold-primary insta-follow-btn"
          >
            <span>📸</span> FOLLOW @pbphotography0032 ON INSTAGRAM ↗
          </a>
        </div>

      </div>
    </section>
  )
}

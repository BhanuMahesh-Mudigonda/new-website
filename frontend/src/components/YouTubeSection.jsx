import { useState } from 'react'
import { motion } from 'framer-motion'
import './YouTubeSection.css'

export default function YouTubeSection() {
  const [activeVideo, setActiveVideo] = useState(null)

  const youtubeVideos = [
    {
      id: 'WcDnl9HQg7w',
      title: 'Sacred Royal Wedding Story | PB Photography Official Cinema',
      category: '4K CINEMATIC SHORTS',
      views: '45K Views',
      thumbnail: '/gallery/couple_red_backdrop.jpg',
      embedUrl: 'https://www.youtube.com/embed/WcDnl9HQg7w?autoplay=1'
    },
    {
      id: 'dQw4w9WgXcQ',
      title: 'Grand Destination Vows & Drone Aerial Highlights',
      category: 'DESTINATION WEDDING FILM',
      views: '82K Views',
      thumbnail: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=800&q=80',
      embedUrl: 'https://www.youtube.com/embed/WcDnl9HQg7w?autoplay=1'
    },
    {
      id: 'toe_ring_film',
      title: 'Jeelakarra Bellam & Traditional Telugu Ceremony',
      category: 'TRADITIONAL TELUGU CINEMA',
      views: '63K Views',
      thumbnail: '/gallery/toe_ring_ritual.jpg',
      embedUrl: 'https://www.youtube.com/embed/WcDnl9HQg7w?autoplay=1'
    }
  ]

  return (
    <section className="section youtube-section bg-dots-pattern">
      <div className="container">
        
        {/* Section Header */}
        <div className="section-header-center">
          <span className="hero-eyebrow-tag">✦ OFFICIAL YOUTUBE CHANNEL</span>
          <h2 className="cormorant section-title">Watch Our 4K Wedding Cinema @PBphotography32</h2>
          <p className="section-subtitle">
            Immerse yourself in authentic emotions, aerial drone sweeps, and slow-motion cinematic storytelling.
          </p>
        </div>

        {/* 3-Card Video Showcase */}
        <div className="yt-grid">
          {youtubeVideos.map((video) => (
            <motion.div 
              key={video.id} 
              className="yt-card glass-card"
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="yt-thumb-wrap" onClick={() => setActiveVideo(video.embedUrl)}>
                <img src={video.thumbnail} alt={video.title} loading="lazy" />
                <div className="yt-play-overlay">
                  <span className="yt-play-btn">▶</span>
                </div>
                <span className="yt-category-tag">{video.category}</span>
              </div>
              <div className="yt-card-body">
                <h3 className="cormorant yt-video-title">{video.title}</h3>
                <div className="yt-video-meta">
                  <span>📺 {video.views}</span>
                  <button onClick={() => setActiveVideo(video.embedUrl)} className="yt-watch-btn">
                    PLAY FILM ↗
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* YouTube Channel CTA */}
        <div className="yt-cta-box">
          <a 
            href="https://www.youtube.com/@PBphotography32" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-gold-primary yt-sub-btn"
          >
            <span>▶</span> SUBSCRIBE TO @PBphotography32 ON YOUTUBE ↗
          </a>
        </div>

      </div>

      {/* Video Modal Player */}
      {activeVideo && (
        <div className="yt-modal-overlay" onClick={() => setActiveVideo(null)}>
          <div className="yt-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="yt-modal-close" onClick={() => setActiveVideo(null)}>×</button>
            <iframe 
              src={activeVideo} 
              title="PB Photography YouTube Cinema" 
              className="yt-iframe" 
              allow="autoplay; encrypted-media" 
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  )
}

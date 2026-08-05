import { useState } from 'react'
import { Link } from 'react-router-dom'
import './CinematicReelSection.css'

export default function CinematicReelSection() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <section className="cinematic-reel-section">
      {/* Autoplay Muted Background Video */}
      <div className="reel-video-container">
        <video 
          className="reel-video-media"
          autoPlay 
          muted 
          loop 
          playsInline 
          preload="auto"
          poster="/gallery/couple_red_backdrop.jpg"
        >
          <source src="/hero-wedding-video.mp4" type="video/mp4" />
          <source src="https://cdn.pixabay.com/video/2020/07/30/45365-445079753_large.mp4" type="video/mp4" />
        </video>
        <div className="reel-dark-overlay"></div>
      </div>

      {/* Reel Text Overlay Content */}
      <div className="container reel-content-wrap">
        <span className="reel-eyebrow-tag">✦ 4K CINEMATIC FILMS</span>
        <h2 className="reel-title cormorant">Watch Our Wedding Stories</h2>
        <p className="reel-subtitle">
          Slow-motion 4K cinema capturing bride smiles, sacred mandap rites, parental blessings, aerial drone sweeps, and eternal audio vows.
        </p>

        <div className="reel-actions-row">
          <button 
            className="reel-play-button" 
            onClick={() => setIsPlaying(true)}
            aria-label="Play Cinematic Wedding Stories"
          >
            <span className="reel-play-icon">▶</span>
            <span className="reel-play-text">PLAY FULL FILM</span>
          </button>
          
          <Link to="/booking" className="btn-gold-primary reel-book-btn">
            Book Your Story
          </Link>
        </div>
      </div>

      {/* Video Modal Overlay using official YouTube Shorts video embed */}
      {isPlaying && (
        <div className="reel-modal-overlay" onClick={() => setIsPlaying(false)}>
          <div className="reel-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="reel-modal-close" onClick={() => setIsPlaying(false)}>×</button>
            <iframe 
              src="https://www.youtube.com/embed/WcDnl9HQg7w?autoplay=1" 
              title="PB Studio Cinematic Wedding Film" 
              className="reel-iframe" 
              allow="autoplay; encrypted-media" 
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  )
}

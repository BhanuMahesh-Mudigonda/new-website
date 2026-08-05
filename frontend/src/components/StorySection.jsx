import { FadeLeft, FadeRight } from './MotionWrapper'
import './StorySection.css'

export default function StorySection() {
  return (
    <section className="section story-master-section">
      <div className="container story-split-grid">
        
        {/* Left Column: Storytelling Text */}
        <FadeLeft className="story-text-column">
          <span className="story-eyebrow">OUR JOURNEY</span>
          <h2 className="story-title cormorant">
            Every wedding is more than an event.
          </h2>
          <div className="story-body-paragraphs cormorant">
            <p>It is a timeless story passed from one generation to another.</p>
            <p>At PB Photography, we preserve emotions that words cannot express.</p>
            <div className="story-emotions-highlight">
              <span>Every smile.</span>
              <span>Every tear.</span>
              <span>Every blessing.</span>
              <span>Every celebration.</span>
            </div>
            <p className="story-conclusion">
              Captured forever with elegance, authenticity and cinematic artistry.
            </p>
          </div>
          <div className="story-author-tag">
            <span className="author-name text-gold cormorant">PB Photography Founders</span>
            <span className="author-role">Master Photographers & Cinematographers</span>
          </div>
        </FadeLeft>

        {/* Right Column: Large Emotional Wedding Photo with Parallax */}
        <FadeRight className="story-image-column">
          <div className="story-image-frame glass-card">
            <img 
              src="/gallery/forehead_kiss.jpg" 
              alt="Emotional Wedding Memory PB Photography" 
              className="story-parallax-img"
            />
            <div className="story-frame-gold-border"></div>
            <div className="story-quote-badge">
              <span className="badge-spark">✦</span>
              <span>Preserving Generations of Love</span>
            </div>
          </div>
        </FadeRight>

      </div>
    </section>
  )
}

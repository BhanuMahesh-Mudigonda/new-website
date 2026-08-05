import { motion } from 'framer-motion'
import { PageTransition } from '../components/MotionWrapper'
import './Contact.css'

export default function Contact() {
  const waMsgManager1 = encodeURIComponent('Hello PB Photography Manager 1! I am interested in inquiring about event dates and pricing.')
  const waMsgManager2 = encodeURIComponent('Hello PB Photography Manager 2! I want to check session availability.')

  return (
    <PageTransition>
      <div className="contact-page">
        
        {/* Page Header */}
        <section className="page-header bg-dots-pattern">
          <div className="container">
            <motion.span className="hero-eyebrow-tag">✦ DIRECT OFFICE CONNECT</motion.span>
            <motion.h1 className="cormorant">Contact PB Photography</motion.h1>
            <motion.p className="subtitle">
              Call our managers directly, chat instantly on WhatsApp, or visit our office location in Vijayawada.
            </motion.p>
          </div>
        </section>

        {/* OFFICE HEADQUARTERS LOCATION & DIRECT DIALPAD CARD */}
        <section className="section contact-hero-section">
          <div className="container">
            <div className="glass-card studio-location-master-card">
              <span className="hero-eyebrow-tag">✦ OFFICE HEADQUARTERS</span>
              <h2 className="cormorant card-main-heading">PB Photography Location</h2>

              {/* Information Grid */}
              <div className="hq-info-grid">
                <div className="hq-item">
                  <span className="hq-icon">📍</span>
                  <div>
                    <strong>OFFICE ADDRESS</strong>
                    <p>Hotel Raj Towers, Vijayawada, Andhra Pradesh, India</p>
                  </div>
                </div>

                <div className="hq-item">
                  <span className="hq-icon">⏰</span>
                  <div>
                    <strong>WORKING HOURS</strong>
                    <p>9:00 AM – 9:00 PM (Monday to Sunday)</p>
                  </div>
                </div>

                <div className="hq-item">
                  <span className="hq-icon">✉️</span>
                  <div>
                    <strong>OFFICIAL EMAIL</strong>
                    <p><a href="mailto:pbphotography0032@gmail.com">pbphotography0032@gmail.com</a></p>
                  </div>
                </div>
              </div>

              {/* DUAL MANAGER DIRECT DIALPAD & WHATSAPP ACTIONS */}
              <div className="manager-action-cards-grid">
                
                {/* Manager 1 Card */}
                <div className="manager-card glass-card">
                  <div className="manager-header">
                    <span className="mgr-badge">MANAGER 1</span>
                    <strong className="mgr-name">+91 96425 34945</strong>
                  </div>
                  <div className="mgr-buttons">
                    <a href="tel:+919642534945" className="action-btn call-btn">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                      </svg>
                      <span>DIRECT CALL</span>
                    </a>
                    <a 
                      href={`https://wa.me/919642534945?text=${waMsgManager1}`} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="action-btn whatsapp-action-btn"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.299.433 2.504 1.164 3.474l-.765 2.794 2.871-.753c.937.608 2.052.951 3.245.951 3.182 0 5.768-2.586 5.768-5.766 0-3.18-2.586-5.766-5.767-5.766zm3.385 8.165c-.144.405-.837.774-1.17.825-.312.048-.717.073-2.034-.471-1.684-.694-2.759-2.42-2.843-2.532-.084-.112-.686-.913-.686-1.742 0-.829.434-1.237.587-1.405.153-.168.334-.21.446-.21.112 0 .224.001.321.006.102.005.241-.039.377.288.144.346.49 1.196.533 1.284.043.088.072.191.014.305-.058.114-.087.185-.173.286-.086.101-.182.226-.26.303-.087.086-.178.181-.077.355.101.174.449.741.964 1.201.662.591 1.221.774 1.395.86.174.086.276.072.378-.043.102-.115.438-.511.554-.687.116-.176.232-.147.391-.088.159.059 1.011.477 1.184.564.173.087.289.13.332.202.043.072.043.418-.101.823z"/>
                      </svg>
                      <span>WHATSAPP</span>
                    </a>
                  </div>
                </div>

                {/* Manager 2 Card */}
                <div className="manager-card glass-card">
                  <div className="manager-header">
                    <span className="mgr-badge">MANAGER 2</span>
                    <strong className="mgr-name">+91 80083 60032</strong>
                  </div>
                  <div className="mgr-buttons">
                    <a href="tel:+918008360032" className="action-btn call-btn">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                      </svg>
                      <span>DIRECT CALL</span>
                    </a>
                    <a 
                      href={`https://wa.me/918008360032?text=${waMsgManager2}`} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="action-btn whatsapp-action-btn"
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.299.433 2.504 1.164 3.474l-.765 2.794 2.871-.753c.937.608 2.052.951 3.245.951 3.182 0 5.768-2.586 5.768-5.766 0-3.18-2.586-5.766-5.767-5.766zm3.385 8.165c-.144.405-.837.774-1.17.825-.312.048-.717.073-2.034-.471-1.684-.694-2.759-2.42-2.843-2.532-.084-.112-.686-.913-.686-1.742 0-.829.434-1.237.587-1.405.153-.168.334-.21.446-.21.112 0 .224.001.321.006.102.005.241-.039.377.288.144.346.49 1.196.533 1.284.043.088.072.191.014.305-.058.114-.087.185-.173.286-.086.101-.182.226-.26.303-.087.086-.178.181-.077.355.101.174.449.741.964 1.201.662.591 1.221.774 1.395.86.174.086.276.072.378-.043.102-.115.438-.511.554-.687.116-.176.232-.147.391-.088.159.059 1.011.477 1.184.564.173.087.289.13.332.202.043.072.043.418-.101.823z"/>
                      </svg>
                      <span>WHATSAPP</span>
                    </a>
                  </div>
                </div>

              </div>

              {/* OFFICIAL INSTAGRAM & YOUTUBE BRAND BUTTONS */}
              <div className="social-action-buttons-row">
                <a 
                  href="https://instagram.com/pbphotography0032" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="brand-btn insta-brand-btn"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span>FOLLOW @pbphotography0032</span>
                </a>

                <a 
                  href="https://www.youtube.com/@PBphotography32" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="brand-btn yt-brand-btn"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                  <span>SUBSCRIBE @PBphotography32</span>
                </a>
              </div>

              {/* GOOGLE MAP EMBED */}
              <div className="map-embed-box">
                <iframe 
                  title="PB Photography Office Location Map" 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3825.263884841961!2d80.6275!3d16.51!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35ef0000000000%3A0x0!2zMTbCsDMwJzM2LjAiTiA4MMKwMzcnMzkuMCJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                  width="100%" 
                  height="380" 
                  style={{ border: 0, borderRadius: '14px' }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

            </div>
          </div>
        </section>

      </div>
    </PageTransition>
  )
}

import { Link } from 'react-router-dom'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand-section">
            <Link to="/" className="brand footer-brand">
              <div className="pb-studio-logo-box">
                <span className="logo-spark">✦</span>
                <div className="logo-text-group">
                  <span className="logo-main cormorant">PB PHOTOGRAPHY</span>
                  <span className="logo-tagline">LUXURY PHOTOGRAPHY & CINEMA</span>
                </div>
              </div>
            </Link>
            <p className="footer-tagline cormorant">"Crafting Timeless Stories Through Photography & Cinema"</p>
            <p className="footer-desc">
              Preserving sacred wedding heritage, candid emotions, and 4K cinematic films for luxury clients.
            </p>
            <div className="footer-social-links">
              <a href="https://instagram.com/pbphotography0032" target="_blank" rel="noopener noreferrer">Instagram ↗</a>
              <span>•</span>
              <a href="https://www.youtube.com/@PBphotography32" target="_blank" rel="noopener noreferrer">YouTube Channel ↗</a>
              <span>•</span>
              <a href="https://wa.me/919642534945" target="_blank" rel="noopener noreferrer">WhatsApp Manager 1 ↗</a>
              <span>•</span>
              <a href="https://wa.me/918008360032" target="_blank" rel="noopener noreferrer">WhatsApp Manager 2 ↗</a>
            </div>
          </div>

          <div className="footer-links-section">
            <h4>Quick Explorer</h4>
            <ul>
              <li><Link to="/about">About PB Photography</Link></li>
              <li><Link to="/services">Luxury Services</Link></li>
              <li><Link to="/gallery">Master Portfolio</Link></li>
              <li><Link to="/testimonials">Client Reviews</Link></li>
              <li><Link to="/admin">Executive CRM</Link></li>
            </ul>
          </div>

          <div className="footer-links-section">
            <h4>Client Care</h4>
            <ul>
              <li><Link to="/booking">Book Your Shoot</Link></li>
              <li><Link to="/pricing">Pricing Packages</Link></li>
              <li><Link to="/faq">FAQs</Link></li>
              <li><Link to="/booking">Reserve Session</Link></li>
            </ul>
          </div>

          <div className="footer-contact-section">
            <h4>Office Location</h4>
            <address className="footer-address">
              <p>📍 PB Photography, Hotel Raj Towers, Vijayawada, AP, India</p>
              <p>⏰ Working Hours: 9:00 AM – 9:00 PM (Mon – Sun)</p>
              <p className="footer-tel">📞 Manager 1: <a href="tel:+919642534945">+91 96425 34945</a></p>
              <p className="footer-tel">📞 Manager 2: <a href="tel:+918008360032">+91 80083 60032</a></p>
              <p className="footer-email">✉ <a href="mailto:pbphotography0032@gmail.com">pbphotography0032@gmail.com</a></p>
            </address>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 PB PHOTOGRAPHY. Crafting Timeless Stories Through Photography & Cinema.</p>
          <div className="footer-bottom-links">
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/terms">Terms & Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

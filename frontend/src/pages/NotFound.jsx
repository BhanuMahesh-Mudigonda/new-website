import { Link } from 'react-router-dom'
import './NotFound.css'

export default function NotFound() {
  return (
    <div className="notfound-container">
      <div className="notfound-overlay"></div>
      <div className="notfound-content">
        <span className="notfound-icon">📷</span>
        <h1 className="cormorant">404</h1>
        <h2 className="cormorant">Frame Out Of Focus</h2>
        <p>The page you are looking for has been moved, archived, or is currently exposure-corrected out of existence.</p>
        <div className="notfound-actions">
          <Link to="/" className="button">
            Back to Home
          </Link>
          <Link to="/gallery" className="button button-outline">
            View Gallery
          </Link>
        </div>
      </div>
    </div>
  )
}

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { appointmentService } from '../services/api'
import { PageTransition } from '../components/MotionWrapper'
import './AdminDashboard.css'

export default function AdminDashboard() {
  const [bookings, setBookings] = useState([])
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterEvent, setFilterEvent] = useState('All')
  const [activeTab, setActiveTab] = useState('leads')

  const fetchDashboardData = async () => {
    try {
      const res = await appointmentService.getAll()
      setBookings(res.data || [])
      
      // Fetch notifications
      const notifRes = await fetch('/api/notifications')
      if (notifRes.ok) {
        const notifData = await notifRes.json()
        setNotifications(notifData || [])
      }
    } catch (err) {
      console.error('Failed to load dashboard data:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchDashboardData()
    const interval = setInterval(fetchDashboardData, 10000) // Poll every 10s for real-time updates
    return () => clearInterval(interval)
  }, [])

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await appointmentService.updateStatus(id, { status: newStatus })
      fetchDashboardData()
    } catch (err) {
      alert('Failed to update status')
    }
  }

  const handleAlbumStatusUpdate = async (id, newAlbumStatus) => {
    try {
      await appointmentService.updateStatus(id, { albumStatus: newAlbumStatus })
      fetchDashboardData()
    } catch (err) {
      alert('Failed to update album status')
    }
  }

  const handleMarkNotifRead = async (id) => {
    try {
      await fetch(`/api/notifications/${id}/read`, { method: 'PUT' })
      setNotifications(notifications.map(n => n._id === id ? { ...n, read: true } : n))
    } catch (err) {
      console.error(err)
    }
  }

  const downloadPdfRecord = (booking) => {
    const content = `
==================================================
PB PHOTOGRAPHY — OFFICIAL BOOKING RECORD
==================================================

Client Name: ${booking.name}
Phone: ${booking.phone}
Email: ${booking.email}
Event Type: ${booking.eventType}
Event Date: ${booking.preferredDate || booking.eventDate}
Venue / Location: ${booking.location || booking.venue || 'N/A'}
Budget Range: ${booking.budgetRange || booking.budget || 'N/A'}
Guest Count: ${booking.guestCount || 'N/A'}
Photography Style: ${booking.photographyStyle || 'Candid'}
Selected Package: ${booking.selectedPackage || 'Standard'}
Status: ${booking.status}
Album Status: ${booking.albumStatus || 'Not Started'}
Message: ${booking.message || 'None'}
Submission Time: ${new Date(booking.createdAt).toLocaleString()}
--------------------------------------------------
Manager 1: +91 9642534945
Manager 2: +91 8008360032
Email: pbphotography0032@gmail.com
==================================================
`
    const element = document.createElement('a')
    const file = new Blob([content], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = `PB_Photography_Booking_${booking.name.replace(/\s+/g, '_')}.txt`
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  // Filter & Search Logic
  const filteredBookings = bookings.filter(item => {
    const matchesSearch = 
      item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phone?.includes(searchQuery) ||
      item.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.location?.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesEvent = filterEvent === 'All' || item.eventType === filterEvent
    return matchesSearch && matchesEvent
  })

  // Dashboard Stats Calculations
  const totalLeads = bookings.length
  const newLeads = bookings.filter(b => b.status === 'New Lead').length
  const confirmedLeads = bookings.filter(b => b.status === 'Confirmed').length
  const completedShoots = bookings.filter(b => b.status === 'Completed').length
  const unreadNotifs = notifications.filter(n => !n.read)

  return (
    <PageTransition>
      <div className="admin-dashboard-page bg-dots-pattern">
        
        {/* Header Bar */}
        <header className="admin-dashboard-header">
          <div className="container header-flex">
            <div>
              <span className="hero-eyebrow-tag">✦ EXECUTIVE DASHBOARD</span>
              <h1 className="cormorant admin-title">PB Photography CRM</h1>
            </div>

            <div className="admin-header-actions">
              <button onClick={fetchDashboardData} className="refresh-btn">
                🔄 Refresh Live
              </button>
              <div className="notif-badge-box">
                🔔 <span className="notif-count">{unreadNotifs.length}</span>
              </div>
            </div>
          </div>
        </header>

        <main className="container section">

          {/* REAL TIME NOTIFICATION BANNER */}
          <AnimatePresence>
            {unreadNotifs.length > 0 && (
              <motion.div 
                initial={{ opacity: 0, y: -15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="realtime-notification-banner glass-card"
              >
                <div className="notif-banner-header">
                  <h3>🔴 Real-Time Booking Alerts ({unreadNotifs.length} Unread)</h3>
                </div>

                <div className="notif-items-list">
                  {unreadNotifs.slice(0, 3).map((notif) => {
                    const cleanPhone = (notif.phone || '').replace(/\D/g, '')
                    return (
                      <div key={notif._id} className="notif-alert-card">
                        <div className="notif-details">
                          <strong className="notif-name">{notif.customerName}</strong>
                          <span className="notif-meta">📞 {notif.phone} • 💍 {notif.eventType}</span>
                        </div>
                        <div className="notif-actions">
                          <a href={`tel:+91${cleanPhone}`} className="action-btn call">📞 Call</a>
                          <a href={`https://wa.me/91${cleanPhone}`} target="_blank" rel="noreferrer" className="action-btn wa">💬 WhatsApp</a>
                          <a href={`mailto:${notif.email}`} className="action-btn mail">📧 Email</a>
                          <button onClick={() => handleMarkNotifRead(notif._id)} className="action-btn dismiss">✓ Mark Read</button>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* METRICS CARDS (5 COLUMNS) */}
          <div className="metrics-grid">
            <div className="metric-card glass-card">
              <span className="metric-icon">📊</span>
              <strong className="metric-val cormorant">{totalLeads}</strong>
              <span className="metric-label">Total Inquiries</span>
            </div>

            <div className="metric-card glass-card gold-border">
              <span className="metric-icon">🔴</span>
              <strong className="metric-val text-gold cormorant">{newLeads}</strong>
              <span className="metric-label">Pending Leads</span>
            </div>

            <div className="metric-card glass-card">
              <span className="metric-icon">📅</span>
              <strong className="metric-val cormorant">{confirmedLeads}</strong>
              <span className="metric-label">Confirmed Events</span>
            </div>

            <div className="metric-card glass-card">
              <span className="metric-icon">📸</span>
              <strong className="metric-val cormorant">{completedShoots}</strong>
              <span className="metric-label">Completed Shoots</span>
            </div>

            <div className="metric-card glass-card">
              <span className="metric-icon">📖</span>
              <strong className="metric-val cormorant">
                {bookings.filter(b => b.albumStatus === 'Delivered').length}
              </strong>
              <span className="metric-label">Albums Delivered</span>
            </div>
          </div>

          {/* SEARCH & FILTER CONTROLS */}
          <div className="dashboard-controls-row glass-card">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input 
                type="text" 
                placeholder="Search by customer name, phone, email, or venue..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="filter-box">
              <label>Filter Event:</label>
              <select value={filterEvent} onChange={(e) => setFilterEvent(e.target.value)}>
                <option value="All">All Events</option>
                <option value="Wedding">Wedding</option>
                <option value="Pre Wedding">Pre Wedding</option>
                <option value="Reception">Reception</option>
                <option value="Haldi">Haldi</option>
                <option value="Mehendi">Mehendi</option>
                <option value="Baby Shoot">Baby Shoot</option>
                <option value="Corporate">Corporate</option>
                <option value="Destination Wedding">Destination Wedding</option>
              </select>
            </div>
          </div>

          {/* BOOKINGS LEADS TABLE */}
          <div className="leads-table-container glass-card">
            <h2 className="cormorant section-title-inner">
              Client Reservations & Inquiries ({filteredBookings.length})
            </h2>

            {loading ? (
              <p className="loading-text">Loading client inquiries...</p>
            ) : filteredBookings.length === 0 ? (
              <p className="empty-text">No booking records found matching search query.</p>
            ) : (
              <div className="table-responsive">
                <table className="crm-table">
                  <thead>
                    <tr>
                      <th>CUSTOMER</th>
                      <th>EVENT DETAILS</th>
                      <th>VENUE & BUDGET</th>
                      <th>STATUS</th>
                      <th>ALBUM TRACKER</th>
                      <th>ACTIONS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredBookings.map((b) => {
                      const cleanPhone = (b.phone || '').replace(/\D/g, '')
                      return (
                        <tr key={b._id}>
                          {/* Customer Details */}
                          <td>
                            <strong className="cust-name">{b.name}</strong>
                            <div className="cust-meta">
                              <span>📞 {b.phone}</span>
                              <span>✉️ {b.email}</span>
                            </div>
                          </td>

                          {/* Event Details */}
                          <td>
                            <span className="event-badge">{b.eventType}</span>
                            <div className="event-date">📅 {b.preferredDate || b.eventDate}</div>
                            {b.selectedPackage && <div className="pkg-tag">📦 {b.selectedPackage}</div>}
                          </td>

                          {/* Venue & Budget */}
                          <td>
                            <div className="venue-name">📍 {b.location || b.venue || 'Vijayawada'}</div>
                            <div className="budget-tag">💰 {b.budgetRange || b.budget || 'N/A'}</div>
                          </td>

                          {/* Status & Toggle */}
                          <td>
                            <select 
                              value={b.status} 
                              onChange={(e) => handleStatusUpdate(b._id, e.target.value)}
                              className={`status-select ${b.status.toLowerCase().replace(/\s+/g, '-')}`}
                            >
                              <option value="New Lead">🔴 New Lead</option>
                              <option value="Contacted">🟡 Contacted</option>
                              <option value="Confirmed">🟢 Confirmed</option>
                              <option value="Completed">🏆 Completed</option>
                              <option value="Cancelled">❌ Cancelled</option>
                            </select>
                          </td>

                          {/* Album Tracker */}
                          <td>
                            <select 
                              value={b.albumStatus || 'Not Started'} 
                              onChange={(e) => handleAlbumStatusUpdate(b._id, e.target.value)}
                              className="album-select"
                            >
                              <option value="Not Started">⏳ Not Started</option>
                              <option value="Designing">🎨 Designing</option>
                              <option value="In Print">🖨️ In Print</option>
                              <option value="Delivered">📖 Delivered</option>
                            </select>
                          </td>

                          {/* Action Buttons */}
                          <td>
                            <div className="table-actions-cell">
                              <a href={`tel:+91${cleanPhone}`} title="Call Customer" className="icon-btn call">📞</a>
                              <a href={`https://wa.me/91${cleanPhone}`} target="_blank" rel="noreferrer" title="WhatsApp Customer" className="icon-btn wa">💬</a>
                              <a href={`mailto:${b.email}`} title="Reply Email" className="icon-btn mail">📧</a>
                              <button onClick={() => downloadPdfRecord(b)} title="Download PDF Record" className="icon-btn pdf">📄</button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </main>
      </div>
    </PageTransition>
  )
}

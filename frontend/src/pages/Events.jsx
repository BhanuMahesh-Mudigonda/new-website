import { useEffect, useState } from 'react'
import { useReveal } from '../hooks/useReveal'
import { eventsService } from '../services/api'
import './Events.css'

export default function Events() {
  const ref = useReveal()
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const res = await eventsService.getAll()
        setEvents(res.data)
      } catch (error) {
        console.error('Error loading events:', error)
      } finally {
        setLoading(false)
      }
    }
    loadEvents()
  }, [])

  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>Upcoming Events</h1>
          <p>Join us for photography celebrations</p>
        </div>
      </section>

      <section className="section events-list">
        <div className="container">
          {!loading && events.length > 0 ? (
            <div className="events-grid">
              {events.map((event) => (
                <div key={event._id} className="event-card reveal" ref={ref}>
                  <div className="event-date">
                    <span className="month">{new Date(event.date).toLocaleString('default', { month: 'short' })}</span>
                    <span className="day">{new Date(event.date).getDate()}</span>
                  </div>
                  <div className="event-content">
                    <h3>{event.title}</h3>
                    <p className="event-type">{event.type}</p>
                    <p className="event-description">{event.description}</p>
                    <p className="event-location">📍 {event.location}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="events-empty">
              <p>{loading ? 'Loading events...' : 'No upcoming events'}</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

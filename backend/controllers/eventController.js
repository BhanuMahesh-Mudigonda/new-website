import Event from '../models/Event.js'
import { isOffline, getOfflineData, insertOfflineDocument, saveOfflineData } from '../utils/offlineDb.js'

export const createEvent = async (req, res) => {
  try {
    const { title, date, type, location, description, image } = req.body

    if (!title || !date || !type || !location) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    if (isOffline()) {
      const offlineDoc = insertOfflineDocument('events', {
        title,
        date,
        type,
        location,
        description: description || '',
        image: image || ''
      })
      return res.status(201).json(offlineDoc)
    }

    const event = new Event({
      title,
      date,
      type,
      location,
      description,
      image,
    })

    await event.save()
    res.status(201).json(event)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getEvents = async (req, res) => {
  try {
    if (isOffline()) {
      const events = getOfflineData('events')
      return res.json(events)
    }
    const events = await Event.find().sort({ date: 1 })
    res.json(events)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getEventById = async (req, res) => {
  try {
    const { id } = req.params
    if (isOffline()) {
      const events = getOfflineData('events')
      const event = events.find(e => e._id === id)
      if (!event) {
        return res.status(404).json({ error: 'Event not found' })
      }
      return res.json(event)
    }
    const event = await Event.findById(id)
    if (!event) {
      return res.status(404).json({ error: 'Event not found' })
    }
    res.json(event)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const updateEvent = async (req, res) => {
  try {
    const { id } = req.params
    if (isOffline()) {
      const events = getOfflineData('events')
      const idx = events.findIndex(e => e._id === id)
      if (idx === -1) {
        return res.status(404).json({ error: 'Event not found' })
      }
      events[idx] = { ...events[idx], ...req.body, updatedAt: new Date().toISOString() }
      saveOfflineData('events', events)
      return res.json(events[idx])
    }
    const event = await Event.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!event) {
      return res.status(404).json({ error: 'Event not found' })
    }
    res.json(event)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params
    if (isOffline()) {
      const events = getOfflineData('events')
      const filtered = events.filter(e => e._id !== id)
      if (events.length === filtered.length) {
        return res.status(404).json({ error: 'Event not found' })
      }
      saveOfflineData('events', filtered)
      return res.json({ message: 'Event deleted successfully' })
    }
    const event = await Event.findByIdAndDelete(id)
    if (!event) {
      return res.status(404).json({ error: 'Event not found' })
    }
    res.json({ message: 'Event deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

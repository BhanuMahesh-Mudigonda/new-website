import express from 'express'
import Notification from '../models/Notification.js'
import Booking from '../models/Booking.js'
import Customer from '../models/Customer.js'

const router = express.Router()

// Get all notifications
router.get('/', async (req, res) => {
  try {
    const notifications = await Notification.find().sort({ createdAt: -1 }).limit(50)
    res.json(notifications)
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch notifications' })
  }
})

// Mark notification as read
router.put('/:id/read', async (req, res) => {
  try {
    const notif = await Notification.findByIdAndUpdate(req.params.id, { read: true }, { new: true })
    res.json(notif)
  } catch (err) {
    res.status(500).json({ error: 'Failed to update notification' })
  }
})

// Dashboard Stats endpoint
router.get('/stats', async (req, res) => {
  try {
    const totalBookings = await Booking.countDocuments()
    const newLeads = await Booking.countDocuments({ status: 'New Lead' })
    const confirmed = await Booking.countDocuments({ status: 'Confirmed' })
    const completed = await Booking.countDocuments({ status: 'Completed' })
    const customersCount = await Customer.countDocuments()
    const unreadNotifs = await Notification.countDocuments({ read: false })

    res.json({
      totalBookings,
      newLeads,
      confirmed,
      completed,
      customersCount,
      unreadNotifs
    })
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch stats' })
  }
})

export default router

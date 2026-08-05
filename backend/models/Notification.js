import mongoose from 'mongoose'

const notificationSchema = new mongoose.Schema({
  type: { type: String, default: 'NEW_BOOKING' },
  title: { type: String, default: '🔴 New Booking' },
  customerName: { type: String },
  phone: { type: String },
  email: { type: String },
  eventType: { type: String },
  message: { type: String },
  bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking' },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.models.Notification || mongoose.model('Notification', notificationSchema)

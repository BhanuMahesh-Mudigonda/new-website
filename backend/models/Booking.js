import mongoose from 'mongoose'

const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  eventType: { type: String, required: true },
  preferredDate: { type: String, required: true },
  eventDate: { type: String },
  location: { type: String, default: 'Vijayawada' },
  venue: { type: String },
  budgetRange: { type: String },
  budget: { type: String },
  guestCount: { type: String },
  specialRequirements: { type: String },
  photographyStyle: { type: String },
  selectedPackage: { type: String },
  message: { type: String },
  ipAddress: { type: String },
  status: { 
    type: String, 
    enum: ['New Lead', 'Contacted', 'Confirmed', 'Completed', 'Cancelled'],
    default: 'New Lead' 
  },
  albumStatus: { 
    type: String, 
    enum: ['Not Started', 'Designing', 'In Print', 'Delivered'], 
    default: 'Not Started' 
  },
  paymentStatus: { 
    type: String, 
    enum: ['Pending', 'Advance Paid', 'Fully Paid'], 
    default: 'Pending' 
  },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.models.Booking || mongoose.model('Booking', bookingSchema)

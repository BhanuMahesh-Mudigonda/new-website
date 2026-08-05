import mongoose from 'mongoose'

const customerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  location: { type: String },
  totalBookings: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.models.Customer || mongoose.model('Customer', customerSchema)

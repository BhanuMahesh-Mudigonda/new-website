import mongoose from 'mongoose'

const contactRequestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  subject: { type: String },
  message: { type: String, required: true },
  ipAddress: { type: String },
  status: { type: String, default: 'New Lead' },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.models.ContactRequest || mongoose.model('ContactRequest', contactRequestSchema)

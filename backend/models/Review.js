import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  eventDate: { type: String },
  rating: { type: Number, default: 5 },
  quote: { type: String, required: true },
  image: { type: String },
  approved: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.models.Review || mongoose.model('Review', reviewSchema)

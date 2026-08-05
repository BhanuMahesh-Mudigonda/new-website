import mongoose from 'mongoose'

const packageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  desc: { type: String },
  eventType: { type: String, default: 'Wedding' },
  features: [{ type: String }]
})

export default mongoose.models.Package || mongoose.model('Package', packageSchema)

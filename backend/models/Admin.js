import mongoose from 'mongoose'

const adminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, default: 'PB Photography Admin' },
  role: { type: String, default: 'Super Admin' },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.models.Admin || mongoose.model('Admin', adminSchema)

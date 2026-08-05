import mongoose from 'mongoose'

const albumSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    coverImage: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    photoCount: {
      type: Number,
      default: 0,
    },
    photos: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
)

export default mongoose.model('Album', albumSchema)

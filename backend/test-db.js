import './config/env.js'
import mongoose from 'mongoose'

async function testConnection() {
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/pb-photography'
  console.log('Testing MongoDB connection to:', uri.replace(/:[^:@]+@/, ':****@'))
  try {
    await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 })
    console.log('✓ MongoDB Atlas CONNECTED SUCCESSFULLY!')
    await mongoose.disconnect()
    process.exit(0)
  } catch (err) {
    console.error('✗ MongoDB Atlas Connection Failed:', err.message)
    console.log('Note: Local DB fallback handles data persistence.')
    process.exit(1)
  }
}

testConnection()

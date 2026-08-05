import './config/env.js'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'
import appointmentRoutes from './routes/appointments.js'
import contactRoutes from './routes/contact.js'
import galleryRoutes from './routes/gallery.js'
import servicesRoutes from './routes/services.js'
import eventsRoutes from './routes/events.js'
import albumsRoutes from './routes/albums.js'
import aiRoutes from './routes/ai.js'
import notificationRoutes from './routes/notifications.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 5000
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/pb-photography'

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Database Connection
mongoose.connect(MONGODB_URI, {
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
})
  .then(() => console.log('✓ MongoDB connected successfully'))
  .catch((err) => {
    console.error('✗ MongoDB connection error:', err.message)
    console.log('⚠️  Running in offline mode - API will queue requests until DB connects')
  })

// API Routes
app.use('/api/appointments', appointmentRoutes)
app.use('/api/contact', contactRoutes)
app.use('/api/gallery', galleryRoutes)
app.use('/api/services', servicesRoutes)
app.use('/api/events', eventsRoutes)
app.use('/api/albums', albumsRoutes)
app.use('/api/ai', aiRoutes)
app.use('/api/notifications', notificationRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' })
})

// Static Assets Serving for Production (Frontend React Dist)
const publicPath = path.join(__dirname, 'public')
const distPath = path.join(__dirname, '../frontend/dist')

if (fs.existsSync(publicPath)) {
  app.use(express.static(publicPath))
}
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath))
}

// Fallback all non-API GET requests to React App index.html
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) {
    return next()
  }
  
  const publicIndex = path.join(publicPath, 'index.html')
  const distIndex = path.join(distPath, 'index.html')

  if (fs.existsSync(publicIndex)) {
    return res.sendFile(publicIndex)
  }
  if (fs.existsSync(distIndex)) {
    return res.sendFile(distIndex)
  }

  res.status(404).json({ error: 'Frontend build not found. Please run npm run build in frontend directory.' })
})

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Internal server error' })
})

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`)
})

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`⚠️ Port ${PORT} is currently in use by another running server instance.`)
    console.log(`💡 Your PB Photography API is already active at http://localhost:${PORT}`)
    process.exit(1)
  } else {
    console.error('Server startup error:', err)
  }
})

// Graceful shutdown
process.once('SIGUSR2', () => {
  server.close(() => {
    process.kill(process.pid, 'SIGUSR2')
  })
})

process.on('SIGINT', () => {
  server.close(() => {
    process.exit(0)
  })
})

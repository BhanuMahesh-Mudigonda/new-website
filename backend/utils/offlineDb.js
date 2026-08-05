import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import mongoose from 'mongoose'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const DB_FILE_PATH = path.join(__dirname, '../data/local_db.json')

// Ensure directory and file exist
const ensureDbExists = () => {
  const dir = path.dirname(DB_FILE_PATH)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  if (!fs.existsSync(DB_FILE_PATH)) {
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify({
      services: [],
      gallery: [],
      events: [],
      albums: [],
      appointments: [],
      contacts: []
    }, null, 2))
  }
}

export const isOffline = () => {
  return mongoose.connection.readyState !== 1
}

export const getOfflineData = (collection) => {
  ensureDbExists()
  try {
    const raw = fs.readFileSync(DB_FILE_PATH, 'utf8')
    const db = JSON.parse(raw)
    return db[collection] || []
  } catch (error) {
    console.error(`Error reading offline collection ${collection}:`, error)
    return []
  }
}

export const saveOfflineData = (collection, data) => {
  ensureDbExists()
  try {
    const raw = fs.readFileSync(DB_FILE_PATH, 'utf8')
    const db = JSON.parse(raw)
    db[collection] = data
    fs.writeFileSync(DB_FILE_PATH, JSON.stringify(db, null, 2))
    return true
  } catch (error) {
    console.error(`Error saving offline collection ${collection}:`, error)
    return false
  }
}

export const insertOfflineDocument = (collection, doc) => {
  ensureDbExists()
  const data = getOfflineData(collection)
  const newDoc = {
    _id: new mongoose.Types.ObjectId().toString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    ...doc
  }
  data.push(newDoc)
  saveOfflineData(collection, data)
  return newDoc
}

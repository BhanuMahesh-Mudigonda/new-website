import Album from '../models/Album.js'
import { isOffline, getOfflineData, insertOfflineDocument, saveOfflineData } from '../utils/offlineDb.js'

export const getAlbums = async (req, res) => {
  try {
    if (isOffline()) {
      const albums = getOfflineData('albums')
      return res.json(albums)
    }
    const albums = await Album.find().sort({ date: -1 })
    res.json(albums)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getAlbumById = async (req, res) => {
  try {
    const { id } = req.params
    if (isOffline()) {
      const albums = getOfflineData('albums')
      const album = albums.find(a => a._id === id)
      if (!album) {
        return res.status(404).json({ error: 'Album not found' })
      }
      return res.json(album)
    }
    const album = await Album.findById(id)
    if (!album) {
      return res.status(404).json({ error: 'Album not found' })
    }
    res.json(album)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const createAlbum = async (req, res) => {
  try {
    const { title, description, coverImage, date, photoCount, photos } = req.body

    if (!title || !coverImage) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    if (isOffline()) {
      const offlineDoc = insertOfflineDocument('albums', {
        title,
        description: description || '',
        coverImage,
        date: date || new Date().toISOString(),
        photoCount: photoCount || 0,
        photos: photos || []
      })
      return res.status(201).json(offlineDoc)
    }

    const album = new Album({
      title,
      description,
      coverImage,
      date,
      photoCount,
      photos,
    })

    await album.save()
    res.status(201).json(album)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const updateAlbum = async (req, res) => {
  try {
    const { id } = req.params
    if (isOffline()) {
      const albums = getOfflineData('albums')
      const idx = albums.findIndex(a => a._id === id)
      if (idx === -1) {
        return res.status(404).json({ error: 'Album not found' })
      }
      albums[idx] = { ...albums[idx], ...req.body, updatedAt: new Date().toISOString() }
      saveOfflineData('albums', albums)
      return res.json(albums[idx])
    }
    const album = await Album.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!album) {
      return res.status(404).json({ error: 'Album not found' })
    }
    res.json(album)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const deleteAlbum = async (req, res) => {
  try {
    const { id } = req.params
    if (isOffline()) {
      const albums = getOfflineData('albums')
      const filtered = albums.filter(a => a._id !== id)
      if (albums.length === filtered.length) {
        return res.status(404).json({ error: 'Album not found' })
      }
      saveOfflineData('albums', filtered)
      return res.json({ message: 'Album deleted successfully' })
    }
    const album = await Album.findByIdAndDelete(id)
    if (!album) {
      return res.status(404).json({ error: 'Album not found' })
    }
    res.json({ message: 'Album deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

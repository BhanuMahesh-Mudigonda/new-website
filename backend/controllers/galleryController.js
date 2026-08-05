import Gallery from '../models/Gallery.js'
import { isOffline, getOfflineData, insertOfflineDocument, saveOfflineData } from '../utils/offlineDb.js'

export const createGalleryItem = async (req, res) => {
  try {
    const { title, image, category, description, featured } = req.body

    if (!title || !image || !category) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    if (isOffline()) {
      const offlineDoc = insertOfflineDocument('gallery', {
        title,
        image,
        category,
        description: description || '',
        featured: featured || false
      })
      return res.status(201).json(offlineDoc)
    }

    const galleryItem = new Gallery({
      title,
      image,
      category,
      description,
      featured,
    })

    await galleryItem.save()
    res.status(201).json(galleryItem)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getGalleryItems = async (req, res) => {
  try {
    if (isOffline()) {
      const gallery = getOfflineData('gallery')
      return res.json(gallery)
    }
    const galleryItems = await Gallery.find().sort({ createdAt: -1 })
    res.json(galleryItems)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getGalleryItemById = async (req, res) => {
  try {
    const { id } = req.params
    if (isOffline()) {
      const gallery = getOfflineData('gallery')
      const item = gallery.find(g => g._id === id)
      if (!item) {
        return res.status(404).json({ error: 'Gallery item not found' })
      }
      return res.json(item)
    }
    const galleryItem = await Gallery.findById(id)
    if (!galleryItem) {
      return res.status(404).json({ error: 'Gallery item not found' })
    }
    res.json(galleryItem)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const deleteGalleryItem = async (req, res) => {
  try {
    const { id } = req.params
    if (isOffline()) {
      const gallery = getOfflineData('gallery')
      const filtered = gallery.filter(g => g._id !== id)
      if (gallery.length === filtered.length) {
        return res.status(404).json({ error: 'Gallery item not found' })
      }
      saveOfflineData('gallery', filtered)
      return res.json({ message: 'Gallery item deleted successfully' })
    }
    const galleryItem = await Gallery.findByIdAndDelete(id)
    if (!galleryItem) {
      return res.status(404).json({ error: 'Gallery item not found' })
    }
    res.json({ message: 'Gallery item deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

import Service from '../models/Service.js'
import { isOffline, getOfflineData, insertOfflineDocument, saveOfflineData } from '../utils/offlineDb.js'

export const createService = async (req, res) => {
  try {
    const { name, description, price, duration, features } = req.body

    if (!name || !description || !price || !duration) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    if (isOffline()) {
      const offlineDoc = insertOfflineDocument('services', {
        name,
        description,
        price,
        duration,
        features: features || []
      })
      return res.status(201).json(offlineDoc)
    }

    const service = new Service({
      name,
      description,
      price,
      duration,
      features,
    })

    await service.save()
    res.status(201).json(service)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getServices = async (req, res) => {
  try {
    if (isOffline()) {
      const services = getOfflineData('services')
      return res.json(services)
    }
    const services = await Service.find().sort({ createdAt: -1 })
    res.json(services)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getServiceById = async (req, res) => {
  try {
    const { id } = req.params
    if (isOffline()) {
      const services = getOfflineData('services')
      const service = services.find(s => s._id === id)
      if (!service) {
        return res.status(404).json({ error: 'Service not found' })
      }
      return res.json(service)
    }
    const service = await Service.findById(id)
    if (!service) {
      return res.status(404).json({ error: 'Service not found' })
    }
    res.json(service)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const updateService = async (req, res) => {
  try {
    const { id } = req.params
    if (isOffline()) {
      const services = getOfflineData('services')
      const idx = services.findIndex(s => s._id === id)
      if (idx === -1) {
        return res.status(404).json({ error: 'Service not found' })
      }
      services[idx] = { ...services[idx], ...req.body, updatedAt: new Date().toISOString() }
      saveOfflineData('services', services)
      return res.json(services[idx])
    }
    const service = await Service.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    )
    if (!service) {
      return res.status(404).json({ error: 'Service not found' })
    }
    res.json(service)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const deleteService = async (req, res) => {
  try {
    const { id } = req.params
    if (isOffline()) {
      const services = getOfflineData('services')
      const filtered = services.filter(s => s._id !== id)
      if (services.length === filtered.length) {
        return res.status(404).json({ error: 'Service not found' })
      }
      saveOfflineData('services', filtered)
      return res.json({ message: 'Service deleted successfully' })
    }
    const service = await Service.findByIdAndDelete(id)
    if (!service) {
      return res.status(404).json({ error: 'Service not found' })
    }
    res.json({ message: 'Service deleted successfully' })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

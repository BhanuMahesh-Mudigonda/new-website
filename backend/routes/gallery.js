import express from 'express'
import * as galleryController from '../controllers/galleryController.js'

const router = express.Router()

router.post('/', galleryController.createGalleryItem)
router.get('/', galleryController.getGalleryItems)
router.get('/:id', galleryController.getGalleryItemById)
router.delete('/:id', galleryController.deleteGalleryItem)

export default router

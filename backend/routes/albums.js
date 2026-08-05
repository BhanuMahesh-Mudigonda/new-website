import express from 'express'
import * as albumController from '../controllers/albumController.js'

const router = express.Router()

router.post('/', albumController.createAlbum)
router.get('/', albumController.getAlbums)
router.get('/:id', albumController.getAlbumById)
router.put('/:id', albumController.updateAlbum)
router.delete('/:id', albumController.deleteAlbum)

export default router

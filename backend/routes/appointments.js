import express from 'express'
import {
  createAppointment,
  getAllAppointments,
  updateAppointmentStatus,
  deleteAppointment
} from '../controllers/appointmentController.js'

const router = express.Router()

router.post('/', createAppointment)
router.get('/', getAllAppointments)
router.put('/:id', updateAppointmentStatus)
router.delete('/:id', deleteAppointment)

export default router

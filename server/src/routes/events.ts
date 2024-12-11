import { Router } from 'express'
import {
  createEvent,
  getEvents,
  updateEvent,
  deleteEvent,
} from '../controllers/event.js'
import { auth } from '../middleware/auth.js'

const router = Router()

router.post('/', auth, createEvent)
router.get('/', getEvents)
router.patch('/:id', auth, updateEvent)
router.delete('/:id', auth, deleteEvent)

export default router

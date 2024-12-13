import { Router } from 'express'
import {
  createEvent,
  getAllEvents,
  getMosqueEvents,
  updateEvent,
  deleteEvent,
} from '../controllers/event.js'
import { auth } from '../middleware/auth.js'
import { validateMosqueOwnership } from '../middleware/validateMosqueOwnership.js'

const router = Router()

router.get('/', getAllEvents)
router.get('/all', getAllEvents)
router.get('/mosque/:mosqueId', getMosqueEvents)
router.post('/mosque/:mosqueId', [auth, validateMosqueOwnership], createEvent)
router.patch(
  '/mosque/:mosqueId/event/:eventId',
  [auth, validateMosqueOwnership],
  updateEvent
)
router.delete(
  '/mosque/:mosqueId/event/:eventId',
  [auth, validateMosqueOwnership],
  deleteEvent
)

export default router

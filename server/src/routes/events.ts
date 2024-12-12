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
router.get('/:mosqueId', getMosqueEvents)
router.post('/:mosqueId', [auth, validateMosqueOwnership], createEvent)
router.patch('/:mosqueId', [auth, validateMosqueOwnership], updateEvent)
router.delete('/:mosqueId', [auth, validateMosqueOwnership], deleteEvent)

export default router

import { Router } from 'express'
import {
  getAdminMosques,
  createMosque,
  updatePrayerTimes,
  createEvent,
  getAllEvents,
  updateEvent,
  deleteEvent,
} from '../controllers/Admins.js'
import { auth } from '../middleware/auth.js'
import { validateMosqueOwnership } from '../middleware/validateMosqueOwnership.js'

const router = Router()

// Mosque Management
router.get('/mosques', auth, getAdminMosques)
router.post('/mosques', auth, createMosque)
router.patch(
  '/mosques/:id/prayer-times',
  auth,
  validateMosqueOwnership,
  updatePrayerTimes
)

// Event Management
router.post(
  '/mosques/:mosqueId/events',
  auth,
  validateMosqueOwnership,
  createEvent
)
router.get(
  '/mosques/:mosqueId/events',
  auth,
  validateMosqueOwnership,
  getAllEvents
)
router.patch(
  '/mosques/:mosqueId/events/:eventId',
  auth,
  validateMosqueOwnership,
  updateEvent
)
router.delete(
  '/mosques/:mosqueId/events/:eventId',
  auth,
  validateMosqueOwnership,
  deleteEvent
)

export default router

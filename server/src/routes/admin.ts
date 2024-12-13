import { Router } from 'express'
import {
  getAdminMosques,
  createMosque,
  updatePrayerTimes,
} from '../controllers/Admins.js'
import { auth } from '../middleware/auth.js'

const router = Router()

router.get('/mosques', auth, getAdminMosques)
router.post('/mosques', auth, createMosque)
router.patch('/mosques/:id/prayer-times', auth, updatePrayerTimes)

export default router

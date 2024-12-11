import { Router } from 'express'
import {
  createMosque,
  getMosque,
  updatePrayerTimes,
  getAllMosques,
} from '../controllers/mosque.js'
import { auth } from '../middleware/auth.js'

const router = Router()

router.post('/', auth, createMosque)
router.get('/:id', getMosque)
router.patch('/:id/prayer-times', auth, updatePrayerTimes)
router.get('/', getAllMosques)

export default router

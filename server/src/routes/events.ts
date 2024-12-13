import { Router } from 'express'
import { getAllEvents, getMosqueEvents } from '../controllers/event.js'
import { auth } from '../middleware/auth.js'
import { validateMosqueOwnership } from '../middleware/validateMosqueOwnership.js'

const router = Router()

router.get('/', getAllEvents)
router.get('/all', getAllEvents)
router.get('/mosque/:mosqueId', getMosqueEvents)
export default router

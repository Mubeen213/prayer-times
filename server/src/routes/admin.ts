import { Router } from 'express'
import { createAdmin } from '../controllers/Admins.js'
import { auth } from '../middleware/auth.js'

const router = Router()

router.post('/', createAdmin)
export default router

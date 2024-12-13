import { Router } from 'express'
import { getMosque, getAllMosques } from '../controllers/mosque.js'

const router = Router()

router.get('/:id', getMosque)
router.get('/', getAllMosques)

export default router

import { NextFunction, Response } from 'express'
import { Event } from '../models/Event.js'
import { Mosque } from '../models/Mosque.js'
import { AuthRequest } from '../types/inputs.js'

export const validateEventAccess = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { eventId, mosqueId }: { eventId: string; mosqueId: string } =
      req.body

    if (!eventId || !mosqueId) {
      res.status(400).json({ error: 'Event ID and Mosque ID are required' })
      return
    }

    const mosque = await Mosque.findOne({
      _id: mosqueId,
      adminId: req.admin?.id,
    })

    if (!mosque) {
      res.status(403).json({ error: 'Unauthorized access to this mosque' })
      return
    }

    const event = await Event.findOne({
      _id: eventId,
      mosqueId,
    })

    if (!event) {
      res.status(404).json({ error: 'Event not found' })
      return
    }
    next()
  } catch (error) {
    res.status(500).json({ error: 'Error validating access' })
  }
}

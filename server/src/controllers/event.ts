import { Request, Response } from 'express'
import { Event, EventDocument } from '../models/Event.js'

interface AuthRequest extends Request {
  admin?: {
    id: string
    mosqueId: string
  }
}

const getTwoHoursAgo = () => {
  const date = new Date()
  date.setHours(date.getHours() - 2)
  return date
}

export const getAllEvents = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const twoHoursAgo = getTwoHoursAgo()
    const today = twoHoursAgo.toISOString().split('T')[0]
    const bufferTime = twoHoursAgo.toLocaleTimeString('en-US', {
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
    })

    const events = await Event.find({
      $or: [
        { date: { $gt: today } },
        {
          date: today,
          time: { $gte: bufferTime },
        },
      ],
    })
      .populate('mosque', 'name location')
      .lean()
      .sort({ date: 1, time: 1 })
      .limit(30)

    res.json(events)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching all events' })
  }
}

export const getMosqueEvents = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { mosqueId } = req.params
    const twoHoursAgo = getTwoHoursAgo()
    const today = twoHoursAgo.toISOString().split('T')[0]
    const bufferTime = twoHoursAgo.toLocaleTimeString('en-US', {
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
    })

    const events = await Event.find({
      mosqueId,
      $or: [
        { date: { $gt: today } },
        {
          date: today,
          time: { $gte: bufferTime },
        },
      ],
    })
      .select('title description date time scholar')
      .lean()
      .sort({ date: 1, time: 1 })
      .limit(30)

    res.json(events)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching mosque events' })
  }
}

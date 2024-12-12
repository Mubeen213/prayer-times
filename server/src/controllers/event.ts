import { Request, Response } from 'express'
import { Event, EventDocument } from '../models/Event.js'
import { Admin } from '../models/Admin.js'

interface AuthRequest extends Request {
  admin?: {
    id: string
    mosqueId: string
  }
}

interface EventBody {
  title: string
  scholar: string
  description: string
  date: string
  time: string
}

interface UpdateEventBody extends Partial<EventBody> {
  eventId: string
}

const getTwoHoursAgo = () => {
  const date = new Date()
  date.setHours(date.getHours() - 2)
  return date
}

export const createEvent = async (
  req: AuthRequest & { body: EventBody },
  res: Response
): Promise<void> => {
  try {
    const event = new Event({
      ...req.body,
      mosqueId: req.admin?.mosqueId,
    })
    await event.save()
    res.status(201).json(event)
  } catch (error) {
    console.error('Event creation error:', error)
    res.status(500).json({ error: 'Error creating event' })
  }
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
export const updateEvent = async (
  req: AuthRequest & { body: UpdateEventBody },
  res: Response
): Promise<void> => {
  try {
    const { eventId, ...updateData } = req.body
    const { mosqueId } = req.params
    console.log('updateEventData', updateData)

    const event = await Event.findOne({
      _id: eventId,
      mosqueId,
    })

    if (!event) {
      res.status(404).json({ error: 'Event not found or unauthorized' })
      return
    }

    Object.assign(event, updateData)
    await event.save()
    res.json(event)
  } catch (error) {
    res.status(500).json({ error: 'Error updating event' })
  }
}

export const deleteEvent = async (
  req: AuthRequest & { body: { eventId: string } },
  res: Response
): Promise<void> => {
  try {
    const { eventId } = req.body
    const { mosqueId } = req.params

    const event = await Event.findOneAndDelete({
      _id: eventId,
      mosqueId,
    })

    if (!event) {
      res.status(404).json({ error: 'Event not found or unauthorized' })
      return
    }

    res.status(204).send()
  } catch (error) {
    console.log('Error deleting event:', error)
    res.status(500).json({ error: 'Error deleting event' })
  }
}

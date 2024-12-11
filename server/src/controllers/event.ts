import { Request, Response } from 'express'
import { Event } from '../models/Event.js'

interface AuthRequest extends Request {
  admin?: {
    id: string
    mosqueId: string
  }
}

interface EventBody {
  title: string
  description: string
  date: string
  time: string
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
    res.status(500).json({ error: 'Error creating event' })
  }
}

export const getEvents = async (req: Request, res: Response): Promise<void> => {
  try {
    const { mosqueId } = req.query
    const events = await Event.find({
      ...(mosqueId && { mosqueId }),
    }).sort({ date: 1, time: 1 })
    res.json(events)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching events' })
  }
}

export const updateEvent = async (
  req: AuthRequest & { body: Partial<EventBody> },
  res: Response
): Promise<void> => {
  try {
    const event = await Event.findOne({
      _id: req.params.id,
      mosqueId: req.admin?.mosqueId,
    })
    // check if the user is authorized to update the event
    // user has mosqueId in it add that validations

    if (!event) {
      res.status(404).json({ error: 'Event not found or unauthorized' })
      return
    }

    Object.assign(event, req.body)
    await event.save()
    res.json(event)
  } catch (error) {
    res.status(500).json({ error: 'Error updating event' })
  }
}

export const deleteEvent = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const event = await Event.findOneAndDelete({
      _id: req.params.id,
      mosqueId: req.admin?.mosqueId,
    })

    if (!event) {
      res.status(404).json({ error: 'Event not found or unauthorized' })
      return
    }

    res.status(204).send()
  } catch (error) {
    res.status(500).json({ error: 'Error deleting event' })
  }
}

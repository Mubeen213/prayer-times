import { Request, Response } from 'express'
import { Admin } from '../models/Admin.js'
import { Event } from '../models/Event.js'
import { Mosque } from '../models/Mosque.js'
import mongoose from 'mongoose'
import {
  CreateAdminBody,
  CreateMosqueBody,
  UpdateEventBody,
  EventBody,
} from '../types/inputs.js'

interface AuthRequest extends Request {
  admin?: {
    id: string
  }
}

export const createAdminAndMosque = async (
  req: Request<{}, {}, CreateAdminBody>,
  res: Response
): Promise<void> => {
  try {
    const { username, password, mosqueName, mosqueLocation, prayerTimings } =
      req.body

    // Check if admin exists
    let admin = await Admin.findOne({ username })
    if (admin) {
      console.log('Admin already exists, creating mosque only')
    } else {
      admin = new Admin({
        username,
        password,
      })
      await admin.save()
    }

    // Create mosque
    const mosque = new Mosque({
      name: mosqueName,
      adminId: admin._id,
      location: mosqueLocation,
      prayerTimings,
    })
    await mosque.save()

    res.status(201).json({
      message: 'Admin and mosque created successfully',
      admin: {
        id: admin._id,
        username: admin.username,
      },
      mosque: {
        id: mosque._id,
        name: mosque.name,
      },
    })
  } catch (error) {
    console.error('Admin creation error:', error)
    res.status(500).json({ error: 'Error creating admin and mosque' })
  }
}

export const createMosque = async (
  req: AuthRequest & { body: CreateMosqueBody },
  res: Response
): Promise<void> => {
  try {
    const mosque = new Mosque({
      ...req.body,
      adminId: req.admin?.id,
    })
    await mosque.save()
    res.status(201).json(mosque)
  } catch (error) {
    console.error('Mosque creation error:', error)
    res.status(500).json({ error: 'Error creating mosque' })
  }
}

export const getAdminMosques = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.admin?.id) {
      res.status(401).json({ error: 'Admin ID not found' })
      return
    }

    const mosques = await Mosque.find({
      adminId: new mongoose.Types.ObjectId(req.admin.id),
    })
      .select('name location prayerTimings')
      .sort({ createdAt: -1 })

    res.json(mosques)
  } catch (error) {
    console.error('Fetch admin mosques error:', error)
    res.status(500).json({ error: 'Error fetching mosques' })
  }
}

export const updatePrayerTimes = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const mosque = await Mosque.findOne({
      _id: req.params.id,
      adminId: req.admin?.id,
    })

    if (!mosque) {
      res.status(404).json({ error: 'Mosque not found or unauthorized' })
      return
    }

    mosque.prayerTimings = {
      ...mosque.prayerTimings,
      ...req.body.prayerTimings,
    }

    await mosque.save()
    res.json(mosque)
  } catch (error) {
    console.error('Update prayer times error:', error)
    res.status(500).json({ error: 'Error updating prayer times' })
  }
}

// Events controller

export const createEvent = async (
  req: AuthRequest & { body: EventBody },
  res: Response
): Promise<void> => {
  try {
    const { mosqueId } = req.params
    const event = new Event({
      ...req.body,
      mosqueId,
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
    const { mosqueId } = req.params
    const events = await Event.find({ mosqueId })
      .populate('mosque', 'name location')
      .lean()
      .sort({ date: -1, time: -1 })
      .limit(30)
    res.json(events)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching all events' })
  }
}

export const updateEvent = async (
  req: AuthRequest & { body: UpdateEventBody },
  res: Response
): Promise<void> => {
  try {
    const { ...updateData } = req.body
    const { mosqueId, eventId } = req.params
    console.log('updateEventData', updateData)
    console.log('eventId', eventId)
    console.log('mosqueId', mosqueId)
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
    const { eventId } = req.params
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

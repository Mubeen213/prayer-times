import { Request, Response } from 'express'
import { Mosque } from '../models/Mosque.js'

interface AuthRequest extends Request {
  admin?: {
    id: string
    mosqueId: string
  }
}

interface CreateMosqueBody {
  name: string
  location: {
    address: string
    landmark?: string
    city: string
    state: string
  }
  prayerTimings: {
    fajr: {
      adhan: string // "05:30 AM"
      jamaat: string // "05:45 AM"
    }
    dhuhr: {
      adhan: string
      jamaat: string
    }
    asr: {
      adhan: string
      jamaat: string
    }
    maghrib: {
      adhan: string
      jamaat: string
    }
    isha: {
      adhan: string
      jamaat: string
    }
    juma?: {
      adhan: string
      jamaat: string
    }
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
    res.status(500).json({ error: 'Error creating mosque' })
  }
}

export const getMosque = async (req: Request, res: Response): Promise<void> => {
  try {
    const mosque = await Mosque.findById(req.params.id)
    if (!mosque) {
      res.status(404).json({ error: 'Mosque not found' })
      return
    }
    res.json(mosque)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching mosque' })
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
    res.status(500).json({ error: 'Error updating prayer times' })
  }
}

export const getAllMosques = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const mosques = await Mosque.find(
      {},
      {
        name: 1,
        location: 1,
        prayerTimings: 1,
      }
    )
    res.json(mosques)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching mosques' })
  }
}

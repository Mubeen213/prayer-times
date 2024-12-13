import { Request, Response } from 'express'
import { Admin } from '../models/Admin.js'
import { Mosque } from '../models/Mosque.js'
import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'
import { CreateAdminBody, CreateMosqueBody } from '../types/inputs.js'

interface AuthRequest extends Request {
  admin?: {
    id: string
  }
}

export const createAdmin = async (
  req: Request<{}, {}, CreateAdminBody>,
  res: Response
): Promise<void> => {
  try {
    const { username, password, mosqueName, mosqueLocation, prayerTimings } =
      req.body

    // Check if admin exists
    const existingAdmin = await Admin.findOne({ username })
    if (existingAdmin) {
      res.status(400).json({ error: 'Username already exists' })
      return
    }

    const admin = new Admin({
      username,
      password,
    })
    await admin.save()

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

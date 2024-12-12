import { Request, Response } from 'express'
import { Admin } from '../models/Admin.js'
import { Mosque } from '../models/Mosque.js'
import bcrypt from 'bcryptjs'

interface CreateAdminBody {
  username: string
  password: string
  mosqueName: string
  mosqueLocation: {
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

    // Create mosque
    const mosque = new Mosque({
      name: mosqueName,
      location: mosqueLocation,
      prayerTimings,
    })
    await mosque.save()

    // Create admin
    const admin = new Admin({
      username,
      password,
      mosqueId: mosque._id,
    })
    await admin.save()

    res.status(201).json({
      message: 'Admin and mosque created successfully',
      admin: {
        id: admin._id,
        username: admin.username,
        mosqueId: admin.mosqueId,
      },
    })
  } catch (error) {
    console.error('Admin creation error:', error)
    res.status(500).json({ error: 'Error creating admin and mosque' })
  }
}

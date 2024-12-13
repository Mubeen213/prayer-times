import { Request, Response } from 'express'
import mongoose from 'mongoose'
import { Mosque } from '../models/Mosque.js'
import { MosqueQueryParams } from '../types/query.js'
interface AuthRequest extends Request {
  admin?: {
    id: string
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
    console.error('Fetch mosque error:', error)
    res.status(500).json({ error: 'Error fetching mosque' })
  }
}

export const getAllMosques = async (
  req: Request<{}, {}, {}, MosqueQueryParams>,
  res: Response
): Promise<void> => {
  try {
    const page = parseInt(req.query.page || '1')
    const limit = Math.min(parseInt(req.query.limit || '10'), 50)
    const skip = (page - 1) * limit

    const query: any = {}

    // Search by location or name
    if (req.query.search) {
      query.$or = [
        { name: { $regex: req.query.search, $options: 'i' } },
        { 'location.address': { $regex: req.query.search, $options: 'i' } },
        { 'location.landmark': { $regex: req.query.search, $options: 'i' } },
        { 'location.city': { $regex: req.query.search, $options: 'i' } },
      ]
    }

    const [mosques, total] = await Promise.all([
      Mosque.find(query)
        .select('name location prayerTimings')
        .sort({ name: 1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Mosque.countDocuments(query),
    ])

    res.json({
      mosques,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error('Mosque fetch error:', error)
    res.status(500).json({ error: 'Error fetching mosques' })
  }
}

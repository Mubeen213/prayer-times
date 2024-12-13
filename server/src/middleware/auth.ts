import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { Admin } from '../models/Admin.js'

interface AuthRequest extends Request {
  admin?: {
    id: string
    username: string
  }
}

export const auth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '')

    if (!token) {
      throw new Error()
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string
    }

    // Fetch admin details and attach to request
    const admin = await Admin.findById(decoded.id)
    if (!admin) {
      throw new Error()
    }

    req.admin = {
      id: admin._id.toString(),
      username: admin.username,
    }
    next()
  } catch (error) {
    res.status(401).json({ error: 'Please authenticate' })
  }
}

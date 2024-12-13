import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import { Admin } from '../models/Admin.js'
import { generateToken } from '../utils/jwt.js'

interface LoginRequest extends Request {
  body: {
    username: string
    password: string
  }
}

export const login = async (
  req: LoginRequest,
  res: Response
): Promise<void> => {
  try {
    const { username, password } = req.body

    const admin = await Admin.findOne({ username })
    if (!admin) {
      res.status(401).json({ error: 'Invalid credentials' })
      return
    }

    const isMatch = await bcrypt.compare(password, admin.password)
    if (!isMatch) {
      res.status(401).json({ error: 'Invalid credentials' })
      return
    }

    const token = generateToken({
      id: admin._id.toString(),
      adminId: admin._id.toString(),
    })

    res.json({ token })
  } catch (error) {
    res.status(500).json({ error: 'Server error' })
  }
}

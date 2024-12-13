import jwt from 'jsonwebtoken'

export const generateToken = (payload: { id: string; adminId: string }) => {
  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '7d' })
}

import { Request, Response, NextFunction } from 'express'
import { Mosque } from '../models/Mosque.js'
interface AuthRequest extends Request {
  admin?: {
    id: string
    mosqueId: string
  }
}

export const validateMosqueOwnership = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const mosque = await Mosque.findOne({
      _id: req.params.mosqueId,
      adminId: req.admin?.id,
    })

    if (!mosque) {
      res.status(403).json({ error: 'Unauthorized access to this mosque' })
      return
    }
    next()
  } catch (error) {
    res.status(500).json({ error: 'Error validating mosque ownership' })
  }
}

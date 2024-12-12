import { Request, Response, NextFunction } from 'express'

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
    console.log('req.admin', req.admin)
    console.log('req.params', req.params)
    if (req.admin?.mosqueId !== req.params.mosqueId) {
      res.status(403).json({ error: 'Unauthorized access to this mosque' })
      return
    }
    next()
  } catch (error) {
    res.status(500).json({ error: 'Error validating mosque ownership' })
  }
}

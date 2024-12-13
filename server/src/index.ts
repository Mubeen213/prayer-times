import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { connectDB } from './config/db.js'
import authRoutes from './routes/auth.js'
import mosqueRoutes from './routes/mosque.js'
import eventRoutes from './routes/events.js'
import adminRoutes from './routes/admin.js'

const app = express()
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/admin', adminRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/mosques', mosqueRoutes)
app.use('/api/events', eventRoutes)

const PORT = process.env.PORT || 5001

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
})

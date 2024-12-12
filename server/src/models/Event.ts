import mongoose, { Types } from 'mongoose'

export interface EventDocument extends Document {
  title: string
  scholar?: string
  description: string
  date: string
  time: string
  mosqueId: Types.ObjectId
  mosque?: {
    name: string
    location: {
      address: string
      landmark?: string
      city: string
      state: string
    }
  }
}

const eventSchema = new mongoose.Schema(
  {
    mosqueId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Mosque',
      required: true,
    },
    title: { type: String, required: true },
    scholar: { type: String, required: false },
    description: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
  },
  { timestamps: true }
)

eventSchema.virtual('mosque', {
  ref: 'Mosque',
  localField: 'mosqueId',
  foreignField: '_id',
  justOne: true,
})
eventSchema.index({ mosqueId: 1, date: 1, time: 1 })

export const Event = mongoose.model('Event', eventSchema)

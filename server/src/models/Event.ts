import mongoose from 'mongoose'

const eventSchema = new mongoose.Schema(
  {
    mosqueId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Mosque',
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
  },
  { timestamps: true }
)

export const Event = mongoose.model('Event', eventSchema)

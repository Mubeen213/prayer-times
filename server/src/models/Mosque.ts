import mongoose, { Document } from 'mongoose'

interface PrayerTime {
  adhan: string
  jamaat: string
}

interface PrayerTimings {
  fajr: PrayerTime
  dhuhr: PrayerTime
  asr: PrayerTime
  maghrib: PrayerTime
  isha: PrayerTime
  juma?: PrayerTime
}

interface IMosque extends Document {
  name: string
  location: {
    address: string
    landmark?: string
    city: string
    state: string
  }
  prayerTimings: PrayerTimings
}

const prayerTimeSchema = new mongoose.Schema(
  {
    adhan: { type: String, required: true },
    jamaat: { type: String, required: true },
  },
  { _id: false }
)

const mosqueSchema = new mongoose.Schema<IMosque>(
  {
    name: { type: String, required: true },
    location: {
      address: { type: String, required: true },
      landmark: String,
      city: { type: String, required: true },
      state: { type: String, required: true },
    },
    prayerTimings: {
      fajr: { type: prayerTimeSchema, required: true },
      dhuhr: { type: prayerTimeSchema, required: true },
      asr: { type: prayerTimeSchema, required: true },
      maghrib: { type: prayerTimeSchema, required: true },
      isha: { type: prayerTimeSchema, required: true },
      juma: { type: prayerTimeSchema, required: false },
    },
  },
  { timestamps: true }
)

mosqueSchema.index({
  'location.address': 'text',
  'location.landmark': 'text',
  'location.city': 'text',
})

mosqueSchema.index({ name: 'text' })

mosqueSchema.pre('save', function (next) {
  const timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9]\s(AM|PM)$/
  const timings = this.prayerTimings as PrayerTimings

  try {
    ;(Object.entries(timings) as [keyof PrayerTimings, PrayerTime][]).forEach(
      ([prayer, times]) => {
        if (prayer === 'juma' && !times) {
          return
        }

        if (!times || typeof times !== 'object') {
          throw new Error(`Missing prayer times for ${prayer}`)
        }

        if (!timeRegex.test(times.adhan)) {
          throw new Error(`Invalid adhan time format for ${prayer}`)
        }

        if (!timeRegex.test(times.jamaat)) {
          throw new Error(`Invalid jamaat time format for ${prayer}`)
        }
      }
    )
    next()
  } catch (error) {
    next(error as Error)
  }
})

export const Mosque = mongoose.model<IMosque>('Mosque', mosqueSchema)

import mongoose from 'mongoose'
interface PrayerTime {
  adhan: string // 12-hour format e.g. "05:30 AM"
  jamaat: string // 12-hour format e.g. "05:45 AM"
}

const mosqueSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    location: {
      address: { type: String, required: true },
      landmark: String,
      city: { type: String, required: true },
      state: { type: String, required: true },
    },
    prayerTimings: {
      fajr: { type: String, required: true },
      dhuhr: { type: String, required: true },
      asr: { type: String, required: true },
      maghrib: { type: String, required: true },
      isha: { type: String, required: true },
      juma: String,
    },
  },
  { timestamps: true }
)

export const Mosque = mongoose.model('Mosque', mosqueSchema)

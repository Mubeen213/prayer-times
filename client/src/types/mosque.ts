export type PrayerName = 'fajr' | 'dhuhr' | 'asr' | 'maghrib' | 'isha' | 'juma'

export interface PrayerTime {
  adhan: string
  jamaat: string
}

export interface PrayerTimings {
  fajr: PrayerTime
  dhuhr: PrayerTime
  asr: PrayerTime
  maghrib: PrayerTime
  isha: PrayerTime
  juma?: PrayerTime
}
export interface Mosque {
  _id: string
  name: string
  location: {
    address: string
    landmark?: string
    city: string
    state: string
  }
  prayerTimings: {
    fajr: { adhan: string; jamaat: string }
    dhuhr: { adhan: string; jamaat: string }
    asr: { adhan: string; jamaat: string }
    maghrib: { adhan: string; jamaat: string }
    isha: { adhan: string; jamaat: string }
    juma?: { adhan: string; jamaat: string }
  }
}

export interface MosquesResponse {
  mosques: Mosque[]
  pagination: {
    total: number
    page: number
    limit: number
    pages: number
  }
}

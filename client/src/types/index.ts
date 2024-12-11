export interface Mosque {
  id: string
  name: string
  location: {
    address: string
    landmark: string
    city: string
    state: string
    country: string
  }
  prayerTimings: {
    fajr: string
    dhuhr: string
    asr: string
    maghrib: string
    isha: string
    juma?: string
  }
}

export interface Event {
  id: string
  mosqueId: string
  title: string
  description: string
  date: string
  time?: string
  type: 'ANNOUNCEMENT' | 'EVENT'
}

export interface User {
  id: string
  username: string
  role: 'SUPER_ADMIN' | 'ADMIN' | 'USER'
  mosqueId?: string
}

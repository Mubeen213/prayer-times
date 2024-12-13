export interface CreateAdminBody {
  username: string
  password: string
  mosqueName: string
  mosqueLocation: {
    address: string
    landmark?: string
    city: string
    state: string
  }
  prayerTimings: {
    fajr: {
      adhan: string // "05:30 AM"
      jamaat: string // "05:45 AM"
    }
    dhuhr: {
      adhan: string
      jamaat: string
    }
    asr: {
      adhan: string
      jamaat: string
    }
    maghrib: {
      adhan: string
      jamaat: string
    }
    isha: {
      adhan: string
      jamaat: string
    }
    juma?: {
      adhan: string
      jamaat: string
    }
  }
}

export interface CreateMosqueBody {
  name: string
  adminId: string
  location: {
    address: string
    landmark?: string
    city: string
    state: string
  }
  prayerTimings: {
    fajr: {
      adhan: string // "05:30 AM"
      jamaat: string // "05:45 AM"
    }
    dhuhr: {
      adhan: string
      jamaat: string
    }
    asr: {
      adhan: string
      jamaat: string
    }
    maghrib: {
      adhan: string
      jamaat: string
    }
    isha: {
      adhan: string
      jamaat: string
    }
    juma?: {
      adhan: string
      jamaat: string
    }
  }
}

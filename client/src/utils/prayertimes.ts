// src/utils/prayertimes.ts
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

export const getNextPrayer = (prayerTimings: PrayerTimings) => {
  const now = new Date()
  const currentTime = now.getHours() * 60 + now.getMinutes()

  const prayers = Object.entries(prayerTimings)
    .filter(([name]) => name !== 'juma')
    .map(([name, times]) => {
      // Convert 12-hour format to minutes
      const convertTimeToMinutes = (time: string) => {
        const [timeStr, period] = time.split(' ')
        const [hours, minutes] = timeStr.split(':').map(Number)
        let totalMinutes = hours * 60 + minutes

        if (period === 'PM' && hours !== 12) {
          totalMinutes += 12 * 60
        }
        if (period === 'AM' && hours === 12) {
          totalMinutes -= 12 * 60
        }

        return totalMinutes
      }

      const adhanMinutes = convertTimeToMinutes(times.adhan)
      const jamaatMinutes = convertTimeToMinutes(times.jamaat)

      return {
        name,
        adhan: times.adhan,
        jamaat: times.jamaat,
        adhanMinutes,
        jamaatMinutes,
      }
    })
    .sort((a, b) => a.adhanMinutes - b.adhanMinutes)

  const nextPrayer =
    prayers.find((prayer) => prayer.adhanMinutes > currentTime) || prayers[0]

  return {
    name: nextPrayer.name,
    adhan: nextPrayer.adhan,
    jamaat: nextPrayer.jamaat,
  }
}

export const convert24to12 = (time24: string) => {
  const [hours, minutes] = time24.split(':')
  const hour = parseInt(hours)
  const ampm = hour >= 12 ? 'PM' : 'AM'
  const hour12 = hour % 12 || 12
  return `${hour12}:${minutes} ${ampm}`
}

export const convert12to24 = (time12: string) => {
  const [time, modifier] = time12.split(' ')
  const [hours, minutes] = time.split(':')
  let hour = parseInt(hours)

  if (modifier === 'PM' && hour !== 12) hour += 12
  if (modifier === 'AM' && hour === 12) hour = 0

  return `${hour.toString().padStart(2, '0')}:${minutes}`
}

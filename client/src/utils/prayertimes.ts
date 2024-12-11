export const getNextPrayer = (prayerTimings: Record<string, string>) => {
  const now = new Date()
  const currentTime = now.getHours() * 60 + now.getMinutes()

  const prayers = Object.entries(prayerTimings)
    .filter(([name]) => name !== 'juma')
    .map(([name, time]) => {
      const [hours, minutes] = time.split(':').map(Number)
      return {
        name,
        time,
        minutes: hours * 60 + minutes,
      }
    })
    .sort((a, b) => a.minutes - b.minutes)

  const nextPrayer =
    prayers.find((prayer) => prayer.minutes > currentTime) || prayers[0]
  return nextPrayer
}

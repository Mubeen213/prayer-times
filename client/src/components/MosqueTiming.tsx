import { Mosque } from '../types/mosque'

interface MosqueTimingProps {
  mosque: Mosque
}

export const MosqueTiming = ({ mosque }: MosqueTimingProps) => {
  return (
    <div className='grid grid-cols-2 sm:grid-cols-5 gap-4'>
      {Object.entries(mosque.prayerTimings).map(([prayer, times]) => (
        <div key={prayer} className='bg-gray-50 p-4 rounded-lg text-center'>
          <div className='text-sm text-gray-500 capitalize'>{prayer}</div>
          <div className='space-y-1'>
            <div className='text-sm'>Adhan: {times.adhan}</div>
            <div className='font-semibold'>Jamaat: {times.jamaat}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

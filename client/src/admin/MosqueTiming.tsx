import { useState, useEffect } from 'react'
import { PrayerTimings } from '../types/mosque'
import { useUpdateTimings } from '../hooks/useUpdateTimings'
import { convert24to12, convert12to24 } from '../utils/prayertimes'

interface TimingManagementProps {
  mosqueId: string
  initialTimings: PrayerTimings
}

export const TimingManagement = ({
  mosqueId,
  initialTimings,
}: TimingManagementProps) => {
  const [timings, setTimings] = useState<PrayerTimings>(initialTimings)
  const { mutate: updateTimings, isPending } = useUpdateTimings(mosqueId)

  useEffect(() => {
    setTimings(initialTimings)
  }, [initialTimings])

  const handleTimeChange = (
    prayer: keyof PrayerTimings,
    type: 'adhan' | 'jamaat',
    value24: string
  ) => {
    const value12 = convert24to12(value24)
    setTimings((prev) => ({
      ...prev,
      [prayer]: {
        ...prev[prayer],
        [type]: value12,
      },
    }))
  }

  const handleSubmit = () => {
    updateTimings(timings)
  }

  return (
    <div className='space-y-6'>
      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {Object.entries(timings).map(([prayer, times]) => (
          <div key={prayer} className='bg-gray-50 p-4 rounded-lg'>
            <label className='block text-sm font-medium text-gray-700 capitalize mb-2'>
              {prayer}
            </label>
            <div className='space-y-3'>
              <div>
                <label className='block text-xs text-gray-500 mb-1'>
                  Adhan
                </label>
                <input
                  type='time'
                  value={convert12to24(times.adhan)}
                  onChange={(e) =>
                    handleTimeChange(
                      prayer as keyof PrayerTimings,
                      'adhan',
                      e.target.value
                    )
                  }
                  className='block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm'
                />
              </div>
              <div>
                <label className='block text-xs text-gray-500 mb-1'>
                  Jamaat
                </label>
                <input
                  type='time'
                  value={convert12to24(times.jamaat)}
                  onChange={(e) =>
                    handleTimeChange(
                      prayer as keyof PrayerTimings,
                      'jamaat',
                      e.target.value
                    )
                  }
                  className='block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm'
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className='flex justify-end'>
        <button
          onClick={handleSubmit}
          disabled={isPending}
          className='px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50'
        >
          {isPending ? 'Updating...' : 'Update Timings'}
        </button>
      </div>
    </div>
  )
}

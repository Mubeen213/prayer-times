import { Link } from 'react-router-dom'
import {
  ClockIcon,
  MapPinIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline'
import { getNextPrayer } from '../utils/prayertimes'

const DUMMY_MOSQUES = [
  {
    id: '1',
    name: 'Zunnurain',
    location: {
      address: '123 Main Street',
      landmark: 'Near City Park',
      city: 'Downtown',
      state: 'State',
    },
    prayerTimings: {
      fajr: '05:30',
      dhuhr: '13:30',
      asr: '15:45',
      maghrib: '19:15',
      isha: '20:45',
      juma: '13:30',
    },
  },
  {
    id: '2',
    name: 'Central Mosque',
    location: {
      address: '123 Main Street',
      landmark: 'Near City Park',
      city: 'Downtown',
      state: 'State',
    },
    prayerTimings: {
      fajr: '05:30',
      dhuhr: '13:30',
      asr: '16:45',
      maghrib: '19:15',
      isha: '20:45',
      juma: '13:30',
    },
  },
]

export const MosqueList = () => {
  return (
    // Remove container class as max-w-7xl already provides constraint
    <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
      {/* Remove extra space character '{' '}' and adjust grid */}
      <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {DUMMY_MOSQUES.map((mosque) => {
          const nextPrayer = getNextPrayer(mosque.prayerTimings)

          return (
            <div
              key={mosque.id}
              className='w-full bg-white rounded-lg shadow-sm hover:shadow-md transition-all group'
            >
              <div className='p-6 space-y-4'>
                <h2 className='text-xl font-semibold text-gray-900 group-hover:text-green-600 transition-colors'>
                  {mosque.name}
                </h2>

                <div className='flex items-start gap-2 text-gray-500'>
                  <MapPinIcon className='w-5 h-5 flex-shrink-0 mt-0.5' />
                  <div className='text-sm space-y-1 flex-1'>
                    <p>{mosque.location.address}</p>
                    <p>{mosque.location.landmark}</p>
                    <p>{mosque.location.city}</p>
                  </div>
                </div>

                <div className='flex items-center gap-2 text-green-600'>
                  <ClockIcon className='w-5 h-5 flex-shrink-0' />
                  <div className='text-sm font-medium'>
                    Next: {nextPrayer.name} {nextPrayer.time}
                  </div>
                </div>

                <Link
                  to={`/mosque/${mosque.id}`}
                  className='inline-flex items-center justify-center w-full px-4 py-2 bg-green-50 text-green-600 rounded-md hover:bg-green-100 transition-colors group'
                >
                  <span className='font-medium'>View Details</span>
                  <ArrowRightIcon className='w-4 h-4 ml-2 transition-transform group-hover:translate-x-1' />
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

import { Mosque } from '../types/mosque'
import {
  ClockIcon,
  MapPinIcon,
  ArrowRightIcon,
} from '@heroicons/react/24/outline'
import { getNextPrayer } from '../utils/prayertimes'
import { Link } from 'react-router-dom'

interface MosqueListProps {
  mosques: Mosque[]
  isLoading: boolean
}

export const MosqueList = ({ mosques, isLoading }: MosqueListProps) => {
  if (isLoading) {
    return (
      <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className='bg-white rounded-lg shadow-sm p-6 animate-pulse'
          >
            <div className='h-6 bg-gray-200 rounded w-3/4 mb-4'></div>
            <div className='space-y-3'>
              <div className='h-4 bg-gray-200 rounded'></div>
              <div className='h-4 bg-gray-200 rounded w-5/6'></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (!mosques.length) {
    return (
      <div className='text-center py-12'>
        <p className='text-gray-500'>No mosques found</p>
      </div>
    )
  }

  return (
    <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
      {mosques.map((mosque) => {
        const nextPrayer = getNextPrayer(mosque.prayerTimings)

        return (
          <div
            key={mosque._id}
            className='bg-white rounded-lg shadow-sm hover:shadow-md transition-all p-6 space-y-4 group'
          >
            <h2 className='text-xl font-semibold text-gray-900 group-hover:text-green-600 transition-colors'>
              {mosque.name}
            </h2>

            <div className='flex items-start gap-2 text-gray-500'>
              <MapPinIcon className='w-5 h-5 flex-shrink-0 mt-0.5' />
              <div className='text-sm space-y-1'>
                <p>{mosque.location.address}</p>
                {mosque.location.landmark && (
                  <p className='text-gray-400'>{mosque.location.landmark}</p>
                )}
                <p>{mosque.location.city}</p>
              </div>
            </div>

            <div className='flex items-center gap-2 text-green-600'>
              <ClockIcon className='w-5 h-5 flex-shrink-0' />
              <div className='text-sm font-medium'>
                <span className='block'>Next: {nextPrayer.name}</span>
                Adhan: {nextPrayer.adhan}, Jamaat: {nextPrayer.jamaat}
              </div>
            </div>

            <Link
              to={`/mosques/${mosque._id}`}
              className='inline-flex items-center justify-center w-full px-4 py-2 bg-green-100 text-green-600 rounded-md hover:bg-green-100 transition-colors group'
            >
              <span className='font-medium'>View Details</span>
              <ArrowRightIcon className='w-4 h-4 ml-2 transition-transform group-hover:translate-x-1' />
            </Link>
          </div>
        )
      })}
    </div>
  )
}

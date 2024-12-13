import { Mosque } from '../types/mosque'
import {
  MapPinIcon,
  ChevronRightIcon,
  ClockIcon,
} from '@heroicons/react/24/outline'
import { useAdminMosque } from '../hooks/useMosques'
import { useNavigate } from 'react-router-dom'

export const MosqueSelection = () => {
  const navigate = useNavigate()
  const { data: mosques, isLoading } = useAdminMosque()

  const handleSelect = (mosque: Mosque) => {
    navigate(`mosque/${mosque._id}`)
  }

  if (isLoading) {
    return (
      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className='animate-pulse bg-white rounded-xl p-6 border border-gray-100'
          >
            <div className='h-6 bg-gray-200 rounded-lg w-3/4 mb-4'></div>
            <div className='space-y-3'>
              <div className='h-4 bg-gray-200 rounded w-full'></div>
              <div className='h-4 bg-gray-200 rounded w-2/3'></div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
      {mosques?.map((mosque: Mosque) => (
        <button
          key={mosque._id}
          onClick={() => handleSelect(mosque)}
          className='bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-green-100 transition-all text-left group relative'
        >
          <div className='space-y-4'>
            <div className='space-y-2'>
              <h3 className='text-xl font-semibold text-gray-900 group-hover:text-green-600 transition-colors'>
                {mosque.name}
              </h3>
              <div className='flex items-start gap-2 text-gray-500'>
                <MapPinIcon className='w-5 h-5 flex-shrink-0 mt-0.5' />
                <div className='text-sm space-y-1'>
                  <p>{mosque.location.address}</p>
                  {mosque.location.landmark && (
                    <p className='text-gray-400'>{mosque.location.landmark}</p>
                  )}
                  <p className='text-gray-400'>{mosque.location.city}</p>
                </div>
              </div>
            </div>

            <div className='flex items-center justify-between pt-4 border-t border-gray-100'>
              <div className='flex items-center text-sm text-gray-500'>
                <ClockIcon className='w-4 h-4 mr-1' />
                <span> Prayer Times</span>
              </div>
              <ChevronRightIcon className='w-5 h-5 text-green-500 transform group-hover:translate-x-1 transition-transform' />
            </div>
          </div>
        </button>
      ))}
    </div>
  )
}

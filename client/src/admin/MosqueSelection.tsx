import { Mosque } from '../types/mosque'

interface MosqueSelectionProps {
  mosques: Mosque[]
  onSelect: (mosque: Mosque) => void
  isLoading?: boolean
}

export const MosqueSelection = ({
  mosques,
  onSelect,
  isLoading,
}: MosqueSelectionProps) => {
  if (isLoading) {
    return (
      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
        {[...Array(3)].map((_, i) => (
          <div key={i} className='animate-pulse bg-white rounded-lg p-6'>
            <div className='h-5 bg-gray-200 rounded w-3/4 mb-3'></div>
            <div className='h-4 bg-gray-200 rounded w-1/2'></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
      {mosques.map((mosque) => (
        <button
          key={mosque._id}
          onClick={() => onSelect(mosque)}
          className='bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-all text-left group'
        >
          <h3 className='text-lg font-semibold text-gray-900 group-hover:text-green-600'>
            {mosque.name}
          </h3>
          <p className='text-sm text-gray-500 mt-1'>
            {mosque.location.address}
          </p>
          <p className='text-sm text-gray-400'>{mosque.location.city}</p>
        </button>
      ))}
    </div>
  )
}

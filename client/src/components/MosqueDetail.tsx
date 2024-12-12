import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useMosque } from '../hooks/useMosques'
import { MosqueTiming } from './MosqueTiming'
import { MosqueEvents } from './MosqueEvents'

export const MosqueDetail = () => {
  const [activeTab, setActiveTab] = useState<'timings' | 'events'>('timings')

  const { id = '' } = useParams<{ id: string }>()
  const { data: mosque, isLoading: isLoadingMosque } = useMosque(id)

  if (isLoadingMosque) {
    return (
      <div className='bg-white rounded-lg shadow-sm p-6 animate-pulse'>
        <div className='h-8 bg-gray-200 rounded w-1/3 mb-4'></div>
        <div className='space-y-2'>
          <div className='h-4 bg-gray-200 rounded w-2/3'></div>
          <div className='h-4 bg-gray-200 rounded w-1/2'></div>
        </div>
      </div>
    )
  }
  if (!mosque) return null

  return (
    <div className='bg-white rounded-lg shadow-sm'>
      {/* Mosque Header */}
      <div className='p-6 border-b'>
        <h1 className='text-2xl font-bold text-gray-900'>{mosque.name}</h1>
        <div className='mt-2 text-gray-500'>
          <p>{mosque.location.address}</p>
          {mosque.location.landmark && (
            <p className='text-sm'>{mosque.location.landmark}</p>
          )}
          <p className='text-sm'>
            {mosque.location.city}, {mosque.location.state}
          </p>
        </div>
      </div>
      {/* Tabs */}
      <div className='border-b'>
        <div className='flex gap-4 px-6'>
          {['timings', 'events'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as 'timings' | 'events')}
              className={`py-4 px-2 border-b-2 text-sm font-medium ${
                activeTab === tab
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <div className='p-6'>
        {activeTab === 'timings' ? (
          <MosqueTiming mosque={mosque} />
        ) : (
          <MosqueEvents mosqueId={id} isVisible={activeTab === 'events'} />
        )}
      </div>
    </div>
  )
}

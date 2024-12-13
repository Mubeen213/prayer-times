import { useState } from 'react'
import { EventManagement } from './EventManagement'
import { useParams } from 'react-router-dom'
import { useMosque } from '../hooks/useMosques'
import { TimingManagement } from './MosqueTiming'
import { useNavigate } from 'react-router-dom'

export const MosqueManagement = () => {
  const [activeTab, setActiveTab] = useState<'timings' | 'events'>('timings')
  const { mosqueId } = useParams()
  const { data: mosque, isLoading } = useMosque(mosqueId!)
  const navigate = useNavigate()
  if (isLoading || !mosque) {
    return <div className='p-6 animate-pulse'>...</div>
  }

  return (
    <div className='space-y-6'>
      {/* Header and Tabs... */}
      <div className='bg-white border-b px-6 py-4'>
        <div className='flex justify-between items-center'>
          <div>
            <button
              onClick={() => navigate('/admin')}
              className='text-sm text-gray-500 hover:text-gray-700'
            >
              ← Back to mosques
            </button>
            <h1 className='text-2xl font-bold text-gray-900 mt-2'>
              {mosque.name}
            </h1>
            <p className='text-gray-500'>{mosque.location.address}</p>
          </div>
        </div>
      </div>

      <div className='bg-white rounded-lg shadow-sm'>
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
            <TimingManagement
              mosqueId={mosque._id}
              initialTimings={mosque.prayerTimings}
            />
          ) : (
            <EventManagement mosqueId={mosque._id} />
          )}
        </div>
      </div>
    </div>
  )
}

import { Mosque } from '../types/mosque'
import { useState } from 'react'
import { EventForm } from './EventForm'

interface MosqueManagementProps {
  mosque: Mosque
  onBack: () => void
}

export const MosqueManagement = ({ mosque, onBack }: MosqueManagementProps) => {
  const [activeTab, setActiveTab] = useState<'timings' | 'events'>('timings')

  return (
    <div className='space-y-6'>
      <div className='flex justify-between items-center'>
        <div>
          <button
            onClick={onBack}
            className='text-sm text-gray-500 hover:text-gray-700 mb-2'
          >
            ← Back to mosques
          </button>
          <h2 className='text-2xl font-bold text-gray-900'>{mosque.name}</h2>
          <p className='text-gray-500'>{mosque.location.address}</p>
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
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
              {Object.entries(mosque.prayerTimings).map(([prayer, times]) => (
                <div key={prayer} className='bg-gray-50 p-4 rounded-lg'>
                  <label className='block text-sm font-medium text-gray-700 capitalize mb-2'>
                    {prayer}
                  </label>
                  <div className='space-y-2'>
                    <input
                      type='time'
                      value={times.adhan}
                      placeholder='Adhan'
                      className='block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm'
                    />
                    <input
                      type='time'
                      value={times.jamaat}
                      placeholder='Jamaat'
                      className='block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm'
                    />
                  </div>
                </div>
              ))}
              <button className='col-span-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700'>
                Update Timings
              </button>
            </div>
          ) : (
            <EventForm mosqueId={mosque._id} />
          )}
        </div>
      </div>
    </div>
  )
}

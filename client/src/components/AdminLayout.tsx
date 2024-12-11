import { useState } from 'react'
import { EventForm } from '../admin/EventForm'

// Dummy data - replace with API call later
const ADMIN_MOSQUE = {
  id: '1',
  name: 'Central Mosque',
  location: {
    address: '123 Main St',
    landmark: 'Near Park',
    city: 'Downtown',
    state: 'State',
  },
  prayerTimings: {
    fajr: '05:30',
    dhuhr: '13:30',
    asr: '16:45',
    maghrib: '19:15',
    isha: '20:45',
  },
}

export const AdminLayout = () => {
  const [activeTab, setActiveTab] = useState<'timings' | 'events'>('timings')

  return (
    <div className=' space-y-6'>
      {/* Mosque Info Header */}
      <div className='bg-white shadow-sm rounded-lg p-6'>
        <h1 className='text-2xl font-bold text-gray-900'>
          {ADMIN_MOSQUE.name}
        </h1>
        <p className='text-gray-500 mt-1'>{ADMIN_MOSQUE.location.address}</p>
      </div>

      {/* Action Tabs */}
      <div className='container mx-auto bg-white shadow-sm rounded-lg'>
        <div className='border-b'>
          <div className='flex gap-4 px-4'>
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

        {/* Content */}
        <div className='p-6'>
          {activeTab === 'timings' ? (
            <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
              {Object.entries(ADMIN_MOSQUE.prayerTimings).map(
                ([prayer, time]) => (
                  <div key={prayer} className='bg-gray-50 p-4 rounded-lg'>
                    <label className='block text-sm font-medium text-gray-700 capitalize'>
                      {prayer}
                    </label>
                    <input
                      type='time'
                      value={time}
                      onChange={(e) => {
                        console.log(e.target.value)
                        // Update prayer time
                      }}
                      className='mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm'
                    />
                  </div>
                )
              )}
              <button className='col-span-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700'>
                Update Timings
              </button>
            </div>
          ) : (
            <EventForm />
          )}
        </div>
      </div>
    </div>
  )
}

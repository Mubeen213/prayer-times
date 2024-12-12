import { Mosque } from '../types'

const DUMMY_MOSQUE: Mosque = {
  id: '1',
  name: 'Central Mosque',
  location: {
    address: '123 Main Street',
    landmark: 'Near City Park',
    city: 'Downtown',
    state: 'State',
    country: 'Country',
  },
  prayerTimings: {
    fajr: '05:30',
    dhuhr: '13:30',
    asr: '16:45',
    maghrib: '19:15',
    isha: '20:45',
    juma: '13:30',
  },
}

export const MosqueDetail = () => {
  return (
    <div className='bg-white rounded-lg shadow-sm'>
      {/* Mosque Header */}
      <div className='p-6 border-b'>
        <h1 className='text-2xl font-bold text-gray-900'>
          {DUMMY_MOSQUE.name}
        </h1>
        <div className='mt-2 text-gray-500'>
          <p>{DUMMY_MOSQUE.location.address}</p>
          <p className='text-sm'>{DUMMY_MOSQUE.location.landmark}</p>
          <p className='text-sm'>
            {DUMMY_MOSQUE.location.city}, {DUMMY_MOSQUE.location.state}
          </p>
        </div>
      </div>

      {/* Prayer Times */}
      <div className='p-6'>
        <h2 className='text-lg font-semibold mb-4'>Prayer Times</h2>
        <div className='grid grid-cols-2 sm:grid-cols-5 gap-4'>
          {Object.entries(DUMMY_MOSQUE.prayerTimings).map(([prayer, time]) => (
            <div key={prayer} className='bg-gray-50 p-4 rounded-lg text-center'>
              <div className='text-sm text-gray-500 capitalize'>{prayer}</div>
              <div className='font-semibold mt-1'>{time}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Events */}
      <div className='p-6 border-t'>
        <h2 className='text-lg font-semibold mb-4'>Upcoming Events</h2>
        <div className='space-y-4'>
          {/* We'll add events here later */}
          <div className='text-gray-500 text-sm'>No upcoming events</div>
        </div>
      </div>
    </div>
  )
}

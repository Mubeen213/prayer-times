import { Link, Outlet } from 'react-router-dom'
import { useState } from 'react'

export const PublicLayout = () => {
  const [activeTab, setActiveTab] = useState<'mosques' | 'events'>('mosques')

  return (
    <div className='min-h-screen bg-gray-50'>
      {/* Nav */}
      <nav className='bg-white shadow-sm'>
        <div className='max-w-7xl mx-auto px-4 h-16 flex items-center'>
          <Link to='/' className='text-2xl font-bold text-green-600'>
            PrayerTrack
          </Link>
        </div>
      </nav>

      {/* Tabs */}
      <div className='border-b bg-white'>
        <div className='max-w-7xl mx-auto px-4'>
          <div className='flex justify-center sm:justify-start space-x-6 sm:space-x-8'>
            {['mosques', 'events'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as 'mosques' | 'events')}
                className={`py-4 px-3 border-b-2 text-base sm:text-sm font-medium transition-all ${
                  activeTab === tab
                    ? 'border-green-500 text-green-600 scale-105'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Content Grid */}
        {activeTab === 'events' ? (
          <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            <span className='text-center text-green-500'> Coming soon </span>
          </div>
        ) : (
          <Outlet />
        )}
      </main>
    </div>
  )
}

import { Link, Outlet } from 'react-router-dom'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

export const PublicLayout = () => {
  const [activeTab, setActiveTab] = useState<'mosques' | 'events'>('mosques')
  const [searchType, setSearchType] = useState<'name' | 'location'>('name')

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
        {/* Search Section */}
        <div className='mb-8'>
          <div className='max-w-2xl mx-auto'>
            <div className='bg-white rounded-lg shadow-sm p-4'>
              {activeTab === 'mosques' && (
                <div className='flex gap-3 sm:gap-2 mb-4'>
                  {['name', 'location'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setSearchType(type as 'name' | 'location')}
                      className={`flex-1 py-3 sm:py-2 px- rounded-md transition text-base sm:text-sm font-medium ${
                        searchType === type
                          ? 'bg-green-600 text-white'
                          : 'bg-gray-50 hover:bg-gray-100'
                      }`}
                    >
                      Search by {type}
                    </button>
                  ))}
                </div>
              )}
              <div className='relative'>
                <input
                  type='text'
                  placeholder={
                    activeTab === 'mosques'
                      ? `Search mosque by ${searchType}...`
                      : 'Search events...'
                  }
                  className='w-full p-3 rounded-md border focus:ring-2 focus:ring-green-500'
                />
                <MagnifyingGlassIcon className='w-5 h-5 absolute right-3 top-3 text-gray-400' />
              </div>
            </div>
          </div>
        </div>

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

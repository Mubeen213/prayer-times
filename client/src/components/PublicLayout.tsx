import { Link, Outlet } from 'react-router-dom'

export const PublicLayout = () => {
  return (
    <div className='min-h-screen bg-gray-50'>
      <nav className='bg-white shadow-sm'>
        <div className='max-w-7xl mx-auto px-4 h-16 flex items-center'>
          <Link to='/' className='text-2xl font-bold text-green-600'>
            PrayerTrack
          </Link>
        </div>
      </nav>

      <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <Outlet />
      </main>
    </div>
  )
}

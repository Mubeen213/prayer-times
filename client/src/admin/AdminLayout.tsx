import { Outlet } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
export const AdminLayout = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        {/* Header */}
        <div className='bg-white rounded-lg shadow-sm p-6 mb-8'>
          <div className='flex justify-between items-center'>
            <h1 className='text-2xl font-bold text-gray-900'>
              Prayer Track Admin
            </h1>
            <button
              onClick={handleLogout}
              className='inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50'
            >
              <svg className='w-4 h-4 mr-2' /* ... */ />
              Logout
            </button>
          </div>
        </div>

        {/* Content */}
        <div className='bg-white rounded-lg shadow-sm'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { useAdminMosque } from '../hooks/useMosques'
import { MosqueSelection } from './MosqueSelection'
import { MosqueManagement } from './MosqueManagement'
import { Mosque } from '../types/mosque'

export const AdminLayout = () => {
  const [selectedMosque, setSelectedMosque] = useState<Mosque | null>(null)
  const { logout } = useAuth()
  const navigate = useNavigate()
  const { data: mosques, isLoading } = useAdminMosque()

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <div className='space-y-6 p-6'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold text-gray-900'>
          {selectedMosque ? 'Manage Mosque' : 'Select Mosque'}
        </h1>
        <button
          onClick={handleLogout}
          className='px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors'
        >
          Logout
        </button>
      </div>

      {selectedMosque ? (
        <MosqueManagement
          mosque={selectedMosque}
          onBack={() => setSelectedMosque(null)}
        />
      ) : (
        <MosqueSelection
          mosques={mosques || []}
          onSelect={setSelectedMosque}
          isLoading={isLoading}
        />
      )}
    </div>
  )
}

import { Routes, Route } from 'react-router-dom'
import { AdminLayout } from './AdminLayout'
import { Login } from './Login'
import { ProtectedRoute } from '../components/ProtectedRoute'
import { AuthProvider } from '../context/AuthProvider'
import { MosqueSelection } from './MosqueSelection'
import { MosqueManagement } from './MosqueManagement'

export default function AdminApp() {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route
          path='/'
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<MosqueSelection />} />
          <Route path='mosque/:mosqueId/*' element={<MosqueManagement />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}

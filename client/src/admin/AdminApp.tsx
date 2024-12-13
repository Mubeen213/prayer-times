import { Routes, Route } from 'react-router-dom'
import { AdminLayout } from './AdminLayout'
import { Login } from './Login'
import { ProtectedRoute } from '../components/ProtectedRoute'
import { AuthProvider } from '../context/AuthProvider'

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
          {/* <Route path='/dashboard' element={<Dashboard />} /> */}
        </Route>
      </Routes>
    </AuthProvider>
  )
}

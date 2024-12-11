import { Routes, Route } from 'react-router-dom'
import { AdminLayout } from '../components/AdminLayout'
import { Login } from '../pages/Login'
// import { Dashboard } from '../pages/Dashboard'
// import { ProtectedRoute } from '../components/ProtectedRoute'

export default function AdminApp() {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route
        element={
          //   <ProtectedRoute>
          <AdminLayout />
          //   </ProtectedRoute>
        }
      >
        {/* <Route path='/dashboard' element={<Dashboard />} /> */}
      </Route>
    </Routes>
  )
}

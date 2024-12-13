// src/components/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAuth()

  if (!token) {
    return <Navigate to='/admin/login' replace />
  }

  return <>{children}</>
}

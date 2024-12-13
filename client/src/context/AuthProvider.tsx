import React, { useState } from 'react'
import { AuthContext } from './AuthContext'

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('adminToken')
  )
  const login = (newToken: string) => {
    localStorage.setItem('adminToken', newToken)
    setToken(newToken)
  }

  const logout = () => {
    localStorage.removeItem('adminToken')
    setToken(null)
  }

  const value = {
    login,
    logout,
    token,
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

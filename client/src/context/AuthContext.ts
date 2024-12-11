import { createContext } from 'react'

interface AuthContextType {
  token: string | null
  login: () => void
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

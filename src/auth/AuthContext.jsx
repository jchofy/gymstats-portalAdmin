import { createContext, useState, useCallback } from 'react'
import { loginWithGoogle } from '@/api/adminApi'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('admin_user')
    return stored ? JSON.parse(stored) : null
  })
  const [token, setToken] = useState(() => localStorage.getItem('admin_token'))

  const login = useCallback(async (googleData) => {
    const res = await loginWithGoogle(googleData)

    if (res.cod !== 200 && res.cod !== '200') {
      throw new Error(res.msg || 'Error de autenticacion')
    }

    if (res.user.permisos !== 3 && res.user.permisos !== '3') {
      throw new Error('No tienes permisos de administrador')
    }

    localStorage.setItem('admin_token', res.token)
    localStorage.setItem('admin_user', JSON.stringify(res.user))
    setToken(res.token)
    setUser(res.user)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('admin_token')
    localStorage.removeItem('admin_user')
    setToken(null)
    setUser(null)
  }, [])

  const isAdmin = !!token && !!user && (user.permisos === 3 || user.permisos === '3')

  return (
    <AuthContext.Provider value={{ user, token, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

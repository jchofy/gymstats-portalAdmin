import { Navigate } from 'react-router-dom'
import { useAuth } from './useAuth'

export function ProtectedRoute({ children }) {
  const { isAdmin } = useAuth()

  if (!isAdmin) {
    return <Navigate to="/login" replace />
  }

  return children
}

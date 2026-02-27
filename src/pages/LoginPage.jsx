import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import { useAuth } from '@/auth/useAuth'
import { Loader2, Shield } from 'lucide-react'

export function LoginPage() {
  const { isAdmin, login } = useAuth()
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  if (isAdmin) {
    return <Navigate to="/" replace />
  }

  async function handleSuccess(credentialResponse) {
    setError('')
    setLoading(true)
    try {
      const decoded = jwtDecode(credentialResponse.credential)
      await login({
        email: decoded.email,
        name: decoded.name,
        google_id: decoded.sub,
        photo_url: decoded.picture,
      })
    } catch (err) {
      const msg = err.code === 'ERR_NETWORK'
        ? 'No se pudo conectar con la API. Verifica que el servidor esta corriendo.'
        : err.message || 'Error al iniciar sesion'
      setError(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#030712]">
      {/* Background gradient effects */}
      <div className="absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#0E7490]/20 blur-[128px]" />
      <div className="absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#F79518]/10 blur-[128px]" />

      <div className="relative z-10 w-full max-w-md px-4">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <img
            src="/img/logo.png"
            alt="GymStats"
            className="h-28 w-auto drop-shadow-2xl"
          />
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-white/[0.06] bg-[#111827]/80 p-8 shadow-2xl backdrop-blur-xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#0E7490]/10">
              <Shield className="h-6 w-6 text-[#0E7490]" />
            </div>
            <h1 className="text-2xl font-bold text-white">Panel de Admin</h1>
            <p className="mt-1 text-sm text-[#94a3b8]">
              Acceso restringido a administradores
            </p>
          </div>

          {/* Divider */}
          <div className="mb-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/[0.06]" />
            <span className="text-xs font-medium uppercase tracking-wider text-[#64748b]">
              Iniciar sesion
            </span>
            <div className="h-px flex-1 bg-white/[0.06]" />
          </div>

          {/* Google Login */}
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleSuccess}
              onError={() => setError('Error con Google Sign-In')}
              theme="filled_black"
              shape="pill"
              size="large"
              width="320"
              text="continue_with"
            />
          </div>

          {/* Loading state */}
          {loading && (
            <div className="mt-6 flex items-center justify-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin text-[#0E7490]" />
              <span className="text-sm text-[#94a3b8]">
                Verificando permisos...
              </span>
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="mt-6 rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3">
              <p className="text-center text-sm text-red-400">{error}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="mt-6 text-center text-xs text-[#475569]">
          GymStats Admin &middot; Solo cuentas con permisos de administrador
        </p>
      </div>
    </div>
  )
}

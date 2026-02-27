import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { updateAppInfo } from '@/api/adminApi'

const SEMVER = /^\d+\.\d+\.\d+$/

export function MaintenanceForm({ initialData, onSaved }) {
  const [form, setForm] = useState(initialData || {})
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  function update(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()

    if (form.min_version_ios && !SEMVER.test(form.min_version_ios)) {
      setMessage('Version iOS invalida (formato: X.Y.Z)')
      return
    }
    if (form.min_version_android && !SEMVER.test(form.min_version_android)) {
      setMessage('Version Android invalida (formato: X.Y.Z)')
      return
    }

    setSaving(true)
    setMessage('')
    try {
      await updateAppInfo(form)
      setMessage('Cambios guardados correctamente')
      onSaved?.()
    } catch {
      setMessage('Error al guardar')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Modo Mantenimiento</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="mt-ios">Mantenimiento iOS</Label>
            <Switch
              id="mt-ios"
              checked={!!form.maintenance_ios}
              onCheckedChange={(v) => update('maintenance_ios', v)}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="mt-android">Mantenimiento Android</Label>
            <Switch
              id="mt-android"
              checked={!!form.maintenance_android}
              onCheckedChange={(v) => update('maintenance_android', v)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mt-msg">Mensaje de mantenimiento</Label>
            <Textarea
              id="mt-msg"
              value={form.maintenance_message || ''}
              onChange={(e) => update('maintenance_message', e.target.value)}
              placeholder="Estamos realizando tareas de mantenimiento..."
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Version Minima</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="v-ios">Min version iOS</Label>
              <Input
                id="v-ios"
                value={form.min_version_ios || ''}
                onChange={(e) => update('min_version_ios', e.target.value)}
                placeholder="1.0.0"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="v-android">Min version Android</Label>
              <Input
                id="v-android"
                value={form.min_version_android || ''}
                onChange={(e) => update('min_version_android', e.target.value)}
                placeholder="1.0.0"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="up-msg">Mensaje de actualizacion</Label>
            <Textarea
              id="up-msg"
              value={form.update_message || ''}
              onChange={(e) => update('update_message', e.target.value)}
              placeholder="Hay una nueva version disponible..."
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>URLs de Tiendas</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="url-app">App Store URL</Label>
            <Input
              id="url-app"
              value={form.app_store_url || ''}
              onChange={(e) => update('app_store_url', e.target.value)}
              placeholder="https://apps.apple.com/..."
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="url-play">Play Store URL</Label>
            <Input
              id="url-play"
              value={form.play_store_url || ''}
              onChange={(e) => update('play_store_url', e.target.value)}
              placeholder="https://play.google.com/store/..."
            />
          </div>
        </CardContent>
      </Card>

      {message && (
        <p
          className={`text-sm ${
            message.includes('Error') ? 'text-destructive' : 'text-green-500'
          }`}
        >
          {message}
        </p>
      )}

      <Button type="submit" disabled={saving} className="w-full sm:w-auto">
        {saving ? 'Guardando...' : 'Guardar Cambios'}
      </Button>
    </form>
  )
}

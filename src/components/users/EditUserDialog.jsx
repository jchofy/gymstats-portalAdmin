import { useState, useEffect } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { editUser } from '@/api/adminApi'

export function EditUserDialog({ user, open, onClose, onSaved }) {
  const [isPremium, setIsPremium] = useState(false)
  const [premiumUntil, setPremiumUntil] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (user) {
      const hasPremium = !!user.premium_until
      setIsPremium(hasPremium)
      setPremiumUntil(hasPremium ? String(user.premium_until).slice(0, 10) : '')
      setError('')
    }
  }, [user])

  async function handleSave() {
    if (isPremium && !premiumUntil) {
      setError('Selecciona una fecha de fin de premium')
      return
    }

    setSaving(true)
    setError('')
    try {
      await editUser({
        idUser: user.id,
        premium_until: isPremium ? premiumUntil : null,
      })
      onSaved()
      onClose()
    } catch {
      setError('Error al guardar cambios')
    } finally {
      setSaving(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Editar usuario: {user?.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="premium">Premium</Label>
            <Switch
              id="premium"
              checked={isPremium}
              onCheckedChange={(checked) => {
                setIsPremium(checked)
                if (!checked) setPremiumUntil('')
              }}
            />
          </div>
          {isPremium && (
            <div className="space-y-2">
              <Label htmlFor="premium_until">Premium hasta</Label>
              <Input
                id="premium_until"
                type="date"
                value={premiumUntil}
                onChange={(e) => setPremiumUntil(e.target.value)}
              />
            </div>
          )}
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSave} disabled={saving}>
            {saving ? 'Guardando...' : 'Guardar'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

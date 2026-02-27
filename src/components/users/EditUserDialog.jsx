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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { editUser } from '@/api/adminApi'
import { PERMISSIONS } from '@/lib/constants'

export function EditUserDialog({ user, open, onClose, onSaved }) {
  const [coins, setCoins] = useState(0)
  const [permisos, setPermisos] = useState('0')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (user) {
      setCoins(user.coins ?? 0)
      setPermisos(String(user.permisos ?? 0))
      setError('')
    }
  }, [user])

  async function handleSave() {
    setSaving(true)
    setError('')
    try {
      await editUser({
        idUser: user.id,
        coins: Number(coins),
        permisos: Number(permisos),
        activo: 1,
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
          <div className="space-y-2">
            <Label htmlFor="coins">Coins</Label>
            <Input
              id="coins"
              type="number"
              value={coins}
              onChange={(e) => setCoins(e.target.value)}
              min={0}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="permisos">Permisos</Label>
            <Select value={permisos} onValueChange={setPermisos}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(PERMISSIONS).map(([val, { label }]) => (
                  <SelectItem key={val} value={val}>
                    {val} - {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
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

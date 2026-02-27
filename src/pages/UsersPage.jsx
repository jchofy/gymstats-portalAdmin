import { useState, useEffect, useCallback } from 'react'
import { getAllUsers } from '@/api/adminApi'
import { UsersTable } from '@/components/users/UsersTable'
import { EditUserDialog } from '@/components/users/EditUserDialog'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'

export function UsersPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [editingUser, setEditingUser] = useState(null)

  const fetchUsers = useCallback(() => {
    setLoading(true)
    getAllUsers()
      .then((res) => {
        if (res.cod === 200) setUsers(res.msg)
      })
      .finally(() => setLoading(false))
  }, [])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Usuarios</h2>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <UsersTable users={users} onEdit={setEditingUser} />
      )}

      <EditUserDialog
        user={editingUser}
        open={!!editingUser}
        onClose={() => setEditingUser(null)}
        onSaved={fetchUsers}
      />
    </div>
  )
}

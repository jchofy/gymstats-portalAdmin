import { useState, useEffect } from 'react'
import { getAppInfo } from '@/api/adminApi'
import { MaintenanceForm } from '@/components/maintenance/MaintenanceForm'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'

export function MaintenancePage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getAppInfo()
      .then((res) => {
        if (res.ok) setData(res.data)
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Mantenimiento</h2>

      {loading ? (
        <LoadingSpinner />
      ) : (
        <MaintenanceForm initialData={data} />
      )}
    </div>
  )
}

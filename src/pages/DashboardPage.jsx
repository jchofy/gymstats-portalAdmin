import { useState, useEffect, useCallback } from 'react'
import { getOverviewStats, getUsersTrend, getTrainingStats } from '@/api/adminApi'
import { KpiCards } from '@/components/dashboard/KpiCards'
import { UsersTrendChart } from '@/components/dashboard/UsersTrendChart'
import { SessionsChart } from '@/components/dashboard/SessionsChart'
import { PeakHours } from '@/components/dashboard/PeakHours'
import { ActiveUsersChart } from '@/components/dashboard/ActiveUsersChart'
import { PeriodSelector } from '@/components/shared/PeriodSelector'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'

export function DashboardPage() {
  const [overview, setOverview] = useState(null)
  const [usersTrend, setUsersTrend] = useState(null)
  const [training, setTraining] = useState(null)
  const [dias, setDias] = useState(1)
  const [loadingOverview, setLoadingOverview] = useState(true)
  const [loadingTrend, setLoadingTrend] = useState(true)
  const [loadingTraining, setLoadingTraining] = useState(true)

  const fetchOverview = useCallback((d) => {
    setLoadingOverview(true)
    getOverviewStats(d)
      .then((res) => res.ok && setOverview(res.data))
      .finally(() => setLoadingOverview(false))
  }, [])

  const fetchTrend = useCallback((d) => {
    setLoadingTrend(true)
    getUsersTrend(d)
      .then((res) => res.ok && setUsersTrend(res.data))
      .finally(() => setLoadingTrend(false))
  }, [])

  const fetchTraining = useCallback((d) => {
    setLoadingTraining(true)
    getTrainingStats(d)
      .then((res) => res.ok && setTraining(res.data))
      .finally(() => setLoadingTraining(false))
  }, [])

  useEffect(() => {
    fetchOverview(dias)
    fetchTrend(dias)
    fetchTraining(dias)
  }, [dias, fetchOverview, fetchTrend, fetchTraining])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Dashboard</h2>
        <PeriodSelector value={dias} onChange={setDias} />
      </div>

      {loadingOverview ? <LoadingSpinner /> : <KpiCards data={overview} dias={dias} />}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <UsersTrendChart data={usersTrend} loading={loadingTrend} />
        <ActiveUsersChart data={training} loading={loadingTraining} />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <SessionsChart data={training} loading={loadingTraining} />
        <PeakHours data={training} loading={loadingTraining} />
      </div>
    </div>
  )
}

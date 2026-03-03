import { Users, Crown, Activity, Dumbbell, Clock, CreditCard, TrendingUp } from 'lucide-react'
import { StatCard } from '@/components/shared/StatCard'

function periodLabel(dias) {
  if (dias === 0) return 'Total'
  if (dias === 1) return 'Hoy'
  if (dias < 30) return `${dias}d`
  if (dias < 365) return `${Math.round(dias / 30)}m`
  return '1a'
}

function formatDuration(seconds) {
  if (!seconds) return '0m'
  const m = Math.round(seconds / 60)
  if (m < 60) return `${m}m`
  const h = Math.floor(m / 60)
  const rm = m % 60
  return rm > 0 ? `${h}h ${rm}m` : `${h}h`
}

function deltaSubtitle(current, previous, label) {
  if (previous === undefined || previous === null) return null
  if (previous === 0 && current === 0) return null
  if (previous === 0) return { subtitle: `+${current} vs ${label} ant.`, delta: 1 }
  const pct = ((current - previous) / previous) * 100
  const sign = pct >= 0 ? '+' : ''
  return { subtitle: `${sign}${pct.toFixed(0)}% vs ${label} ant.`, delta: pct }
}

export function KpiCards({ data, dias }) {
  if (!data) return null

  const pl = periodLabel(dias)
  const dlabel = dias === 1 ? 'ayer' : `${pl} ant.`

  const newDelta = deltaSubtitle(data.new_users, data.prev_new_users, dlabel)
  const sessionsDelta = deltaSubtitle(data.sessions, data.prev_sessions, dlabel)

  const cards = [
    {
      icon: Users,
      label: 'Total Usuarios',
      value: data.total_users?.toLocaleString(),
    },
    {
      icon: TrendingUp,
      label: `Nuevos ${pl}`,
      value: data.new_users?.toLocaleString(),
      subtitle: newDelta?.subtitle,
      delta: newDelta?.delta,
    },
    {
      icon: Crown,
      label: 'Premium',
      value: data.premium_count?.toLocaleString(),
      subtitle: data.total_users
        ? `${((data.premium_count / data.total_users) * 100).toFixed(1)}% del total`
        : '',
    },
    {
      icon: Activity,
      label: `Activos ${pl}`,
      value: data.active_users?.toLocaleString(),
    },
    {
      icon: Dumbbell,
      label: `Sesiones ${pl}`,
      value: data.sessions?.toLocaleString(),
      subtitle: sessionsDelta?.subtitle,
      delta: sessionsDelta?.delta,
    },
    {
      icon: Clock,
      label: 'Duracion Media',
      value: formatDuration(data.avg_duration_seconds),
      subtitle: data.avg_sessions_per_user
        ? `${data.avg_sessions_per_user} ses/usuario`
        : '',
    },
    {
      icon: CreditCard,
      label: 'Suscripciones Activas',
      value: data.active_subscriptions?.toLocaleString(),
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
      {cards.map((card) => (
        <StatCard key={card.label} {...card} />
      ))}
    </div>
  )
}

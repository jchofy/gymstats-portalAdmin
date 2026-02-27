import { Users, Crown, Activity, Dumbbell, CalendarDays, CreditCard } from 'lucide-react'
import { StatCard } from '@/components/shared/StatCard'

export function KpiCards({ data }) {
  if (!data) return null

  const cards = [
    {
      icon: Users,
      label: 'Total Usuarios',
      value: data.total_users?.toLocaleString(),
      subtitle: `+${data.new_today} hoy`,
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
      label: 'Activos 7d',
      value: data.active_7d?.toLocaleString(),
    },
    {
      icon: Dumbbell,
      label: 'Sesiones Hoy',
      value: data.sessions_today?.toLocaleString(),
    },
    {
      icon: CalendarDays,
      label: 'Sesiones Mes',
      value: data.sessions_month?.toLocaleString(),
    },
    {
      icon: CreditCard,
      label: 'Suscripciones Activas',
      value: data.active_subscriptions?.toLocaleString(),
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {cards.map((card) => (
        <StatCard key={card.label} {...card} />
      ))}
    </div>
  )
}

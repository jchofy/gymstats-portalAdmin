import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { ChartContainer } from '@/components/shared/ChartContainer'
import { CHART_COLORS } from '@/lib/constants'

export function ActiveUsersChart({ data, loading }) {
  const chartData = data?.active_users_per_day || []

  return (
    <ChartContainer title="Usuarios Activos por Dia" loading={loading}>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart data={chartData}>
          <defs>
            <linearGradient id="activeUsersGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={CHART_COLORS.green} stopOpacity={0.3} />
              <stop offset="95%" stopColor={CHART_COLORS.green} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} />
          <XAxis
            dataKey="fecha"
            tick={{ fill: CHART_COLORS.label, fontSize: 12 }}
            tickFormatter={(v) => v?.slice(5)}
          />
          <YAxis
            tick={{ fill: CHART_COLORS.label, fontSize: 12 }}
            allowDecimals={false}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: CHART_COLORS.tooltip,
              border: 'none',
              borderRadius: 8,
              color: '#f1f5f9',
            }}
          />
          <Area
            type="monotone"
            dataKey="usuarios"
            stroke={CHART_COLORS.green}
            strokeWidth={2}
            fill="url(#activeUsersGradient)"
            name="Usuarios activos"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

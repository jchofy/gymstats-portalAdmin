import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { ChartContainer } from '@/components/shared/ChartContainer'
import { CHART_COLORS } from '@/lib/constants'

export function SessionsChart({ data, loading }) {
  const chartData = data?.sessions_per_day || []

  return (
    <ChartContainer title="Sesiones por Dia" loading={loading}>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} />
          <XAxis
            dataKey="fecha"
            tick={{ fill: CHART_COLORS.label, fontSize: 12 }}
            tickFormatter={(v) => v?.slice(5)}
          />
          <YAxis tick={{ fill: CHART_COLORS.label, fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: CHART_COLORS.tooltip,
              border: 'none',
              borderRadius: 8,
              color: '#f1f5f9',
            }}
          />
          <Bar
            dataKey="total"
            fill={CHART_COLORS.primary}
            radius={[4, 4, 0, 0]}
            name="Sesiones"
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

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

export function PeakHours({ data, loading }) {
  const chartData = (data?.peak_hours || []).map((h) => ({
    hora: `${String(Math.round(h.hora)).padStart(2, '0')}:00`,
    total: h.total,
  }))

  return (
    <ChartContainer title="Horas Pico" loading={loading}>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} />
          <XAxis
            dataKey="hora"
            tick={{ fill: CHART_COLORS.label, fontSize: 11 }}
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
            fill={CHART_COLORS.green}
            radius={[4, 4, 0, 0]}
            name="Sesiones"
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

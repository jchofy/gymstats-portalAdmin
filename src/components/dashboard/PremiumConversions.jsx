import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { ChartContainer } from '@/components/shared/ChartContainer'
import { CHART_COLORS } from '@/lib/constants'

export function PremiumConversions({ data, loading }) {
  const chartData = data?.conversions || []

  return (
    <ChartContainer title="Conversiones Premium" loading={loading}>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
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
          <Line
            type="monotone"
            dataKey="conversiones"
            stroke={CHART_COLORS.purple}
            strokeWidth={2}
            dot={{ r: 3, fill: CHART_COLORS.purple }}
            name="Conversiones"
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  ComposedChart,
} from 'recharts'
import { ChartContainer } from '@/components/shared/ChartContainer'
import { CHART_COLORS } from '@/lib/constants'

export function UsersTrendChart({ data, loading }) {
  const chartData = data?.trend || []

  return (
    <ChartContainer title="Tendencia de Usuarios" loading={loading}>
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} />
          <XAxis
            dataKey="fecha"
            tick={{ fill: CHART_COLORS.label, fontSize: 12 }}
            tickFormatter={(v) => v?.slice(5)}
          />
          <YAxis
            yAxisId="left"
            tick={{ fill: CHART_COLORS.label, fontSize: 12 }}
          />
          <YAxis
            yAxisId="right"
            orientation="right"
            tick={{ fill: CHART_COLORS.label, fontSize: 12 }}
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
            yAxisId="left"
            type="monotone"
            dataKey="nuevos"
            stroke={CHART_COLORS.primary}
            fill={CHART_COLORS.primary}
            fillOpacity={0.2}
            name="Nuevos"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="acumulado"
            stroke={CHART_COLORS.naranja}
            strokeWidth={2}
            dot={false}
            name="Acumulado"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

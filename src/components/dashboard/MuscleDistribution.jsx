import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import { ChartContainer } from '@/components/shared/ChartContainer'
import { CHART_COLORS } from '@/lib/constants'

const COLORS = [
  CHART_COLORS.primary,
  CHART_COLORS.naranja,
  CHART_COLORS.green,
  CHART_COLORS.purple,
  CHART_COLORS.pink,
  CHART_COLORS.blue,
  CHART_COLORS.yellow,
  CHART_COLORS.red,
]

export function MuscleDistribution({ data, loading }) {
  const chartData = (data?.muscle_distribution || []).map((m) => ({
    name: m.grupo_muscular || 'Otro',
    value: m.total_series,
  }))

  return (
    <ChartContainer title="Distribucion Muscular" loading={loading}>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={2}
            dataKey="value"
          >
            {chartData.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: CHART_COLORS.tooltip,
              border: 'none',
              borderRadius: 8,
              color: '#f1f5f9',
            }}
          />
          <Legend
            wrapperStyle={{ fontSize: 12, color: CHART_COLORS.label }}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

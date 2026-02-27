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

export function PopularExercises({ data, loading }) {
  const chartData = (data?.top_exercises || [])
    .slice(0, 15)
    .map((e) => ({
      nombre: e.titulo || `Ejercicio #${e.idEjercicio}`,
      sesiones: e.sesiones,
    }))
    .reverse()

  return (
    <ChartContainer title="Top Ejercicios" loading={loading}>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData} layout="vertical" margin={{ left: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={CHART_COLORS.grid} />
          <XAxis
            type="number"
            tick={{ fill: CHART_COLORS.label, fontSize: 12 }}
          />
          <YAxis
            type="category"
            dataKey="nombre"
            width={140}
            tick={{ fill: CHART_COLORS.label, fontSize: 11 }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: CHART_COLORS.tooltip,
              border: 'none',
              borderRadius: 8,
              color: '#f1f5f9',
            }}
          />
          <Bar
            dataKey="sesiones"
            fill={CHART_COLORS.naranja}
            radius={[0, 4, 4, 0]}
            name="Sesiones"
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

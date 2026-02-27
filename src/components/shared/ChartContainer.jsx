import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LoadingSpinner } from './LoadingSpinner'

export function ChartContainer({ title, loading, children }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? <LoadingSpinner /> : children}
      </CardContent>
    </Card>
  )
}

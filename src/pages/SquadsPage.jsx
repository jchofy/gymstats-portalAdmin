import { useState, useEffect } from 'react'
import {
  Shield,
  Activity,
  Users,
  Flag,
  AlertTriangle,
} from 'lucide-react'
import { getSquadsStats } from '@/api/adminApi'
import { StatCard } from '@/components/shared/StatCard'
import { LoadingSpinner } from '@/components/shared/LoadingSpinner'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'

export function SquadsPage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getSquadsStats()
      .then((res) => res.ok && setData(res.data))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <LoadingSpinner />

  const kpis = [
    { icon: Shield, label: 'Total Squads', value: data?.total_squads ?? 0 },
    { icon: Activity, label: 'Activos 7d', value: data?.active_squads_7d ?? 0 },
    { icon: Users, label: 'Total Miembros', value: data?.total_members ?? 0 },
    {
      icon: Flag,
      label: 'Flags Pendientes',
      value: data?.pending_flags ?? 0,
    },
    {
      icon: AlertTriangle,
      label: 'Reportes Pendientes',
      value: data?.pending_reports ?? 0,
    },
  ]

  const bans = data?.recent_bans || []

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Squads</h2>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {kpis.map((kpi) => (
          <StatCard key={kpi.label} {...kpi} />
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bans Recientes (30 dias)</CardTitle>
        </CardHeader>
        <CardContent>
          {bans.length === 0 ? (
            <p className="text-sm text-muted-foreground py-4 text-center">
              No hay bans recientes
            </p>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Usuario</TableHead>
                    <TableHead>Squad</TableHead>
                    <TableHead>Motivo</TableHead>
                    <TableHead>Tipo</TableHead>
                    <TableHead>Fecha</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bans.map((ban) => (
                    <TableRow key={ban.id}>
                      <TableCell className="font-medium">
                        {ban.usuario}
                        {ban.username && (
                          <span className="ml-1 text-muted-foreground text-xs">
                            @{ban.username}
                          </span>
                        )}
                      </TableCell>
                      <TableCell>{ban.squad}</TableCell>
                      <TableCell className="max-w-xs truncate">
                        {ban.motivo}
                      </TableCell>
                      <TableCell>
                        <Badge variant={ban.es_permanente ? 'destructive' : 'outline'}>
                          {ban.es_permanente ? 'Permanente' : 'Temporal'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {new Date(ban.created_at).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

import { useState, useMemo } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Pencil, Search, ChevronLeft, ChevronRight } from 'lucide-react'
import { PERMISSIONS } from '@/lib/constants'

const PAGE_SIZE = 25

export function UsersTable({ users, onEdit }) {
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(0)

  const filtered = useMemo(() => {
    if (!search) return users
    const q = search.toLowerCase()
    return users.filter(
      (u) =>
        u.name?.toLowerCase().includes(q) ||
        u.email?.toLowerCase().includes(q) ||
        u.username?.toLowerCase().includes(q)
    )
  }, [users, search])

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE)
  const paginated = filtered.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE)

  return (
    <div className="space-y-4">
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar por nombre, email o username..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setPage(0)
          }}
          className="pl-9"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Usuario</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead>Permisos</TableHead>
              <TableHead className="hidden sm:table-cell">Premium</TableHead>
              <TableHead className="hidden lg:table-cell">Coins</TableHead>
              <TableHead className="hidden lg:table-cell">Registrado</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.map((user) => {
              const perm = PERMISSIONS[user.permisos] || PERMISSIONS[0]
              const isPremium =
                user.permisos !== 0 ||
                (user.premium_until && new Date(user.premium_until) > new Date()) ||
                (user.trial_until && new Date(user.trial_until) > new Date())

              return (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar_url} />
                        <AvatarFallback className="text-xs">
                          {user.name?.[0]?.toUpperCase() || '?'}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-xs text-muted-foreground">
                          @{user.username || 'sin-username'}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-muted-foreground text-sm">
                    {user.email}
                  </TableCell>
                  <TableCell>
                    <Badge className={`${perm.color} text-white`}>
                      {perm.label}
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    {isPremium ? (
                      <Badge variant="outline" className="border-naranja text-naranja">
                        Pro
                      </Badge>
                    ) : (
                      <span className="text-sm text-muted-foreground">Free</span>
                    )}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {user.coins ?? 0}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                    {user.created_at
                      ? new Date(user.created_at).toLocaleDateString()
                      : '-'}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(user)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>
            {filtered.length} usuario{filtered.length !== 1 ? 's' : ''} encontrado
            {filtered.length !== 1 ? 's' : ''}
          </span>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={page === 0}
              onClick={() => setPage((p) => p - 1)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span>
              {page + 1} / {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={page >= totalPages - 1}
              onClick={() => setPage((p) => p + 1)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

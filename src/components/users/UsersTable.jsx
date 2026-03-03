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

      {/* Desktop: tabla */}
      <div className="hidden md:block rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Usuario</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Premium</TableHead>
              <TableHead>Registrado</TableHead>
              <TableHead className="w-10" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginated.map((user) => {
              const isAdmin = user.permisos === 3
              const isPremium = user.is_premium

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
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{user.name}</p>
                          {isAdmin && (
                            <Badge className="bg-red-600 text-white text-[10px] px-1.5 py-0">
                              Admin
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          @{user.username || 'sin-username'}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground text-sm">
                    {user.email}
                  </TableCell>
                  <TableCell>
                    {isPremium ? (
                      <Badge variant="outline" className="border-naranja text-naranja">
                        Pro
                      </Badge>
                    ) : (
                      <span className="text-sm text-muted-foreground">Free</span>
                    )}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
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

      {/* Mobile: cards */}
      <div className="grid gap-3 md:hidden">
        {paginated.map((user) => {
          const isAdmin = user.permisos === 3
          const isPremium = user.is_premium

          return (
            <div
              key={user.id}
              className="group relative rounded-lg border bg-card p-4 transition-colors hover:bg-accent/50"
            >
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10 shrink-0">
                  <AvatarImage src={user.avatar_url} />
                  <AvatarFallback className="text-sm">
                    {user.name?.[0]?.toUpperCase() || '?'}
                  </AvatarFallback>
                </Avatar>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate font-medium">{user.name}</p>
                    {isAdmin && (
                      <Badge className="bg-red-600 text-white text-[10px] px-1.5 py-0">
                        Admin
                      </Badge>
                    )}
                    {isPremium && !isAdmin && (
                      <Badge variant="outline" className="border-naranja text-naranja text-[10px] px-1.5 py-0">
                        Pro
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    @{user.username || 'sin-username'}
                  </p>
                  <p className="mt-1 truncate text-sm text-muted-foreground">
                    {user.email}
                  </p>
                </div>

                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 shrink-0"
                  onClick={() => onEdit(user)}
                >
                  <Pencil className="h-3.5 w-3.5" />
                </Button>
              </div>

              <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
                <span>
                  Registrado:{' '}
                  {user.created_at
                    ? new Date(user.created_at).toLocaleDateString()
                    : '-'}
                </span>
                {isPremium && user.premium_until && (
                  <span>
                    Premium hasta:{' '}
                    {new Date(user.premium_until).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          )
        })}
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

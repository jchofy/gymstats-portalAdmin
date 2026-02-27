import { Menu, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useAuth } from '@/auth/useAuth'

export function Topbar({ onMenuClick }) {
  const { user, logout } = useAuth()

  const initials = user?.name
    ? user.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'A'

  return (
    <header className="flex h-16 items-center justify-between border-b border-white/[0.06] bg-[#111827]/50 px-4 backdrop-blur-sm lg:px-6">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </Button>
        {/* Show logo on mobile (when sidebar is hidden) */}
        <img
          src="/img/logo.png"
          alt="GymStats"
          className="h-7 w-auto lg:hidden"
        />
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex items-center gap-2.5 rounded-full border border-white/[0.06] bg-white/[0.03] px-2 py-1.5 pr-4 transition-colors hover:bg-white/[0.06]">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.avatar_url} />
              <AvatarFallback className="bg-[#F79518] text-white text-xs font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <span className="hidden text-sm font-medium text-[#e2e8f0] sm:inline">
              {user?.name}
            </span>
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={logout} className="text-red-400">
            <LogOut className="mr-2 h-4 w-4" />
            Cerrar sesion
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}

import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Users, Settings, Shield } from 'lucide-react'

const NAV_ITEMS = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/users', icon: Users, label: 'Usuarios' },
  { to: '/maintenance', icon: Settings, label: 'Mantenimiento' },
  { to: '/squads', icon: Shield, label: 'Squads' },
]

export function Sidebar({ onNavigate }) {
  return (
    <div className="flex h-full flex-col bg-[#111827]">
      {/* Logo area */}
      <div className="flex h-16 items-center justify-center border-b border-white/[0.06] px-4">
        <img
          src="/img/logo.png"
          alt="GymStats"
          className="h-10 w-auto"
        />
      </div>

      {/* Nav */}
      <nav className="flex-1 space-y-1 p-3 pt-4">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/'}
            onClick={onNavigate}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-[#F79518]/10 text-[#F79518]'
                  : 'text-[#94a3b8] hover:bg-white/[0.04] hover:text-white'
              }`
            }
          >
            <item.icon className="h-5 w-5" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="border-t border-white/[0.06] px-4 py-3">
        <p className="text-center text-[10px] font-medium uppercase tracking-wider text-[#475569]">
          Admin Portal
        </p>
      </div>
    </div>
  )
}

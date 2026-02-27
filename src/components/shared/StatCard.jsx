export function StatCard({ icon: Icon, label, value, subtitle }) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-[#111827] p-5">
      <div className="flex items-center gap-4">
        <div className="rounded-lg bg-[#F79518]/10 p-2.5">
          <Icon className="h-5 w-5 text-[#F79518]" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium uppercase tracking-wide text-[#64748b]">
            {label}
          </p>
          <p className="text-2xl font-bold text-white">{value}</p>
          {subtitle && (
            <p className="text-xs text-[#22c55e]">{subtitle}</p>
          )}
        </div>
      </div>
    </div>
  )
}

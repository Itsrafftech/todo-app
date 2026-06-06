'use client'
import { useStats } from '@/hooks/useStats'

export function WeekChart() {
  const { weekBars } = useStats()
  const maxTotal = Math.max(...weekBars.map((b) => b.total), 1)

  return (
    <div className="mb-4 rounded-[10px] border border-rule bg-paper p-4">
      <p className="mb-3 text-[10px] font-bold tracking-widest text-ink-3">MINGGU INI</p>
      <div className="flex items-end gap-1.5">
        {weekBars.map((bar) => {
          const heightPct = (bar.total / maxTotal) * 100
          const donePct   = bar.total === 0 ? 0 : (bar.done / bar.total) * 100
          return (
            <div key={bar.label} className="flex flex-1 flex-col items-center gap-1">
              <div className="relative w-full rounded-sm overflow-hidden" style={{ height: 48 }}>
                <div
                  className="absolute bottom-0 w-full rounded-sm bg-ink-3/40"
                  style={{ height: `${heightPct}%` }}
                />
                <div
                  className={`absolute bottom-0 w-full rounded-sm transition-all ${bar.isToday ? 'bg-blue' : 'bg-ink-3'}`}
                  style={{ height: `${(donePct / 100) * heightPct}%` }}
                />
              </div>
              <span
                className={`text-[10px] font-semibold ${bar.isToday ? 'text-blue' : 'text-ink-3'}`}
              >
                {bar.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

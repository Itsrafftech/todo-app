'use client'
import { useStats } from '@/hooks/useStats'

export function StatRow() {
  const { completedToday, overdueCt, upcomingCt } = useStats()

  const stats = [
    { label: 'SELESAI',    value: completedToday, danger: false },
    { label: 'TERLAMBAT',  value: overdueCt,      danger: overdueCt > 0 },
    { label: 'MENDATANG',  value: upcomingCt,     danger: false },
  ]

  return (
    <div className="mb-6 grid grid-cols-3 gap-3">
      {stats.map((s) => (
        <div key={s.label} className="rounded-[10px] border border-rule bg-paper p-3 text-center">
          <p className={`text-2xl font-black ${s.danger ? 'text-brand-red' : 'text-ink'}`}>
            {s.value}
          </p>
          <p className="mt-0.5 text-[9px] font-bold tracking-widest text-ink-3">{s.label}</p>
        </div>
      ))}
    </div>
  )
}

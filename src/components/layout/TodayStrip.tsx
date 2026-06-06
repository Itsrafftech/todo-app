'use client'
import { useStats } from '@/hooks/useStats'

export function TodayStrip() {
  const { completedToday, totalToday, progressPct } = useStats()

  const r = 26
  const circ = 2 * Math.PI * r
  const offset = circ - (progressPct / 100) * circ

  return (
    <div className="mb-4 flex items-center justify-between rounded-[10px] bg-ink px-5 py-5 text-white">
      <div>
        <p className="mb-0.5 text-[10px] font-bold tracking-widest opacity-60">HARI INI</p>
        <p className="text-3xl font-black leading-none">
          {completedToday}
          <span className="text-lg font-semibold opacity-50">/{totalToday}</span>
        </p>
        <p className="mt-1 text-[11px] opacity-60">tugas selesai</p>
      </div>
      <div className="relative h-16 w-16">
        <svg className="h-full w-full" style={{ transform: 'rotate(-90deg)' }}>
          <circle cx="32" cy="32" r={r} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="4" />
          <circle
            cx="32" cy="32" r={r} fill="none"
            stroke="white" strokeWidth="4"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: 'stroke-dashoffset 0.4s ease' }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center text-sm font-bold">
          {progressPct}%
        </span>
      </div>
    </div>
  )
}

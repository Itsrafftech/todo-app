'use client'
import { useTaskStore } from '@/store/useTaskStore'
import { getToday } from '@/utils/date'
import type { ViewId } from '@/types'

const TABS: { id: ViewId; label: string }[] = [
  { id: 'today',    label: 'Hari Ini'  },
  { id: 'upcoming', label: 'Mendatang' },
  { id: 'overdue',  label: 'Terlambat' },
  { id: 'done',     label: 'Selesai'   },
  { id: 'all',      label: 'Semua'     },
]

function useTabCounts() {
  const tasks = useTaskStore((s) => s.tasks)
  const today = getToday()
  return {
    today:    tasks.filter((t) => t.dueDate === today && !t.done).length,
    upcoming: tasks.filter((t) => t.dueDate > today && !t.done).length,
    overdue:  tasks.filter((t) => t.dueDate < today && !t.done).length,
    done:     tasks.filter((t) => t.done).length,
    all:      tasks.length,
  }
}

export function TaskTabs() {
  const { activeView, setView } = useTaskStore()
  const counts = useTabCounts()

  return (
    <div className="mb-3 flex gap-1.5 overflow-x-auto pb-1">
      {TABS.map((tab) => {
        const active = activeView === tab.id
        return (
          <button
            key={tab.id}
            onClick={() => setView(tab.id)}
            className={`flex flex-shrink-0 items-center gap-1.5 rounded-[7px] px-3 py-1.5 text-xs font-semibold transition-colors ${
              active ? 'bg-ink text-white' : 'text-ink-2 hover:bg-rule'
            }`}
          >
            {tab.label}
            <span
              className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                active ? 'bg-white/20 text-white' : 'bg-rule text-ink-3'
              }`}
            >
              {counts[tab.id]}
            </span>
          </button>
        )
      })}
    </div>
  )
}

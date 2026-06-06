'use client'
import { useFilteredTasks } from '@/hooks/useFilteredTasks'
import { useTaskStore } from '@/store/useTaskStore'
import { TaskCard } from './TaskCard'
import { ClipboardList } from 'lucide-react'


const EMPTY_LABELS: Record<string, string> = {
  today:    'Tidak ada tugas untuk hari ini',
  upcoming: 'Tidak ada tugas mendatang',
  overdue:  'Tidak ada tugas terlambat',
  done:     'Belum ada tugas yang selesai',
  all:      'Belum ada tugas. Buat yang pertama!',
}

export function TaskList() {
  const tasks = useFilteredTasks()
  const { toggleTask, removeTask, toggleSubtask, activeView } = useTaskStore()
  const remaining = tasks.filter((t) => !t.done).length

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center gap-3 py-12 text-ink-3">
        <ClipboardList size={40} />
        <p className="text-sm font-medium">{EMPTY_LABELS[activeView] ?? 'Tidak ada tugas'}</p>
      </div>
    )
  }

  return (
    <div>
      <p className="mb-3 text-xs font-semibold text-ink-3">{remaining} tugas tersisa</p>
      <div className="space-y-2">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onToggle={() => toggleTask(task.id)}
            onRemove={() => removeTask(task.id)}
            onToggleSub={(subId) => toggleSubtask(task.id, subId)}
          />
        ))}
      </div>
    </div>
  )
}

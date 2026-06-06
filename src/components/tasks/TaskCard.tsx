'use client'
import { useState } from 'react'
import { X } from 'lucide-react'
import { Checkbox } from '@/components/ui/Checkbox'
import { Chip } from '@/components/ui/Chip'
import { SubtaskItem } from '@/components/subtasks/SubtaskItem'
import { CATEGORIES } from '@/constants/categories'
import { getToday } from '@/utils/date'
import type { Task } from '@/types'

interface TaskCardProps {
  task: Task
  onToggle: () => void
  onRemove: () => void
  onToggleSub: (subId: string) => void
}

const PRIORITY_BORDER: Record<string, string> = {
  urgent: 'border-l-brand-red',
  high:   'border-l-blue',
}

export function TaskCard({ task, onToggle, onRemove, onToggleSub }: TaskCardProps) {
  const [hovered, setHovered] = useState(false)
  const today = getToday()
  const isOverdue = task.dueDate < today && !task.done
  const cat = CATEGORIES.find((c) => c.id === task.category)
  const borderClass = !task.done && PRIORITY_BORDER[task.priority]
    ? `border-l-4 ${PRIORITY_BORDER[task.priority]}`
    : 'border-l-4 border-l-transparent'
  const doneSubs = task.subtasks.filter((s) => s.done).length

  return (
    <div
      className={`relative rounded-[10px] border border-rule bg-paper p-4 transition-opacity ${borderClass} ${task.done ? 'opacity-40' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && (
        <button
          onClick={onRemove}
          className="absolute right-3 top-3 text-ink-3 hover:text-brand-red"
        >
          <X size={14} />
        </button>
      )}
      <div className="flex gap-3">
        <Checkbox checked={task.done} onChange={onToggle} />
        <div className="min-w-0 flex-1">
          <p className={`text-sm font-semibold text-ink ${task.done ? 'line-through' : ''}`}>
            {task.title}
          </p>
          <div className="mt-1.5 flex flex-wrap gap-1">
            {cat && <Chip icon={cat.Icon}>{cat.label}</Chip>}
            {(task.priority === 'urgent' || task.priority === 'high') && (
              <Chip variant={task.priority === 'urgent' ? 'red' : 'blue'}>
                {task.priority === 'urgent' ? 'Urgent' : 'Tinggi'}
              </Chip>
            )}
            {task.dueDate && (
              <Chip variant={isOverdue ? 'red' : 'default'}>{task.dueDate}</Chip>
            )}

            {task.subtasks.length > 0 && (
              <Chip>{doneSubs}/{task.subtasks.length} sub-tugas</Chip>
            )}
          </div>
          {task.subtasks.length > 0 && (
            <div className="mt-2 space-y-0.5 border-t border-rule pt-2">
              {task.subtasks.map((sub) => (
                <SubtaskItem key={sub.id} subtask={sub} onToggle={() => onToggleSub(sub.id)} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

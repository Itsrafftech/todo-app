import { Checkbox } from '@/components/ui/Checkbox'
import type { Subtask } from '@/types'

interface SubtaskItemProps {
  subtask: Subtask
  onToggle: () => void
}

export function SubtaskItem({ subtask, onToggle }: SubtaskItemProps) {
  return (
    <div className="flex items-center gap-2 py-0.5">
      <Checkbox checked={subtask.done} onChange={onToggle} />
      <span
        className={`text-xs text-ink-2 ${subtask.done ? 'line-through opacity-50' : ''}`}
      >
        {subtask.title}
      </span>
    </div>
  )
}

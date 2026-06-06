import { useTaskStore } from '@/store/useTaskStore'
import { getToday } from '@/utils/date'
import { PRIORITIES } from '@/constants/priorities'
import type { Task } from '@/types'

export function useFilteredTasks(): Task[] {
  const { tasks, activeView, filterCategory, filterPriority, searchQuery } = useTaskStore()
  const today = getToday()

  const priorityWeight = (t: Task) =>
    PRIORITIES.find((p) => p.id === t.priority)?.weight ?? 0

  return tasks
    .filter((t) => {
      if (activeView === 'today')    return t.dueDate === today && !t.done
      if (activeView === 'upcoming') return t.dueDate > today && !t.done
      if (activeView === 'overdue')  return t.dueDate < today && !t.done
      if (activeView === 'done')     return t.done
      return true
    })
    .filter((t) => filterCategory === 'all' || t.category === filterCategory)
    .filter((t) => filterPriority === 'all' || t.priority === filterPriority)
    .filter((t) => t.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      if (a.done !== b.done) return a.done ? 1 : -1
      return priorityWeight(b) - priorityWeight(a)
    })
}

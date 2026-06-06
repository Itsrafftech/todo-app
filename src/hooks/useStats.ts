import { useTaskStore } from '@/store/useTaskStore'
import { getToday } from '@/utils/date'

const DAY_LABELS = ['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab']

export function useStats() {
  const tasks = useTaskStore((s) => s.tasks)
  const today = getToday()

  const todayTasks = tasks.filter((t) => t.dueDate === today)
  const completedToday = todayTasks.filter((t) => t.done).length
  const totalToday = todayTasks.length
  const progressPct = totalToday === 0 ? 0 : Math.round((completedToday / totalToday) * 100)
  const overdueCt = tasks.filter((t) => t.dueDate < today && !t.done).length

  const now = new Date()
  const weekBars = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(now)
    d.setDate(now.getDate() - now.getDay() + i)
    const iso = d.toISOString().slice(0, 10)
    const dayTasks = tasks.filter((t) => t.dueDate === iso)
    return {
      label: DAY_LABELS[i],
      total: dayTasks.length,
      done: dayTasks.filter((t) => t.done).length,
      isToday: iso === today,
    }
  })

  const upcomingCt = tasks.filter((t) => t.dueDate > today && !t.done).length

  return { todayTasks, completedToday, totalToday, progressPct, overdueCt, weekBars, upcomingCt }
}

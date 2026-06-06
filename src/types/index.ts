export interface Subtask {
  id: string
  title: string
  done: boolean
}

export interface Task {
  id: string
  title: string
  category: CategoryId
  priority: PriorityId
  notes: string
  dueDate: string
  done: boolean
  createdAt: number
  subtasks: Subtask[]
}

export type CategoryId = 'work' | 'personal' | 'health' | 'learning' | 'finance'
export type PriorityId = 'urgent' | 'high' | 'medium' | 'low'
export type ViewId     = 'today' | 'upcoming' | 'overdue' | 'done' | 'all'

export interface TaskFormData {
  title: string
  category: CategoryId
  priority: PriorityId
  notes: string
  dueDate: string
  subtasks: string[]
}

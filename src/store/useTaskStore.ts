import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Task, TaskFormData, ViewId, CategoryId, PriorityId } from '@/types'
import { uid } from '@/utils/id'

interface TaskStore {
  tasks: Task[]
  activeView: ViewId
  showModal: boolean
  filterCategory: CategoryId | 'all'
  filterPriority: PriorityId | 'all'
  searchQuery: string
  addTask: (form: TaskFormData) => void
  toggleTask: (id: string) => void
  removeTask: (id: string) => void
  toggleSubtask: (taskId: string, subId: string) => void
  setView: (view: ViewId) => void
  setFilter: (key: 'filterCategory' | 'filterPriority', value: string) => void
  setSearchQuery: (q: string) => void
  openModal: () => void
  closeModal: () => void
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set) => ({
      tasks: [],
      activeView: 'today',
      showModal: false,
      filterCategory: 'all',
      filterPriority: 'all',
      searchQuery: '',

      addTask: (form) =>
        set((s) => ({
          tasks: [
            ...s.tasks,
            {
              id: uid(),
              title: form.title,
              category: form.category,
              priority: form.priority,
              notes: form.notes,
              dueDate: form.dueDate,
              done: false,
              createdAt: Date.now(),
              subtasks: form.subtasks.map((t) => ({ id: uid(), title: t, done: false })),
            },
          ],
        })),

      toggleTask: (id) =>
        set((s) => ({
          tasks: s.tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
        })),

      removeTask: (id) =>
        set((s) => ({ tasks: s.tasks.filter((t) => t.id !== id) })),

      toggleSubtask: (taskId, subId) =>
        set((s) => ({
          tasks: s.tasks.map((t) =>
            t.id !== taskId
              ? t
              : {
                  ...t,
                  subtasks: t.subtasks.map((sub) =>
                    sub.id === subId ? { ...sub, done: !sub.done } : sub
                  ),
                }
          ),
        })),

      setView: (view) => set({ activeView: view }),
      setFilter: (key, value) => set({ [key]: value } as Partial<TaskStore>),
      setSearchQuery: (q) => set({ searchQuery: q }),
      openModal: () => set({ showModal: true }),
      closeModal: () => set({ showModal: false }),
    }),
    {
      name: 'productivity-tasks',
      partialize: (s) => ({ tasks: s.tasks }),
    }
  )
)

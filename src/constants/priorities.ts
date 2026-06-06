import type { PriorityId } from '@/types'

export interface Priority {
  id: PriorityId
  label: string
  weight: number
}

export const PRIORITIES: Priority[] = [
  { id: 'urgent', label: 'Urgent', weight: 4 },
  { id: 'high',   label: 'Tinggi', weight: 3 },
  { id: 'medium', label: 'Sedang', weight: 2 },
  { id: 'low',    label: 'Rendah', weight: 1 },
]

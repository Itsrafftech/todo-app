import { Briefcase, User, Heart, BookOpen, Coins } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { CategoryId } from '@/types'

export interface Category {
  id: CategoryId
  label: string
  Icon: LucideIcon
}

export const CATEGORIES: Category[] = [
  { id: 'work',     label: 'Kerja',     Icon: Briefcase },
  { id: 'personal', label: 'Pribadi',   Icon: User      },
  { id: 'health',   label: 'Kesehatan', Icon: Heart     },
  { id: 'learning', label: 'Belajar',   Icon: BookOpen  },
  { id: 'finance',  label: 'Keuangan',  Icon: Coins     },
]

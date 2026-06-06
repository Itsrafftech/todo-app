import type { LucideIcon } from 'lucide-react'

interface ChipProps {
  variant?: 'default' | 'blue' | 'red'
  icon?: LucideIcon
  children: React.ReactNode
}

const variantClass: Record<string, string> = {
  default: 'bg-cream text-ink-2',
  blue:    'bg-blue-lt text-blue',
  red:     'bg-brand-red-lt text-brand-red',
}

export function Chip({ variant = 'default', icon: IconComp, children }: ChipProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-[4px] px-2 py-0.5 text-[10px] font-bold ${variantClass[variant]}`}
    >
      {IconComp && <IconComp size={10} />}
      {children}
    </span>
  )
}

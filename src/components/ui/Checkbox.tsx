import { Check } from 'lucide-react'

interface CheckboxProps {
  checked: boolean
  onChange: () => void
}

export function Checkbox({ checked, onChange }: CheckboxProps) {
  return (
    <button
      type="button"
      onClick={onChange}
      className={`
        flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-[5px] border-2 transition-colors
        ${checked
          ? 'border-ink bg-ink'
          : 'border-ink-3 hover:border-ink-2'
        }
      `}
    >
      {checked && <Check size={11} color="white" strokeWidth={3} />}
    </button>
  )
}

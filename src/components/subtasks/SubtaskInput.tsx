'use client'
import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/Button'

interface SubtaskInputProps {
  onAdd: (title: string) => void
}

export function SubtaskInput({ onAdd }: SubtaskInputProps) {
  const [value, setValue] = useState('')

  function handleAdd() {
    const trimmed = value.trim()
    if (!trimmed) return
    onAdd(trimmed)
    setValue('')
  }

  return (
    <div className="flex gap-2">
      <input
        className="w-full rounded-lg border border-rule bg-cream px-3 py-2 text-sm font-sans text-ink placeholder:text-ink-3 transition-colors focus:border-blue focus:bg-paper focus:outline-none"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAdd() } }}
        placeholder="Tambah sub-tugas..."
      />
      <Button variant="secondary" size="sm" type="button" onClick={handleAdd}>
        <Plus size={14} />
      </Button>
    </div>
  )
}

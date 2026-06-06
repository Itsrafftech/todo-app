'use client'
import { useState } from 'react'
import { X } from 'lucide-react'
import { useTaskStore } from '@/store/useTaskStore'
import { CATEGORIES } from '@/constants/categories'
import { PRIORITIES } from '@/constants/priorities'
import { Button } from '@/components/ui/Button'
import { SubtaskInput } from '@/components/subtasks/SubtaskInput'
import type { TaskFormData, CategoryId, PriorityId } from '@/types'
import { getToday } from '@/utils/date'

const INPUT_CLS = 'w-full rounded-lg border border-rule bg-cream px-3 py-2 text-sm font-sans text-ink placeholder:text-ink-3 transition-colors focus:border-blue focus:bg-paper focus:outline-none'

const BLANK: TaskFormData = {
  title: '', category: 'work', priority: 'medium',
  notes: '', dueDate: getToday(), subtasks: [],
}

export function TaskModal() {
  const { showModal, closeModal, addTask } = useTaskStore()
  const [form, setForm] = useState<TaskFormData>(BLANK)

  if (!showModal) return null

  function set<K extends keyof TaskFormData>(key: K, val: TaskFormData[K]) {
    setForm((f) => ({ ...f, [key]: val }))
  }

  function handleSave() {
    if (!form.title.trim()) return
    addTask({ ...form, title: form.title.trim() })
    setForm(BLANK)
    closeModal()
  }

  function handleClose() { setForm(BLANK); closeModal() }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink/30 backdrop-blur-sm sm:items-center"
      onClick={(e) => { if (e.target === e.currentTarget) handleClose() }}
    >
      <div className="w-full rounded-t-2xl bg-paper p-6 shadow-xl sm:max-w-[500px] sm:rounded-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-bold text-ink">Tugas Baru</h2>
          <button onClick={handleClose} className="text-ink-3 hover:text-ink"><X size={18} /></button>
        </div>

        <div className="space-y-3">
          <input
            autoFocus
            className={INPUT_CLS}
            placeholder="Judul tugas..."
            value={form.title}
            onChange={(e) => set('title', e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') handleSave() }}
          />

          <CategoryPicker value={form.category} onChange={(v) => set('category', v)} />
          <PriorityPicker value={form.priority} onChange={(v) => set('priority', v)} />

          <input
            type="date"
            className={INPUT_CLS}
            value={form.dueDate}
            onChange={(e) => set('dueDate', e.target.value)}
          />

          <textarea
            className={`${INPUT_CLS} resize-none`}
            rows={2}
            placeholder="Catatan (opsional)..."
            value={form.notes}
            onChange={(e) => set('notes', e.target.value)}
          />

          <SubtaskInput onAdd={(t) => set('subtasks', [...form.subtasks, t])} />
          <SubtaskList items={form.subtasks} onRemove={(i) =>
            set('subtasks', form.subtasks.filter((_, idx) => idx !== i))
          } />
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <Button variant="secondary" onClick={handleClose}>Batal</Button>
          <Button variant="primary" onClick={handleSave} disabled={!form.title.trim()}>
            Simpan Tugas
          </Button>
        </div>
      </div>
    </div>
  )
}

function CategoryPicker({ value, onChange }: { value: CategoryId; onChange: (v: CategoryId) => void }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {CATEGORIES.map(({ id, label, Icon }) => (
        <button
          key={id} type="button"
          onClick={() => onChange(id)}
          className={`flex items-center gap-1 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors ${
            value === id ? 'border-ink bg-ink text-white' : 'border-rule bg-cream text-ink-2 hover:border-ink-2'
          }`}
        >
          <Icon size={12} /> {label}
        </button>
      ))}
    </div>
  )
}

function PriorityPicker({ value, onChange }: { value: PriorityId; onChange: (v: PriorityId) => void }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {PRIORITIES.map(({ id, label }) => (
        <button
          key={id} type="button"
          onClick={() => onChange(id)}
          className={`rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors ${
            value === id ? 'border-ink bg-ink text-white' : 'border-rule bg-cream text-ink-2 hover:border-ink-2'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  )
}

function SubtaskList({ items, onRemove }: { items: string[]; onRemove: (i: number) => void }) {
  if (!items.length) return null
  return (
    <ul className="space-y-1">
      {items.map((t, i) => (
        <li key={i} className="flex items-center justify-between rounded-lg bg-cream px-3 py-1.5 text-xs text-ink-2">
          <span>{t}</span>
          <button onClick={() => onRemove(i)} className="text-ink-3 hover:text-brand-red"><X size={12} /></button>
        </li>
      ))}
    </ul>
  )
}

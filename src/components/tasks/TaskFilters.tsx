'use client'
import { Search } from 'lucide-react'
import { useTaskStore } from '@/store/useTaskStore'
import { CATEGORIES } from '@/constants/categories'
import { PRIORITIES } from '@/constants/priorities'

export function TaskFilters() {
  const { searchQuery, filterCategory, filterPriority, setSearchQuery, setFilter } = useTaskStore()

  return (
    <div className="mb-4 flex flex-col gap-2 sm:flex-row">
      <div className="relative flex-1">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-3" />
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Cari tugas..."
          className="w-full rounded-lg border border-rule bg-cream py-2 pl-8 pr-3 text-sm text-ink placeholder:text-ink-3 focus:border-blue focus:bg-paper focus:outline-none"
        />
      </div>
      <select
        value={filterCategory}
        onChange={(e) => setFilter('filterCategory', e.target.value)}
        className="rounded-lg border border-rule bg-cream px-3 py-2 text-sm text-ink focus:border-blue focus:outline-none"
      >
        <option value="all">Semua Kategori</option>
        {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
      </select>
      <select
        value={filterPriority}
        onChange={(e) => setFilter('filterPriority', e.target.value)}
        className="rounded-lg border border-rule bg-cream px-3 py-2 text-sm text-ink focus:border-blue focus:outline-none"
      >
        <option value="all">Semua Prioritas</option>
        {PRIORITIES.map((p) => <option key={p.id} value={p.id}>{p.label}</option>)}
      </select>
    </div>
  )
}

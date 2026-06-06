'use client'
import { Plus } from 'lucide-react'
import { Header } from '@/components/layout/Header'
import { TodayStrip } from '@/components/layout/TodayStrip'
import { WeekChart } from '@/components/layout/WeekChart'
import { StatRow } from '@/components/layout/StatRow'
import { TaskTabs } from '@/components/tasks/TaskTabs'
import { TaskFilters } from '@/components/tasks/TaskFilters'
import { TaskList } from '@/components/tasks/TaskList'
import { TaskModal } from '@/components/tasks/TaskModal'
import { useTaskStore } from '@/store/useTaskStore'

export default function Home() {
  const { openModal, showModal } = useTaskStore()

  return (
    <main className="mx-auto max-w-[680px] px-5 pb-28 pt-8">
      <Header />
      <TodayStrip />
      <WeekChart />
      <StatRow />
      <TaskTabs />
      <TaskFilters />
      <TaskList />

      <button
        onClick={openModal}
        className="fixed bottom-6 right-6 flex h-14 w-14 items-center justify-center rounded-full bg-ink text-white shadow-lg transition-transform hover:scale-105 active:scale-95"
        aria-label="Tambah tugas"
      >
        <Plus size={24} />
      </button>

      {showModal && <TaskModal />}
    </main>
  )
}

# Productivity To-Do List

Personal daily planner web app for managing tasks with categories, priorities, and subtasks.

## Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS v4
- **State**: Zustand v5 (persisted to localStorage)
- **Font**: Montserrat via `next/font/google`
- **Icons**: Lucide React
- **Language**: TypeScript

## Setup

```bash
npm install
```

## Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production Build

```bash
npm run build
npm start
```

## Folder Structure

```
src/
├── app/              # Next.js App Router (layout, page, globals.css)
├── components/
│   ├── ui/           # Atoms: Checkbox, Chip, Button, Input, Icon
│   ├── layout/       # Header, TodayStrip, WeekChart, StatRow
│   ├── tasks/        # TaskTabs, TaskFilters, TaskCard, TaskList, TaskModal
│   └── subtasks/     # SubtaskItem, SubtaskInput
├── store/            # Zustand store (useTaskStore)
├── hooks/            # useFilteredTasks, useStats, useGreeting
├── constants/        # categories, priorities, quotes
├── types/            # TypeScript interfaces
└── utils/            # date helpers, uid generator
```

## Features

- Add tasks with category, priority, due date, notes, and subtasks
- Today / Upcoming / Overdue / Done / All views
- Search and filter by category & priority
- Weekly bar chart and progress ring
- Data persisted to localStorage — survives page refresh
# todo-app

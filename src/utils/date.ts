export function getToday(): string {
  return new Date().toISOString().slice(0, 10)
}

export function fmtDate(d: Date): string {
  return d.toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function getWeekRange(): { start: string; end: string } {
  const now = new Date()
  const day = now.getDay()
  const sunday = new Date(now)
  sunday.setDate(now.getDate() - day)
  const saturday = new Date(sunday)
  saturday.setDate(sunday.getDate() + 6)
  return {
    start: sunday.toISOString().slice(0, 10),
    end: saturday.toISOString().slice(0, 10),
  }
}

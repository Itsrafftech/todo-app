'use client'
import { useGreeting } from '@/hooks/useGreeting'
import { QUOTES } from '@/constants/quotes'
import { fmtDate } from '@/utils/date'
import { useState, useEffect } from 'react'

export function Header() {
  const { text, Icon } = useGreeting()
  const [quote, setQuote] = useState('')
  const [dateStr, setDateStr] = useState('')
  useEffect(() => {
    setQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)])
    setDateStr(fmtDate(new Date()).toUpperCase())
  }, [])

  return (
    <header className="mb-6">
      <p className="mb-1 text-xs font-semibold tracking-widest text-ink-3">{dateStr}</p>
      <div className="mb-3 flex items-center gap-2">
        <Icon size={28} className="text-ink" />
        <h1 className="text-[28px] font-black leading-tight text-ink">{text}</h1>
      </div>
      <blockquote className="border-l-2 border-ink pl-3 text-xs text-ink-2">
        {quote}
      </blockquote>
    </header>
  )
}

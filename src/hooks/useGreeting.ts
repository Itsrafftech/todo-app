import { Sun, Coffee, Moon } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { useState, useEffect } from 'react'

interface Greeting {
  text: string
  Icon: LucideIcon
}

function getGreeting(hour: number): Greeting {
  if (hour < 12) return { text: 'Selamat Pagi',  Icon: Sun    }
  if (hour < 17) return { text: 'Selamat Siang', Icon: Coffee }
  return                { text: 'Selamat Malam', Icon: Moon   }
}

export function useGreeting(): Greeting {
  const [greeting, setGreeting] = useState<Greeting>({ text: 'Selamat Pagi', Icon: Sun })
  useEffect(() => {
    setGreeting(getGreeting(new Date().getHours()))
  }, [])
  return greeting
}

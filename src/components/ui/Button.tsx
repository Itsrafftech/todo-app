import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md'
}

const variantClass: Record<string, string> = {
  primary:   'bg-ink text-white hover:bg-ink/90',
  secondary: 'bg-cream text-ink-2 border border-rule hover:bg-rule',
  ghost:     'bg-transparent text-ink-2 hover:bg-rule',
}

const sizeClass: Record<string, string> = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
}

export function Button({ variant, size = 'md', className = '', children, ...rest }: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-1.5 rounded-lg font-semibold transition-colors ${variantClass[variant]} ${sizeClass[size]} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}

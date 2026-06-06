import React from 'react'

type InputProps = React.InputHTMLAttributes<HTMLInputElement> &
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    as?: 'input' | 'textarea'
  }

export function Input({ as = 'input', className = '', ...rest }: InputProps) {
  const base =
    'w-full rounded-lg border border-rule bg-cream px-3 py-2 text-sm font-sans text-ink placeholder:text-ink-3 transition-colors focus:border-blue focus:bg-paper focus:outline-none'

  if (as === 'textarea') {
    return (
      <textarea
        className={`${base} resize-none ${className}`}
        {...(rest as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
      />
    )
  }
  return (
    <input
      className={`${base} ${className}`}
      {...(rest as React.InputHTMLAttributes<HTMLInputElement>)}
    />
  )
}

import React, { useEffect, useRef, useState } from 'react'

interface PropsType {
  query: string
  setQuery: (query: string) => void
}

export default function SearchInput(props: PropsType) {
  const { query, setQuery } = props

  const inputEl = useRef<HTMLInputElement>(null)

  // Handle focus effect Search input after enter keydown
  useEffect(() => {
    const callback = (e: KeyboardEvent) => {
      if (document.activeElement === inputEl.current) return
      if (e.code === 'Enter') {
        inputEl.current?.focus()
        setQuery('')
      }
    }

    document.addEventListener('keydown', callback)

    return () => {
      document.removeEventListener('keydown', callback)
    }
  }, [setQuery])

  return (
    <input
      className='search'
      type='text'
      placeholder='Search movies...'
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  )
}

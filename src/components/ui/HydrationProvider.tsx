'use client'

import { useEffect } from 'react'

interface HydrationProviderProps {
  children: React.ReactNode
}

export default function HydrationProvider({ children }: HydrationProviderProps) {
  useEffect(() => {
    // Suppress hydration warnings caused by browser extensions
    const originalError = console.error
    const originalWarn = console.warn
    
    console.error = (...args) => {
      if (
        typeof args[0] === 'string' && 
        (args[0].includes('Hydration') || 
         args[0].includes('data-new-gr-c-s-check-loaded') ||
         args[0].includes('data-gr-ext-installed'))
      ) {
        return
      }
      originalError.apply(console, args)
    }
    
    console.warn = (...args) => {
      if (
        typeof args[0] === 'string' && 
        (args[0].includes('Hydration') || 
         args[0].includes('data-new-gr-c-s-check-loaded') ||
         args[0].includes('data-gr-ext-installed'))
      ) {
        return
      }
      originalWarn.apply(console, args)
    }

    return () => {
      console.error = originalError
      console.warn = originalWarn
    }
  }, [])

  return <>{children}</>
}
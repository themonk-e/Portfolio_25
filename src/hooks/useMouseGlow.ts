'use client'

import { useEffect, useRef } from 'react'

export const useMouseGlow = () => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return
      
      const rect = ref.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      // Convert to percentage for CSS custom properties
      const xPercent = (x / rect.width) * 100
      const yPercent = (y / rect.height) * 100
      
      ref.current.style.setProperty('--mouse-x', `${xPercent}%`)
      ref.current.style.setProperty('--mouse-y', `${yPercent}%`)
    }

    const handleMouseLeave = (e: MouseEvent) => {
      if (!ref.current) return
      
      // Calculate exit position based on where mouse left the element
      const rect = ref.current.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      
      // Clamp coordinates to element boundaries and convert to percentage
      const xPercent = Math.max(0, Math.min(100, (x / rect.width) * 100))
      const yPercent = Math.max(0, Math.min(100, (y / rect.height) * 100))
      
      // Set exit position
      ref.current.style.setProperty('--mouse-x', `${xPercent}%`)
      ref.current.style.setProperty('--mouse-y', `${yPercent}%`)
    }

    const element = ref.current
    if (element) {
      element.addEventListener('mousemove', handleMouseMove)
      element.addEventListener('mouseleave', handleMouseLeave)
      
      // Initialize with center position
      element.style.setProperty('--mouse-x', '50%')
      element.style.setProperty('--mouse-y', '50%')
      
      return () => {
        element.removeEventListener('mousemove', handleMouseMove)
        element.removeEventListener('mouseleave', handleMouseLeave)
      }
    }
  }, [])

  return ref
}
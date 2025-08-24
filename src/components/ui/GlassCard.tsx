'use client'

import { forwardRef, ReactNode } from 'react'
import { useMouseGlow } from '@/hooks/useMouseGlow'

interface GlassCardProps {
  children: ReactNode
  className?: string
  style?: React.CSSProperties
  onClick?: () => void
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ children, className = '', style, onClick }, forwardedRef) => {
    const glowRef = useMouseGlow()
    
    // Use forwardedRef if provided, otherwise use our glow ref
    const ref = forwardedRef || glowRef

    return (
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className={`glass-card ${className}`}
        style={style}
        onClick={onClick}
      >
        {children}
      </div>
    )
  }
)

GlassCard.displayName = 'GlassCard'

export default GlassCard
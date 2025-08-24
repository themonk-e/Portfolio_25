'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { APP_CONFIG } from '@/lib/constants'
import GlassCard from '@/components/ui/GlassCard'

export default function HeroSection() {
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(true)
  const fullText = APP_CONFIG.sections.hero.typewriterText

  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    
    if (isTyping && displayedText.length < fullText.length) {
      timeoutId = setTimeout(() => {
        setDisplayedText(fullText.slice(0, displayedText.length + 1))
      }, 100)
    } else if (displayedText.length === fullText.length) {
      setIsTyping(false)
    }

    return () => clearTimeout(timeoutId)
  }, [displayedText, fullText, isTyping])

  const scrollToNext = () => {
    const aboutSection = document.getElementById('about')
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section 
      id="home" 
      className="min-h-screen flex items-center justify-center relative hero-grid"
      style={{ backgroundColor: 'var(--background-primary)' }}
    >

      <div className="max-w-6xl mx-auto px-4 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Greeting */}
          <motion.p 
            className="text-lg md:text-xl mb-4"
            style={{ color: 'var(--text-secondary)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Hello, I&apos;m
          </motion.p>

          {/* Name */}
          <motion.h1 
            className="text-4xl md:text-6xl lg:text-7xl font-glitch mb-6"
            style={{ color: 'var(--accent-neon)' }}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <span className="glitch-animation">MAHESH</span>
          </motion.h1>

          {/* Typewriter Text */}
          <div className="h-16 md:h-20 flex items-center justify-center mb-8">
            <h2 
              className="text-2xl md:text-3xl lg:text-4xl font-light"
              style={{ color: 'var(--text-secondary)' }}
            >
              I&apos;m a{' '}
              <span 
                className="font-semibold"
                style={{ color: 'var(--accent-neon)' }}
              >
                {displayedText}
                <span className={`ml-1 ${isTyping ? 'animate-pulse' : 'animate-pulse'}`}>|</span>
              </span>
            </h2>
          </div>

          {/* Description - Glass Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="mb-12 max-w-3xl mx-auto"
          >
            <GlassCard className="rounded-2xl p-8">
              <p 
                className="text-lg md:text-xl leading-relaxed"
                style={{ color: 'var(--text-secondary)' }}
              >
                I create digital experiences that blend creativity with functionality. 
                Passionate about building scalable solutions and beautiful user interfaces 
                that make a difference.
              </p>
            </GlassCard>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <button 
              onClick={() => scrollToNext()}
              className="px-8 py-3 rounded-lg neon-border font-semibold transition-all duration-300 hover:shadow-lg cursor-pointer no-select"
              style={{ color: 'var(--accent-neon)' }}
            >
              View My Work
            </button>
            
            <button 
              onClick={() => {
                const contactSection = document.getElementById('contact')
                if (contactSection) {
                  contactSection.scrollIntoView({ behavior: 'smooth' })
                }
              }}
              className="px-8 py-3 rounded-lg border transition-all duration-300 hover:opacity-80 cursor-pointer no-select"
              style={{ 
                color: 'var(--text-primary)', 
                borderColor: 'var(--border-default)' 
              }}
            >
              Get In Touch
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
        onClick={scrollToNext}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
      >
        <div className="flex flex-col items-center space-y-2">
          <span 
            className="text-sm"
            style={{ color: 'var(--text-secondary)' }}
          >
            Scroll Down
          </span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <svg 
              className="w-6 h-6" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
              style={{ color: 'var(--accent-neon)' }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
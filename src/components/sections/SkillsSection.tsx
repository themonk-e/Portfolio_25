'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface Skill {
  id: number
  name: string
  category: string
  logo: string | null
  logoType: string | null
  createdAt: string
  updatedAt: string
}

interface SkillDisplay {
  name: string
  icon: string
  iconType: string
  category: string
}

// Fallback skills in case database is empty
const fallbackSkills: SkillDisplay[] = [
  { name: 'React', icon: '⚛️', iconType: 'emoji', category: 'Frontend' },
  { name: 'Next.js', icon: '🔺', iconType: 'emoji', category: 'Frontend' },
  { name: 'TypeScript', icon: '📘', iconType: 'emoji', category: 'Frontend' },
  { name: 'Tailwind CSS', icon: '🎨', iconType: 'emoji', category: 'Frontend' },
  { name: 'Node.js', icon: '🟢', iconType: 'emoji', category: 'Backend' },
  { name: 'Python', icon: '🐍', iconType: 'emoji', category: 'Backend' },
  { name: 'Git', icon: '📚', iconType: 'emoji', category: 'Tools' },
  { name: 'VS Code', icon: '💻', iconType: 'emoji', category: 'Tools' },
]

// Marquee component for skill items
const SkillMarquee = ({ skills, direction = 'left' }: { skills: SkillDisplay[], direction?: 'left' | 'right' }) => {
  // Calculate total width needed for all skills with spacing
  const skillWidth = 300; // Approximate width per skill card
  const spacing = 32; // Space between cards (space-x-8 = 32px)
  const totalWidth = skills.length * (skillWidth + spacing);
  
  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="flex space-x-8 whitespace-nowrap"
        animate={{
          x: direction === 'left' ? [0, -totalWidth] : [-totalWidth, 0],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop", 
            duration: skills.length * 4, // 4 seconds per skill
            ease: "linear",
          },
        }}
        style={{
          width: `${totalWidth * 2}px`, // Double width for seamless loop
        }}
      >
        {/* First set of skills */}
        {skills.map((skill, index) => (
          <motion.div
            key={`${skill.name}-${index}`}
            className="flex items-center space-x-4 px-8 py-6 rounded-2xl backdrop-blur-sm border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-[var(--accent-neon)]/30 no-select cursor-pointer min-w-fit"
            whileHover={{
              boxShadow: "0 0 20px rgba(0, 255, 65, 0.3)",
            }}
          >
            {skill.iconType === 'emoji' ? (
              <span className="text-4xl">{skill.icon}</span>
            ) : (
              <div className="w-16 h-16 flex items-center justify-center">
                <img 
                  src={skill.icon} 
                  alt={skill.name} 
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                    e.currentTarget.nextElementSibling!.style.display = 'inline'
                  }}
                />
              </div>
            )}
            <span className="text-4xl hidden">💻</span>
            <div>
              <span 
                className="font-semibold text-lg"
                style={{ color: 'var(--text-primary)' }}
              >
                {skill.name}
              </span>
              <div 
                className="text-xs uppercase tracking-wide"
                style={{ color: 'var(--accent-neon)' }}
              >
                {skill.category}
              </div>
            </div>
          </motion.div>
        ))}
        
        {/* Second set of skills for seamless loop */}
        {skills.map((skill, index) => (
          <motion.div
            key={`${skill.name}-duplicate-${index}`}
            className="flex items-center space-x-4 px-8 py-6 rounded-2xl backdrop-blur-sm border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-[var(--accent-neon)]/30 no-select cursor-pointer min-w-fit"
            whileHover={{
              boxShadow: "0 0 20px rgba(0, 255, 65, 0.3)",
            }}
          >
            {skill.iconType === 'emoji' ? (
              <span className="text-4xl">{skill.icon}</span>
            ) : (
              <div className="w-16 h-16 flex items-center justify-center">
                <img 
                  src={skill.icon} 
                  alt={skill.name} 
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none'
                    e.currentTarget.nextElementSibling!.style.display = 'inline'
                  }}
                />
              </div>
            )}
            <span className="text-4xl hidden">💻</span>
            <div>
              <span 
                className="font-semibold text-lg"
                style={{ color: 'var(--text-primary)' }}
              >
                {skill.name}
              </span>
              <div 
                className="text-xs uppercase tracking-wide"
                style={{ color: 'var(--accent-neon)' }}
              >
                {skill.category}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export default function SkillsSection() {
  const [skills, setSkills] = useState<SkillDisplay[]>(fallbackSkills)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch('/api/skills')
        if (response.ok) {
          const dbSkills: Skill[] = await response.json()
          if (dbSkills.length > 0) {
            // Transform database skills to display format
            const displaySkills: SkillDisplay[] = dbSkills.map(skill => ({
              name: skill.name,
              icon: skill.logo || '💻',
              iconType: skill.logoType || 'emoji',
              category: skill.category.charAt(0).toUpperCase() + skill.category.slice(1)
            }))
            setSkills(displaySkills)
          }
        }
      } catch (error) {
        console.error('Error fetching skills:', error)
        // Keep fallback skills on error
      } finally {
        setLoading(false)
      }
    }

    fetchSkills()
  }, [])

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  return (
    <section 
      id="skills" 
      className="py-20 lg:py-32 pattern-dots overflow-hidden"
      style={{ backgroundColor: 'var(--background-secondary)' }}
    >
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section Header */}
          <motion.div variants={fadeInUp} className="text-center mb-20">
            <h2 
              className="text-4xl lg:text-6xl font-bold mb-6"
              style={{ color: 'var(--accent-neon)' }}
            >
              Skills
            </h2>
            <div className="w-20 h-1 mx-auto rounded-full mb-8" style={{ backgroundColor: 'var(--accent-neon)' }}></div>
            <p 
              className="text-lg max-w-2xl mx-auto"
              style={{ color: 'var(--text-secondary)' }}
            >
              Technologies I use to bring ideas to life
            </p>
          </motion.div>

          {/* Single Marquee Skills Display */}
          <motion.div variants={fadeInUp}>
            {loading ? (
              <div className="text-center py-8" style={{ color: 'var(--text-secondary)' }}>
                Loading skills...
              </div>
            ) : (
              <SkillMarquee skills={skills} direction="left" />
            )}
          </motion.div>

          {/* Additional Info */}
          <motion.div 
            variants={fadeInUp}
            className="text-center mt-20"
          >
            <p 
              className="text-lg"
              style={{ color: 'var(--text-secondary)' }}
            >
              Always learning and exploring new technologies to stay current with industry trends
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
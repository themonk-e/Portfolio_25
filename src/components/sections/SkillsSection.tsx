'use client'

import { motion } from 'framer-motion'

// All skills in a single array for marquee display
const allSkills = [
  { name: 'React', icon: '⚛️', category: 'Frontend' },
  { name: 'Next.js', icon: '🔺', category: 'Frontend' },
  { name: 'TypeScript', icon: '📘', category: 'Frontend' },
  { name: 'Tailwind CSS', icon: '🎨', category: 'Frontend' },
  { name: 'Framer Motion', icon: '✨', category: 'Frontend' },
  { name: 'Node.js', icon: '🟢', category: 'Backend' },
  { name: 'Python', icon: '🐍', category: 'Backend' },
  { name: 'Prisma', icon: '🔷', category: 'Backend' },
  { name: 'PostgreSQL', icon: '🐘', category: 'Backend' },
  { name: 'MongoDB', icon: '🍃', category: 'Backend' },
  { name: 'Git', icon: '📚', category: 'Tools' },
  { name: 'Docker', icon: '🐳', category: 'Tools' },
  { name: 'VS Code', icon: '💻', category: 'Tools' },
  { name: 'Figma', icon: '🎯', category: 'Tools' },
  { name: 'Vercel', icon: '▲', category: 'Tools' },
  { name: 'JavaScript', icon: '🟨', category: 'Frontend' },
  { name: 'HTML5', icon: '🧡', category: 'Frontend' },
  { name: 'CSS3', icon: '🔵', category: 'Frontend' },
  { name: 'Express.js', icon: '🚀', category: 'Backend' },
  { name: 'GraphQL', icon: '💜', category: 'Backend' },
]

// Marquee component for skill items
const SkillMarquee = ({ skills, direction = 'left' }: { skills: typeof allSkills, direction?: 'left' | 'right' }) => {
  return (
    <div className="relative overflow-hidden">
      <motion.div
        className="flex space-x-8 whitespace-nowrap"
        animate={{
          x: direction === 'left' ? [0, -2000] : [-2000, 0],
        }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 40,
            ease: "linear",
          },
        }}
      >
        {[...skills, ...skills, ...skills].map((skill, index) => (
          <motion.div
            key={`${skill.name}-${index}`}
            className="flex items-center space-x-3 px-6 py-4 rounded-2xl backdrop-blur-sm border border-white/10 bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-[var(--accent-neon)]/30 no-select cursor-pointer"
            whileHover={{
              boxShadow: "0 0 20px rgba(0, 255, 65, 0.3)",
            }}
          >
            <span className="text-3xl">{skill.icon}</span>
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
            <SkillMarquee skills={allSkills} direction="left" />
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
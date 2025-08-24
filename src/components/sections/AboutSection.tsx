'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import GlassCard from '@/components/ui/GlassCard'

export default function AboutSection() {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  return (
    <section 
      id="about" 
      className="py-20 lg:py-32 pattern-dots"
      style={{ backgroundColor: 'var(--background-secondary)' }}
    >
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerChildren}
        >
          {/* Section Header */}
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 
              className="text-4xl lg:text-5xl font-bold mb-4 "
              style={{ color: 'var(--accent-neon)' }}
            >
              About Me
            </h2>
            <div className="w-20 h-1 mx-auto rounded-full" style={{ backgroundColor: 'var(--accent-neon)' }}></div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Photo */}
            <motion.div 
              variants={fadeInUp}
              className="order-2 lg:order-1"
            >
              <div className="relative">
                <div className="glass-card rounded-3xl p-6">
                  <div className="relative h-80 lg:h-96 rounded-2xl overflow-hidden">
                    {/* Placeholder for profile image */}
                    <div 
                      className="w-full h-full flex items-center justify-center text-6xl glass"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      👨‍💻
                    </div>
                  </div>
                </div>
                
                {/* Minimal Floating Elements */}
                <motion.div
                  className="absolute -top-3 -right-3 w-12 h-12 glass rounded-full flex items-center justify-center"
                  animate={{ 
                    y: [0, -8, 0],
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 4,
                    ease: "easeInOut"
                  }}
                >
                  <span style={{ color: 'var(--text-secondary)' }}>✨</span>
                </motion.div>

                <motion.div
                  className="absolute -bottom-3 -left-3 w-10 h-10 glass rounded-full flex items-center justify-center"
                  animate={{ 
                    y: [0, 8, 0],
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 3,
                    ease: "easeInOut",
                    delay: 1.5
                  }}
                >
                  <span style={{ color: 'var(--text-secondary)' }}>💫</span>
                </motion.div>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div 
              variants={fadeInUp}
              className="order-1 lg:order-2 space-y-8"
            >
              <div className="space-y-6">
                <h3 
                  className="text-2xl lg:text-3xl font-bold mb-6"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Passionate Developer & Creative Problem Solver
                </h3>

                <GlassCard className="rounded-2xl p-8">
                  <div 
                    className="text-lg leading-relaxed space-y-4"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <p>
                      I&apos;m a full-stack developer with a passion for creating exceptional digital experiences. 
                      With over <span className="font-semibold " style={{ color: 'var(--accent-neon)' }}>5 years</span> of 
                      experience, I specialize in modern web technologies and love turning complex problems into 
                      simple, beautiful solutions.
                    </p>

                    <p>
                      My journey began with curiosity about how things work, which led me to explore programming. 
                      Today, I work with cutting-edge technologies like React, Node.js, and cloud platforms to 
                      build scalable applications that users love.
                    </p>

                    <p>
                      When I&apos;m not coding, you&apos;ll find me exploring new technologies, contributing to open-source 
                      projects, or sharing knowledge with the developer community through blog posts and mentoring.
                    </p>
                  </div>
                </GlassCard>
              </div>

              {/* Stats */}
              <motion.div 
                className="grid grid-cols-3 gap-6"
                variants={staggerChildren}
              >
                {[
                  { number: '50+', label: 'Projects' },
                  { number: '5+', label: 'Years' },
                  { number: '20+', label: 'Technologies' }
                ].map((stat, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="text-center"
                  >
                    <GlassCard className="rounded-xl p-4">
                    <div className="text-2xl font-light gradient-text mb-1">
                      {stat.number}
                    </div>
                    <div 
                      className="text-sm font-light"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {stat.label}
                    </div>
                    </GlassCard>
                  </motion.div>
                ))}
              </motion.div>

              {/* Download Resume Button */}
              <motion.div variants={fadeInUp}>
                <motion.a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-button inline-flex items-center px-8 py-4 rounded-2xl font-medium"
                  style={{ color: 'var(--text-primary)' }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  Resume
                </motion.a>
              </motion.div>
            </motion.div>
          </div>

          {/* Experience Timeline */}
          <motion.div 
            variants={fadeInUp}
            className="mt-20"
          >
            <div className="text-center mb-16">
              <h3 
                className="text-3xl lg:text-4xl font-bold mb-4"
                style={{ color: 'var(--accent-neon)' }}
              >
                Professional Experience
              </h3>
              <div className="w-16 h-1 mx-auto rounded-full" style={{ backgroundColor: 'var(--accent-neon)' }}></div>
            </div>

            <div className="relative max-w-4xl mx-auto">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-0.5 h-full w-0.5 bg-gradient-to-b from-transparent via-[var(--accent-neon)] to-transparent opacity-30"></div>

              {/* Experience Items */}
              <div className="space-y-12">
                {/* Company 1 */}
                <motion.div
                  variants={fadeInUp}
                  className="relative flex items-center justify-between"
                >
                  <div className="w-5/12 pr-8 text-right">
                    <GlassCard className="rounded-2xl p-6">
                      <div className="mb-4">
                        <h4 
                          className="text-xl font-bold mb-2"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          Senior Full Stack Developer
                        </h4>
                        <h5 
                          className="text-lg font-semibold mb-2"
                          style={{ color: 'var(--accent-neon)' }}
                        >
                          Tech Solutions Inc.
                        </h5>
                        <p 
                          className="text-sm mb-3"
                          style={{ color: 'var(--text-muted)' }}
                        >
                          2022 - Present
                        </p>
                      </div>
                      <p 
                        className="text-sm leading-relaxed"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        Leading development of enterprise web applications using React, Node.js, and AWS. 
                        Managed a team of 5 developers and implemented CI/CD pipelines that reduced deployment time by 60%.
                      </p>
                    </GlassCard>
                  </div>

                  {/* Timeline Node */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-2 border-[var(--accent-neon)] bg-[var(--background-primary)] z-10">
                    <div className="absolute inset-1 rounded-full bg-[var(--accent-neon)] opacity-75"></div>
                  </div>

                  <div className="w-5/12"></div>
                </motion.div>

                {/* Company 2 */}
                <motion.div
                  variants={fadeInUp}
                  className="relative flex items-center justify-between"
                >
                  <div className="w-5/12"></div>

                  {/* Timeline Node */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-2 border-[var(--accent-neon)] bg-[var(--background-primary)] z-10">
                    <div className="absolute inset-1 rounded-full bg-[var(--accent-neon)] opacity-75"></div>
                  </div>

                  <div className="w-5/12 pl-8">
                    <GlassCard className="rounded-2xl p-6">
                      <div className="mb-4">
                        <h4 
                          className="text-xl font-bold mb-2"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          Frontend Developer
                        </h4>
                        <h5 
                          className="text-lg font-semibold mb-2"
                          style={{ color: 'var(--accent-neon)' }}
                        >
                          Digital Innovations Ltd.
                        </h5>
                        <p 
                          className="text-sm mb-3"
                          style={{ color: 'var(--text-muted)' }}
                        >
                          2020 - 2022
                        </p>
                      </div>
                      <p 
                        className="text-sm leading-relaxed"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        Developed responsive web applications using React and TypeScript. 
                        Collaborated with UX designers to create intuitive user interfaces and improved site performance by 40%.
                      </p>
                    </GlassCard>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
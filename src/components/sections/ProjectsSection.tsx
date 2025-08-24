'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Modal from '@/components/ui/Modal'
import GlassCard from '@/components/ui/GlassCard'

// Sample projects data - this would come from your database
const sampleProjects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    summary: 'Modern e-commerce solution with advanced features',
    description: 'A full-stack e-commerce platform built with Next.js, featuring user authentication, payment integration with Stripe, inventory management, and an admin dashboard. The application handles thousands of products and provides a seamless shopping experience.',
    techStack: ['Next.js', 'TypeScript', 'Prisma', 'Stripe', 'Tailwind CSS'],
    githubLink: 'https://github.com/username/ecommerce',
    demoLink: 'https://ecommerce-demo.vercel.app',
    imageUrl: '/images/project-1.jpg',
    featured: true
  },
  {
    id: 2,
    title: 'Task Management App',
    summary: 'Collaborative project management tool',
    description: 'A comprehensive task management application that allows teams to collaborate effectively. Features include drag-and-drop kanban boards, real-time updates, team chat, file sharing, and detailed analytics.',
    techStack: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Material-UI'],
    githubLink: 'https://github.com/username/taskmanager',
    demoLink: 'https://taskmanager-demo.netlify.app',
    imageUrl: '/images/project-2.jpg',
    featured: true
  },
  {
    id: 3,
    title: 'Weather Dashboard',
    summary: 'Beautiful weather tracking application',
    description: 'An elegant weather dashboard that provides detailed weather information, forecasts, and historical data. Features interactive maps, weather alerts, and personalized recommendations.',
    techStack: ['Vue.js', 'Express.js', 'Weather API', 'Chart.js', 'SCSS'],
    githubLink: 'https://github.com/username/weather',
    demoLink: 'https://weather-dashboard-demo.vercel.app',
    imageUrl: '/images/project-3.jpg',
    featured: false
  },
  {
    id: 4,
    title: 'Social Media Analytics',
    summary: 'Comprehensive social media insights platform',
    description: 'A powerful analytics platform that provides deep insights into social media performance across multiple platforms. Features automated reporting, competitor analysis, and growth recommendations.',
    techStack: ['Python', 'Django', 'PostgreSQL', 'React', 'D3.js'],
    githubLink: 'https://github.com/username/analytics',
    demoLink: 'https://analytics-demo.herokuapp.com',
    imageUrl: '/images/project-4.jpg',
    featured: false
  },
  {
    id: 5,
    title: 'AI Content Generator',
    summary: 'Machine learning powered content creation',
    description: 'An AI-powered content generation tool that helps creators produce high-quality written content. Uses natural language processing to generate articles, social media posts, and marketing copy.',
    techStack: ['Python', 'TensorFlow', 'FastAPI', 'React', 'Docker'],
    githubLink: 'https://github.com/username/ai-content',
    demoLink: 'https://ai-content-demo.vercel.app',
    imageUrl: '/images/project-5.jpg',
    featured: true
  },
  {
    id: 6,
    title: 'Fitness Tracker',
    summary: 'Personal health and fitness monitoring',
    description: 'A comprehensive fitness tracking application with workout planning, nutrition logging, progress tracking, and social features. Integrates with popular fitness devices and provides personalized recommendations.',
    techStack: ['React Native', 'Node.js', 'MongoDB', 'Express.js', 'Chart.js'],
    githubLink: 'https://github.com/username/fitness',
    demoLink: 'https://fitness-tracker-demo.app',
    imageUrl: '/images/project-6.jpg',
    featured: false
  }
]

export default function ProjectsSection() {
  const [selectedProject, setSelectedProject] = useState<typeof sampleProjects[0] | null>(null)
  const [filter, setFilter] = useState<'all' | 'featured'>('all')

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  }

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const filteredProjects = filter === 'featured' 
    ? sampleProjects.filter(project => project.featured)
    : sampleProjects

  return (
    <section 
      id="projects" 
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
              className="text-4xl lg:text-5xl font-bold mb-4"
              style={{ color: 'var(--accent-neon)' }}
            >
              Featured Projects
            </h2>
            <div className="w-20 h-1 mx-auto rounded-full" style={{ backgroundColor: 'var(--accent-neon)' }}></div>
            <p 
              className="text-lg mt-6 max-w-2xl mx-auto"
              style={{ color: 'var(--text-secondary)' }}
            >
              A showcase of my recent work and personal projects
            </p>
          </motion.div>

          {/* Filter Buttons */}
          <motion.div variants={fadeInUp} className="flex justify-center gap-4 mb-12">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                filter === 'all' 
                  ? 'neon-border' 
                  : 'border hover:opacity-80'
              }`}
              style={{ 
                color: filter === 'all' 
                  ? 'var(--accent-neon)' 
                  : 'var(--text-primary)',
                borderColor: filter === 'all' 
                  ? 'var(--accent-neon)' 
                  : 'var(--border-default)'
              }}
            >
              All Projects
            </button>
            <button
              onClick={() => setFilter('featured')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                filter === 'featured' 
                  ? 'neon-border' 
                  : 'border hover:opacity-80'
              }`}
              style={{ 
                color: filter === 'featured' 
                  ? 'var(--accent-neon)' 
                  : 'var(--text-primary)',
                borderColor: filter === 'featured' 
                  ? 'var(--accent-neon)' 
                  : 'var(--border-default)'
              }}
            >
              Featured Only
            </button>
          </motion.div>

          {/* Projects Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerChildren}
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                variants={fadeInUp}
                className="group cursor-pointer no-select"
                onClick={() => setSelectedProject(project)}
              >
                <GlassCard className="relative overflow-hidden rounded-2xl h-full">
                  {/* Project Image */}
                  <div className="relative h-48 overflow-hidden">
                    <div 
                      className="w-full h-full flex items-center justify-center text-4xl transition-transform duration-300 group-hover:scale-110"
                      style={{ 
                        backgroundColor: 'rgba(10, 10, 10, 0.3)',
                        color: 'var(--accent-neon)'
                      }}
                    >
                      {/* Placeholder for project image */}
                      💻
                    </div>
                    
                    {/* Featured Badge */}
                    {project.featured && (
                      <div className="absolute top-4 right-4">
                        <span 
                          className="px-2 py-1 text-xs font-semibold rounded-full"
                          style={{ 
                            backgroundColor: 'var(--accent-neon)',
                            color: 'var(--background-primary)'
                          }}
                        >
                          Featured
                        </span>
                      </div>
                    )}

                    {/* Instant Hover Overlay */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex items-center justify-center backdrop-blur-sm">
                      <span 
                        className="text-white font-semibold text-lg "
                        style={{ color: 'var(--accent-neon)' }}
                      >
                        View Details
                      </span>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="p-6">
                    <h3 
                      className="text-xl font-bold mb-2 group-hover: transition-colors duration-300"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {project.title}
                    </h3>
                    <p 
                      className="text-sm mb-4 line-clamp-2"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {project.summary}
                    </p>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techStack.slice(0, 3).map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 text-xs rounded-full"
                          style={{ 
                            backgroundColor: 'var(--background-secondary)',
                            color: 'var(--accent-neon)'
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 3 && (
                        <span
                          className="px-2 py-1 text-xs rounded-full"
                          style={{ 
                            backgroundColor: 'var(--background-secondary)',
                            color: 'var(--text-secondary)'
                          }}
                        >
                          +{project.techStack.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Links */}
                    <div className="flex gap-4">
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-sm hover:opacity-80 transition-opacity"
                        style={{ color: 'var(--accent-neon)' }}
                      >
                        GitHub →
                      </a>
                      <a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-sm hover:opacity-80 transition-opacity"
                        style={{ color: 'var(--accent-neon)' }}
                      >
                        Live Demo →
                      </a>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Project Modal */}
      <Modal isOpen={!!selectedProject} onClose={() => setSelectedProject(null)}>
        {selectedProject && (
          <div className="p-8 rounded-2xl glass-card">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Project Image */}
              <div className="space-y-6">
                <div className="relative h-64 lg:h-80 rounded-xl overflow-hidden glass-card">
                  <div 
                    className="w-full h-full flex items-center justify-center text-6xl"
                    style={{ 
                      backgroundColor: 'rgba(10, 10, 10, 0.3)',
                      color: 'var(--accent-neon)'
                    }}
                  >
                    💻
                  </div>
                </div>
              </div>

              {/* Project Details */}
              <div className="space-y-6">
                <div>
                  {selectedProject.featured && (
                    <span 
                      className="inline-block px-3 py-1 text-sm font-semibold rounded-full mb-4"
                      style={{ 
                        backgroundColor: 'var(--accent-neon)',
                        color: 'var(--background-primary)'
                      }}
                    >
                      Featured Project
                    </span>
                  )}
                  <h3 
                    className="text-3xl font-bold mb-4 "
                    style={{ color: 'var(--accent-neon)' }}
                  >
                    {selectedProject.title}
                  </h3>
                  <p 
                    className="text-lg leading-relaxed"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {selectedProject.description}
                  </p>
                </div>

                {/* Tech Stack */}
                <div className="p-4 rounded-xl glass-card">
                  <h4 
                    className="text-lg font-semibold mb-3"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-sm rounded-full neon-border"
                        style={{ color: 'var(--accent-neon)' }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href={selectedProject.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center px-6 py-3 rounded-lg neon-border  font-semibold transition-all duration-300 hover:shadow-lg"
                    style={{ color: 'var(--accent-neon)' }}
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    View Code
                  </a>
                  <a
                    href={selectedProject.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center px-6 py-3 rounded-lg border font-semibold transition-all duration-300 hover:opacity-80"
                    style={{ 
                      color: 'var(--text-primary)', 
                      borderColor: 'var(--border-default)' 
                    }}
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Live Demo
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </section>
  )
}
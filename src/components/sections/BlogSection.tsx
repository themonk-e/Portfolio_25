'use client'

import { motion } from 'framer-motion'
import { formatDate } from '@/lib/utils'
import GlassCard from '@/components/ui/GlassCard'

// Sample blog data - this would come from your database
const sampleBlogs = [
  {
    id: 1,
    title: 'Building Modern Web Applications with Next.js 14',
    summary: 'Exploring the latest features in Next.js 14 including the App Router, Server Components, and improved performance optimizations.',
    externalLink: 'https://medium.com/@username/nextjs-14-features',
    publicationDate: new Date('2024-01-15'),
    tags: ['Next.js', 'React', 'Web Development'],
    featured: true
  },
  {
    id: 2,
    title: 'The Future of CSS: Container Queries and Modern Layout',
    summary: 'Deep dive into container queries and how they revolutionize responsive design patterns in modern web development.',
    externalLink: 'https://dev.to/username/css-container-queries',
    publicationDate: new Date('2024-01-08'),
    tags: ['CSS', 'Frontend', 'Responsive Design'],
    featured: true
  },
  {
    id: 3,
    title: 'TypeScript Best Practices for Large-Scale Applications',
    summary: 'Essential TypeScript patterns and practices for maintaining code quality in enterprise-level applications.',
    externalLink: 'https://hashnode.com/@username/typescript-best-practices',
    publicationDate: new Date('2023-12-22'),
    tags: ['TypeScript', 'JavaScript', 'Best Practices'],
    featured: false
  },
  {
    id: 4,
    title: 'Mastering React Server Components',
    summary: 'Understanding React Server Components and how they change the way we think about server-side rendering.',
    externalLink: 'https://medium.com/@username/react-server-components',
    publicationDate: new Date('2023-12-10'),
    tags: ['React', 'Server Components', 'SSR'],
    featured: true
  },
  {
    id: 5,
    title: 'Database Optimization Techniques for Modern Apps',
    summary: 'Practical strategies for optimizing database performance in production applications.',
    externalLink: 'https://dev.to/username/database-optimization',
    publicationDate: new Date('2023-11-28'),
    tags: ['Database', 'Performance', 'Backend'],
    featured: false
  },
  {
    id: 6,
    title: 'Creating Accessible Web Components',
    summary: 'Building inclusive user interfaces with proper accessibility considerations and ARIA implementation.',
    externalLink: 'https://blog.username.com/accessible-components',
    publicationDate: new Date('2023-11-15'),
    tags: ['Accessibility', 'Web Components', 'UX'],
    featured: false
  }
]

export default function BlogSection() {
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

  const featuredBlogs = sampleBlogs.filter(blog => blog.featured)
  const recentBlogs = sampleBlogs.slice(0, 6)

  return (
    <section 
      id="blog" 
      className="py-20 lg:py-32 pattern-grid"
      style={{ backgroundColor: 'var(--background-primary)' }}
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
              Latest Articles
            </h2>
            <div className="w-20 h-1 mx-auto rounded-full" style={{ backgroundColor: 'var(--accent-neon)' }}></div>
            <p 
              className="text-lg mt-6 max-w-2xl mx-auto"
              style={{ color: 'var(--text-secondary)' }}
            >
              Thoughts, tutorials, and insights about web development and technology
            </p>
          </motion.div>

          {/* Featured Articles */}
          <motion.div variants={fadeInUp} className="mb-16">
            <h3 
              className="text-2xl font-bold mb-8 text-center"
              style={{ color: 'var(--text-primary)' }}
            >
              Featured Articles
            </h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredBlogs.slice(0, 2).map((blog, index) => (
                <motion.article
                  key={blog.id}
                  variants={fadeInUp}
                  className="group"
                >
                  <a
                    href={blog.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block no-select"
                  >
                    <GlassCard className="rounded-2xl p-6 h-full neon-border">
                      {/* Featured Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <span 
                          className="px-3 py-1 text-sm font-semibold rounded-full"
                          style={{ 
                            backgroundColor: 'var(--accent-neon)',
                            color: 'var(--background-primary)'
                          }}
                        >
                          Featured
                        </span>
                        <time 
                          className="text-sm"
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          {formatDate(blog.publicationDate)}
                        </time>
                      </div>

                      <h4 
                        className="text-xl font-bold mb-3 group-hover: transition-all duration-300"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {blog.title}
                      </h4>

                      <p 
                        className="text-base mb-4 leading-relaxed"
                        style={{ color: 'var(--text-secondary)' }}
                      >
                        {blog.summary}
                      </p>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {blog.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2 py-1 text-xs rounded-full"
                            style={{ 
                              backgroundColor: 'var(--background-secondary)',
                              color: 'var(--accent-neon)'
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Read More */}
                      <div className="flex items-center">
                        <span 
                          className="text-sm font-semibold group-hover:opacity-80 transition-opacity"
                          style={{ color: 'var(--accent-neon)' }}
                        >
                          Read Article →
                        </span>
                      </div>
                    </GlassCard>
                  </a>
                </motion.article>
              ))}
            </div>
          </motion.div>

          {/* All Articles Grid */}
          <motion.div variants={fadeInUp}>
            <h3 
              className="text-2xl font-bold mb-8 text-center"
              style={{ color: 'var(--text-primary)' }}
            >
              Recent Articles
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentBlogs.map((blog, index) => (
                <motion.article
                  key={blog.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="group h-full"
                >
                  <a
                    href={blog.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full no-select"
                  >
                    <GlassCard className="rounded-xl p-6 h-full flex flex-col border group-hover:neon-border">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-3">
                        {blog.featured && (
                          <span 
                            className="px-2 py-1 text-xs font-semibold rounded-full"
                            style={{ 
                              backgroundColor: 'var(--accent-neon)',
                              color: 'var(--background-primary)'
                            }}
                          >
                            Featured
                          </span>
                        )}
                        <time 
                          className="text-sm ml-auto"
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          {formatDate(blog.publicationDate)}
                        </time>
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h4 
                          className="text-lg font-bold mb-3 group-hover: transition-all duration-300 line-clamp-2"
                          style={{ color: 'var(--text-primary)' }}
                        >
                          {blog.title}
                        </h4>

                        <p 
                          className="text-sm mb-4 leading-relaxed line-clamp-3"
                          style={{ color: 'var(--text-secondary)' }}
                        >
                          {blog.summary}
                        </p>
                      </div>

                      {/* Footer */}
                      <div className="mt-auto">
                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mb-3">
                          {blog.tags.slice(0, 2).map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="px-2 py-1 text-xs rounded-full"
                              style={{ 
                                backgroundColor: 'var(--background-secondary)',
                                color: 'var(--accent-neon)'
                              }}
                            >
                              {tag}
                            </span>
                          ))}
                          {blog.tags.length > 2 && (
                            <span
                              className="px-2 py-1 text-xs rounded-full"
                              style={{ 
                                backgroundColor: 'var(--background-secondary)',
                                color: 'var(--text-secondary)'
                              }}
                            >
                              +{blog.tags.length - 2}
                            </span>
                          )}
                        </div>

                        {/* Read More */}
                        <div className="flex items-center">
                          <span 
                            className="text-sm font-semibold group-hover:opacity-80 transition-opacity"
                            style={{ color: 'var(--accent-neon)' }}
                          >
                            Read More →
                          </span>
                        </div>
                      </div>
                    </GlassCard>
                  </a>
                </motion.article>
              ))}
            </div>
          </motion.div>

          {/* View More Button */}
          <motion.div variants={fadeInUp} className="text-center mt-12">
            <a
              href="https://medium.com/@username" // Replace with your blog URL
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-8 py-3 rounded-lg neon-border  font-semibold transition-all duration-300 hover:shadow-lg"
              style={{ color: 'var(--accent-neon)' }}
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              View All Articles
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
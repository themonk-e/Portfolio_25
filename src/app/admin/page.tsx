'use client'

import Link from 'next/link'
import { APP_CONFIG } from '@/lib/constants'

export default function AdminDashboard() {
  if (!APP_CONFIG.admin.enabled) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: 'var(--background-primary)' }}>
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Admin Panel Disabled
          </h1>
          <p style={{ color: 'var(--text-secondary)' }}>
            Admin panel is only available in development mode.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8" style={{ backgroundColor: 'var(--background-primary)' }}>
      <div className="max-w-4xl mx-auto">
        <h1 
          className="text-3xl font-bold mb-8 " 
          style={{ color: 'var(--accent-neon)' }}
        >
          Portfolio Admin Dashboard
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Projects Management */}
          <Link href="/admin/projects">
            <div className="neon-border rounded-lg p-6 hover:shadow-lg transition-all duration-300 cursor-pointer">
              <h2 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                Projects
              </h2>
              <p style={{ color: 'var(--text-secondary)' }}>
                Manage portfolio projects, tech stacks, and showcase items.
              </p>
            </div>
          </Link>

          {/* Skills Management */}
          <Link href="/admin/skills">
            <div className="neon-border rounded-lg p-6 hover:shadow-lg transition-all duration-300 cursor-pointer">
              <h2 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                Skills
              </h2>
              <p style={{ color: 'var(--text-secondary)' }}>
                Manage skills, categories, and proficiency levels.
              </p>
            </div>
          </Link>

          {/* Blogs Management */}
          <Link href="/admin/blogs">
            <div className="neon-border rounded-lg p-6 hover:shadow-lg transition-all duration-300 cursor-pointer">
              <h2 className="text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                Blogs
              </h2>
              <p style={{ color: 'var(--text-secondary)' }}>
                Manage external blog links, tags, and featured posts.
              </p>
            </div>
          </Link>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/">
              <button className="w-full px-4 py-2 rounded border hover:opacity-80 transition-opacity">
                <span style={{ color: 'var(--text-primary)' }}>← Back to Portfolio</span>
              </button>
            </Link>
            <button 
              className="w-full px-4 py-2 rounded neon-border "
              style={{ color: 'var(--accent-neon)' }}
              onClick={() => window.location.reload()}
            >
              Refresh Data
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
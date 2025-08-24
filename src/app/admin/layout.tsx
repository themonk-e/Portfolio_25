import { APP_CONFIG } from '@/lib/constants'
import Link from 'next/link'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Dashboard - Portfolio',
  description: 'Admin panel for managing portfolio content',
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background-primary)' }}>
      {/* Admin Header */}
      <header 
        className="border-b" 
        style={{ 
          backgroundColor: 'var(--background-secondary)',
          borderColor: 'var(--border-default)'
        }}
      >
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/admin">
                <h1 
                  className="text-xl font-bold  cursor-pointer"
                  style={{ color: 'var(--accent-neon)' }}
                >
                  Portfolio Admin
                </h1>
              </Link>
              <nav className="flex space-x-4">
                <Link 
                  href="/admin/projects" 
                  className="hover:opacity-80 transition-opacity"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Projects
                </Link>
                <Link 
                  href="/admin/skills"
                  className="hover:opacity-80 transition-opacity"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Skills
                </Link>
                <Link 
                  href="/admin/blogs"
                  className="hover:opacity-80 transition-opacity"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  Blogs
                </Link>
              </nav>
            </div>
            <Link 
              href="/"
              className="px-4 py-2 rounded border hover:opacity-80 transition-opacity"
              style={{ color: 'var(--text-primary)', borderColor: 'var(--border-default)' }}
            >
              ← Portfolio
            </Link>
          </div>
        </div>
      </header>

      {/* Admin Content */}
      <main>
        {children}
      </main>

      {/* Admin Footer */}
      <footer className="mt-12 py-8 text-center" style={{ color: 'var(--text-secondary)' }}>
        <p>Portfolio Admin Panel - Development Mode</p>
        <p className="text-sm mt-2">
          Admin panel is only available when ADMIN_ENABLED=true
        </p>
      </footer>
    </div>
  )
}
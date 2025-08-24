import Link from 'next/link'

export default function ProjectsAdmin() {
  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 
            className="text-3xl font-bold "
            style={{ color: 'var(--accent-neon)' }}
          >
            Projects Management
          </h1>
          <button 
            className="px-6 py-2 rounded neon-border  font-semibold"
            style={{ color: 'var(--accent-neon)' }}
          >
            + Add Project
          </button>
        </div>

        {/* Projects Table/Grid will be implemented here */}
        <div className="neon-border rounded-lg p-8 text-center">
          <h2 className="text-xl font-semibold mb-4" style={{ color: 'var(--text-primary)' }}>
            Projects Management Coming Soon
          </h2>
          <p style={{ color: 'var(--text-secondary)' }} className="mb-4">
            This section will allow you to:
          </p>
          <ul style={{ color: 'var(--text-secondary)' }} className="text-left max-w-md mx-auto space-y-2">
            <li>• Add new projects with descriptions and tech stacks</li>
            <li>• Edit existing project details</li>
            <li>• Upload project images</li>
            <li>• Set featured projects</li>
            <li>• Add GitHub and demo links</li>
          </ul>
          
          <div className="mt-8">
            <Link href="/admin">
              <button 
                className="px-4 py-2 rounded border mr-4"
                style={{ color: 'var(--text-primary)', borderColor: 'var(--border-default)' }}
              >
                ← Back to Dashboard
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
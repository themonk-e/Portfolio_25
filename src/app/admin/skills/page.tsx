'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface Skill {
  id: number
  name: string
  category: string
  logo: string | null
  logoType: string | null
  createdAt: string
  updatedAt: string
}

interface SkillFormData {
  name: string
  category: string
  logo: string
  logoType: string
  imageFile?: File | null
}

export default function SkillsAdmin() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null)
  const [loading, setLoading] = useState(true)
  const [showAlert, setShowAlert] = useState<{message: string, type: 'success' | 'error'} | null>(null)

  const [formData, setFormData] = useState<SkillFormData>({
    name: '',
    category: 'frontend',
    logo: '',
    logoType: 'emoji',
    imageFile: null
  })

  useEffect(() => {
    fetchSkills()
  }, [])

  const fetchSkills = async () => {
    try {
      const response = await fetch('/api/admin/skills')
      const data = await response.json()
      setSkills(Array.isArray(data) ? data : [])
      setLoading(false)
    } catch (error) {
      console.error('Error fetching skills:', error)
      setSkills([])
      setLoading(false)
    }
  }

  const showAlertMessage = (message: string, type: 'success' | 'error') => {
    setShowAlert({ message, type })
    setTimeout(() => setShowAlert(null), 3000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      let logoUrl = formData.logo
      
      // Handle file upload if needed
      if (formData.logoType === 'upload' && formData.imageFile) {
        const uploadData = new FormData()
        uploadData.append('file', formData.imageFile)
        
        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: uploadData
        })
        
        const uploadResult = await uploadResponse.json()
        
        if (!uploadResponse.ok) {
          showAlertMessage(uploadResult.error || 'File upload failed', 'error')
          return
        }
        
        logoUrl = uploadResult.url
      }
      
      const submitData = {
        name: formData.name,
        category: formData.category,
        logo: logoUrl,
        logoType: formData.logoType
      }
      
      const url = editingSkill 
        ? `/api/admin/skills/${editingSkill.id}` 
        : '/api/admin/skills'
      
      const method = editingSkill ? 'PUT' : 'POST'
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submitData)
      })
      
      const result = await response.json()
      
      if (response.ok) {
        showAlertMessage(
          editingSkill ? 'Skill updated successfully!' : 'Skill added successfully!',
          'success'
        )
        fetchSkills()
        resetForm()
      } else {
        showAlertMessage(result.error || 'Operation failed', 'error')
      }
    } catch (error) {
      showAlertMessage('Network error occurred', 'error')
    }
  }

  const handleEdit = (skill: Skill) => {
    setEditingSkill(skill)
    setFormData({
      name: skill.name,
      category: skill.category,
      logo: skill.logo || '',
      logoType: skill.logoType || 'emoji',
      imageFile: null
    })
    setIsFormOpen(true)
  }

  const handleDelete = async (skill: Skill) => {
    if (!confirm(`Are you sure you want to delete "${skill.name}"? This action cannot be undone.`)) {
      return
    }

    try {
      const response = await fetch(`/api/admin/skills/${skill.id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        showAlertMessage('Skill deleted successfully!', 'success')
        fetchSkills()
      } else {
        showAlertMessage('Failed to delete skill', 'error')
      }
    } catch (error) {
      showAlertMessage('Network error occurred', 'error')
    }
  }

  const resetForm = () => {
    setFormData({ name: '', category: 'frontend', logo: '', logoType: 'emoji', imageFile: null })
    setEditingSkill(null)
    setIsFormOpen(false)
  }

  return (
    <div className="p-8">
      <div className="max-w-6xl mx-auto">
        {/* Alert */}
        {showAlert && (
          <div className={`mb-6 p-4 rounded border ${
            showAlert.type === 'success' 
              ? 'border-green-500 bg-green-500/10 text-green-400' 
              : 'border-red-500 bg-red-500/10 text-red-400'
          }`}>
            {showAlert.message}
          </div>
        )}

        <div className="flex items-center justify-between mb-8">
          <h1 
            className="text-3xl font-bold"
            style={{ color: 'var(--accent-neon)' }}
          >
            Skills Management
          </h1>
          <button 
            onClick={() => setIsFormOpen(true)}
            className="px-6 py-2 rounded neon-border font-semibold"
            style={{ color: 'var(--accent-neon)' }}
          >
            + Add Skill
          </button>
        </div>

        {/* Form Modal */}
        {isFormOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-700 w-full max-w-md">
              <h2 className="text-xl font-bold mb-4 text-white">
                {editingSkill ? 'Edit Skill' : 'Add New Skill'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Skill Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
                  >
                    <option value="frontend">Frontend</option>
                    <option value="backend">Backend</option>
                    <option value="tools">Tools</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Logo Type
                  </label>
                  <select
                    value={formData.logoType}
                    onChange={(e) => setFormData({...formData, logoType: e.target.value, logo: '', imageFile: null})}
                    className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white mb-4"
                  >
                    <option value="emoji">Emoji</option>
                    <option value="url">Image URL</option>
                    <option value="upload">Upload Image</option>
                  </select>

                  {formData.logoType === 'emoji' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Emoji
                      </label>
                      <input
                        type="text"
                        value={formData.logo}
                        onChange={(e) => setFormData({...formData, logo: e.target.value})}
                        className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
                        placeholder="⚛️ 🔺 📘 etc."
                      />
                    </div>
                  )}

                  {formData.logoType === 'url' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Image URL
                      </label>
                      <input
                        type="url"
                        value={formData.logo}
                        onChange={(e) => setFormData({...formData, logo: e.target.value})}
                        className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
                        placeholder="https://example.com/logo.png"
                      />
                    </div>
                  )}

                  {formData.logoType === 'upload' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Upload PNG Image
                      </label>
                      <input
                        type="file"
                        accept=".png,.jpg,.jpeg,.svg"
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null
                          setFormData({...formData, imageFile: file, logo: file ? file.name : ''})
                        }}
                        className="w-full p-2 border border-gray-600 rounded bg-gray-800 text-white"
                      />
                      {formData.imageFile && (
                        <div className="mt-2 text-sm text-gray-400">
                          Selected: {formData.imageFile.name}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex gap-4 mt-6">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
                  >
                    {editingSkill ? 'Update' : 'Add'} Skill
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Skills Grid */}
        {loading ? (
          <div className="text-center py-8" style={{ color: 'var(--text-secondary)' }}>
            Loading skills...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill) => (
              <div key={skill.id} className="border border-gray-700 rounded-lg p-4 bg-gray-900">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {skill.logoType === 'emoji' || !skill.logoType ? (
                      <span className="text-2xl">{skill.logo || '💻'}</span>
                    ) : (
                      <img 
                        src={skill.logo || '/default-skill.png'} 
                        alt={skill.name}
                        className="w-8 h-8 object-contain"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                          e.currentTarget.nextElementSibling!.style.display = 'inline'
                        }}
                      />
                    )}
                    <span className="text-2xl hidden">💻</span>
                    <h3 className="font-bold text-white">{skill.name}</h3>
                  </div>
                  <span className="text-xs bg-gray-700 px-2 py-1 rounded text-gray-300">
                    {skill.category}
                  </span>
                </div>
                
                <div className="mb-3">
                  <div className="text-sm text-gray-400">
                    Type: {skill.logoType || 'emoji'}
                  </div>
                </div>

                <div className="text-xs text-gray-500 mb-4">
                  Added: {new Date(skill.createdAt).toLocaleDateString()}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(skill)}
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(skill)}
                    className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-sm rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {skills.length === 0 && !loading && (
          <div className="text-center py-8 border border-gray-700 rounded-lg">
            <p className="text-gray-400 mb-4">No skills added yet</p>
            <button
              onClick={() => setIsFormOpen(true)}
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded"
            >
              Add Your First Skill
            </button>
          </div>
        )}

        <div className="mt-8">
          <Link href="/admin">
            <button 
              className="px-4 py-2 rounded border"
              style={{ color: 'var(--text-primary)', borderColor: 'var(--border-default)' }}
            >
              ← Back to Dashboard
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
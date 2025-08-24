export interface Project {
  id: number
  title: string
  description: string
  summary: string
  techStack: string[]
  githubLink?: string
  demoLink?: string
  imageUrl?: string
  featured: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Skill {
  id: number
  name: string
  category: 'frontend' | 'backend' | 'tools'
  proficiency: number
  iconName?: string
  createdAt: Date
}

export interface Blog {
  id: number
  title: string
  summary: string
  externalLink: string
  publicationDate?: Date
  tags: string[]
  featured: boolean
  createdAt: Date
  updatedAt: Date
}

export interface ContactForm {
  name: string
  email: string
  subject: string
  message: string
}
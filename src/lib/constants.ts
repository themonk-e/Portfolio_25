export const APP_CONFIG = {
  site: {
    name: 'Personal Portfolio',
    description: 'Personal portfolio showcasing projects, skills, and blog posts',
    author: 'Portfolio Owner',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  },
  theme: {
    colors: {
      background: {
        primary: '#0a0a0a',
        secondary: '#1a1a1a',
      },
      accent: {
        neon: '#00ff41',
      },
      text: {
        primary: '#ffffff',
        secondary: '#b3b3b3',
      },
      border: {
        default: '#333333',
      },
      glass: {
        light: 'rgba(255, 255, 255, 0.05)',
        medium: 'rgba(255, 255, 255, 0.1)',
        dark: 'rgba(0, 0, 0, 0.3)',
        border: 'rgba(255, 255, 255, 0.1)',
        shadow: 'rgba(0, 0, 0, 0.3)',
      }
    },
    animations: {
      duration: {
        fast: 150,
        normal: 300,
        slow: 500,
      },
      easing: {
        default: 'ease-in-out',
        bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      }
    }
  },
  sections: {
    hero: {
      typewriterText: 'Developer & AI ML Enthusiast',
      scrollIndicatorDelay: 2000,
    },
    skills: {
      categories: ['frontend', 'backend', 'tools'] as const,
      maxProficiency: 10,
    },
    projects: {
      itemsPerPage: 6,
      featuredFirst: true,
    },
    blogs: {
      itemsPerPage: 6,
      featuredFirst: true,
    }
  },
  contact: {
    emailjs: {
      serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '',
      templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '',
      publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '',
    },
    maxMessageLength: 1000,
    requiredFields: ['name', 'email', 'subject', 'message'] as const,
  },
  admin: {
    enabled: process.env.ADMIN_ENABLED === 'true',
    paths: {
      dashboard: '/admin',
      projects: '/admin/projects',
      skills: '/admin/skills',
      blogs: '/admin/blogs',
    }
  },
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || '/api',
    endpoints: {
      projects: '/api/projects',
      skills: '/api/skills',
      blogs: '/api/blogs',
      contact: '/api/contact',
    }
  },
  files: {
    resume: '/resume.pdf',
    maxImageSize: 5 * 1024 * 1024, // 5MB
    allowedImageTypes: ['image/jpeg', 'image/png', 'image/webp'],
  }
} as const

export const SKILL_CATEGORIES = {
  frontend: 'Frontend',
  backend: 'Backend',
  tools: 'Tools & Others',
} as const

export const SOCIAL_LINKS = {
  github: 'https://github.com/username',
  linkedin: 'https://linkedin.com/in/username',
  email: 'mailto:contact@example.com',
  twitter: 'https://twitter.com/username',
} as const

export const NAVIGATION_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Blog', href: '#blog' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
] as const

export const META_TAGS = {
  defaultTitle: 'Personal Portfolio',
  titleTemplate: '%s | Personal Portfolio',
  defaultDescription: 'Personal portfolio showcasing projects, skills, and blog posts',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  image: '/images/og-image.png',
  twitterCard: 'summary_large_image',
  locale: 'en_US',
} as const
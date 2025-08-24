'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { APP_CONFIG, SOCIAL_LINKS } from '@/lib/constants'
import { validateEmail } from '@/lib/utils'
import type { ContactForm } from '@/types'

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ContactForm>()

  const onSubmit = async (data: ContactForm) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Here you would integrate with your email service (EmailJS, etc.)
      // For now, we'll simulate a submission
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      console.log('Contact form submitted:', data)
      setSubmitStatus('success')
      reset()
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

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

  return (
    <section 
      id="contact" 
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
              Get In Touch
            </h2>
            <div className="w-20 h-1 mx-auto rounded-full" style={{ backgroundColor: 'var(--accent-neon)' }}></div>
            <p 
              className="text-lg mt-6 max-w-2xl mx-auto"
              style={{ color: 'var(--text-secondary)' }}
            >
              Have a project in mind or just want to say hello? I&apos;d love to hear from you!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Info */}
            <motion.div variants={fadeInUp} className="space-y-8">
              <div>
                <h3 
                  className="text-2xl font-bold mb-6"
                  style={{ color: 'var(--text-primary)' }}
                >
                  Let&apos;s Connect
                </h3>
                <p 
                  className="text-lg leading-relaxed mb-8"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  I&apos;m always open to discussing new opportunities, interesting projects, 
                  or just having a chat about technology and development.
                </p>
              </div>

              {/* Contact Methods */}
              <div className="space-y-6">
                <a 
                  href={SOCIAL_LINKS.email}
                  className="flex items-center space-x-4 group transition-all duration-300 hover:opacity-80"
                >
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center neon-border"
                    style={{ backgroundColor: 'var(--background-primary)' }}
                  >
                    <svg 
                      className="w-6 h-6" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      style={{ color: 'var(--accent-neon)' }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p 
                      className="font-semibold group-hover: transition-all duration-300"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      Email
                    </p>
                    <p style={{ color: 'var(--text-secondary)' }}>
                      contact@example.com
                    </p>
                  </div>
                </a>

                <a 
                  href={SOCIAL_LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 group transition-all duration-300 hover:opacity-80"
                >
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center neon-border"
                    style={{ backgroundColor: 'var(--background-primary)' }}
                  >
                    <svg 
                      className="w-6 h-6" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                      style={{ color: 'var(--accent-neon)' }}
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </div>
                  <div>
                    <p 
                      className="font-semibold group-hover: transition-all duration-300"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      LinkedIn
                    </p>
                    <p style={{ color: 'var(--text-secondary)' }}>
                      /in/username
                    </p>
                  </div>
                </a>

                <a 
                  href={SOCIAL_LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 group transition-all duration-300 hover:opacity-80"
                >
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center neon-border"
                    style={{ backgroundColor: 'var(--background-primary)' }}
                  >
                    <svg 
                      className="w-6 h-6" 
                      fill="currentColor" 
                      viewBox="0 0 24 24"
                      style={{ color: 'var(--accent-neon)' }}
                    >
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </div>
                  <div>
                    <p 
                      className="font-semibold group-hover: transition-all duration-300"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      GitHub
                    </p>
                    <p style={{ color: 'var(--text-secondary)' }}>
                      @username
                    </p>
                  </div>
                </a>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={fadeInUp}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label 
                    htmlFor="name"
                    className="block text-sm font-semibold mb-2"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Name *
                  </label>
                  <input
                    {...register('name', { 
                      required: 'Name is required',
                      minLength: { value: 2, message: 'Name must be at least 2 characters' }
                    })}
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:neon-border"
                    style={{ 
                      backgroundColor: 'var(--background-primary)',
                      color: 'var(--text-primary)',
                      borderColor: errors.name ? '#ef4444' : 'var(--border-default)'
                    }}
                    placeholder="Your Name"
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label 
                    htmlFor="email"
                    className="block text-sm font-semibold mb-2"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Email *
                  </label>
                  <input
                    {...register('email', { 
                      required: 'Email is required',
                      validate: value => validateEmail(value) || 'Please enter a valid email'
                    })}
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:neon-border"
                    style={{ 
                      backgroundColor: 'var(--background-primary)',
                      color: 'var(--text-primary)',
                      borderColor: errors.email ? '#ef4444' : 'var(--border-default)'
                    }}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                {/* Subject Field */}
                <div>
                  <label 
                    htmlFor="subject"
                    className="block text-sm font-semibold mb-2"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Subject *
                  </label>
                  <input
                    {...register('subject', { 
                      required: 'Subject is required',
                      minLength: { value: 5, message: 'Subject must be at least 5 characters' }
                    })}
                    type="text"
                    id="subject"
                    className="w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:neon-border"
                    style={{ 
                      backgroundColor: 'var(--background-primary)',
                      color: 'var(--text-primary)',
                      borderColor: errors.subject ? '#ef4444' : 'var(--border-default)'
                    }}
                    placeholder="What's this about?"
                  />
                  {errors.subject && (
                    <p className="text-red-400 text-sm mt-1">{errors.subject.message}</p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label 
                    htmlFor="message"
                    className="block text-sm font-semibold mb-2"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    Message *
                  </label>
                  <textarea
                    {...register('message', { 
                      required: 'Message is required',
                      minLength: { value: 10, message: 'Message must be at least 10 characters' },
                      maxLength: { 
                        value: APP_CONFIG.contact.maxMessageLength, 
                        message: `Message must be less than ${APP_CONFIG.contact.maxMessageLength} characters` 
                      }
                    })}
                    id="message"
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border transition-all duration-300 focus:outline-none focus:neon-border resize-vertical"
                    style={{ 
                      backgroundColor: 'var(--background-primary)',
                      color: 'var(--text-primary)',
                      borderColor: errors.message ? '#ef4444' : 'var(--border-default)'
                    }}
                    placeholder="Tell me about your project or just say hello..."
                  />
                  {errors.message && (
                    <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-8 py-4 rounded-lg neon-border  font-semibold transition-all duration-300 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ color: 'var(--accent-neon)' }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <span>Send Message</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </div>
                  )}
                </motion.button>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-green-400 text-center"
                  >
                    ✅ Thank you! Your message has been sent successfully.
                  </motion.div>
                )}

                {submitStatus === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-red-400 text-center"
                  >
                    ❌ Sorry, there was an error sending your message. Please try again.
                  </motion.div>
                )}
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
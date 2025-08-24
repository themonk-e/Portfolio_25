/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [],
  },
  env: {
    ADMIN_ENABLED: process.env.NODE_ENV === 'development' ? 'true' : 'false',
  },
}

module.exports = nextConfig
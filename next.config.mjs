import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Your Next.js config here
  output: 'standalone',
  remotePatterns: [
    {
      protocol: 'https',
      hostname: 'q4aw4kksczq5nsez.public.blob.vercel-storage.com', // Your deployed domain
      pathname: '/api/media/file/**',
    },
    {
      protocol: 'http',
      hostname: '*', // Allow images from all HTTP domains
    },
  ],
}

export default withPayload(nextConfig, { devBundleServerPackages: false })

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bixel-uploads.s3.amazonaws.com",
      },
    ],
  },
}

export default nextConfig

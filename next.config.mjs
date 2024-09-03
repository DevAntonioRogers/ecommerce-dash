/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ih1.redbubble.net"
      },
      {
        protocol: "https",
        hostname: "cloudflare-ipfs.com"
      },
      {
        protocol: "https",
        hostname: "utfs.io"
      }
    ]
  }
};

export default nextConfig;

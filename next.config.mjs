/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: {
      // Increase body size limit for server actions (e.g., large video uploads)
      bodySizeLimit: '2gb', // you can raise this value if you need even larger files
    },
  },
  api: {
    // Increase the default API route body parser limit (default is 1 MB)
    bodyParser: {
      sizeLimit: '2gb', // matches the serverActions limit
    },
  },
};

export default nextConfig;


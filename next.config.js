/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env:{
    CAT_API_KEY:process.env.CAT_API_KEY
  },
  experimental: {
    scrollRestoration: true,
  },
  images:{
    domains:["cdn2.thecatapi.com"]
  }
}

module.exports = nextConfig

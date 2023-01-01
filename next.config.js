/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env:{
    CAT_API_KEY:process.env.CAT_API_KEY
  },
  images:{
    domains:["cdn2.thecatapi.com"]
  }
}

module.exports = nextConfig

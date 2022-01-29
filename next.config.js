/* eslint-disable @typescript-eslint/no-var-requires */

const WindiCSSWebpackPlugin = require('windicss-webpack-plugin')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  swcMinify: true,
  compress: true,
  webpack(config) {
    config.plugins.push(new WindiCSSWebpackPlugin())
    return config
  },
  async headers() {
    return [
      {
        source: '/feeds/json',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/json; charset=UTF-8'
          }
        ]
      },
      {
        source: '/feeds/atom.xml',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/atom+xml; charset=UTF-8'
          }
        ]
      },
      {
        source: '/feeds/rss.xml',
        headers: [
          {
            key: 'Content-Type',
            value: 'application/rss+xml; charset=UTF-8'
          }
        ]
      }
    ]
  },
  images: {
    domains: ['imagedelivery.net']
  },
  experimental: {
    // removeConsole: true
  }
}

module.exports = nextConfig

// trunk-ignore(eslint/@typescript-eslint/no-var-requires)
const WindiCSSWebpackPlugin = require('windicss-webpack-plugin')

const headers = {
  json: [
    {
      key: 'Content-Type',
      value: 'application/feed+json; charset=UTF-8'
    }
  ],
  atom: [
    {
      key: 'Content-Type',
      value: 'application/atom+xml; charset=UTF-8'
    }
  ],
  rss: [
    {
      key: 'Content-Type',
      value: 'application/rss+xml; charset=UTF-8'
    }
  ],
  text: [
    {
      key: 'Content-Type',
      value: 'text/plain'
    }
  ]
}

/**
 * @type { import('next').NextConfig }
 */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  swcMinify: true,
  compress: true,
  webpack(config) {
    config.plugins.push(new WindiCSSWebpackPlugin())
    return config
  },
  headers() {
    return [
      {
        source: '/feeds/posts.json',
        headers: headers.json
      },
      {
        source: '/feeds/posts.atom.xml',
        headers: headers.atom
      },
      {
        source: '/feeds/posts.rss.xml',
        headers: headers.rss
      },
      {
        source: '/feeds/changelog.json',
        headers: headers.json
      },
      {
        source: '/feeds/changelog.atom.xml',
        headers: headers.atom
      },
      {
        source: '/feeds/changelog.rss.xml',
        headers: headers.rss
      },
      {
        source: '/ssh.pub',
        headers: headers.text
      }
    ]
  },
  images: {
    domains: [
      'imagedelivery.net',
      'img.shields.io',
      'placekitten.com',
      'glog-photo.miao.dev'
    ]
  }
}

module.exports = nextConfig

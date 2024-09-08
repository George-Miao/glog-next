import type { FeedOptions } from 'feed'
import type { DefaultSeoProps } from 'next-seo'

import { Fira_Code, Josefin_Sans, Merriweather } from "next/font/google"

import type { GlogConfig } from '@type/config'

const firaCode = Fira_Code({
  weight: '400',
  style: 'normal',
  subsets: ['latin'],
  variable: '--font-fira-code'
})
const merriweather = Merriweather({
  weight: ['300', '400', '700'],
  display: 'swap',
  preload: true,
  subsets: ['latin'],
  style: ['italic', 'normal'],
  variable: '--font-merriweather'
})
const josefinSans = Josefin_Sans({
  weight: 'variable',
  display: 'swap',
  preload: true,
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-josefin-sans'
})

export const config: GlogConfig = {
  domain: 'miao.dev',
  siteTitle: 'Glog',
  description: "George Miao's Site",
  image: 'https://example.com/image.png', // TODO: image
  favicon: 'https://example.com/favicon.ico', // TODO: favicon
  corsProxy: 'https://cors-proxy.miao.dev/?url=%s',
  photoProxy: process.env.PHOTO_URL ?? '',
  twitter: {
    site: '@PopDotLol',
    cardType: 'summary_large_image'
  },
  openGraph: {
    type: 'website',
    profile: {
      firstName: 'George',
      lastName: 'Miao',
      gender: 'male',
      username: 'George-Miao'
    }
  },
  resumeList: [
    {
      title: 'Syracuse University',
      value: '2020 - Now',
      subtitle: 'Undergraduate'
    },
    {
      title: 'Moseeker Shanghai',
      value: '2021',
      subtitle: 'Intern as frontend dev'
    },
    {
      title: 'Syracuse University',
      value: '2020 - 2021',
      subtitle: 'Research assistant'
    },
    {
      title: 'Cornell University',
      value: '2020 Summer',
      subtitle: 'SCE Precollege program'
    },
    {
      title: 'Georegtown University',
      value: '2019 Summer',
      subtitle: 'HOYA summer'
    },
    {
      title: 'Montverde Academy',
      value: '2018 - 2020',
      subtitle: 'Highschool'
    }
  ],
  linksList: [
    {
      title: 'NovaDNG',
      value: 'NovaDNG.studio',
      link: 'https://novadng.studio',
      subtitle: '字体学徒'
    },
    {
      title: 'Yuuta',
      value: 'GARDEN IN THE WONDERLAND',
      link: 'https://yuuta.moe'
    }
  ],
  proj: [
    {
      name: 'Tharsis',
      description: 'My home server rack',
      icon: 'bx:bxs-planet',
      items: [
        {
          name: 'Proxmox',
          isPrivate: true,
          description:
            'VM environment, hosts most of my services in Tharsis. Installed on R720',
          icon: 'cib:proxmox'
        },
        {
          name: 'OPNsense',
          isPrivate: true,
          description: 'Router, installed on a separated R420',
          icon: 'simple-icons:opnsense'
        },
        {
          name: 'Prometheus',
          isPrivate: true,
          description: 'Matrix collector',
          icon: 'simple-icons:prometheus'
        },
        {
          name: 'Grafana',
          isPrivate: true,
          description:
            'Matrix visualization which consumes data from Prometheus. Deployed on-premise',
          icon: 'simple-icons:grafana'
        },

        {
          name: 'Teamcity',
          isPrivate: true,
          description: 'CI/CD system by Jetbrains',
          icon: 'simple-icons:teamcity'
        },
        {
          name: 'SSH',
          isPrivate: true,
          description:
            'SSH bastion, with security provided by Cloudflare Access',
          icon: 'mdi:ssh'
        }
      ]
    },
    {
      name: 'Tharsis US',
      description: 'ITX server in Syracuse, NY',
      icon: 'bx:planet',
      items: [
        {
          name: 'Proxmox',
          isPrivate: true,
          description:
            'VM environment, hosts most of my services in Tharsis US',
          icon: 'cib:proxmox'
        },
        {
          name: 'Home Assistant',
          isPrivate: true,
          description: 'Home automation system',
          icon: 'mdi:home-assistant'
        },
        {
          name: 'AdGuard Home',
          github: 'https://github.com/AdguardTeam/AdGuardHome',
          link: 'https://adguard.com/en/welcome.html',
          description: 'AdGuard for DNS filtering',
          icon: 'simple-icons:adguard'
        }
      ]
    },
    {
      name: 'Sites',
      icon: 'ic:twotone-web-asset',
      description: 'Deployed and maintaining',
      items: [
        {
          name: 'Blog',
          link: 'https://miao.dev',
          github: 'https://github.com/George-Miao/GlogHexo',
          description:
            'My blog. Use hexo for generation. Built with Next.js and WindiCSS',
          icon: 'cib:next-js'
        },
        {
          name: 'Typings.dev',
          link: 'https://typings.dev',
          github: 'https://github.com/George-Miao/typings.dev',
          description:
            'Typing practice site for Pinyin and Shuang users inspired by Typing-cn',
          icon: 'ion:logo-vue'
        },
        {
          name: 'Pop.tg',
          link: 'https://www.pop.tg',
          github: 'https://github.com/Pop-tg/main',
          description:
            'URL shortener, built with Svelte, Typescript and Cloudflare Worker',
          icon: 'cib:cloudflare'
        },

        {
          name: 'Rushia button',
          link: 'https://rushia.moe',
          github: 'https://github.com/Rushia-cn/Rushia-button',
          description: 'Button panel of vtuber, Uruha Rushia',
          icon: 'vs:butterfly'
        },
        {
          name: 'Grafana',
          link: 'https://grafana.miao.dev',
          healthCheck: 'https://grafana.miao.dev/api/health',
          description:
            'Matrix visualization which consumes data from Prometheus. Deployed on Fly.io',
          icon: 'simple-icons:grafana'
        }
      ]
    },
    {
      name: 'Projects',
      icon: 'eos-icons:flask',
      description: 'Works have done and doing',
      items: [
        {
          name: 'Stargazer Reborn',
          icon: 'cib:rust',
          github: 'https://github.com/Suisei-CN/stargazer-reborn',
          description: 'A flexible vtuber tracker, reborn'
        },
        {
          name: 'Mail List Rss',
          icon: 'cib:rust',
          github: 'https://github.com/George-Miao/mail-list-rss',
          healthCheck: 'https://rss.miao.do/health',
          description:
            'Translate mail subscription to a RSS feed, written in Rust'
        },
        {
          name: 'Shot',
          icon: 'cib:rust',
          github: 'https://github.com/George-Miao/shot',
          description:
            'Simple CLI that encode and upload images to Cloudflare Image, either from clipboard, or local file'
        },
        {
          name: 'Clashctl',
          icon: 'cib:rust',
          github: 'https://github.com/George-Miao/clashctl',
          description:
            'Easy-to-use TUI & CLI to interact with Clash RESTful API'
        },
        {
          name: 'Knotify telegram',
          icon: 'akar-icons:telegram-fill',
          github: 'https://github.com/George-Miao/knotify-telegram',
          description:
            'Bot as a bridge, forward HTTP request and PM to my telegram',
          indicators: [
            {
              icon: 'cib:typescript'
            }
          ]
        },
        {
          name: 'Golden Axe',
          icon: 'akar-icons:telegram-fill',
          github: 'https://github.com/suisei-cn/golden-axe-rs',
          description: 'Anti-vandalism bot for Telegram',
          healthCheck: 'https://golden-axe.fly.dev/health',
          indicators: [
            {
              icon: 'cib:rust'
            }
          ]
        },
        {
          name: 'RSS worker',
          icon: 'cib:cloudflare',
          github: 'https://github.com/George-Miao/rss-worker',
          description:
            'Cloudflare worker that generates RSS feed from various source',
          indicators: [
            {
              icon: 'cib:typescript'
            }
          ]
        }
      ]
    },
    {
      name: 'Misc',
      icon: 'material-symbols:auto-awesome-outline-rounded',
      description: 'Other things',
      items: [
        {
          name: 'Bitwarden',
          icon: 'simple-icons:bitwarden',
          isPrivate: true,
          description: 'Opensource password manager'
        },
        {
          name: 'Upptime status',
          icon: 'ic:outline-monitor-heart',
          link: 'https://status.miao.dev',
          github: 'https://github.com/George-Miao/upptime',
          description: 'Status page of my services'
        },
        {
          name: 'Conduit Matrix server',
          icon: 'cib:matrix',
          link: 'https://conduit.rs',
          healthCheck: 'https://matrix.miao.dev/_matrix/client/versions',
          description: 'Open source, decentralized chat'
        }
      ]
    }
  ],
  fonts: [firaCode, merriweather, josefinSans],
  navbar: {
    links: [
      {
        link: '/writing',
        icon: 'clarity:pencil-solid',
        text: 'writing'
      },
      {
        link: '/changelog',
        icon: 'mdi:timeline-text',
        text: 'changelog'
      },
      {
        link: '/gallery',
        icon: 'material-symbols:camera-outline-rounded',
        text: 'gallery'
      },
      {
        link: '/projects',
        icon: 'mdi:flask',
        text: 'projects'
      },
      {
        link: '/feeds',
        icon: 'foundation:rss',
        text: 'feeds'
      }
    ]
  }
}

export const defaultSeo: DefaultSeoProps = {
  defaultTitle: config.siteTitle,
  description: config.description,
  titleTemplate: `%s | ${config.siteTitle}`,
  twitter: config.twitter,
  openGraph: {
    ...config.openGraph,
    description: config.description
  }
}

export const feedBase: FeedOptions = {
  title: config.domain,
  description: config.description,
  id: `https://${config.domain}/`,
  link: `https://${config.domain}/`,
  image: config.image,
  favicon: config.favicon,
  updated: new Date(),
  generator: `${config.domain}`,
  feedLinks: {
    json: `https://${config.domain}/feeds/json`,
    atom: `https://${config.domain}/feeds/atom.xml`,
    rss: `https://${config.domain}/feeds/rss.xml`
  },
  copyright: ''
}

export const fontVars = config.fonts.map(f => f.variable).join(' ')

export default config

import type { FeedOptions } from 'feed'
import type { DefaultSeoProps } from 'next-seo'

import { Fira_Code, Josefin_Sans, Merriweather } from 'next/font/google'

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
  education: [
    {
      title: 'University of Maryland',
      value: '2025 - Present',
      subtitle: 'Master',
      link: 'https://umd.edu'
    },
    {
      title: 'Waseda University',
      value: '2024 Spring',
      subtitle: 'Exchange Student',
      link: 'https://www.waseda.jp'
    },
    {
      title: 'Syracuse University',
      value: '2020 - 2024',
      subtitle: 'Undergraduate',
      link: 'https://syracuse.edu'
    }
  ],
  professional: [
    {
      title: 'Limit Lab',
      value: '2022 - 2024',
      subtitle: 'Co-Founder, CTO',
      link: 'https://limit.dev/'
    },
    {
      title: 'SOURCE',
      value: '2023 Fall',
      subtitle: 'Research assistant',
      link: 'https://undergraduateresearch.syracuse.edu/source-opportunites/'
    },
    {
      title: 'MoSeeker Inc.',
      value: '2021 Spring',
      subtitle: 'Intern as frontend dev',
      link: 'https://www.moseeker.com/'
    },
    {
      title: 'Syracuse University',
      value: '2020 Fall',
      subtitle: 'Research assistant'
    }
  ],
  links: [
    {
      title: 'NovaDNG',
      value: 'NovaDNG.studio',
      subtitle: '字体学徒',
      link: 'https://novadng.studio'
    },
    {
      title: 'Yuuta',
      value: 'GARDEN IN THE WONDERLAND',
      link: 'https://yuuta.moe'
    }
  ],
  proj: [
    {
      name: 'Projects',
      icon: 'eos-icons:flask',
      description: 'Created, maintained or contributed',
      items: [
        {
          name: 'Compio',
          icon: {
            url: 'https://raw.githubusercontent.com/compio-rs/compio-logo/refs/heads/master/generated/bold.svg'
          },
          link: 'https://compio.rs',
          github: 'https://github.com/compio-rs/compio',
          description: 'Completion IO based asynchronous runtime for Rust',
          indicators: [{ icon: 'cib:rust' }]
        },
        {
          name: 'OpenDAL',
          icon: 'devicon-plain:apache',
          github: 'https://github.com/apache/opendal',
          description: 'Apache OpenDAL: One Layer, All Storage.',
          indicators: [{ icon: 'cib:rust' }]
        },
        {
          name: 'qbit-rs',
          icon: 'cib:rust',
          github: 'https://github.com/George-Miao/qbit',
          description:
            "A Rust library for interacting with qBittorrent's Web API"
        },
        {
          name: 'Typings.dev',
          icon: 'ion:logo-vue',
          link: 'https://typings.dev',
          github: 'https://github.com/George-Miao/typings.dev',
          description: 'Typing practice site for Pinyin and Shuang users',
          indicators: [{ icon: 'ion:logo-vue' }]
        },
        {
          name: 'Rushia button',
          link: 'https://rushia.moe',
          github: 'https://github.com/Rushia-cn/Rushia-button',
          description: 'Button panel of vtuber, Uruha Rushia',
          icon: 'vs:butterfly',
          indicators: [{ icon: 'ion:logo-vue' }, { icon: 'cib:typescript' }]
        },
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
          indicators: [{ icon: 'cib:typescript' }]
        },
        {
          name: 'Golden Axe',
          icon: 'akar-icons:telegram-fill',
          github: 'https://github.com/suisei-cn/golden-axe-rs',
          description: 'Anti-vandalism bot for Telegram',
          healthCheck: 'https://golden-axe.fly.dev/health',
          indicators: [{ icon: 'cib:rust' }]
        },
        {
          name: 'RSS worker',
          icon: 'cib:cloudflare',
          github: 'https://github.com/George-Miao/rss-worker',
          description:
            'Cloudflare worker that generates RSS feed from various source',
          indicators: [{ icon: 'cib:cloudflare' }, { icon: 'cib:typescript' }]
        }
      ]
    },
    {
      name: 'Vec.sh CGS',
      description: 'ITX server at College Park, MD',
      icon: 'bx:planet',
      items: [
        {
          name: 'Proxmox',
          description: 'VM environment',
          icon: 'cib:proxmox'
        },
        {
          name: 'Home Assistant',
          description: 'Home automation system',
          icon: 'mdi:home-assistant'
        },
        {
          name: 'TrueNAS Scale',
          description: 'Storage server',
          icon: 'simple-icons:truenas'
        },
        {
          name: 'K8s Cluster',
          description: 'K8s cluster deployed with talos and OpenTofu on PVE',
          icon: 'cib:kubernetes',
          indicators: [
            { icon: 'simple-icons:talos', link: 'https://www.talos.dev' },
            { icon: 'simple-icons:opentofu', link: 'https://opentofu.org' }
          ]
        }
      ]
    },
    {
      name: 'Vec.sh IAD',
      description: 'K8s cluster on Hetzner Cloud',
      icon: 'simple-icons:hetzner',
      items: [
        {
          name: 'Vaultwarden',
          icon: 'simple-icons:bitwarden',
          description: 'Opensource password manager server'
        }
      ]
    },
    {
      name: 'Vec.sh YUL',
      icon: 'simple-icons:caprover',
      description: 'CapRover server on OVH Cloud',
      items: [
        {
          name: 'Uptime status',
          icon: 'ic:outline-monitor-heart',
          link: 'https://uptime.miao.do',
          description: 'Status page of my services'
        },
        {
          name: 'Affine',
          icon: 'simple-icons:affine',
          link: 'https://affine.miao.do',
          description: 'A collaborative design tool'
        },
        {
          name: 'Bin',
          icon: 'akar-icons:trash-bin',
          link: 'https://bin.miao.do',
          description: 'A paste bin.'
        },

        {
          name: 'Filestash',
          icon: 'solar:folder-with-files-bold-duotone',
          link: 'https://file.miao.do',
          description: 'Web-based file manager'
        },
        {
          name: 'Filebrowser',
          icon: 'solar:folder-with-files-bold-duotone',
          link: 'https://filebrowser.miao.do',
          description: 'Another web-based file manager'
        },
        {
          name: 'Flame',
          icon: 'mdi:fire',
          link: 'https://flame.miao.do',
          description: 'Startpage that I never used'
        },
        {
          name: 'Grafana',
          icon: 'simple-icons:grafana',
          link: 'https://grafana.miao.do',
          description: 'Grafana is... Grafana'
        },
        {
          name: 'Immich',
          icon: 'simple-icons:immich',
          link: 'https://immich.miao.do ',
          description: 'Self-hosted photo management solution'
        },
        {
          name: 'Jellyfin',
          icon: 'simple-icons:jellyfin',
          link: 'https://jellyfin.miao.do',
          description: 'Self-hosted media server'
        },
        {
          name: 'Loki',
          icon: 'simple-icons:grafana',
          link: 'https://loki.miao.do',
          description: 'Log aggregation system'
        },
        {
          name: 'Poste.io',
          icon: 'mi:email',
          link: 'https://mail.miao.do',
          description: 'Mail server'
        },
        {
          name: 'Overseerr',
          icon: 'cbi:overseerr',
          link: 'https://overseerr.miao.do',
          description: 'Media request management system'
        },
        {
          name: 'Sonarr',
          icon: 'simple-icons:sonarr',
          link: 'https://sonarr.miao.do',
          description: 'TV series collection manager'
        },
        {
          name: 'Prowlarr',
          icon: 'cbi:prowlarr',
          link: 'https://prowlarr.miao.do',
          description: 'Indexers manager for Sonarr and Radarr'
        },
        {
          name: 'Owncast',
          icon: 'fluent:live-20-filled',
          link: 'https://owncast.miao.do',
          description: 'Self-hosted live video streaming'
        },
        {
          name: 'Qbittorrent',
          icon: 'cbi:qbittorrent',
          link: 'https://qb.miao.do/',
          description: 'Web UI of qBittorrent'
        },
        {
          name: 'Riven',
          icon: {
            url: 'https://raw.githubusercontent.com/rivenmedia/riven/main/assets/riven-dark.png'
          },
          link: 'https://riven.miao.do',
          description: 'Plex torrent streaming'
        },
        {
          name: 'Plex',
          icon: 'mdi:plex',
          link: 'https://plex.miao.do',
          description: 'Plex media server'
        },
        {
          name: 'Stirling PDF',
          icon: 'proicons:pdf',
          link: 'https://pdf.miao.do',
          description: 'PDF Toolkit'
        },
        {
          name: 'Scrutiny',
          icon: 'mdi:harddisk',
          link: 'https://scrutiny.miao.do',
          description: 'HDD health monitoring'
        }
      ]
    },
    {
      name: 'Tharsis',
      description: 'Full size server rack',
      icon: 'bx:bxs-planet',
      items: [
        {
          name: 'Proxmox',
          description:
            'VM environment, hosts most of my services in Tharsis. Installed on R720',
          icon: 'cib:proxmox'
        },
        {
          name: 'OPNsense',
          description: 'Router, installed on a separated R420',
          icon: 'simple-icons:opnsense'
        },
        {
          name: 'Prometheus',
          description: 'Matrix collector',
          icon: 'simple-icons:prometheus'
        },
        {
          name: 'Grafana',
          description:
            'Matrix visualization which consumes data from Prometheus. Deployed on-premise',
          icon: 'simple-icons:grafana'
        },

        {
          name: 'Teamcity',
          description: 'CI/CD system by Jetbrains',
          icon: 'simple-icons:teamcity'
        },
        {
          name: 'SSH',
          description:
            'SSH bastion, with security provided by Cloudflare Access',
          icon: 'mdi:ssh'
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
      // {
      //   link: '/gallery',
      //   icon: 'material-symbols:camera-outline-rounded',
      //   text: 'gallery'
      // },
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

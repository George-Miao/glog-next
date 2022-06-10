import { defineProjCategories } from './types'

const categories = defineProjCategories([
  {
    name: 'Tharsis',
    description: 'My home server rack',
    icon: 'bx:bxs-planet',
    items: [
      {
        name: 'Proxmox',
        isPrivate: true,
        description: 'VM environment, hosts most of my services in Tharsis. Installed on R720',
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
        description: 'Matrix visualization which consumes data from Prometheus. Deployed on-premise',
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
        description: 'SSH bastion, with security provided by Cloudflare Access',
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
        description: 'VM environment, hosts most of my services in Tharsis US',
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
        description: 'My blog. Use hexo for generation. Built with Next.js and WindiCSS',
        icon: 'cib:next-js'
      },
      {
        name: 'Typings.dev',
        link: 'https://typings.dev',
        github: 'https://github.com/George-Miao/typings.dev',
        description: 'Typing practice site for Pinyin and Shuang users inspired by Typing-cn',
        icon: 'ion:logo-vue'
      },
      {
        name: 'Pop.tg',
        link: 'https://www.pop.tg',
        github: 'https://github.com/Pop-tg/main',
        description: 'URL shortener, built with Svelte, Typescript and Cloudflare Worker',
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
        description: 'Matrix visualization which consumes data from Prometheus. Deployed on Fly.io',
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
        description: 'Translate mail subscription to a RSS feed, written in Rust'
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
        description: 'Easy-to-use TUI & CLI to interact with Clash RESTful API'
      },
      {
        name: 'Knotify telegram',
        icon: 'akar-icons:telegram-fill',
        github: 'https://github.com/George-Miao/knotify-telegram',
        description: 'Bot as a bridge, forward HTTP request and PM to my telegram',
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
        description: 'Cloudflare worker that generates RSS feed from various source',
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
])

export { categories }

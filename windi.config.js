import { defineConfig } from 'windicss/helpers'

const chineseFont = [
  'STHeiti',
  'pingfang sc',
  'wenquanyi micro hei',
  'microsoft yahei'
]

export default defineConfig({
  theme: {
    extend: {
      colors: {
        red: {
          800: '#be223a',
          highlight: 'rgba(255,255,255,.05)'
        }
      },
      fontFamily: {
        sans: [
          'DASH',
          'var(--font-josefin-sans)',
          '-apple-system',
          'BlinkMacSystemFont',
          'helvetica neue',
          'Helvetica',
          'Tahoma',
          'Arial',
          ...chineseFont,
          'sans-serif'
        ],
        mono: ['var(--font-fira-code)', 'monospace'],
        content: [
          'DASH',
          'var(--font-merriweather)',
          'var(--font-josefin-sans)',
          ...chineseFont,
          '-apple-system',
          'BlinkMacSystemFont',
          'Times New Roman',
          'Times',
          'serif'
        ]
      },
      boxShadow: {
        'main': 'rgba(1,1,1,.2) 0 10px 20px',
        'nav-active': 'rgba(0,0,0,.15) 0 10px 15px',
        'nav-hover': 'rgba(0,0,0,.2) 0 10px 15px'
      }
    }
  },
  extract: {
    include: ['./src/**/*.{html,jsx,tsx,js,ts}'],
    exclude: ['node_modules', '.git', '.next']
  },
  plugins: [
    require('windicss/plugin/filters'),
    require('windicss/plugin/aspect-ratio'),
    require('windicss/plugin/line-clamp')
  ]
})

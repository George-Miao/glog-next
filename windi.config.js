import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  theme: {
    extend: {
      colors: {
        red: {
          800: '#be223a',
          highlight: 'rgba(255,255,255,.05)'
        }
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
  shortcuts: {
    'main-title':
      'text-3xl sm:text-5xl z-10 relative font-bold text-warm-gray-700'
  },
  plugins: [
    require('windicss/plugin/filters'),
    require('windicss/plugin/aspect-ratio'),
    require('windicss/plugin/line-clamp')
  ]
})

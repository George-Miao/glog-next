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
        main: 'rgba(1,1,1,.2) 0 10px 20px',
        nav: 'rgba(0,0,0,.15) 0 10px 15px '
      }
    }
  },
  extract: {
    include: ['./src/**/*.{html,jsx,tsx,mdx}'],
    exclude: ['node_modules', '.git', '.next']
  },
  shortcuts: {
    'big-o-char':
      'absolute select-none -left-16 -top-12 text-[12rem] leading-[12rem] text-warm-gray-200 font-bold <md:hidden',
    'main-title':
      'text-5xl mt-10 mb-4 z-10 relative font-bold text-warm-gray-700',
    'btn':
      'bg-red-800 hover:shadow-nav hover:brightness-110 filter transition-all text-warm-gray-100 text-sm'
  },
  plugins: [
    require('windicss/plugin/filters'),
    require('windicss/plugin/aspect-ratio'),
    require('windicss/plugin/line-clamp')
  ]
})

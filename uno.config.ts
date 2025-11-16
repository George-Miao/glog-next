import {
  presetWebFonts,
  presetWind3,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss'
import { defineConfig as defineUnoConfig } from 'unocss/vite'
import {
  presetClassCompletion,
  presetDirectivesCompletion
} from 'unocss-preset-completion'

export default defineUnoConfig({
  presets: [
    presetWind3(),
    presetWebFonts({
      provider: 'bunny',
      timeouts: {
        warning: 1000,
        failure: 10000
      },
      fonts: {
        sans: ['Josefin Sans:100,200,300,400,500,600,700'],
        mono: ['Cascadia Code:400'],
        content: ['Merriweather:300,400,700']
      }
    }),
    presetClassCompletion({
      autocompleteFunctions: [
        'clsx',
        'cn',
        'classnames',
        'cls',
        'cva',
        'tv',
        'cx'
      ]
    }),
    presetDirectivesCompletion()
  ],
  transformers: [transformerVariantGroup(), transformerDirectives()],
  theme: {
    colors: {
      red: {
        800: '#be223a',
        highlight: 'rgba(255,255,255,.05)'
      }
    },
    // fontFamily: {
    //   sans: [
    //     'DASH',
    //     'var(--font-josefin-sans)',
    //     '-apple-system',
    //     'BlinkMacSystemFont',
    //     'helvetica neue',
    //     'Helvetica',
    //     'Tahoma',
    //     'Arial',
    //     ...chineseFont,
    //     'sans-serif'
    //   ],
    //   mono: ['var(--font-fira-code)', 'monospace'],
    //   content: [
    //     'DASH',
    //     'var(--font-merriweather)',
    //     'var(--font-josefin-sans)',
    //     ...chineseFont,
    //     '-apple-system',
    //     'BlinkMacSystemFont',
    //     'Times New Roman',
    //     'Times',
    //     'serif'
    //   ]
    // },
    boxShadow: {
      'main': 'rgba(1,1,1,.2) 0 10px 20px',
      'nav-active': 'rgba(0,0,0,.15) 0 10px 15px',
      'nav-hover': 'rgba(0,0,0,.2) 0 10px 15px'
    }
  }
})

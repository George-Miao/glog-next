import { reactRouter } from '@react-router/dev/vite'
import nesting from 'postcss-nesting'
import postcssPresetEnv from 'postcss-preset-env'
import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import GlogPlugin from './app/build/vite'

export default defineConfig(({ mode }) => {
  const prodPostcss =
    mode === 'production'
      ? [
          postcssPresetEnv({
            autoprefixer: {
              flexbox: 'no-2009'
            },
            stage: 3,
            features: {
              'custom-properties': false
            }
          })
        ]
      : []

  return {
    plugins: [UnoCSS(), GlogPlugin(), reactRouter(), tsconfigPaths()],
    css: {
      modules: {
        localsConvention: 'camelCaseOnly'
      },
      postcss: {
        plugins: [nesting(), ...prodPostcss]
      }
    },
    build: {
      commonjsOptions: { transformMixedEsModules: true }
    },
    server: {
      watch: {
        usePolling: true,
        useFsEvents: true
      }
    }
  }
})

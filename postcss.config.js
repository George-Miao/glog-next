const prodPlugins = {
  'postcss-preset-env': {
    autoprefixer: {
      flexbox: 'no-2009'
    },
    stage: 3,
    features: {
      'custom-properties': false
    }
  }
}

const basePlugins = { 'postcss-nesting': {} }

module.exports = {
  plugins: {
    ...(process.env.NODE_ENV === 'production' ? prodPlugins : {}),
    ...basePlugins
  }
}

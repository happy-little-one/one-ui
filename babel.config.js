module.exports = api => {
  api.cache(true)

  return {
    presets: ['@babel/preset-react', '@babel/preset-typescript'],
    plugins: [
      ['@babel/plugin-proposal-decorators', { decoratorsBeforeExport: true }],
      '@babel/plugin-proposal-class-properties',
    ],
  }
}

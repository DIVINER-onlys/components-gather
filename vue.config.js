let { projectEnv, ciVersion } = require('minimist')(process.argv.slice(2))
const { version } = require('./package.json')
const CopyWebpackPlugin = require('copy-webpack-plugin')
projectEnv = projectEnv || 'production'
ciVersion = ciVersion || version
module.exports = {
  lintOnSave: true,
  devServer: {
    disableHostCheck: true,
    port: 8000,
    proxy: {
      '/hamo': {
        target: 'http://turnover-my-test.yy.com/hamo/',
        pathRewrite: { '^/hamo': '' }
      }
    }
  },
  runtimeCompiler: true,
  css: {
    // extract CSS in components into a single CSS file (only in production)
    extract: false // 移动增量化CSS
  },
  productionSourceMap: !!(projectEnv === 'test'),
  configureWebpack (config) {
    switch (config.mode) {
      case 'production':
        config.optimization.splitChunks.name = true // 解决异步打包打到全局的bug
        break
    }
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        'sass-loader',
        {
          loader: 'sass-resources-loader',
          options: {
            // you can also read from a file, e.g. `variables.scss`
            resources: ['./src/style/variable.scss']
          }
        }
      ]
    })
  },
  chainWebpack: config => {
    // 防止移动端加载整个工程
    config.plugins.delete('prefetch')
    // 增加全局变量
    config.plugin('define').tap(args => {
      args[0].PROJECT_ENV = `"${projectEnv}"`
      args[0].PROJECT_VERSION = `"${ciVersion}"`
      return args
    })
    // 苹果通用链接
    config.plugin('copy-apple-app-site-association').use(CopyWebpackPlugin, [
      [{ from: `${__dirname}/native/apple-app-site-association`, to: `${__dirname}/dist` }]
    ])
    // 解决引入 vue对象报错的bug
    config.plugin('html').tap(([options, ...args]) => [
      Object.assign({}, options, { chunksSortMode: 'none' }),
      ...args
    ])
  }
}

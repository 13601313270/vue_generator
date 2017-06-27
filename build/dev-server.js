var devServer = function (app, express) {
  var opn = require('opn')
  var port = require('../config/renderConfig').port
  var webpack = require('webpack')
  var config = require('../config')
  var webpackConfig = require('./webpack.dev.conf')
  var autoOpenBrowser = !!config.dev.autoOpenBrowser
  var compiler = webpack(webpackConfig)
  var webpackDevMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true
  })
  var webpackHotMiddleware = require('webpack-hot-middleware')(compiler, {
    log: () => {}
  })
  compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
      webpackHotMiddleware.publish({action: 'reload'})
      cb()
    })
  })
  app.use(webpackDevMiddleware)
  app.use(webpackHotMiddleware)

  var uri = 'http://127.0.0.1:' + port
  var _resolve
  /* eslint-disable no-new */
  new Promise(resolve => {
    _resolve = resolve
  })
  console.log('> Starting dev server...')
  webpackDevMiddleware.waitUntilValid(() => {
    console.log('> Listening at ' + uri + '\n')
    // when env is testing, don't need open it
    if (autoOpenBrowser && process.env.SERVER_CONFIG === 'development') {
      opn(uri)
    }
    _resolve()
  })
  app.listen(port)
}

module.exports = devServer

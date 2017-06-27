const utils = require('./utils')
const config = require('../config')
const isDevlopment = process.env.SERVER_CONFIG === 'development'

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isDevlopment
      ? config.dev.cssSourceMap
      : config.build.productionSourceMap,
    extract: !isDevlopment
  })
}

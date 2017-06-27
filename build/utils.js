var glob = require('glob')
var path = require('path')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var config = require('../config')

exports.assetsPath = function (_path) {
  var assetsSubDirectory = process.env.SERVER_CONFIG === 'development'
    ? config.dev.assetsSubDirectory
    : config.build.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

// 获取所有入口文件
exports.getEntries = function (globPath) {
  const files = glob.sync(globPath)
  let entries = {}
  files.forEach(function (filepath) {
    var split = filepath.split('/')
    var name = split[split.length - 2]
    entries[name] = filepath
  })
  console.log(entries)
  return entries
}

exports.cssLoaders = function (options) {
  options = options || {}

  var cssLoader = {
    loader: 'css-loader',
    options: {
      minimize: process.env.SERVER_CONFIG === 'production',
      sourceMap: options.sourceMap
    }
  }

  // generate loader string to be used with extract text plugin
  function generateLoaders (loader, loaderOptions) {
    var loaders = [cssLoader]
    if (loader) {
      loaders.push({
        loader: loader + '-loader',
        options: Object.assign({}, loaderOptions, {sourceMap: options.sourceMap})
      })
    }

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract({use: loaders, fallback: 'vue-style-loader'})
    } else {
      return ['vue-style-loader'].concat(loaders)
    }
  }

  // https://vue-loader.vuejs.org/en/configurations/extract-css.html
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders('less'),
    sass: generateLoaders('sass', {indentedSyntax: true}),
    scss: generateLoaders('sass'),
    stylus: generateLoaders('stylus'),
    styl: generateLoaders('stylus')
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  var output = []
  var loaders = exports.cssLoaders(options)
  for (var extension in loaders) {
    var loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      use: loader
    })
  }
  return output
}

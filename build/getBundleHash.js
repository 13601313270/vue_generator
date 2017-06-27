const fs = require('fs')
const path = require('path')
const CommonsChunk = {
  css: {},
  js: {}
}
const file = path.join(__dirname, '/../config/webpack-hash-map.js')

function MyPlugin () {}

MyPlugin.prototype.apply = function (compiler) {
  compiler.plugin('emit', function (compilation, callback) {
    compilation.chunks.map(chunk => {
      const script = chunk.files[0]
      const style = chunk.files[1]
      if (chunk.name && chunk.name !== 'vendor' && chunk.name !== 'manifest' && style) {
        CommonsChunk.css[chunk.name] = style
      }
      CommonsChunk.js[chunk.name] = script
      fs.writeFileSync(file, `module.exports = ` + JSON.stringify(CommonsChunk))
    })
    callback()
  })
}

module.exports = MyPlugin

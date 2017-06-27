const path = require('path')
const rootPath = path.join(__dirname, '/..')
const env = process.env.SERVER_CONFIG || 'development'

const config = {
  development: {
    root: rootPath,
    port: 3000,
    staticBaseUrl: '/' // 添加各个环境的cdn域名
  },

  testing: {
    root: rootPath,
    port: 3000,
    staticBaseUrl: '/'
  },

  simulation: {
    root: rootPath,
    port: 3000,
    staticBaseUrl: 'http://xxx.cdn.com/xxx/'
  },

  production: {
    root: rootPath,
    port: 3000,
    staticBaseUrl: 'http://xxx.cdn.com/xxx/'
  }
}

module.exports = config[env]

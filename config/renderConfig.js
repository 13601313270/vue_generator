const path = require('path')
const rootPath = path.join(__dirname, '/..')
const env = process.env.SERVER_CONFIG || 'development'

const config = {
  development: {
    root: rootPath,
    staticBaseUrl: '/' // 添加各个环境的cdn域名
  },

  testing: {
    root: rootPath,
    staticBaseUrl: '/'
  },

  simulation: {
    root: rootPath,
    staticBaseUrl: 'http://xxx.cdn.com/xxx/'
  },

  production: {
    root: rootPath,
    staticBaseUrl: 'http://xxx.cdn.com/xxx/'
  }
}

module.exports = config[env]

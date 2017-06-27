const express = require('express')
const renderConf = require('./config/renderConfig')
const glob = require('glob')
const favicon = require('serve-favicon')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const compress = require('compression')
const nunjucks = require('nunjucks')
const logger = require('log4js-tracer')
const devServer = require('./build/dev-server')
const WEBPACK_HASH_MAP = require('./config/webpack-hash-map')
const render = require('./server/middleware/render')

if (process.env.SERVER_CONFIG !== 'production') {
  require('proxy-hot-reload')({
    includes: 'server/**/*.js'
  })
}
const app = express()
const env = process.env.SERVER_CONFIG || 'development'
app.locals.ENV = env
app.locals.ENV_DEVELOPMENT = env === 'development'
app.locals.WEBPACK_HASH_MAP = WEBPACK_HASH_MAP
app.set('views', renderConf.root + '/server/views')
app.set('view engine', 'html')
const nunjuck = nunjucks.configure(renderConf.root + '/server/views', {
  autoescape: true,
  watch: true, // 依赖 chokidar
  express: app,
  tags: {
    variableStart: '##',
    variableEnd: '##'
  }
})
nunjuck.addGlobal('staticBaseUrl', renderConf.staticBaseUrl)
logger('/data/logs/node/vue_generator', {
  express: app
})
app.use(favicon(renderConf.root + '/public/favicon.ico'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser())
app.use(compress())
app.use(express.static(renderConf.root + '/public'))
app.use(render)

glob.sync(renderConf.root + '/server/routes/*.js').forEach(function (router) {
  require(router)(app)
})

if (app.locals.ENV_DEVELOPMENT) {
  devServer(app, express)
} else {
  app.listen(renderConf.port, function () {
    console.log('App (production) is now running on port =>' + renderConf.port)
  })
}

app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.render('app/error/error', {
    message: err.message,
    error: err,
    title: 'error'
  })
})

module.exports = app


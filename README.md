# vue2.0 + webpack3.0 + express 脚手架

[![Build Status](https://travis-ci.org/tonyljl526/vue_generator.svg?branch=master)](https://travis-ci.org/tonyljl526/vue_generator)

```
 .
 ├── build
 ├── client
 	└── js
 		└── project
 	└── css
 		└── project
 ├── config  
 ├── public
 	└── dist
 ├── server
 	└── views # 模板
 	└── routes # node路由
 	└── middleware # 自己开发的一些中间件
 ├── tests
 ├── .babelrc 
 ├── .eslintrc
 ├── .gitignore
 ├── .npmrc
 ├── ecosystem.json
 ├── package.json
 └── README.md
```


## build
webpack打包配置，仿照vue-cli来的，主要区别是getBundleHash.js文件。

- getBundleHash.js：会把所有js、css 路径对应关系写到config/webpack-hash-map.js中，以便在node启动的时候读取对应文件。
- build.js：打包入口文件。会把服务器配置为production，读取webpack.prod.conf生产环境的配置文件
- check-versions.js：build的时候检验package.json中配置的node及npm版本
- webpack.base.conf：基本的webpack配置
- webpack.dev.conf：开发时用到的配置
- webpack.basconf：build打包为线上包时用到的配置

## client 

基于vue2.0 + vue-router2.0的官方vue-cli demo


## server

服务器端代码，主要是node路由、自己封装的一些中间件和模板等。

## config

index.js：webpack构建相关配置
renderConfig.js：渲染时，不同环境对应的配置

## .eslintrc
关于代码风格检测，尝试过很多工具，最终还是选择了eslint。现在编辑器基本都可以支持各种lint插件，但是代码美化很难符合要求。比如function和()之间的空格，规范很难统一。如果使用standard模式的话，推荐使用[standard-format](https://github.com/maxogden/standard-format/blob/master/rc/esformatter.json)插件来格式化js代码。

- Sublime Text 插件: sublime-standard-format
- Atom 插件: atom-standard-formatter

配置里面推荐html插件可以检测vue里面的js

## tests

测试代码，暂时只有一个基于supertest的简单路由测试，用于跑通ci集成

## .npmrc 
[npm初始化](https://docs.npmjs.com/misc/config)相关参数，npm默认安装官方地址，可以通过这个配置来实现从淘宝镜像或者自建npm上安装。

官方源：registry=http://registry.npm.luojilab.com/
淘宝源：registry= http://r.cnpmjs.org/

好处：
1. 对需要经常切换维护多个库的同学尤其方便
2. 生产环境如果需要安装**自建npm **源里面包的时候，不用提前修改服务器上npm的配置，方便维护

**推荐使用[nrm](https://github.com/Pana/nrm)来管理npm registry，切换账号也超级方便。**

## ecosystem.json

利用pm2把git库的代码直接部署到目标服务上，[参考pm2 deploy配置](http://pm2.keymetrics.io/docs/usage/deployment/)


## gitlab-ci.yml

持续集成测试，因为我们公司在用gitlab，这是基于Gitlab-CI持续化集成的配置文件，如果是github中还有[Travis-CI](https://docs.travis-ci.com/user/languages/javascript-with-nodejs/)。每次merge或者push代码都会帮你自动跑一边测试，通过后会显示小绿勾(gitlab)或者build pass(github)的小图标。

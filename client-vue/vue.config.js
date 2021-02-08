const path = require('path')
const debug = process.env.NODE_ENV !== 'production'
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/production-sub-path/' : '/',
  outputDir: 'dist', // 构建输出目录
  assetsDir: 'assets', // 静态资源目录 (js, css, img, fonts)
  lintOnSave: false, // 是否开启eslint保存检测，有效值：ture | false | 'error'
  runtimeCompiler: true, // 运行时版本是否需要编译
  transpileDependencies: [], // 默认babel-loader忽略mode_modules，这里可增加例外的依赖包名
  productionSourceMap: true, // 是否在构建生产包时生成 sourceMap 文件，false将提高构建速度
  configureWebpack: config => { // webpack配置，值位对象时会合并配置，为方法时会改写配置
    if (debug) { // 开发环境配置
      config.devtool = 'cheap-module-eval-source-map'
    } else { // 生产环境配置
    }
    // Object.assign(config, { // 开发生产共同配置
    //     resolve: {
    //         alias: {
    //             '@': path.resolve(__dirname, './src'),
    //             '@c': path.resolve(__dirname, './src/components'),
    //             'vue$': 'vue/dist/vue.esm.js'
    //         }
    //     }
    // })
  },
  chainWebpack: config => { // webpack链接API，用于生成和修改webapck配置，https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
    config.resolve.alias.set('@', resolve('src')).set('@assets', resolve('src/assets')) // 这里只写了两个个，你可以自己再加，按这种格式.set('', resolve(''))       
    if (debug) {
      // 本地开发配置
    } else {
      // 生产开发配置
    }
  },
  parallel: require('os').cpus().length > 1, // 构建时开启多进程处理babel编译
  pluginOptions: { // 第三方插件配置
  },
  pwa: { // 单页插件相关配置 https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  },
  devServer: {
    open: true,
    host: 'localhost',
    port: 8081,
    https: false,
    hotOnly: false,
    proxy: { // 配置跨域
      '/api': {
        target: process.env.VUE_APP_BASE_API,
        ws: true,
        changeOrigin: true,
        // pathRewrite: {
        //   '^/api': ''
        // }
      }
    },
    before: app => {}
  }
}

// 'use strict'
// const path = require('path')

// function resolve(dir) {
//   return path.join(__dirname, dir)
// }

// const name = '资金管理系统' // page title

// // If your port is set to 80,
// // use administrator privileges to execute the command line.
// // For example, Mac: sudo npm run
// // You can change the port by the following method:
// // port = 9527 npm run dev OR npm run dev --port = 9527
// const port = process.env.port || process.env.npm_config_port || 8081 // dev port

// // All configuration item explanations can be find in https://cli.vuejs.org/config/
// module.exports = {
//   /**
//    * You will need to set publicPath if you plan to deploy your site under a sub path,
//    * for example GitHub Pages. If you plan to deploy your site to https://foo.github.io/bar/,
//    * then publicPath should be set to "/bar/".
//    * In most cases please use '/' !!!
//    * Detail: https://cli.vuejs.org/config/#publicpath
//    */
//   publicPath: './',
//   outputDir: 'dist',
//   assetsDir: 'static',
//   lintOnSave: false, //process.env.NODE_ENV === 'development',
//   productionSourceMap: false,
//   devServer: {
//     port: port,
//     open: true,
//     overlay: {
//       warnings: false,
//       errors: true
//     },
//     proxy: {
//       '/api': {
//         target: process.env.VUE_APP_BASE_API,
//         changeOrigin: true,
//         ws: true,
//         pathRewrite: {
//           '^/': ''
//         }
//       }
//     },
//     // before: require('./mock/mock-server.js')
//   },

//   configureWebpack: {
//     // provide the app's title in webpack's name field, so that
//     // it can be accessed in index.html to inject the correct title.
//     name: name,
//     resolve: {
//       alias: {
//         '@': resolve('src')
//       }
//     }
//   },
//   chainWebpack(config) {
//     // it can improve the speed of the first screen, it is recommended to turn on preload
//     // it can improve the speed of the first screen, it is recommended to turn on preload
//     config.plugin('preload').tap(() => [{
//       rel: 'preload',
//       // to ignore runtime.js
//       // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
//       fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
//       include: 'initial'
//     }])

//     // when there are many pages, it will cause too many meaningless requests
//     config.plugins.delete('prefetch')

//     // set svg-sprite-loader
//     config.module
//       .rule('svg')
//       .exclude.add(resolve('src/icons'))
//       .end()
//     config.module
//       .rule('icons')
//       .test(/\.svg$/)
//       .include.add(resolve('src/icons'))
//       .end()
//       .use('svg-sprite-loader')
//       .loader('svg-sprite-loader')
//       .options({
//         symbolId: 'icon-[name]'
//       })
//       .end()

//     config
//       .when(process.env.NODE_ENV !== 'development',
//         config => {
//           config
//             .plugin('ScriptExtHtmlWebpackPlugin')
//             .after('html')
//             .use('script-ext-html-webpack-plugin', [{
//               // `runtime` must same as runtimeChunk name. default is `runtime`
//               inline: /runtime\..*\.js$/
//             }])
//             .end()
//           config
//             .optimization.splitChunks({
//               chunks: 'all',
//               cacheGroups: {
//                 libs: {
//                   name: 'chunk-libs',
//                   test: /[\\/]node_modules[\\/]/,
//                   priority: 10,
//                   chunks: 'initial' // only package third parties that are initially dependent
//                 },
//                 elementUI: {
//                   name: 'chunk-elementUI', // split elementUI into a single package
//                   priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
//                   test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
//                 },
//                 commons: {
//                   name: 'chunk-commons',
//                   test: resolve('src/components'), // can customize your rules
//                   minChunks: 3, //  minimum common number
//                   priority: 5,
//                   reuseExistingChunk: true
//                 }
//               }
//             })
//           // https:// webpack.js.org/configuration/optimization/#optimizationruntimechunk
//           config.optimization.runtimeChunk('single')
//         }
//       )
//   }
// }


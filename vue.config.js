// const CompressionWebpackPlugin = require("compression-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

console.log('process.env.NODE_ENV',process.env.NODE_ENV)

module.exports = {
    devServer: {
      port: 9000,
      // proxyTable: {
      // '/v1': {
      //     target: 'http://47.236.10.54:9000', // 目标服务器地址
      //     changeOrigin: true, // 是否改变源地址
         
      //   }
      // }
    },
   
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    css: {
        loaderOptions: {
          postcss: {
            plugins: [
              require('postcss-pxtorem')({ // 把px单位换算成rem单位
                rootValue: 100, // vant官方使用的是37.5
                selectorBlackList: ['vant', 'mu'], // 忽略转换正则匹配项
                propList: ['*']
              })
            ]
          }
        }
    },
    // 输出文件目录
    outputDir: 'dist',
    configureWebpack: config => {
      if (process.env.NODE_ENV === 'production') {
        config.plugins.push(new UglifyJsPlugin())
      }
    },
}
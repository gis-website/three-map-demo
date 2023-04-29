/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-12 08:40:07
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-29 19:57:38
 * @FilePath: \three-map-demo\vue.config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: (config) => {
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,

      use: [
        {
          loader: 'webpack-glsl-loader'
        }
      ]
    },
    {
      test: /\.(mp3)(\?.*)?$/,
      use: [
        {
          loader: 'url-loader'
        }
      ]
    }
    )
  }

})

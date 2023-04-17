/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-14 12:35:09
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-14 12:36:18
 * @FilePath: \three-map-demo\src\views\ThreeMapAnimationFirst\composables\datGUI.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import Stats from 'three/addons/libs/stats.module.js'
import { GUI } from 'three/addons/libs/lil-gui.module.min.js'

export const stats = new Stats()

export const gui = new GUI({ width: 200 })

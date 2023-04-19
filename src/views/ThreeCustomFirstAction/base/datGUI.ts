/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-18 17:39:07
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-18 18:42:34
 * @FilePath: \three-map-demo\src\views\ThreeCustomFirstAction\composables\datGUI.ts
 * @Description: operating floor
 */
import Stats from 'three/addons/libs/stats.module.js'
import { GUI } from 'three/addons/libs/lil-gui.module.min.js'

export const stats = new Stats()

export const gui = new GUI({ width: 200 })

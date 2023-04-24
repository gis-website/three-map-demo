/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-18 13:53:57
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-23 13:47:10
 * @FilePath: \three-map-demo\src\views\Animation\AnimationPointSky\index.ts
 * @Description: business center
 */

import { scene, camera, control, renderer, axes } from '@/base/baseObj'
import { createPointSky } from './composables/pointSky'

scene.add(camera)
scene.add(axes)
renderer.setSize(window.innerWidth, window.innerHeight)

export const initRender = () => {
  createPointSky()
  animate()
}

const animate = () => {
  requestAnimationFrame(animate)
  control.update()
  renderer.render(scene, camera)
}

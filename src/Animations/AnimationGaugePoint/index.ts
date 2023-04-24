/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-17 20:45:59
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-23 11:27:45
 * @FilePath: \three-map-demo\src\views\Animation\AnimationGaugePoint\index.ts
 * @Description: business
 */
import { scene, camera, control, renderer, axes } from '@/base/baseObj'
import { createGaugePoint } from './composables/gaugePoint'

scene.add(camera)
scene.add(axes)
renderer.setSize(window.innerWidth, window.innerHeight)

export const initRender = ():void => {
  createGaugePoint({ x: 0, y: 10, z: 5 })
  createGaugePoint({ x: 0, y: 0, z: 5 })
  animate()
}

const animate = ():void => {
  requestAnimationFrame(animate)
  control.update()
  renderer.render(scene, camera)
}

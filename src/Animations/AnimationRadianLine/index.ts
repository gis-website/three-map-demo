/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-17 15:22:07
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-23 14:51:34
 * @FilePath: \three-map-demo\src\views\Animation\radianLine\index.ts
 * @Description: business center
 */

import { scene, camera, control, renderer, axes } from '@/base/baseObj'
import { commonUniforms, initCircleCurveGroup, createFlyLine, randomVec3Color } from './composables/radianLine'

scene.add(camera)
scene.add(axes)
renderer.setSize(window.innerWidth, window.innerHeight)

export const initRender = () => {
  const curves = initCircleCurveGroup(10, 15, 15)

  for (const curve of curves) {
    createFlyLine(curve, {
      speed: 0.2,
      number: Math.floor(Math.random() * 9 + 1),
      color: randomVec3Color(),
      size: 4.0
    }, 18000, 1, { x: 0, y: 0, z: 0 })
  }
  animate()
}

const animate = () => {
  requestAnimationFrame(animate)
  commonUniforms.u_time.value += 0.01
  control.update()
  renderer.render(scene, camera)
}

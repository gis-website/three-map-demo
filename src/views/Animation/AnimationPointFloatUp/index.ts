/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-20 15:08:06
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-23 13:35:58
 * @FilePath: \three-map-demo\src\views\Animation\AnimationPointFloatUp\index.ts
 * @Description: business center
 */

import { scene, control, renderer, axes, camera } from '@/base/baseObj'
import { createPointFloat } from './composables/pointFloatUp'

scene.add(axes)
scene.add(camera)

renderer.setSize(window.innerWidth, window.innerHeight)

export const init = ():void => {
  createPointFloat()
  animate()
}

const animate = ():void => {
  requestAnimationFrame(animate)

  control.update()
  renderer.render(scene, camera)
}

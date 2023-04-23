/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-15 13:49:48
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-19 08:39:20
 * @FilePath: \three-map-demo\src\views\Animation\AnimationAureole\index.ts
 * @Description: business center
 */

import { scene, axes, camera, renderer } from '@/base/baseObj'
import { createAureole } from './composables/aureole'

scene.add(camera)
scene.add(axes)

renderer.setSize(window.innerWidth, window.innerHeight)

export const initRender = ():void => {
  createAureole()
  animate()
}

const animate = ():void => {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
}

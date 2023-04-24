/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-18 15:01:15
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-23 11:25:27
 * @FilePath: \three-map-demo\src\views\Animation\AnimationCylinderDiffusionRipple\index.ts
 * @Description: business center
 */

import { scene, camera, control, renderer, axes } from '@/base/baseObj'
import { create3DCylinder, create3DCircle } from './composables/cylinderDiffusionRipple'
import { loadBloomPass } from '@/common/bloomPass'

scene.add(camera)
scene.add(axes)
renderer.setSize(window.innerWidth, window.innerHeight)

create3DCircle(5)
create3DCylinder(5.5, './images/gradual_red_01.png', true)

export const initRender = ():void => {
  loadBloomPass()
  animate()
}

const animate = ():void => {
  requestAnimationFrame(animate)
  control.update()
}

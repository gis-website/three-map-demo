/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-18 13:53:57
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-23 14:06:26
 * @FilePath: \three-map-demo\src\views\Animation\AnimationProtectiveCover\index.ts
 * @Description: business center
 */
import { scene, camera, control, renderer, axes } from '@/base/baseObj'
import { createProtectiveConver } from './composables/protectiveConver'
import { loadBloomPass } from '@/common/bloomPass'

scene.add(camera)
scene.add(axes)
renderer.setSize(window.innerWidth, window.innerHeight)

const linder = createProtectiveConver(10, './images/gradual_blue_01.png', true)
linder.material[0].opacity = 0.5
linder.position.set(0, 1, 0)
linder.layers.enable(1)
scene.add(linder)

export const initRender = () => {
  loadBloomPass()
  animate()
}

const animate = () => {
  requestAnimationFrame(animate)
  control.update()
}

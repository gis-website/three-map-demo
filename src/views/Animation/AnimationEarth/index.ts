/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-21 10:35:09
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-23 13:55:48
 * @FilePath: \three-map-demo\src\views\Animation\AnimationEarth\index.ts
 * @Description: business center
 */
import { scene, camera, control, renderer, axes } from '@/base/baseObj'
import { loadEarth, loadLinghtEarth, loadSpiritEarth, loadInnerEarth } from './composables/earth'

scene.add(camera)
scene.add(axes)
renderer.setSize(window.innerWidth, window.innerHeight)

export const initRender = () => {
  loadEarth()
  loadLinghtEarth()
  loadSpiritEarth()
  loadInnerEarth()
  animate()
}

const animate = () => {
  requestAnimationFrame(animate)
  control.update()
  renderer.render(scene, camera)
}

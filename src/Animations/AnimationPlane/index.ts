/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-19 09:13:40
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-23 11:47:35
 * @FilePath: \three-map-demo\src\views\Animation\AnimationPlane\index.ts
 * @Description: business center
 */
import { scene, camera, control, renderer, axes } from '@/base/baseObj'
import { getJsonChinaData } from '@/api'
import { InintLightCross } from './composables/plane'

scene.add(camera)
scene.add(axes)
renderer.setSize(window.innerWidth, window.innerHeight)

export const initRender = async () => {
  const data = await getJsonChinaData()
  InintLightCross(data)
  animate()
}

const animate = () => {
  requestAnimationFrame(animate)
  control.update()
  renderer.render(scene, camera)
}

/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-19 09:13:40
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-19 09:22:23
 * @FilePath: \three-map-demo\src\views\Animation\AnimationPlane\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { scene, camera, control, renderer, axes } from './composables/baseObj'
import * as THREE from 'three'
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

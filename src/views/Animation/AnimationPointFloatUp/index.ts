/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-18 17:38:25
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-20 19:34:53
 * @FilePath: \three-map-demo\src\views\ThreeCustomFirstAction\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import * as THREE from 'three'
import { scene, control, renderer, axes, camera } from './composables/baseObj'
import { createPointFloat } from './composables/pointFloatUp'

scene.add(axes)
scene.add(camera)

renderer.setSize(window.innerWidth, window.innerHeight)

const range = 400 // 雪花出现范围
let points:any

/**
 * @description: start
 * @param {*} void
 * @return {*}
 */
export const init = (tooltip: any):void => {
  createPointFloat()
  animate()
}

const animate = () => {
  requestAnimationFrame(animate)
  //   const array = points.geometry.attributes.position.array
  //   for (let index = 0; index < 80; index++) {
  //     array[index] += array[index]
  //     array[index + 1] += array[index + 1]
  //     array[index + 2] += array[index + 2]
  //     // 边界检查
  //     if (array[index + 1] >= range / 2) array[index + 1] = -range / 2
  //     if (array[index] <= -range / 2 || array[index] >= range / 2) array[index] = array[index] * -1
  //     if (array[index + 2] <= -range / 2 || array[index + 2] >= range / 2) array[index + 2] = array[index + 2] * -1
  //   }
  // points.children.forEach((point:any) => {
  //   // 计算位置
  //   point.position.y += point.position.y
  //   point.position.x += point.position.x
  //   point.position.z += point.position.z
  //   // 边界检查
  //   if (point.position.y >= range / 2) point.position.y = -range / 2
  //   if (point.position.x <= -range / 2 || point.position.x >= range / 2) point.position.x = point.position.x * -1
  //   if (point.position.z <= -range / 2 || point.position.z >= range / 2) point.position.z = point.position.z * -1
  //   point.geometry.verticesNeedUpdate = true
  // })

  // 重要：渲染时需要更新位置（如果没有设为true,则无法显示动画）
  // requestAnimationFrame(animate);
  control.update()
  renderer.render(scene, camera)
}

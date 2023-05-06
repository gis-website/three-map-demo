/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-05-05 14:34:38
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-05-06 12:30:17
 * @FilePath: \three-map-demo\src\Animations\AnimationBuildRipple\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { scene, camera, renderer, control, axes } from '@/base/baseObj'
import { loadModel, uniforms } from './composables/buildRipple'

scene.add(camera)
scene.add(axes)
renderer.setSize(window.innerWidth, window.innerHeight)

export const init = ():void => {
  loadModel()
  animation()
}

const animation = ():void => {
  if (uniforms.u_ToTopTime.value > 10 * uniforms.u_ToTopWidth.value) {
    uniforms.u_ToTopTime.value = 0
  }
  uniforms.u_ToTopTime.value += 1
  control.update()
  renderer.render(scene, camera)
  requestAnimationFrame(animation)
}

/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-05-05 14:34:38
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-05-07 14:00:57
 * @FilePath: \three-map-demo\src\Animations\AnimationBuildRipple\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { scene, camera, renderer, control, axes } from '@/base/baseObj'
import { loadElement, uniforms } from './composables/loadElement'

scene.add(camera)
scene.add(axes)
renderer.setSize(window.innerWidth, window.innerHeight)

export const init = ():void => {
  loadElement()
  animation()
}

const animation = ():void => {
  uniforms.u_time.value += 0.01
  control.update()
  renderer.render(scene, camera)
  requestAnimationFrame(animation)
}

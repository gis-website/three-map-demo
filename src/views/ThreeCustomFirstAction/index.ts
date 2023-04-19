/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-18 17:38:25
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-19 10:07:23
 * @FilePath: \three-map-demo\src\views\ThreeCustomFirstAction\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import * as THREE from 'three'
import { scene, control, renderer, axes, camera, raycaster, clock, mouse } from './base/baseObj'
import { getBaseMap } from './composables/loadMap'
import { initGUI } from './composables/customGUI'
import { pointerMoveEvent } from './composables/listenEvent'
import { stats } from './base/datGUI'
import { blowMaterial } from './base/shader'
import { loadVideo } from './composables/loadVideo'
import { loadHalo } from './composables/loadHalo'
import { loadCylinderDiffusionRipple } from './composables/loadCylinderDiffusionRipple'

scene.add(axes)
renderer.setSize(window.innerWidth, window.innerHeight)

/**
 * @description: start
 * @param {*} void
 * @return {*}
 */
export const init = ():void => {
  getBaseMap()
  initGUI()
  // pointerMoveEvent()
  loadVideo('base') // todo: 后续把传的字符串改为枚举值传递
  loadHalo()
  loadCylinderDiffusionRipple()

  animate()
}

const animate = () => {
  requestAnimationFrame(animate)
  stats.begin()
  rippleRender()
  control.update()
  // renderer.render(scene, camera)
  stats.end()
}

let lastPick:any

/**
 * @description: 提示框触发动画
 * @param {*} void
 * @return {*}
 */
const tooltipRender = (): void => {
  // 通过摄像机和鼠标位置更新射线
  raycaster.setFromCamera(mouse, camera)
  // 算出射线 与当场景相交的对象有那些
  const intersects = raycaster.intersectObjects(scene.children, true)

  if (lastPick) {
    lastPick.object.material[0].color.set('#2defff')
    // lastPick.object.material[1].uniforms.u_color.set('#3480C4')
  }
  lastPick = intersects.find(
    (item: any) => item.object.material && item.object.material.length === 2
  )
  if (lastPick) {
    lastPick.object.material[0].color.set(0xff0000)
    // lastPick.object.material[1].uniforms.u_color.set(0xff0000)
  }
}

/**
 * @description: 波纹触发动画
 * @param {any} dalte 秒数
 * @return {*}
 */
const rippleRender = () => {
  const dalte = clock.getDelta()
  if (blowMaterial) {
    blowMaterial.uniforms.u_r.value += dalte * 50
    if (blowMaterial.uniforms.u_r.value >= 300) {
      blowMaterial.uniforms.u_r.value = 20
    }
  }
}

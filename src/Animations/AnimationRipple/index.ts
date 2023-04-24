/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-14 11:11:50
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-23 14:34:28
 * @FilePath: \three-map-demo\src\views\Animation\AnimationRipple\index.ts
 * @Description: business center
 */
import { scene, axes, camera, renderer, clock } from '@/base/baseObj'
import { stats } from '@/base/datGUI'
import { blowMaterial, createPass } from './composables/ripple'

scene.add(camera)
scene.add(axes)

renderer.setSize(window.innerWidth, window.innerHeight)

export const initRender = () => {
  createPass()
  animate()
}

const animate = () => {
  requestAnimationFrame(animate)
  stats.begin()
  const delta = clock.getDelta()
  moveAnimation(delta)
  renderer.render(scene, camera)
  stats.end()
}

const moveAnimation = (delta: number) => {
  if (blowMaterial) {
    blowMaterial.uniforms.u_r.value += delta * 50
    if (blowMaterial.uniforms.u_r.value >= 300) {
      blowMaterial.uniforms.u_r.value = 20
    }
  }
}

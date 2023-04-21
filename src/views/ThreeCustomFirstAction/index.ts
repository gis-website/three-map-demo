/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-18 17:38:25
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-21 11:40:04
 * @FilePath: \three-map-demo\src\views\ThreeCustomFirstAction\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import * as THREE from 'three'
import { scene, control, renderer, axes, camera, clock } from './base/baseObj'
import { getMap } from './composables/loadMap'
import { initGUI } from './composables/customGUI'
import { pointerMoveEvent } from './composables/listenEvent'
import { stats } from './base/datGUI'
import { blowMaterial } from './base/shader'
import { loadVideo } from './composables/loadVideo'
import { loadHalo } from './composables/loadHalo'
import { loadCylinderDiffusionRipple } from './composables/loadCylinderDiffusionRipple'
import { loadPointFloat } from './composables/loadPointFloat'
import { loadRoutationLine } from './composables/loadRoutationLine'

const geometry = new THREE.BoxGeometry(1000, 1000, 1000) // 立方体

const loader = new THREE.TextureLoader()
loader.setPath('./MilkyWay/')

const textureCube = [
  'dark-s_px.jpg', 'dark-s_nx.jpg',
  'dark-s_py.jpg', 'dark-s_ny.jpg',
  'dark-s_pz.jpg', 'dark-s_nz.jpg'
]

const materialArray = []
for (let i = 0; i < 6; i++) {
  materialArray.push(
    new THREE.MeshBasicMaterial({
      map: loader.load(textureCube[i]), // 将图片纹理贴上
      side: THREE.BackSide // 镜像翻转
    })
  )
}
// 创建一个完整的天空盒，填入几何模型和材质的参数
const skyBox = new THREE.Mesh(geometry, materialArray)
scene.add(skyBox) // 在场景中加入天空盒

console.log(scene)
scene.add(axes)
scene.add(camera)

renderer.setSize(window.innerWidth, window.innerHeight)

/**
 * @description: start
 * @param {*} void
 * @return {*}
 */
export const init = (tooltip: any):void => {
  getMap()
  initGUI()
  loadCylinderDiffusionRipple()
  loadVideo('base') // todo: 后续把传的字符串改为枚举值传递
  loadHalo()
  loadRoutationLine()
  loadPointFloat()
  pointerMoveEvent(tooltip)
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

/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-18 17:38:25
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-20 16:35:43
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

const geometry = new THREE.BoxGeometry(1000, 1000, 1000) // 立方体

const loader = new THREE.CubeTextureLoader()
loader.setPath('./MilkyWay/')

const textureCube = loader.load([
  'dark-s_px.jpg', 'dark-s_nx.jpg',
  'dark-s_py.jpg', 'dark-s_ny.jpg',
  'dark-s_pz.jpg', 'dark-s_nz.jpg'
])

const material = new THREE.MeshBasicMaterial({
  envMap: textureCube, // 设置环境贴图
  side: THREE.DoubleSide
})

const mesh = new THREE.Mesh(geometry, material) // 网格模型对象Mesh
mesh.position.x = -250
mesh.position.y = -250
mesh.position.z = -250

scene.add(mesh)
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

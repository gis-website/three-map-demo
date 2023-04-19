/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-15 13:49:48
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-19 08:39:20
 * @FilePath: \three-map-demo\src\views\Animation\AnimationAureole\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import * as THREE from 'three'
import { scene, axes, camera, renderer } from './composables/baseObj'
import { createAureole } from './composables/aureole'

// const planeGeometry = new THREE.PlaneGeometry(200, 200)
// const planeMaterial = new THREE.MeshBasicMaterial({ color: 0XAAAAAA })
// const planeX = new THREE.Mesh(planeGeometry, planeMaterial)
// scene.add(planeX)
scene.add(camera)
scene.add(axes)

let composer: any

renderer.setSize(window.innerWidth, window.innerHeight)

export const initRender = () => {
  composer = createAureole()
  animate()
}

const animate = () => {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
  if (composer) {
    composer.render()
  }
}

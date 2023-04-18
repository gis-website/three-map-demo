/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-18 13:53:57
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-18 14:21:30
 * @FilePath: \three-map-demo\src\views\Animation\AnimationProtectiveCover\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { scene, camera, control, renderer, axes } from './composables/baseObj'
import * as THREE from 'three'

scene.add(camera)
scene.add(axes)
renderer.setSize(window.innerWidth, window.innerHeight)

export const initRender = () => {
  const geometry = new THREE.BufferGeometry()
  const vertices = [] as any

  for (let i = 0; i < 10000; i++) {
    vertices.push(THREE.MathUtils.randFloatSpread(2000)) // x
    vertices.push(THREE.MathUtils.randFloatSpread(2000)) // y
    vertices.push(THREE.MathUtils.randFloatSpread(2000)) // z
  }

  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))

  const particles = new THREE.Points(geometry, new THREE.PointsMaterial({ color: 0x00fffc }))
  scene.add(particles)
  animate()
}

const animate = () => {
  requestAnimationFrame(animate)
  control.update()
  renderer.render(scene, camera)
}

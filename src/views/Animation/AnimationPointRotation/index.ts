/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-15 15:25:01
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-17 17:44:05
 * @FilePath: \three-map-demo\src\views\Animation\AnimationPointRotation\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import * as THREE from 'three'
import { scene, axes, camera, renderer } from './composables/baseObj'
import { createHighlight } from './composables/pointRotation'

const number = 360
const r = 5
const positions = [] as any
const colors = [] as any
const point = new THREE.BufferGeometry()
let angle = 0
const color = new THREE.Color()
for (let i = 0; i < 4; i++) {
  const x = r * Math.cos(angle)
  const y = r * Math.sin(angle)
  angle += 90
  positions.push(new THREE.Vector3(x, y, 0))
  color.setRGB(Math.random(), Math.random(), Math.random())
  colors.push(color.r, color.g, color.b)
}

point.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3))

const points = new THREE.Points(point)

scene.add(points)
scene.add(camera)
scene.add(axes)

let composer: any

renderer.setSize(window.innerWidth, window.innerHeight)

export const initRender = () => {
  // composer = createHighlight()
  animate()
}

const animate = () => {
  requestAnimationFrame(animate)

  renderer.render(scene, camera)
  if (composer) {
    composer.render()
  }
}

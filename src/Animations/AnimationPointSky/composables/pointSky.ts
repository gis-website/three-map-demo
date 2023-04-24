/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-18 13:55:03
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-23 13:46:17
 * @FilePath: \three-map-demo\src\views\Animation\AnimationPointSky\composables\pointSky.ts
 * @Description: come true point sky
 */
import * as THREE from 'three'
import { scene } from '@/base/baseObj'

export const createPointSky = ():void => {
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
}

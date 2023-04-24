/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-17 20:46:44
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-23 10:57:28
 * @FilePath: \three-map-demo\src\views\Animation\AnimationGaugePoint\composables\gaugePoint.ts
 * @Description: come true gauge point
 */
import * as THREE from 'three'
import { scene } from '@/base/baseObj'
import gsap from 'gsap'
import { Position } from '@/types/custom'

export const createGaugePoint = (position: Position): void => {
  const texture = new THREE.TextureLoader().load(
    './images/gradual_change_red_02.png'
  )
  const texture1 = new THREE.TextureLoader().load(
    './images/gradual_red_02.png'
  )
  const geometry = new THREE.ConeGeometry(3.5, 5.5, 8)
  const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    map: texture
  })
  const sphere = new THREE.Mesh(geometry, material)
  sphere.position.x = position.x
  sphere.position.y = position.y
  sphere.position.z = position.z
  sphere.rotation.x = -Math.PI
  sphere.layers.enable(1)
  scene.add(sphere)
  const geometry1 = new THREE.RingGeometry(1, 2, 22)
  const material1 = new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
    transparent: true,
    map: texture1
  })
  const mesh = new THREE.Mesh(geometry1, material1)
  mesh.position.x = position.x
  mesh.position.y = position.y - 3.5
  mesh.position.z = position.z
  mesh.rotation.x = -Math.PI / 2
  mesh.layers.enable(1)
  scene.add(mesh)

  gsap.to(sphere.scale, {
    duration: 1,
    x: 1.5,
    y: 1.5,
    z: 1.5,
    repeat: -1,
    delay: 1,
    yoyo: true,
    ease: 'power2.inOut'
  })
  gsap.to(mesh.scale, {
    duration: 1,
    x: 2,
    y: 2,
    z: 2,
    repeat: -1,
    delay: 1,
    yoyo: true,
    ease: 'power2.inOut'
  })
}

/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-15 13:49:48
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-23 10:33:42
 * @FilePath: \three-map-demo\src\views\Animation\AnimationAureole\composables\aureole.ts
 * @Description: come true aureole
 */

import * as THREE from 'three'
import { scene } from '@/base/baseObj'
import gsap from 'gsap'

export const createAureole = ():void => {
  const circlePlane = new THREE.PlaneGeometry(1, 1)
  const circleTexture = new THREE.TextureLoader().load('./images/label.png')
  const circleMaterial = new THREE.MeshBasicMaterial({
    color: '#00ffdd',
    map: circleTexture,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    side: THREE.DoubleSide
  })
  const circleMesh = new THREE.Mesh(circlePlane, circleMaterial)
  circleMesh.rotation.x = -Math.PI / 2
  circleMesh.position.set(0, 0, 0)

  scene.add(circleMesh)

  gsap.to(circleMesh.scale, {
    duration: 1 + Math.random() * 0.5,
    x: 2,
    y: 2,
    z: 2,
    repeat: -1,
    delay: Math.random() * 0.5,
    yoyo: true,
    ease: 'power2.inOut'
  })
}

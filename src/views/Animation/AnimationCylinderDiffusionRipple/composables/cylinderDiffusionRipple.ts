/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-18 15:02:22
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-23 10:50:02
 * @FilePath: \three-map-demo\src\views\Animation\AnimationCylinderDiffusionRipple\composables\cylinderDiffusionRipple.ts
 * @Description: come true cylinder diffusion ripple
 */
import * as THREE from 'three'
import { scene } from '@/base/baseObj'

/**
 * @description: 圆扩散
 * @param {number} r radius
 * @return {*}
 */
export const create3DCircle = (r:number):void => {
  const geometry = new THREE.SphereGeometry(
    r,
    120,
    120,
    0,
    Math.PI * 2,
    0,
    Math.PI / 2
  )
  const texture = new THREE.TextureLoader().load('./images/gradual_blue_01.png')
  const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
    transparent: true,
    map: texture
  })
  const circle = new THREE.Mesh(geometry, material)

  circle.layers.enable(1)
  circle.position.set(0, 0, 0)

  scene.add(circle)

  let s = 0
  let p = 0

  function render () {
    // animation
    if (s > 160) {
      s = 0
      p = 160
    }
    circle.scale.set(1 + s / 60, 1 + s / 80, 1 + s / 60)
    circle.material.opacity = p / 160
    s++
    p--
    requestAnimationFrame(render)
  }
  render()
}

/**
 * @description: 圆柱体扩散
 * @param {number} r radius
 * @param {string} src path
 * @param {boolean} type open animation(true: open; false: off)
 * @return {*}
 */
export const create3DCylinder = (r:number, src:string, type:boolean):void => {
  const geometry = new THREE.CylinderGeometry(r, r, 6, 64)
  const texture = new THREE.TextureLoader().load(src)
  const circle = new THREE.Mesh(geometry, [
    new THREE.MeshBasicMaterial({
      color: 0xffffff,
      side: THREE.DoubleSide,
      transparent: true,
      map: texture
    })
  ])

  circle.layers.enable(1)
  circle.position.set(0, 3, 0)

  scene.add(circle)

  let s = 0
  let p = 0

  const render = ():void => {
    // animation
    if (s > 160) {
      s = 0
      p = 160
    }
    if (type) {
      circle.scale.set(1 + s / 60, 1, 1 + s / 60)
      circle.material[0].opacity = p / 160
      s++
      p--
    }
    requestAnimationFrame(render)
  }
  render()
}

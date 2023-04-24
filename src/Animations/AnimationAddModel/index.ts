/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-18 09:01:51
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-23 10:41:04
 * @FilePath: \three-map-demo\src\views\Animation\AnimationAddModel\index.ts
 * @Description: business center
 */
import { scene, camera, control, renderer, axes } from '@/base/baseObj'
import { loadModel } from './composables/addModel'
import { loadBloomPass } from '@/common/bloomPass'
import * as THREE from 'three'

const BLOOM_SCENE = 1

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
const mesh = new THREE.Mesh(geometry, material)
mesh.name = 'video'
mesh.layers.enable(BLOOM_SCENE)
scene.add(mesh)

scene.add(camera)
scene.add(axes)
renderer.setSize(window.innerWidth, window.innerHeight)

export const initRender = ():void => {
  loadBloomPass()
  loadModel()
  animate()
}

const animate = ():void => {
  requestAnimationFrame(animate)
  control.update()
}

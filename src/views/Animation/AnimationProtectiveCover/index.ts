/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-18 13:53:57
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-18 14:51:23
 * @FilePath: \three-map-demo\src\views\Animation\AnimationProtectiveCover\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { scene, camera, control, renderer, axes } from './composables/baseObj'
import * as THREE from 'three'
import { create3DCylinder } from './composables/protectiveConver'
import { loadBloomPass } from './composables/bloomPass'

const ENTIRE_SCENE = 0; const BLOOM_SCENE = 1
scene.add(camera)
scene.add(axes)
renderer.setSize(window.innerWidth, window.innerHeight)

let composer:any
const bloomLayer = new THREE.Layers()
bloomLayer.set(BLOOM_SCENE)
const materials = {} as any

const linder = create3DCylinder(10, './images/gradual_blue_01.png', 1)
linder.material[0].opacity = 0.5
linder.position.set(0, 1, 0)
linder.layers.enable(1)
scene.add(linder)

export const initRender = () => {
  composer = loadBloomPass()

  animate()
}

const animate = () => {
  requestAnimationFrame(animate)
  control.update()
  scene.traverse(darkenNonBloomed)
  composer.bloomComposer.render()
  scene.traverse(restoreMaterial)
  composer.finalComposer.render()
}

const darkMaterial = new THREE.MeshBasicMaterial({ color: 'black' })
function darkenNonBloomed (obj:any) {
  if (obj.isMesh && bloomLayer.test(obj.layers) === false) {
    materials[obj.uuid] = obj.material
    obj.material = darkMaterial
  }
}

function restoreMaterial (obj:any) {
  if (materials[obj.uuid]) {
    obj.material = materials[obj.uuid]
    delete materials[obj.uuid]
  }
}

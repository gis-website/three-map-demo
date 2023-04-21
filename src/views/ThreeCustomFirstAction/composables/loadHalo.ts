/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-18 19:52:07
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-21 09:30:33
 * @FilePath: \three-map-demo\src\views\ThreeCustomFirstAction\composables\loadHalo.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createHalo } from '../animations/halo'
import * as THREE from 'three'
import { scene } from '../base/baseObj'

const ENTIRE_SCENE = 0
const BLOOM_SCENE = 1
const darkMaterial = new THREE.MeshBasicMaterial({ color: 'black' })

const bloomLayer = new THREE.Layers()
bloomLayer.set(BLOOM_SCENE)
const materials = {} as any

export const loadHalo = (): void => {
  const { bloomComposer, finalComposer } = createHalo()
  const haloRender = ():void => {
    requestAnimationFrame(haloRender)
    scene.traverse(darkenNonBloomed)
    bloomComposer.render()
    scene.traverse(restoreMaterial)
    finalComposer.render()
  }

  haloRender()
}

const darkenNonBloomed = (obj:any) => {
  if ((obj.isMesh || obj.isLine) && bloomLayer.test(obj.layers) === false) {
    materials[obj.uuid] = obj.material
    obj.material = darkMaterial
  }
}

const restoreMaterial = (obj:any) => {
  if (materials[obj.uuid]) {
    obj.material = materials[obj.uuid]
    delete materials[obj.uuid]
  }
}

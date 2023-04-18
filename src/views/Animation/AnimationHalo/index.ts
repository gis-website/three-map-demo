/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-17 08:54:27
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-18 13:35:11
 * @FilePath: \three-map-demo\src\views\Animation\AnimationHalo\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-14 08:24:13
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-17 11:37:13
 * @FilePath: \three-map-demo\src\views\ThreeMapAnimationFirst\index.ts
 * @Description: main logic
 */
import * as THREE from 'three'
import { scene, axes, camera, renderer, control } from './composables/baseObj'
import { createHalo } from './composables/halo'
import { createVideoAnimation } from './composables/video'

const ENTIRE_SCENE = 0; const BLOOM_SCENE = 1

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0fff })
const mesh = new THREE.Mesh(geometry, material)
mesh.name = 'hxx'
scene.add(camera)
scene.add(axes)
scene.add(mesh)
renderer.setSize(window.innerWidth, window.innerHeight)

let composer: any
const bloomLayer = new THREE.Layers()
bloomLayer.set(BLOOM_SCENE)
const materials = {} as any

export const initRender = () => {
  composer = createHalo()
  createVideoAnimation()
  animate()
}

const animate = () => {
  requestAnimationFrame(animate)

  control.update()
  // renderer.render(scene, camera)
  mesh.rotation.x += 0.01
  mesh.rotation.y += 0.01
  // drawing outLine
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
const mouse = new THREE.Vector2()
const raycaster = new THREE.Raycaster()
function onPointerDown (event:any) {
  mouse.x = (event.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(event.clientY / window.innerHeight) * 2 + 1

  raycaster.setFromCamera(mouse, camera)
  const intersects = raycaster.intersectObjects(scene.children, false)
  console.log('点击了')

  if (intersects.length > 0) {
    const object = intersects[0].object
    object.layers.toggle(BLOOM_SCENE)
    scene.traverse(darkenNonBloomed)
    composer.bloomComposer.render()
    scene.traverse(restoreMaterial)
    composer.finalComposer.render()
  }
}

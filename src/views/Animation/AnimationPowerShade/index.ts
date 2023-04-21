import { scene, camera, control, renderer, axes } from './composables/baseObj'
import { loadEarth, loadLinghtEarth, loadSpiritEarth, loadInnerEarth } from './composables/powerShade'
import { loadBloomPass } from './composables/bloomPass'
import * as THREE from 'three'

const ENTIRE_SCENE = 0; const BLOOM_SCENE = 1

// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
// const mesh = new THREE.Mesh(geometry, material)
// mesh.name = 'video'
// mesh.layers.enable(BLOOM_SCENE)
// scene.add(mesh)

scene.add(camera)
scene.add(axes)
renderer.setSize(window.innerWidth, window.innerHeight)

let composer:any
const bloomLayer = new THREE.Layers()
bloomLayer.set(BLOOM_SCENE)
const materials = {} as any

export const initRender = () => {
  composer = loadBloomPass()
  loadEarth()
  loadLinghtEarth()
  loadSpiritEarth()
  loadInnerEarth()
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

import { scene, camera, control, renderer, axes } from './composables/baseObj'
import { loadModel } from './composables/gaugePoint'
import { loadBloomPass } from './composables/bloomPass'
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js'
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js'
import { shader } from './composables/shader'
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js'

const ENTIRE_SCENE = 0; const BLOOM_SCENE = 1

const geometry = new THREE.BoxGeometry(100, 100, 100)
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
const mesh = new THREE.Mesh(geometry, material)
mesh.name = 'video'
mesh.layers.enable(BLOOM_SCENE)
scene.add(mesh)

scene.add(camera)
scene.add(axes)
renderer.setSize(window.innerWidth, window.innerHeight)

let composer:any
const bloomLayer = new THREE.Layers()
bloomLayer.set(BLOOM_SCENE)
const materials = {} as any

const loader = new OBJLoader()// obj加载器
loader.load('./models/aifeier.obj', function (obj: any) {
  obj.children.forEach((item: any, index: number) => {
    item.material = new THREE.MeshBasicMaterial({
      color: 0x050918,
      depthWrite: false,
      side: THREE.DoubleSide,
      transparent: true
    })
    if (index === 0) {
      item.material.opacity = 0
    }
    item.layers.enable(BLOOM_SCENE)
  })
  obj.scale.set(0.2, 0.25, 0.2) // 放大obj组对象
  obj.position.x = 5
  obj.position.y = 5
  obj.position.z = 5
  scene.add(obj)// 返回的组对象插入场景中
})

export const initRender = () => {
  composer = loadBloomPass()
  setupScene()
  loadModel()
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

function setupScene () {
  scene.traverse(disposeMaterial)
  scene.children.length = 0

  const geometry = new THREE.IcosahedronGeometry(1, 15)

  for (let i = 0; i < 50; i++) {
    const color = new THREE.Color()
    color.setHSL(Math.random(), 0.7, Math.random() * 0.2 + 0.05)

    const material = new THREE.MeshBasicMaterial({ color: color })
    const sphere = new THREE.Mesh(geometry, material)
    sphere.position.x = Math.random() * 10 - 5
    sphere.position.y = Math.random() * 10 - 5
    sphere.position.z = Math.random() * 10 - 5
    sphere.position.normalize().multiplyScalar(Math.random() * 4.0 + 2.0)
    sphere.scale.setScalar(Math.random() * Math.random() + 0.5)
    scene.add(sphere)

    if (Math.random() < 0.25) sphere.layers.enable(BLOOM_SCENE)
  }

  animate()
}

function disposeMaterial (obj: any) {
  if (obj.material) {
    obj.material.dispose()
  }
}

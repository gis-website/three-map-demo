import * as THREE from 'three'
import { blowMaterial } from './composables/shader'
import { projection, map, scene, axes, camera, renderer, clock } from './composables/baseObj'
import { stats, gui } from './composables/datGUI'
import { params, createHighlight, bloomPass, colorObj } from './composables/ripple'

const geometry = new THREE.BoxGeometry(100, 100, 100)
const mesh = new THREE.Mesh(geometry, blowMaterial)
mesh.name = '1'
const planeGeometry = new THREE.PlaneGeometry(200, 200)
// const planeMaterial = new THREE.MeshBasicMaterial({ color: 0XAAAAAA })
const planeX = new THREE.Mesh(planeGeometry, blowMaterial)
const planeY = new THREE.Mesh(planeGeometry, blowMaterial)
const planeZ = new THREE.Mesh(planeGeometry, blowMaterial)
planeX.rotation.x = Math.PI * 0.5
planeY.rotation.y = Math.PI * 0.5
planeZ.rotation.z = Math.PI * 0.5

scene.add(planeX)
scene.add(planeY)
scene.add(planeZ)
scene.add(mesh)
scene.add(camera)
scene.add(axes)

let composer: any

const guiAdd = gui.addFolder('基础')
guiAdd.add(params, 'exposure', 0.1, 2).onChange((value: any) => {
  renderer.toneMappingExposure = Math.pow(value, 4.0)
})

guiAdd.add(params, 'bloomThreshold', 0.0, 1.0).onChange((value: any) => {
  bloomPass.threshold = Number(value)
})
guiAdd.add(params, 'bloomStrength', 0.0, 3.0).onChange((value: any) => {
  bloomPass.strength = Number(value)
})
guiAdd.add(params, 'bloomRadius', 0.0, 1.0).step(0.01).onChange((value: any) => {
  bloomPass.radius = Number(value)
})
guiAdd.addColor(colorObj, 'color').onChange((value: any) => {
  const element = scene.children.filter((elem: any) => elem.name === '1')[0]
  element.material.uniforms.u_color.value = new THREE.Color(value)
})
guiAdd.addColor(colorObj, 'tcolor').onChange((value: any) => {
  const element = scene.children.filter((elem: any) => elem.name === '1')
  element.material.uniforms.u_tcolor.value = new THREE.Color(value)
})

renderer.setSize(window.innerWidth, window.innerHeight)

export const initRender = () => {
  composer = createHighlight()
  animate()
}

const animate = () => {
  requestAnimationFrame(animate)
  stats.begin()
  const delta = clock.getDelta()
  moveAnimation(delta)
  renderer.render(scene, camera)
  if (composer) {
    composer.render()
  }
  stats.end()
}

const moveAnimation = (delta: any) => {
  if (blowMaterial) {
    blowMaterial.uniforms.u_r.value += delta * 50
    if (blowMaterial.uniforms.u_r.value >= 300) {
      blowMaterial.uniforms.u_r.value = 20
    }
  }
}

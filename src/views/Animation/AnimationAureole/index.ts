import * as THREE from 'three'
import { scene, axes, camera, renderer } from './composables/baseObj'
import { createHighlight } from './composables/aureole'

// const planeGeometry = new THREE.PlaneGeometry(200, 200)
// const planeMaterial = new THREE.MeshBasicMaterial({ color: 0XAAAAAA })
// const planeX = new THREE.Mesh(planeGeometry, planeMaterial)
// scene.add(planeX)
scene.add(camera)
scene.add(axes)

let composer: any

renderer.setSize(window.innerWidth, window.innerHeight)

export const initRender = () => {
  composer = createHighlight()
  animate()
}

const animate = () => {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
  if (composer) {
    composer.render()
  }
}

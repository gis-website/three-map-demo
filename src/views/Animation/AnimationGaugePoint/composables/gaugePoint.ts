import * as THREE from 'three'
import { scene } from './baseObj'

export const floatBox = (position:any) => {
  const texture = new THREE.TextureLoader().load('./images/gradual_change_y_02.png')
  const texture1 = new THREE.TextureLoader().load('./images/gradual_red_02.png')
  const geometry = new THREE.ConeGeometry(3.5, 5.5, 4)
  const material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    map: texture
  })
  const sphere = new THREE.Mesh(geometry, material)
  sphere.position.x = position.x
  sphere.position.y = position.y
  sphere.position.z = position.z
  sphere.rotation.x = -Math.PI
  sphere.layers.enable(1)
  scene.add(sphere)
  const geometry1 = new THREE.RingGeometry(1, 2, 22)
  const material1 = new THREE.MeshBasicMaterial({
    side: THREE.DoubleSide,
    transparent: true,
    map: texture1
  })
  const mesh = new THREE.Mesh(geometry1, material1)
  mesh.position.x = position.x
  mesh.position.y = position.y - 3.5
  mesh.position.z = position.z
  mesh.rotation.x = -Math.PI / 2
  mesh.layers.enable(1)
  scene.add(mesh)
  let s = 0
  let p = 0
  let tag = true
  function render () {
    // animation
    if (s > 80) {
      s = 0
      tag = !tag
    }
    sphere.position.y = tag
      ? position.y + s / 40
      : position.y + 2 - s / 40
    sphere.rotation.y = p / 30
    mesh.scale.set(
      tag ? 1 + s / 80 : 2 - s / 80,
      tag ? 1 + s / 80 : 2 - s / 80,
      1
    )
    s++
    p++
    requestAnimationFrame(render)
  }
  render()
}

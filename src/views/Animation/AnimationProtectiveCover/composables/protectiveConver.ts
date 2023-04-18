import * as THREE from 'three'

// 圆柱体扩散
export const create3DCylinder = (r:any, src:any, type:any) => {
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
  // circle.rotation.x = -Math.PI / 2.0;
  let s = 0
  let p = 0

  function render () {
    // animation
    if (s > 160) {
      s = 0
      p = 160
    }
    if (!type) {
      circle.scale.set(1 + s / 60, 1, 1 + s / 60)
      circle.material[0].opacity = p / 160
      s++
      p--
    }
    requestAnimationFrame(render)
  }
  render()

  return circle
}

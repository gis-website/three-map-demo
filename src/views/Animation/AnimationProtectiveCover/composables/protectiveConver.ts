/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-18 14:32:26
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-23 14:07:11
 * @FilePath: \three-map-demo\src\views\Animation\AnimationProtectiveCover\composables\protectiveConver.ts
 * @Description: come true protective conver
 */
import * as THREE from 'three'

// 圆柱体扩散
export const createProtectiveConver = (r:number, src:string, type:boolean) => {
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

  let s = 0
  let p = 0

  function render () {
    // animation
    if (s > 160) {
      s = 0
      p = 160
    }
    if (type) {
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

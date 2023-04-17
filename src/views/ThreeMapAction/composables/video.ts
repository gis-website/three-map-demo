/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-17 09:12:05
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-17 15:05:08
 * @FilePath: \three-map-demo\src\views\ThreeMapAction\composables\video.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import * as THREE from 'three'
import { scene } from './baseObj'

export const createVideoAnimation = ():void => {
  const path = '/videos/zp2.mp4'

  const video = document.createElement('video')

  const size = new THREE.Vector2(10, 10)

  const position = new THREE.Vector3(0, 0, 0)
  video.src = path
  video.muted = true
  video.loop = true
  video.play()
  const texture = new THREE.VideoTexture(video)

  const planeGeometry = new THREE.PlaneGeometry(size.x, size.y, 1, 1)
  const planeMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    map: texture,
    alphaMap: texture
  })

  const mesh = new THREE.Mesh(planeGeometry, planeMaterial)
  mesh.position.copy(position)
  mesh.name = 'video'
  mesh.rotation.x = -Math.PI / 4
  scene.add(mesh)
}

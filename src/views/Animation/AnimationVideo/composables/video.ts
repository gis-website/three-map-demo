/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-16 13:40:47
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-23 15:02:47
 * @FilePath: \three-map-demo\src\views\Animation\AnimationVideo\composables\video.ts
 * @Description: create video animation
 */
import * as THREE from 'three'
import { scene } from '@/base/baseObj'

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
  scene.add(mesh)
}

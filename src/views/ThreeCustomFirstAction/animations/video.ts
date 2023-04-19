/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-18 19:31:05
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-19 09:40:23
 * @FilePath: \three-map-demo\src\views\ThreeCustomFirstAction\animations\video.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import * as THREE from 'three'
import { scene } from '../base/baseObj'

/**
 * @description: 加载底层视频
 * @param {*} void
 * @return {*}
 */
export const loadBaseVideo = ():void => {
  const path = '/videos/zp2.mp4'

  const video = document.createElement('video')

  const size = new THREE.Vector2(250, 250)

  const position = new THREE.Vector3(0, -20, 0)
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
  mesh.layers.enable(1)
  mesh.rotation.x = -Math.PI * 0.45
  scene.add(mesh)
}

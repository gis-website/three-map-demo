/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-17 20:46:44
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-21 11:14:35
 * @FilePath: \three-map-demo\src\views\Animation\AnimationGaugePoint\composables\gaugePoint.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import * as THREE from 'three'
import { scene } from './baseObj'
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js'

export const loadEarth = ():void => {
  // 创建地球
  const earthGeometry = new THREE.SphereGeometry(50, 32, 32)
  const earthTexture = new THREE.TextureLoader().load('./images/map.jpg')

  const earthMaterial = new THREE.MeshBasicMaterial({
    map: earthTexture
  })
  const earth = new THREE.Mesh(earthGeometry, earthMaterial)
  scene.add(earth)
}

export const loadLinghtEarth = ():void => {
  const lightTexture = new THREE.TextureLoader().load('./images/earth.jpg')
  const lightEarthGeometry = new THREE.SphereGeometry(53, 32, 32)
  const lightEarthMaterial = new THREE.MeshBasicMaterial({
    map: lightTexture,
    alphaMap: lightTexture,
    blending: THREE.AdditiveBlending,
    transparent: true
  })
  const lightEarth = new THREE.Mesh(lightEarthGeometry, lightEarthMaterial)
  scene.add(lightEarth)
}

export const loadSpiritEarth = ():void => {
  const spriteTexture = new THREE.TextureLoader().load('./images/glow.png')
  const spriteMaterial = new THREE.SpriteMaterial({
    map: spriteTexture,
    color: 0x4d76cf,
    transparent: true,
    depthWrite: false,
    depthTest: false,
    blending: THREE.AdditiveBlending
  })
  const sprite = new THREE.Sprite(spriteMaterial)
  sprite.scale.set(155, 155, 0)
  scene.add(sprite)
}
export const loadInnerEarth = ():void => {
  // 内发光
  const spriteTexture1 = new THREE.TextureLoader().load('./images/innerGlow.png')
  const spriteMaterial1 = new THREE.SpriteMaterial({
    map: spriteTexture1,
    color: 0x4d76cf,
    transparent: true,
    depthWrite: false,
    depthTest: false,
    blending: THREE.AdditiveBlending
  })
  const sprite1 = new THREE.Sprite(spriteMaterial1)
  sprite1.scale.set(128, 128, 0)
  scene.add(sprite1)
}

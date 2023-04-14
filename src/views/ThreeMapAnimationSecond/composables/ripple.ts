/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-14 11:17:04
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-14 15:56:40
 * @FilePath: \three-map-demo\src\views\ThreeMapAnimationSecond\composables\ripple.ts
 * @Description: highlight animation
 */
import * as THREE from 'three'
import { camera, scene, renderer, map } from './baseObj'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'

export const params = {
  exposure: 1,
  bloomStrength: 0.35,
  bloomThreshold: 0,
  bloomRadius: 0
}

export const colorObj = {
  color: '#ffde00',
  tcolor: '#006dff'
}

export const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85)

export const createHighlight = ():any => {
  // 创建一个EffectComposer（对象，然后在该对象上添加后期处理通道。
  const composer = new EffectComposer(renderer)
  // 新建一个场景通道  为了覆盖到原理来的场景上
  const renderPass = new RenderPass(scene, camera)
  composer.addPass(renderPass)

  bloomPass.threshold = params.bloomThreshold
  bloomPass.strength = params.bloomStrength
  bloomPass.radius = params.bloomRadius
  composer.addPass(bloomPass)
}

/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-14 11:17:04
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-23 14:43:04
 * @FilePath: \three-map-demo\src\views\Animation\AnimationRipple\composables\ripple.ts
 * @Description: create ripple
 */

import * as THREE from 'three'
import { camera, scene, renderer } from '@/base/baseObj'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import vertexShader from '@/shader/ripple/vertex.glsl'
import fragmentShader from '@/shader/ripple/fragment.glsl'
import { gui } from '@/base/datGUI'

const blowuniform = {
  u_color: { value: new THREE.Color('#ffde00') },
  u_tcolor: { value: new THREE.Color('#006dff') },
  u_r: { value: 0.25 },
  u_length: { value: 20 } // 扫过区域
}

export const blowMaterial = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  side: THREE.DoubleSide,
  uniforms: blowuniform,
  transparent: true,
  depthWrite: false
})

const geometry = new THREE.BoxGeometry(100, 100, 100)
const mesh = new THREE.Mesh(geometry, blowMaterial)
mesh.name = '1'
const planeGeometry = new THREE.PlaneGeometry(200, 200)
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

const params = {
  exposure: 1,
  bloomStrength: 0.35,
  bloomThreshold: 0,
  bloomRadius: 0
}

const colorObj = {
  color: '#ffde00',
  tcolor: '#006dff'
}

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
  const element = scene.children.filter((elem: any) => elem.name === '1')[0]
  element.material.uniforms.u_tcolor.value = new THREE.Color(value)
})

export const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85)

export const createPass = ():any => {
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

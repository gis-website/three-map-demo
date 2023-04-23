/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-23 10:37:31
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-23 10:44:24
 * @FilePath: \three-map-demo\src\common\bloomPass.ts
 * @Description: come true bloom pass
 */

import { scene, renderer, camera } from '@/base/baseObj'
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import vertexShader from '@/shader/bloomPass/vertex.glsl'
import fragmentShader from '@/shader/bloomPass/fragment.glsl'

const BLOOM_SCENE = 1

const params = {
  exposure: 1,
  bloomStrength: 5,
  bloomThreshold: 0,
  bloomRadius: 0,
  scene: 'Scene with Glow'
}

const bloomLayer = new THREE.Layers()
bloomLayer.set(BLOOM_SCENE)
const materials = {} as Object3D
const darkMaterial = new THREE.MeshBasicMaterial({ color: 'black' })

export const loadBloomPass = ():void => {
  const bloomComposer = new EffectComposer(renderer)
  const renderScene = new RenderPass(scene, camera)
  const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85)
  bloomComposer.renderToScreen = false
  bloomPass.threshold = params.bloomThreshold
  bloomPass.strength = params.bloomStrength
  bloomPass.radius = params.bloomRadius
  // 自定义的着色器通道 作为参数
  const finalPass = new ShaderPass(
    new THREE.ShaderMaterial({
      uniforms: {
        baseTexture: { value: null },
        bloomTexture: { value: bloomComposer.renderTarget2.texture }
      },
      vertexShader,
      fragmentShader,
      defines: {}
    }), 'baseTexture'
  )
  finalPass.needsSwap = true

  const finalComposer = new EffectComposer(renderer)
  finalComposer.addPass(renderScene)
  finalComposer.addPass(finalPass)
  bloomComposer.addPass(renderScene)
  bloomComposer.addPass(bloomPass)

  const render = ():void => {
    requestAnimationFrame(render)
    scene.traverse(darkenNonBloomed)
    bloomComposer.render()
    scene.traverse(restoreMaterial)
    finalComposer.render()
  }

  render()
}

/**
 * @description: 去除高亮
 * @param {Object3D} obj
 * @return {*}
 */
const darkenNonBloomed = (obj:Object3D):void => {
  if (obj.isMesh && bloomLayer.test(obj.layers) === false) {
    materials[obj.uuid] = obj.material
    obj.material = darkMaterial
  }
}

/**
 * @description: 复原高亮
 * @param {Object3D} obj
 * @return {*}
 */
const restoreMaterial = (obj:Object3D):void => {
  if (materials[obj.uuid]) {
    obj.material = materials[obj.uuid]
    delete materials[obj.uuid]
  }
}

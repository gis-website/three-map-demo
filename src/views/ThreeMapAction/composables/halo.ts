/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-17 09:12:19
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-17 17:44:44
 * @FilePath: \three-map-demo\src\views\ThreeMapAction\composables\halo.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { scene, camera, renderer, map } from './baseObj'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js'

import { shader } from './shader'
import * as THREE from 'three'
export const createHalo = ():any => {
  const bloomComposer = new EffectComposer(renderer)
  const renderScene = new RenderPass(scene, camera)
  // 添加UnrealBloomPass
  const bloomPass = new UnrealBloomPass()
  // 设置UnrealBloomPass参数
  bloomPass.threshold = 0
  bloomPass.strength = 3
  bloomPass.radius = 1

  // 物体边缘发光通道
  const outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera, map.children
  )
  outlinePass.selectedObjects = map.children
  outlinePass.edgeStrength = 15.0 // 边框的亮度
  outlinePass.edgeGlow = 2// 光晕[0,1]
  outlinePass.usePatternTexture = false // 是否使用父级的材质
  outlinePass.edgeThickness = 1.0 // 边框宽度
  outlinePass.downSampleRatio = 1 // 边框弯曲度
  outlinePass.pulsePeriod = 5 // 呼吸闪烁的速度
  outlinePass.visibleEdgeColor.set('#892b00') // 呼吸显示的颜色
  outlinePass.hiddenEdgeColor = new THREE.Color(0, 0, 0) // 呼吸消失的颜色
  outlinePass.clear = true
  // 自定义的着色器通道 作为参数
  const effectFXAA = new ShaderPass(FXAAShader)
  effectFXAA.uniforms.resolution.value.set(1 / window.innerWidth, 1 / window.innerHeight)
  effectFXAA.renderToScreen = true

  bloomComposer.addPass(bloomPass)
  // 自定义的着色器通道 作为参数
  const finalPass = new ShaderPass(
    new THREE.ShaderMaterial({
      uniforms: {
        baseTexture: { value: null },
        bloomTexture: { value: bloomComposer.renderTarget2.texture }
      },
      vertexShader: shader.vertexShader,
      fragmentShader: shader.fragmentShader,
      defines: {}
    }), 'baseTexture'
  )
  finalPass.needsSwap = true
  finalPass.needsSwap = true
  const finalComposer = new EffectComposer(renderer)
  finalComposer.addPass(renderScene)
  bloomComposer.addPass(renderScene)
  bloomComposer.addPass(outlinePass)
  bloomComposer.addPass(effectFXAA)
  finalComposer.addPass(finalPass)

  return { bloomComposer, finalComposer }
}

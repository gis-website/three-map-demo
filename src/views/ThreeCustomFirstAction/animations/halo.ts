/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-18 19:49:57
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-23 15:33:25
 * @FilePath: \three-map-demo\src\views\ThreeCustomFirstAction\animations\halo.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { scene, camera, renderer } from '@/base/baseObj'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import * as THREE from 'three'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js'
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js'
import vertexShader from '@/shader/bloomPass/vertex.glsl'
import fragmentShader from '@/shader/bloomPass/fragment.glsl'

const params = {
  exposure: 1,
  bloomStrength: 2,
  bloomThreshold: 0,
  bloomRadius: 0,
  scene: 'Scene with Glow'
}

let outlinePass: any // 存储当前创建的pass，用于后续删除

export const createHalo = ():any => {
  const bloomComposer = new EffectComposer(renderer)
  const renderScene = new RenderPass(scene, camera)
  const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85)
  bloomComposer.renderToScreen = false
  bloomPass.threshold = params.bloomThreshold
  bloomPass.strength = params.bloomStrength
  bloomPass.radius = params.bloomRadius

  // 物体边缘发光通道
  outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera)
  outlinePass.edgeStrength = 15.0 // 边框的亮度
  outlinePass.edgeGlow = 2// 光晕[0,1]
  outlinePass.usePatternTexture = false // 是否使用父级的材质
  outlinePass.edgeThickness = 1.0 // 边框宽度
  outlinePass.downSampleRatio = 1 // 边框弯曲度
  outlinePass.pulsePeriod = 5 // 呼吸闪烁的速度
  outlinePass.visibleEdgeColor.set('#aeff00') // 呼吸显示的颜色
  outlinePass.hiddenEdgeColor = new THREE.Color(0, 0, 0) // 呼吸消失的颜色
  outlinePass.clear = true
  // 自定义的着色器通道 作为参数
  const effectFXAA = new ShaderPass(FXAAShader)
  effectFXAA.uniforms.resolution.value.set(1 / window.innerWidth, 1 / window.innerHeight)

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
  bloomComposer.addPass(outlinePass)
  bloomComposer.addPass(effectFXAA)

  return { bloomComposer, finalComposer }
}

export const createOutLine = (obj:any):void => {
  outlinePass.selectedObjects = obj
}

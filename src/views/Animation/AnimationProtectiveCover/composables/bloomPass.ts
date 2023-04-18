/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-18 09:15:26
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-18 13:38:10
 * @FilePath: \three-map-demo\src\views\Animation\AnimationAddModel\composables\bloomPass.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { scene, renderer, camera } from './baseObj'
import * as THREE from 'three'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { shader } from './shader'

const params = {
  exposure: 1,
  bloomStrength: 5,
  bloomThreshold: 0,
  bloomRadius: 0,
  scene: 'Scene with Glow'
}

export const loadBloomPass = ():any => {
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
      vertexShader: shader.vertexShader,
      fragmentShader: shader.fragmentShader,
      defines: {}
    }), 'baseTexture'
  )
  finalPass.needsSwap = true

  const finalComposer = new EffectComposer(renderer)
  finalComposer.addPass(renderScene)
  finalComposer.addPass(finalPass)
  bloomComposer.addPass(renderScene)
  bloomComposer.addPass(bloomPass)
  console.log(bloomComposer.renderTarget2.texture)

  return { bloomComposer, finalComposer }
}

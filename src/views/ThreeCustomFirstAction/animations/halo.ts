import { scene, camera, renderer } from '../base/baseObj'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { haloShader } from '../base/shader'
import * as THREE from 'three'
const params = {
  exposure: 1,
  bloomStrength: 2,
  bloomThreshold: 0,
  bloomRadius: 0,
  scene: 'Scene with Glow'
}
export const createHalo = ():any => {
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
      vertexShader: haloShader.vertexShader,
      fragmentShader: haloShader.fragmentShader,
      defines: {}
    }), 'baseTexture'
  )
  finalPass.needsSwap = true

  const finalComposer = new EffectComposer(renderer)
  finalComposer.addPass(renderScene)
  finalComposer.addPass(finalPass)
  bloomComposer.addPass(renderScene)
  bloomComposer.addPass(bloomPass)

  return { bloomComposer, finalComposer }
}

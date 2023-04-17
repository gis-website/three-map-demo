/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-14 08:57:46
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-17 16:34:28
 * @FilePath: \three-map-demo\src\views\ThreeMapAnimationFirst\composables\outline.ts
 * @Description: outline animation
 */
import * as THREE from 'three'
import { camera, scene, renderer, map } from './baseObj'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass.js'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js'
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js'

export const mouseClick = (e: any): void => {
  // 获取在射线上的接触点
  // 获取鼠标坐标
  const mouse = new THREE.Vector2()
  const raycaster = new THREE.Raycaster()
  mouse.x = (e.clientX / window.innerWidth) * 2 - 1
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1

  raycaster.setFromCamera(mouse, camera)
  const intersects = raycaster.intersectObjects(scene.children, true)
  if (intersects && intersects.length > 0) {
    console.log('点击模型', intersects[0])
    console.log('点击模型', map)
    // createOutLine([intersects[0].object.parent])
  }
}

export const createOutLine = (): any => {
  // 创建一个EffectComposer（对象，然后在该对象上添加后期处理通道。
  const composer = new EffectComposer(renderer)
  // 新建一个场景通道  为了覆盖到原理来的场景上
  const renderPass = new RenderPass(scene, camera)
  composer.addPass(renderPass)
  // 物体边缘发光通道
  const outlinePass = new OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera, map.children
  )
  console.log(map.children)
  outlinePass.selectedObjects = map.children
  outlinePass.edgeStrength = 15.0 // 边框的亮度
  outlinePass.edgeGlow = 2// 光晕[0,1]
  outlinePass.usePatternTexture = false // 是否使用父级的材质
  outlinePass.edgeThickness = 1.0 // 边框宽度
  outlinePass.downSampleRatio = 1 // 边框弯曲度
  outlinePass.pulsePeriod = 5 // 呼吸闪烁的速度
  outlinePass.visibleEdgeColor.set('#7300ff') // 呼吸显示的颜色
  outlinePass.hiddenEdgeColor = new THREE.Color(0, 0, 0) // 呼吸消失的颜色
  outlinePass.clear = true
  // 自定义的着色器通道 作为参数
  const effectFXAA = new ShaderPass(FXAAShader)
  effectFXAA.uniforms.resolution.value.set(1 / window.innerWidth, 1 / window.innerHeight)
  effectFXAA.renderToScreen = true
  composer.addPass(outlinePass)
  composer.addPass(effectFXAA)
  return composer
}

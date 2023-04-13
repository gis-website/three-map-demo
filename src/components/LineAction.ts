/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-13 17:26:31
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-13 17:33:40
 * @FilePath: \three-map-demo\src\components\LineAction.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import * as THREE from 'three'

const pointer = new THREE.Vector2()
const raycaster = new THREE.Raycaster()
export const lineAction = (event: any, camera: any, scene: any, renderer: any) => {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1
  raycaster.setFromCamera(pointer, camera)
  // geometrys为需要监听的Mesh合集
  // true为不拾取子对象
  // 被射线穿过的几何体为一个集合，越排在前面说明其位置离端点越近，所以直接取[0]就是被监听到的几何体
  // 给监听到的几何体增加边框发光特效
  // alert(intersects[0].object.name);
  // 创建一个EffectComposer（效果组合器）对象，然后在该对象上添加后期处理通道。
  const composer = new THREE.EffectComposer(renderer)
  // 新建一个场景通道  为了覆盖到原理来的场景上
  const renderPass = new THREE.RenderPass(scene, camera)
  composer.addPass(renderPass)
  // 创建物体边缘发光通道
  const outlinePass = new THREE.OutlinePass(new THREE.Vector2(window.innerWidth, window.innerHeight), scene, camera)
  // 定义样式
  outlinePass.edgeStrength = 3 // 边框的亮度
  outlinePass.edgeGlow = 2 // 光晕
  outlinePass.usePatternTexture = false // 是否使用父级的材质
  outlinePass.edgeThickness = 2 // 边框宽度
  outlinePass.downSampleRatio = 2 // 边框弯曲度
  outlinePass.pulsePeriod = 2 // 呼吸闪烁的速度
  outlinePass.visibleEdgeColor.set(parseInt('0xff0000')) // 呼吸显示的颜色
  outlinePass.hiddenEdgeColor = new THREE.Color(0, 0, 0) // 呼吸消失的颜色
  outlinePass.clear = true

  composer.addPass(renderPass)
  composer.addPass(outlinePass)

  const effectFXAA = new THREE.ShaderPass(THREE.FXAAShader)
  effectFXAA.uniforms.resolution.value.set(1 / window.innerWidth, 1 / window.innerHeight)
  effectFXAA.renderToScreen = true
  composer.addPass(effectFXAA)
}

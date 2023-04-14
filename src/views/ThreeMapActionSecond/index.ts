/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-14 09:55:02
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-14 17:13:02
 * @FilePath: \three-map-demo\src\views\ThreeMapActionSecond\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import * as THREE from 'three'
import { scene, camera, renderer, control, axes, map } from './composables/baseObj'
import { initCircle, drawMapChina, circleAnimation, drawLightBar } from './composables/CircleAction'
import { getJsonNanJingData, getJsonChinaData } from '@/api/index'

const clock = new THREE.Clock() // 时间
const raycaster = new THREE.Raycaster() // 射线追踪
const mouse = new THREE.Vector2() // 鼠标对象

const ambientLight = new THREE.AmbientLight(101070, 20)
scene.add(ambientLight) // 环境

scene.add(axes)

camera.position.set(0, 0, 15)
camera.lookAt(scene.position)

renderer.setSize(window.innerWidth, window.innerHeight)

let lastPick:any
const flag = true

export const init = async (param: any, tooltip:any) => {
  const myMapData = await getJsonNanJingData()
  const chinaData = await getJsonChinaData()
  drawMapChina(chinaData, scene)
  initCircle(myMapData, scene, map)
  drawLightBar(myMapData, scene)
  param.appendChild(renderer.domElement)
  // 获取鼠标当前位置
  window.addEventListener('pointermove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
    // 更改div位置
    tooltip.style.left = event.clientX + 2 + 'px'
    tooltip.style.top = event.clientY + 2 + 'px'
  })
  animate(tooltip)
}

/**
   * @description: 添加相机轨道运动
   * @return {*}
   */
const animate = (param: any) => {
  requestAnimationFrame(animate)
  // 通过摄像机和鼠标位置更新射线
  raycaster.setFromCamera(mouse, camera)
  // 算出射线 与当场景相交的对象有那些
  const intersects = raycaster.intersectObjects(scene.children, true)

  //   if (lastPick) {
  //     console.log(lastPick)
  //     lastPick.object.material[0].color.set('#2defff')
  //     console.log(lastPick.object)
  //     lastPick.object.material[1].color.set('#3480C4')
  //   }
  //   lastPick = intersects.find(
  //     (item: any) => item.object.material && item.object.material.length === 2
  //   )
  //   if (flag) { // 拦截器：放在第一次加载触发选中状态
  //     flag = !flag
  //     control.update()
  //     showTip(param)
  //     renderer.render(scene, camera)
  //     return
  //   }
  //   if (lastPick) {
  //     lastPick.object.material[0].color.set(0xff0000)
  //     lastPick.object.material[1].color.set(0xff0000)
  //   }
  control.update()
  showTip(param)
  const dalte = clock.getDelta()
  circleAnimation(dalte)
  renderer.render(scene, camera)
}

const showTip = (param: any) => {
  // 显示信息
//   if (lastPick) {
//     const properties = lastPick.object.parent.properties

//     param.textContent = properties.name
//     param.style.display = 'block'
//   } else {
//     param.style.display = 'none'
//   }
}

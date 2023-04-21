/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-18 19:20:01
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-21 10:09:10
 * @FilePath: \three-map-demo\src\views\ThreeCustomFirstAction\composables\listenEvent.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createOutLine } from '../animations/halo'
import { mouse, raycaster, camera, scene } from '../base/baseObj'
import { ref } from 'vue'
import { showGaugePoint } from './loadGaugePoint'

const lastPick = ref()

export const pointerMoveEvent = (tooltip:any): void => {
  // 获取鼠标当前位置
  window.addEventListener('pointerdown', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
    // 更改div位置
    tooltip.style.left = event.clientX + 2 + 'px'
    tooltip.style.top = event.clientY + 2 + 'px'

    // 通过摄像机和鼠标位置更新射线
    raycaster.setFromCamera(mouse, camera)

    // 算出射线 与当场景相交的对象有那些
    const intersects = raycaster.intersectObjects(scene.children, true)

    if (lastPick.value) {
      lastPick.value.object.material[0].color.set('#002642')
      // lastPick.object.material[1].uniforms.u_color.set('#3480C4')
    }
    lastPick.value = intersects.find(
      (item: any) => item.object.material && item.object.material.length === 2
    )
    if (lastPick.value) {
      console.log(lastPick.value)
      lastPick.value.object.material[0].color.set('#02fad4')
      // lastPick.object.material[1].uniforms.u_color.set(0xff0000)
      createOutLine([lastPick.value.object.parent])
      showGaugePoint(lastPick.value)
    } else {
      createOutLine([])
    }

    // if (intersects && intersects.length > 0 && intersects[0].object.parent && intersects[0].object.parent.properties !== undefined) {
    //   console.log(lastPick.value)

    // }

    // 显示信息
    if (lastPick.value) {
      const properties = lastPick.value.object.parent.properties

      tooltip.textContent = properties.name
      tooltip.style.display = 'block'
    } else {
      tooltip.style.display = 'none'
    }
  })
}

/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-21 11:36:12
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-21 15:22:19
 * @FilePath: \three-map-demo\src\views\ThreeCustomFirstAction\composables\loadRoutationLine.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { commonUniforms, initCircleCurveGroup, createFlyLine, randomVec3Color } from '../animations/routationLine'

export const loadRoutationLine = (): void => {
  const curves = initCircleCurveGroup(2, 150, 150)

  for (const curve of curves) {
    createFlyLine(curve, {
      speed: 0.2,
      number: Math.floor(Math.random() * 9 + 1),
      color: randomVec3Color(),
      size: 4.0
    }, 18000, 1, { x: 0, y: 0, z: 0 })
  }
  const reader = () => {
    requestAnimationFrame(reader)
    commonUniforms.u_time.value += 0.01
  }
  reader()
}

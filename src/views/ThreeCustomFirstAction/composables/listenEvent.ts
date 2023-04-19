import { mouse } from '../base/baseObj'

export const pointerMoveEvent = (): void => {
  // 获取鼠标当前位置
  window.addEventListener('pointermove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
  })
}

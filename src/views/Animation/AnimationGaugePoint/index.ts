import { scene, camera, control, renderer, axes } from './composables/baseObj'
import { floatBox } from './composables/gaugePoint'

scene.add(camera)
scene.add(axes)
renderer.setSize(window.innerWidth, window.innerHeight)

export const initRender = () => {
  floatBox({ x: 0, y: 10, z: 5 })
  floatBox({ x: 0, y: 0, z: 5 })

  animate()
}

const animate = () => {
  requestAnimationFrame(animate)
  control.update()
  renderer.render(scene, camera)
}

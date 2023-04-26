/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-14 07:37:20
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-26 22:53:04
 * @FilePath: \three-map-demo\src\views\ThreeStart\index.ts
 * @Description: logic center
 */
import * as THREE from 'three'
import { scene, camera, renderer, control } from '@/base/baseObj'
import fragmentShader from '@/shader/rippleRectangle/fragmentShader.frag'
import vertexShader from '@/shader/rippleRectangle/vertexShader.vert'
import { loadRectangle, changeRectangle } from './composables/loadRectangle'

const uniforms = {
  scale: { value: 0 },
  color1: { value: new THREE.Color('#007eff') },
  color2: { value: new THREE.Color('#00ff90') }
}

const planeShaderMaterial = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  transparent: true,
  uniforms
})

const listShaders = [] as any
listShaders.push(planeShaderMaterial)
const planeGeometry = new THREE.PlaneGeometry(50, 50)

const plane = new THREE.Mesh(planeGeometry, planeShaderMaterial)

plane.rotation.x = -Math.PI * 0.5

scene.add(plane)

scene.add(camera)

const axes = new THREE.AxesHelper(5)
scene.add(axes)

renderer.setSize(window.innerWidth, window.innerHeight)

loadRectangle()

const forceColor = new THREE.Color('#51f')
const forceColor1 = new THREE.Color('#1ff')

export const animate = () => {
  listShaders.forEach((listShader: any) => {
    listShader.uniforms.scale.value += 0.01
    listShader.uniforms.scale.value %= 1
    // listShader.uniforms.scale.value = Math.abs(Math.sin(performance.now() / 1000))

    changeRectangle((box:any) => {
      const distance = box.position.distanceTo(plane.position)

      const scale = listShader.uniforms.scale.value
      const far = scale * 25
      const near = (scale - 0.1) * 25

      if (distance > near && distance < far) {
        box.material.uniforms.forceColor = { value: forceColor }
      } else {
        box.material.uniforms.forceColor = { value: forceColor1 }
      }
    })
  })

  renderer.render(scene, camera)

  requestAnimationFrame(animate)
}

/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-14 07:37:20
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-25 10:45:28
 * @FilePath: \three-map-demo\src\views\ThreeStart\index.ts
 * @Description: logic center
 */
import * as THREE from 'three'
import { scene, camera, renderer, control } from '@/base/baseObj'
import fragmentShader from '@/shader/gradientRampRectangle/fragmentShader.frag'
import vertexShader from '@/shader/gradientRampRectangle/vertexShader.vert'

const uniforms = {
  upColor: { value: new THREE.Color('#fff') },
  upColor2: { value: new THREE.Color('#fff') },
  downColor: { value: new THREE.Color('#f00') },
  time: { value: 0 },
  speed: { value: 1 },
  height: { value: null }
}

const shaderMaterial = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms
})

const listShaders = [] as any

for (let index = 0; index < 100; index++) {
  const { random } = Math
  const height = random() * 10
  const geometry = new THREE.BoxGeometry(random() * 2, height, random() * 2, 10, 10, 10)

  const itemShader = shaderMaterial.clone()
  listShaders.push(itemShader)
  itemShader.uniforms.upColor.value.r = random()
  itemShader.uniforms.height.value = height
  itemShader.uniforms.downColor.value.r = random()
  itemShader.uniforms.speed.value = (0.5 - random()) * 2

  const mesh = new THREE.Mesh(geometry, itemShader)

  mesh.position.x = (0.5 - random()) * 30
  mesh.position.y = height / 2
  mesh.position.z = (0.5 - random()) * 30

  scene.add(mesh)
}

scene.add(camera)

const axes = new THREE.AxesHelper(5)
scene.add(axes)

renderer.setSize(window.innerWidth, window.innerHeight)

export const animate = () => {
  listShaders.forEach((item: any) => {
    item.uniforms.time.value += 0.01
  })
  renderer.render(scene, camera)

  requestAnimationFrame(animate)
}

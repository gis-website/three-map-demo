import fragmentShader from '../prvaite/fragmentShader.frag'
import vertexShader from '../prvaite/vertexShader.vert'
import * as THREE from 'three'
import { scene } from '@/base/baseObj'

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

const rectangles = [] as any

const group = new THREE.Group()

export const loadRectangle = ():void => {
  for (let index = 0; index < 100; index++) {
    const { random } = Math
    const height = random() * 10
    const geometry = new THREE.BoxGeometry(random() * 2, height, random() * 2, 10, 10, 10)

    const itemShader = shaderMaterial.clone()
    itemShader.uniforms.upColor.value.r = random()
    itemShader.uniforms.height.value = height
    itemShader.uniforms.downColor.value.r = random()
    itemShader.uniforms.speed.value = (0.5 - random()) * 2

    const mesh = new THREE.Mesh(geometry, itemShader)

    mesh.position.x = (0.5 - random()) * 30
    mesh.position.y = height / 2
    mesh.position.z = (0.5 - random()) * 30

    group.add(mesh)
    rectangles.push(mesh)
  }

  scene.add(group)
}
export const changeRectangle = (call:(mesh: any) => void):void => {
  rectangles.forEach((item: any) => {
    item.material.uniforms.time.value += 0.01
    call(item)
  })
}

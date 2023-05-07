import * as THREE from 'three'
import { scene } from '@/base/baseObj'
import fragmentShader from '@/shader/upDownGradient/fragmentShader.frag'
import vertexShader from '@/shader/upDownGradient/vertexShader.vert'

export const uniforms = {
  u_defaultColor: { value: new THREE.Color(0xff0000) },
  u_changeColor: { value: new THREE.Color(0x00ffd9) },
  u_time: { value: 0 }
}

export const loadElement = ():void => {
  const height = 10

  const geometry = new THREE.BoxGeometry(1, height, 1)
  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader
  })
  const cube = new THREE.Mesh(geometry, material)
  console.log(geometry)

  cube.position.y = height / 2

  scene.add(cube)
}

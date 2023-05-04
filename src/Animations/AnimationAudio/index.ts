/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-14 07:37:20
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-05-04 12:31:20
 * @FilePath: \three-map-demo\src\views\ThreeStart\index.ts
 * @Description: logic center
 */
import * as THREE from 'three'
import { scene, camera, renderer, control } from '@/base/baseObj'
import { loadAudio } from './composables/loadAudio'
import vertexShader from '@/shader/audio/vertexShader.vert'
import fragmentShader from '@/shader/audio/fragmentShader.frag'

scene.add(camera)

const axes = new THREE.AxesHelper(50)
scene.add(axes)

renderer.setSize(window.innerWidth, window.innerHeight)

const texture = new THREE.TextureLoader().load('./images//test_texture.png', (texture:any) => {
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
})

const { width, height } = renderer.getDrawingBufferSize(new THREE.Vector2())

const uniforms = {
  iResolution: {
    value: new THREE.Vector2(width, height)
  },
  iTime: { value: 0 },
  iChannel0: { value: texture }
} as any

export const init = (): void => {
  loadTexture()
  animate()
}

const animate = () => {
  control.update()
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}

export const click = ():void => {
  const src = './music/1.mp3'
  const size = 128
  const format = renderer.capabilities.isWebGL2
    ? THREE.RedFormat
    : THREE.LuminanceFormat
  // loadAudio(src, size, format)

  const listener = new THREE.AudioListener()

  const audio = new THREE.Audio(listener)

  const mediaElement = new Audio(src)
  mediaElement.play()

  audio.setMediaElementSource(mediaElement)

  const analyser = new THREE.AudioAnalyser(audio, size)

  uniforms.iChannel1 = { value: new THREE.DataTexture(analyser.data, size / 2, 1, format) }
  console.log(uniforms)
  const render = () => {
    analyser.getFrequencyData()
    uniforms.iChannel1.value.needsUpdate = true
    requestAnimationFrame(render)
  }
  render()
}

const loadTexture = ():void => {
  const material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader,
    fragmentShader
  })

  const geometry = new THREE.PlaneGeometry(1, 1)

  const mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)

  const render = () => {
    uniforms.iTime.value += 0.01
    requestAnimationFrame(render)
  }
  render()
}

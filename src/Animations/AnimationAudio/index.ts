/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-14 07:37:20
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-28 16:48:11
 * @FilePath: \three-map-demo\src\views\ThreeStart\index.ts
 * @Description: logic center
 */
import * as THREE from 'three'
import { scene, camera, renderer, control } from '@/base/baseObj'
import vertexShader from '@/shader/audio/vertexShader.vert'
import fragmentShader from '@/shader/audio/fragmentShader.frag'

scene.add(camera)

const axes = new THREE.AxesHelper(5)
scene.add(axes)

renderer.setSize(window.innerWidth, window.innerHeight)

const fftSize = 128

const file = 'public/music/2.map3'

let analyser: any

const format = renderer.capabilities.isWebGL2
  ? THREE.RedFormat
  : THREE.LuminanceFormat

export const init = (): void => {
  const animate = () => {
    control.update()
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
  }
  animate()
}

export const playMusic = ():void => {
  const listener = new THREE.AudioListener()

  const audio = new THREE.Audio(listener)

  //   const mediaElement = new Audio('./music/2.map3')
  //   mediaElement.play()
  //   audio.setMediaElementSource(mediaElement)

  //   analyser = new THREE.AudioAnalyser(audio, fftSize)

  //   const uniforms = {
  //     tAudioData: {
  //       value: new THREE.DataTexture(analyser.data, fftSize / 2, 1, format)
  //     }
  //   }

  //   const material = new THREE.ShaderMaterial({
  //     uniforms: uniforms,
  //     vertexShader,
  //     fragmentShader
  //   })

  //   const geometry = new THREE.PlaneGeometry(1, 1)

  //   const mesh = new THREE.Mesh(geometry, material)
  //   scene.add(mesh)
  const render = () => {
    requestAnimationFrame(render)
    // analyser.getFrequencyData()
    // uniforms.tAudioData.value.needsUpdate = true
  }
  render()
}

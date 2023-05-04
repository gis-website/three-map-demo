/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-05-04 11:07:06
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-05-04 11:10:02
 * @FilePath: \three-map-demo\src\Animations\AnimationAudio\composables\loadAudio copy.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import * as THREE from 'three'
import { scene } from '@/base/baseObj'
import vertexShader from '@/shader/audio/vertexShader.vert'
import fragmentShader from '@/shader/audio/fragmentShader.frag'

export const loadAudio = (src: string, size: number, format: any):void => {
  const listener = new THREE.AudioListener()

  const audio = new THREE.Audio(listener)

  const mediaElement = new Audio(src)
  mediaElement.play()

  audio.setMediaElementSource(mediaElement)

  const analyser = new THREE.AudioAnalyser(audio, size)

  const uniforms = {
    tAudioData: {
      value: new THREE.DataTexture(analyser.data, size / 2, 1, format)
    }
  }

  const material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader,
    fragmentShader
  })

  const geometry = new THREE.PlaneGeometry(1, 1)

  const mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)
  const render = () => {
    requestAnimationFrame(render)
    analyser.getFrequencyData()
    uniforms.tAudioData.value.needsUpdate = true
  }
  render()
}

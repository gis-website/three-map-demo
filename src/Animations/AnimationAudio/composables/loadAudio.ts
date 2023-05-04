import * as THREE from 'three'
import { scene, renderer } from '@/base/baseObj'
import vertexShader from '@/shader/audio/vertexShader.vert'
import fragmentShader from '@/shader/audio/fragmentShader.frag'

export const loadAudio = (src: string, size: number, format: any):void => {
//   const listener = new THREE.AudioListener()

  //   const audio = new THREE.Audio(listener)

  //   const mediaElement = new Audio(src)
  //   mediaElement.play()

  //   audio.setMediaElementSource(mediaElement)

  //   const analyser = new THREE.AudioAnalyser(audio, size)
  const { width, height } = renderer.getDrawingBufferSize(new THREE.Vector2())
  debugger
  const uniforms = {
    tAudioData: {
      value: null
    },
    iResolution: {
      value: new THREE.Vector2(width, height)
    },
    iTime: { value: 0 },
    iChannel0: { value: null },
    iChannel1: { value: null }
  }

  const material = new THREE.ShaderMaterial({
    uniforms: uniforms,
    vertexShader,
    fragmentShader
  })

  const geometry = new THREE.PlaneGeometry(1, 1)

  const mesh = new THREE.Mesh(geometry, material)
  scene.add(mesh)
//   const render = () => {
//     requestAnimationFrame(render)
//     // analyser.getFrequencyData()
//     // uniforms.tAudioData.value.needsUpdate = true
//   }
//   render()
}

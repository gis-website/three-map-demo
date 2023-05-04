<!--
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-28 13:43:20
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-05-04 10:19:49
 * @FilePath: \three-map-demo\src\Animations\AnimationAudio\AnimationAudio.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div id="map-content">
    <div id="myMap" ref="myMap"></div>
      <div id="tooltip" ref="tooltip"></div>
      <el-button type="primary" class="click"
      @click="handleClick">Primary</el-button>
    <!-- <audio class="audio" controls src="./music/2.mp3">
      <source src="2.mp3" type="audio/mpeg"/>
    </audio> -->
  </div>
</template>
<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import * as THREE from 'three'
import { scene, camera, renderer, control } from '@/base/baseObj'
import vertexShader from '@/shader/audio/vertexShader.vert'
import fragmentShader from '@/shader/audio/fragmentShader.frag'

const myMap = ref()

const handleClick = (): void => {
  playMusic()
}

onMounted(() => {
  myMap.value.appendChild(renderer.domElement)
  init()
})

scene.add(camera)

const axes = new THREE.AxesHelper(5)
scene.add(axes)

renderer.setSize(window.innerWidth, window.innerHeight)

const fftSize = 128

const file = './music/1.mp3'

let analyser: any

const format = renderer.capabilities.isWebGL2
  ? THREE.RedFormat
  : THREE.LuminanceFormat

const init = (): void => {
  const animate = () => {
    control.update()
    renderer.render(scene, camera)
    requestAnimationFrame(animate)
  }
  animate()
}

const playMusic = ():void => {
  const listener = new THREE.AudioListener()

  const audio = new THREE.Audio(listener)

  const mediaElement = new Audio(file)
  mediaElement.play()

  audio.setMediaElementSource(mediaElement)

  analyser = new THREE.AudioAnalyser(audio, fftSize)

  const uniforms = {
    tAudioData: {
      value: new THREE.DataTexture(analyser.data, fftSize / 2, 1, format)
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

</script>

  <style scoped lang="less">
#map-content {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  #myMap {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }

  #tooltip {
    display: none;
    position: absolute;
    z-index: 2;
    background: white;
    padding: 10px;
    border-radius: 2px;
    overflow: hidden;
  }

  .click {
    position: absolute;
    top: 0;
    left: 0;
  }

  .audio {
    position: absolute;
    top: 0;
    left: 200px;
  }
}
</style>

<!--
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-12 08:45:56
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-14 09:54:42
 * @FilePath: \three-map-demo\src\components\ThreeMap.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
    <div id="myMap"></div>
  </template>

<script setup lang="ts">
import { onMounted } from 'vue'
import * as THREE from 'three'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)

const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
const cube = new THREE.Mesh(geometry, material)
scene.add(cube)

camera.position.z = 5

onMounted(() => {
  const myMap = document.getElementById('myMap')
    myMap!.appendChild(renderer.domElement)
    animate()
})

function animate () {
  requestAnimationFrame(animate)
  cube.rotation.x += 0.01
  cube.rotation.y += 0.01
  renderer.render(scene, camera)
}
</script>

  <style scoped lang="less">
  #myMap {
    width: 100%;
    height: 100%;
  }
  </style>

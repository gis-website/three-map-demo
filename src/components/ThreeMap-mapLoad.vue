<!--
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-12 08:45:56
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-12 11:32:31
 * @FilePath: \three-map-demo\src\components\ThreeMap.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div id="myMap" ref="myMap"></div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as THREE from 'three'
import { getJsonNanJingData } from '@/api/index'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import * as d3 from 'd3'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
const map = new THREE.Object3D()
const myMap = ref()

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)

// 添加旋转交互
const controls = new OrbitControls(camera, renderer.domElement)

// scene.add(cube)

camera.position.set(0, 0, 15)
camera.lookAt(scene.position)

const projection = d3
  .geoMercator()
  .center([118.78, 32.07])
  .scale(80)
  .translate([0, 0])

onMounted(async () => {
  const myMapData = await getJsonNanJingData()
  generateGeometry(myMapData)
  myMap.value.appendChild(renderer.domElement)
  setCameraHelper()
  animate()
})

/**
 * @description:  获取地图要素添加到场景中
 * @param {*} jsondata 地图数据
 * @return {*}
 */
function generateGeometry (jsondata: any) {
  // 初始化一个地图对象

  jsondata.features.forEach((elem: any) => {
    // 定一个省份3D对象
    const province = new THREE.Object3D()

    // 每个的 坐标 数组
    const coordinates = elem.geometry.coordinates
    // 循环坐标数组
    coordinates.forEach((multiPolygon: any) => {
      multiPolygon.forEach((polygon: any) => {
        const shape = new THREE.Shape()
        const lineMaterial = new THREE.LineBasicMaterial({
          color: 'white',
          linewidth: 1,
          linecap: 'round', // ignored by WebGLRenderer
          linejoin: 'round' // ignored by WebGLRenderer
        })
        const lineGeometry = new THREE.BufferGeometry()
        const points = [] as any

        for (let i = 0; i < polygon.length; i++) {
          const [x, y] = projection(polygon[i])
          if (i === 0) {
            shape.moveTo(x, -y)
          }
          shape.lineTo(x, -y)
          points.push(new THREE.Vector3(x, -y, 4))
        }
        lineGeometry.setFromPoints(points)

        const extrudeSettings = {
          depth: 8,
          bevelEnabled: false
        }

        const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
        const material = new THREE.MeshBasicMaterial({
          color: '#2defff',
          transparent: true,
          opacity: 0.6
        })
        const material1 = new THREE.MeshBasicMaterial({
          color: '#3480C4',
          transparent: true,
          opacity: 0.5
        })

        const mesh = new THREE.Mesh(geometry, [material, material1])
        const line = new THREE.Line(lineGeometry, lineMaterial)
        province.add(mesh)
        province.add(line)
        map.add(province)
      })
    })
  })
  scene.add(map)
}

/**
 * @description: 添加相机轨道运动
 * @return {*}
 */
function animate () {
  requestAnimationFrame(animate)

  controls.update()

  renderer.render(scene, camera)
}

/**
 * @description: 添加相机辅助线
 * @return {*}
 */
function setCameraHelper () {
  scene.add(new THREE.CameraHelper(camera))
}
</script>

<style scoped lang="less">
#myMap {
  width: 100%;
  height: 100%;
}
</style>

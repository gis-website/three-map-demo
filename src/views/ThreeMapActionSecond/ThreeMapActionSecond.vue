<!--
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-14 08:02:25
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-14 09:56:02
 * @FilePath: \three-map-demo\src\views\ThreeMapActionSecond\ThreeMapActionSecond.vue
 * @Description: three.js add animation
-->
<template>
    <div id="map-content">
      <div id="myMap" ref="myMap"></div>
      <div id="tooltip" ref="tooltip"></div>
    </div>
  </template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import * as THREE from 'three'
import { getJsonNanJingData, getJsonChinaData } from '@/api/index'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { initCircle, drawMapChina, circleAnimation, drawLightBar } from './composables/CircleAction'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
const map = new THREE.Object3D()
const myMap = ref()
const tooltip = ref()
const lastPick = ref<any>()
const flag = ref<boolean>(true)

const raycaster = new THREE.Raycaster() // 射线追踪
const mouse = new THREE.Vector2() // 鼠标对象
const clock = new THREE.Clock()

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)

const controls = new OrbitControls(camera, renderer.domElement)

camera.position.set(0, 0, 15)
camera.lookAt(scene.position)

// const projection = d3
//   .geoMercator()
//   .center([118.78, 32.07])
//   .scale(80)
//   .translate([0, 0])

onMounted(async () => {
  const myMapData = await getJsonNanJingData()
  const chinaData = await getJsonChinaData()
  //   generateGeometry(myMapData)
  drawMapChina(chinaData, scene)
  myMap.value.appendChild(renderer.domElement)
  initCircle(myMapData, scene, map)
  setCameraHelper()
  drawLightBar(myMapData, scene)
  setLight()
  animate()
  // 获取鼠标当前位置
  window.addEventListener('pointermove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1
    // 更改div位置
    tooltip.value.style.left = event.clientX + 2 + 'px'
    tooltip.value.style.top = event.clientY + 2 + 'px'
  })
})

/**
   * @description:  获取地图要素添加到场景中
   * @param {*} jsondata 地图数据
   * @return {*}
   */
// function generateGeometry (jsondata: any) {
//   // 初始化一个地图对象

//   jsondata.features.forEach((elem: any) => {
//     // 定一个省份3D对象
//     const province = new THREE.Object3D()

//     // 每个的 坐标 数组
//     const coordinates = elem.geometry.coordinates
//     // 循环坐标数组
//     coordinates.forEach((multiPolygon: any) => {
//       multiPolygon.forEach((polygon: any) => {
//         const shape = new THREE.Shape()
//         const lineMaterial = new THREE.LineBasicMaterial({
//           color: 'white',
//           linewidth: 1,
//           linecap: 'round', // ignored by WebGLRenderer
//           linejoin: 'round' // ignored by WebGLRenderer
//         })
//         const lineGeometry = new THREE.BufferGeometry()
//         const points = [] as any

//         for (let i = 0; i < polygon.length; i++) {
//           const [x, y] = projection(polygon[i])
//           if (i === 0) {
//             shape.moveTo(x, -y)
//           }
//           shape.lineTo(x, -y)
//           points.push(new THREE.Vector3(x, -y, 1))
//         }
//         lineGeometry.setFromPoints(points)

//         const extrudeSettings = {
//           depth: 1,
//           bevelEnabled: false
//         }

//         const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings)
//         const material = new THREE.MeshBasicMaterial({
//           color: '#2defff',
//           transparent: true,
//           opacity: 0.6
//         })
//         const material1 = new THREE.MeshBasicMaterial({
//           color: '#00ff33',
//           transparent: true,
//           opacity: 0.5
//         })

//         const mesh = new THREE.Mesh(geometry, [material, material1])
//         const line = new THREE.Line(lineGeometry, lineMaterial)
//         province.properties = elem.properties
//         mesh.position.set(0, 0, 1)
//         line.position.set(0, 0, 1)
//         province.add(mesh)
//         province.add(line)
//         map.add(province)
//       })
//     })
//   })
//   scene.add(map)
// }

/**
   * @description: 添加相机轨道运动
   * @return {*}
   */
function animate () {
  requestAnimationFrame(animate)
  // 通过摄像机和鼠标位置更新射线
  raycaster.setFromCamera(mouse, camera)
  // 算出射线 与当场景相交的对象有那些
  const intersects = raycaster.intersectObjects(scene.children, true)

  if (lastPick.value) {
    lastPick.value.object.material[0].color.set('#2defff')
    console.log(lastPick.value.object)
    lastPick.value.object.material[1].color.set('#3480C4')
  }
  lastPick.value = intersects.find(
    (item: any) => item.object.material && item.object.material.length === 2
  )
  if (flag.value) { // 拦截器：放在第一次加载触发选中状态
    flag.value = !flag.value
    controls.update()
    showTip()
    renderer.render(scene, camera)
    return
  }
  if (lastPick.value) {
    lastPick.value.object.material[0].color.set(0xff0000)
    lastPick.value.object.material[1].color.set(0xff0000)
  }
  controls.update()
  showTip()
  const dalte = clock.getDelta()
  circleAnimation(dalte)
  renderer.render(scene, camera)
}

/**
   * @description: 添加相机辅助线
   * @return {*}
   */
function setCameraHelper () {
  scene.add(new THREE.CameraHelper(camera))
}

/**
   * @description: 设置光照
   * @return {*}
   */
const setLight = () => {
  const ambientLight = new THREE.AmbientLight(101070, 20)
  scene.add(ambientLight) // 环境
}

const showTip = () => {
  // 显示信息
  if (lastPick.value) {
    const properties = lastPick.value.object.parent.properties

    tooltip.value.textContent = properties.name
    tooltip.value.style.display = 'block'
  } else {
    tooltip.value.style.display = 'none'
  }
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
  }
  </style>

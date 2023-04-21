/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-14 16:42:04
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-19 10:31:36
 * @FilePath: \three-map-demo\src\views\ThreeMapAction\composables\baseObj.ts
 * @Description: base object
 */
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import * as d3 from 'd3'

export const projection = d3
  .geoMercator()
  .center([108.923611, 34.540833])
  .scale(80)
  .translate([0, 0])

export const map = new THREE.Object3D() // map carrier

export const scene = new THREE.Scene()

export const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0, 0, 60)
camera.rotation.x = -Math.PI * 0.5 * 0.5
camera.updateProjectionMatrix()

export const axes = new THREE.AxesHelper(50)

export const cameraHelper = new THREE.CameraHelper(camera)

export const renderer = new THREE.WebGLRenderer({ antialias: true })

export const control = new OrbitControls(camera, renderer.domElement)

export const clock = new THREE.Clock() // 时间

export const raycaster = new THREE.Raycaster() // 射线追踪

export const mouse = new THREE.Vector2() // 鼠标对象

/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-14 16:42:04
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-19 11:16:17
 * @FilePath: \three-map-demo\src\views\ThreeMapAction\composables\baseObj.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
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
camera.position.set(0, 0, 10)

export const axes = new THREE.AxesHelper(5)

export const cameraHelper = new THREE.CameraHelper(camera)

export const renderer = new THREE.WebGLRenderer()

export const control = new OrbitControls(camera, renderer.domElement)

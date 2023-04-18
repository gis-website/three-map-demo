/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-17 15:22:49
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-18 10:32:21
 * @FilePath: \three-map-demo\src\views\Animation\AnimationRotationLine\composables\baseObj.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import * as d3 from 'd3'

export const projection = d3
  .geoMercator()
  .center([118.625307, 32.05839])
  .scale(80)
  .translate([0, 0])

export const map = new THREE.Object3D() // map carrier

export const scene = new THREE.Scene()

export const camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(0, 0, 10)

export const axes = new THREE.AxesHelper(5)

export const cameraHelper = new THREE.CameraHelper(camera)

export const renderer = new THREE.WebGLRenderer({ antialias: true })

export const control = new OrbitControls(camera, renderer.domElement)

export const composers = {
  value: {} as any
}

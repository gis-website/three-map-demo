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

// export const renderer = new THREE.WebGLRenderer({ alpha: true })
export const renderer = new THREE.WebGLRenderer({
  logarithmicDepthBuffer: true,
  antialias: true
})

export const control = new OrbitControls(camera, renderer.domElement)

export const clock = new THREE.Clock()

/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-05-05 14:48:05
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-05-06 08:43:03
 * @FilePath: \three-map-demo\src\Animations\AnimationBuildRipple\composables\buildRipple.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import * as THREE from 'three'
import vertexShader from '@/shader/buildRipple/vertexShader.vert'
import fragmentShader from '@/shader/buildRipple/fragmentShader.frag'
import { scene } from '@/base/baseObj'

const url = './static/models/build.glb'

const uniforms = {
  u_TopColor: { value: new THREE.Color(0x024144) },
  U_Height: { value: 1200 }
}
const shaderMaterial = new THREE.ShaderMaterial({
  uniforms,
  vertexShader,
  fragmentShader
})

export const loadModel = ():any => {
  setModel(url).then((gltf:any) => {
    gltf.scene.scale.set(0.01, 0.01, 0.01)
    gltf.scene.traverse((child:any) => {
      if (child.isMesh) {
        child.material = shaderMaterial
      }
    })
    scene.add(gltf.scene)
  })
}

const setModel = (url:string) => {
  const gltfLoader = new GLTFLoader()
  const dracoLoader = new DRACOLoader()

  dracoLoader.setDecoderPath('./static/draco/gltf/')
  dracoLoader.setDecoderConfig({ type: 'js' })
  dracoLoader.preload()
  gltfLoader.setDRACOLoader(dracoLoader)

  return new Promise((resolve, reject) => {
    gltfLoader.load(url, (gltf:any) => {
      resolve(gltf)
    })
  })
}

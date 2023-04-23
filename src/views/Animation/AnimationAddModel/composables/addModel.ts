/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-17 20:46:44
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-23 10:25:30
 * @FilePath: \three-map-demo\src\views\Animation\AnimationGaugePoint\composables\gaugePoint.ts
 * @Description: load obj3D model
 */
import * as THREE from 'three'
import { scene } from '@/base/baseObj'
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js'

export const loadModel = ():void => {
  const loader = new OBJLoader()// obj加载器
  loader.load('./models/aifeier.obj', function (obj: Object3D) {
    obj.children.forEach((item: Object3D, index: number) => {
      item.material = new THREE.MeshBasicMaterial({
        color: 0x050918,
        depthWrite: false,
        side: THREE.DoubleSide,
        transparent: true
      })
      if (index === 0) {
        item.material.opacity = 0
      }
      item.layers.enable(1)
    })
    obj.scale.set(0.2, 0.25, 0.2) // 放大obj组对象
    obj.position.x = 5
    obj.position.y = 5
    obj.position.z = 5
    scene.add(obj)// 返回的组对象插入场景中
  })
}

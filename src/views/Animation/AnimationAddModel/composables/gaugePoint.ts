/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-17 20:46:44
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-18 14:49:12
 * @FilePath: \three-map-demo\src\views\Animation\AnimationGaugePoint\composables\gaugePoint.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import * as THREE from 'three'
import { scene } from './baseObj'
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js'

export const loadModel = ():void => {
  const loader = new OBJLoader()// obj加载器
  loader.load('./models/aifeier.obj', function (obj: any) {
    obj.children.forEach((item: any, index: number) => {
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

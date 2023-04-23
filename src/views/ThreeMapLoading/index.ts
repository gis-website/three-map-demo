/*
 * @Author: TQtong 2733707740@qq.com
 * @Date: 2023-04-14 09:55:02
 * @LastEditors: TQtong 2733707740@qq.com
 * @LastEditTime: 2023-04-23 09:25:06
 * @FilePath: \three-map-demo\src\views\ThreeMapLoading\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { scene, projection, map, camera, axes, renderer, control } from './composables/baseObj'
import * as THREE from 'three'
import { getJsonNanJingData } from '@/api'
import { MapGeo, Features } from '@/types/map'

scene.add(camera)
scene.add(axes)
renderer.setSize(window.innerWidth, window.innerHeight)

export const init = async ():Promise<void> => {
  const myMapData = await getJsonNanJingData()
  generateGeometry(myMapData)
  animate()
}

/**
   * @description: 添加相机轨道运动
   * @return {*}
   */
const animate = ():void => {
  requestAnimationFrame(animate)

  control.update()

  renderer.render(scene, camera)
}

/**
   * @description:  获取地图要素添加到场景中
   * @param {*} jsondata 地图数据
   * @return {*}
   */
const generateGeometry = (jsondata: MapGeo):void => {
  jsondata.features.forEach((elem: Features) => {
    // 定一个省份3D对象
    const province = new THREE.Group()

    // 每个的 坐标 数组
    const coordinates = elem.geometry.coordinates
    // 循环坐标数组
    coordinates.forEach((multiPolygon: Array<Array<Array<number>>>) => {
      multiPolygon.forEach((polygon: Array<Array<number>>) => {
        const shape = new THREE.Shape()
        const lineMaterial = new THREE.LineBasicMaterial({
          color: 'white',
          linewidth: 1,
          linecap: 'round', // ignored by WebGLRenderer
          linejoin: 'round' // ignored by WebGLRenderer
        })
        const lineGeometry = new THREE.BufferGeometry()
        const points = [] as Array<Vector3>

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
